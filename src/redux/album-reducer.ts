import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import MusicService from 'services/MusicService';
import { alertMessage } from './bottom-alert-reducer';
import { songsContainerFetcherCreator } from './songs-reducer';



type initialStateType = {
   data: Omit<AlbumType, 'songs'> | null
   error: string | null
   isFetching: boolean
   smallAlbums: {
      albums: SmallPlaylistType[]
      isFetching: boolean
      error: null | string
   }
};

const initialState: initialStateType = {
   data: null,
   error: null,
   isFetching: false,
   smallAlbums: {
      albums: [],
      isFetching: false,
      error: null
   }
};

export const fetchSmallAlbums = createAsyncThunk(
   'album/fetchSmallAlbums',
   async (_, thunkAPI) => {
      try {
         const response = await MusicService.getAlbums();
         return response.data;
      } catch (error) {
         const err = error as AxiosError;
         thunkAPI.dispatch(alertMessage({ message: 'Album skeletons weren\'t loaded', messageStatus: 'error' }));
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);

export const fetchAlbum = songsContainerFetcherCreator('album/fetchAlbum', MusicService.getAlbum);

export const switchAlbumLike = createAsyncThunk(
   'album/switchAlbumLike',
   async (id: number, thunkAPI) => {
      try {
         const { data, status } = await MusicService.switchAlbumLike(id);
         return { data, status };
      } catch (error) {
         const err = error as AxiosError;
         thunkAPI.dispatch(alertMessage({ message: `Error occured while toggling like`, messageStatus: 'error' }));
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);

export const albumSlice = createSlice({
   name: 'album',
   initialState,
   reducers: {
      clearSmallAlbums(state) {
         state.smallAlbums.albums = [];
      },
      clearAlbum(state) {
         state.data = null
      },
   },
   extraReducers: (builder) => {
      // fetchSmallAlbums --------------------------------------------------------
      builder.addCase(fetchSmallAlbums.pending, (state, action) => {
         state.smallAlbums.isFetching = true
      });

      builder.addCase(fetchSmallAlbums.fulfilled, (state, action) => {
         state.smallAlbums.isFetching = false
         state.smallAlbums.albums = action.payload
      });
      
      builder.addCase(fetchSmallAlbums.rejected, (state, action) => {
         state.smallAlbums.isFetching = false
         if (action.payload) {
            state.smallAlbums.error = action.payload as string
         }
      });

      // fetchAlbum --------------------------------------------------------
      builder.addCase(fetchAlbum.pending, (state, action) => {
         state.isFetching = true
      });

      builder.addCase(fetchAlbum.fulfilled, (state, action) => {
         state.isFetching = false
         state.data = action.payload
      });
      
      builder.addCase(fetchAlbum.rejected, (state, action) => {
         state.isFetching = false
         if (action.payload) {
            state.error = action.payload as string
         }
      });

      builder.addCase(switchAlbumLike.fulfilled, (state, action) => {
         if ([200, 201].includes(action.payload.status) && state.data) {
            switch (action.payload.status) {
               case 201:
                  state.data.is_liked = true
                  break;
               case 200:
                  state.data.is_liked = false
                  break;    
            }
         }
      });
   },
});

export const { clearAlbum, clearSmallAlbums } = albumSlice.actions
export default albumSlice.reducer;