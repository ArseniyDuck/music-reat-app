import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import MusicService from 'services/MusicService';
import { alertMessage } from './bottom-alert-reducer';
import { setSongs } from './songs-reducer';



type initialStateType = {
   data: Omit<SingerType, 'songs'> | null
   error: string | null
   isFetching: boolean
   smallSingers: {
      singers: SmallSingerType[]
      isFetching: boolean
      error: null | string
   }
};

const initialState: initialStateType = {
   data: null,
   error: null,
   isFetching: false,
   smallSingers: {
      singers: [],
      isFetching: false,
      error: null,
   }
};


export const fetchSinger = createAsyncThunk(
   'singer/fetchSinger',
   async (id: number, thunkAPI) => {
      try {
         const response = await MusicService.getSinger(id);
         thunkAPI.dispatch(setSongs({
            songs: response.data.songs
         }));
         const { songs, ...dataWithoutSongs } = response.data;
         return dataWithoutSongs;
      } catch (error) {
         const err = error as AxiosError;
         return thunkAPI.rejectWithValue(err.message);
      }
   }
)

export const fetchSmallSingers = createAsyncThunk(
   'singer/fetchSmallSingers',
   async (_, thunkAPI) => {
      try {
         const response = await MusicService.getSingers();
         return response.data
      } catch (error) {
         const err = error as AxiosError;
         thunkAPI.dispatch(alertMessage({ message: 'Singer skeletons weren\'t loaded', messageStatus: 'error' }));
         return thunkAPI.rejectWithValue(err.message);
      }
   }
)

export const switchSingerLike = createAsyncThunk(
   'album/switchSingerLike',
   async (id: number, thunkAPI) => {
      try {
         const { data, status } = await MusicService.switchSingerLike(id);
         return { data, status };
      } catch (error) {
         const err = error as AxiosError;
         thunkAPI.dispatch(alertMessage({ message: `Error occured while following`, messageStatus: 'error' }));
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);

export const singerSlice = createSlice({
   name: 'singer',
   initialState,
   reducers: {
      clearSmallSingers(state) {
         state.smallSingers.singers = []
      },
      clearSinger(state) {
         state.data = null
      },

   },
   extraReducers: (builder) => {
      // fetchSinger --------------------------------------------------------
      builder.addCase(fetchSinger.pending, (state, action) => {
         state.isFetching = true
      });

      builder.addCase(fetchSinger.fulfilled, (state, action) => {
         state.isFetching = false
         state.data = action.payload
      });
      
      builder.addCase(fetchSinger.rejected, (state, action) => {
         state.isFetching = false
         if (action.payload) {
            state.error = action.payload as string
         }
      });

      // switchSingerLike --------------------------------------------------------
      builder.addCase(switchSingerLike.fulfilled, (state, action) => {
         if ([200, 201].includes(action.payload.status) && state.data) {
            switch (action.payload.status) {
               case 201:
                  state.data.is_liked = true
                  state.data.likes_count += 1
                  break;
               case 200:
                  state.data.is_liked = false
                  state.data.likes_count -= 1
                  break;
            }
         }
      });

      // fetchSmallSingers
      builder.addCase(fetchSmallSingers.pending, (state, action) => {
         state.smallSingers.isFetching = true
      });

      builder.addCase(fetchSmallSingers.fulfilled, (state, action) => {
         state.smallSingers.isFetching = false
         state.smallSingers.singers = action.payload
      });
      
      builder.addCase(fetchSmallSingers.rejected, (state, action) => {
         state.smallSingers.isFetching = false
         if (action.payload) {
            state.smallSingers.error = action.payload as string
         }
      });
   },
});

export const { clearSinger, clearSmallSingers } = singerSlice.actions
export default singerSlice.reducer;