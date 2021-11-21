import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { musicDataAPI } from '../tools/api';
import { AlbumType, SmallPlaylistType } from '../types/data-structures';
import { alertMessage } from './bottom-alert-reducer';
import { songsContainerFetcherCreator } from './songs-reducer';



type initialStateType = {
   data: Omit<AlbumType, 'songs'> | null
   error: string | null
   isFetching: boolean
   smallAlbums: {
      albums: Array<SmallPlaylistType>
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
         const response = await musicDataAPI.getAlbums();
         return response.data;
      } catch (error) {
         const err = error as AxiosError;
         thunkAPI.dispatch(alertMessage({ message: 'Album skeletons weren\'t loaded', messageStatus: 'error' }));
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);

export const fetchAlbumById = songsContainerFetcherCreator('album/fetchAlbumById', 'album', musicDataAPI.getAlbum);

export const toggleAlbumLikeById = createAsyncThunk(
   'album/toggleAlbumLikeById',
   async (id: number, thunkAPI) => {
      try {
         const response = await musicDataAPI.likeAlbum(id);
         return {
            data: response.data,
            status: response.status,
         };
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
   reducers: {},
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

      // fetchAlbumById --------------------------------------------------------
      builder.addCase(fetchAlbumById.pending, (state, action) => {
         state.isFetching = true
      });

      builder.addCase(fetchAlbumById.fulfilled, (state, action) => {
         state.isFetching = false
         state.data = action.payload
      });
      
      builder.addCase(fetchAlbumById.rejected, (state, action) => {
         state.isFetching = false
         if (action.payload) {
            state.error = action.payload as string
         }
      });

      builder.addCase(toggleAlbumLikeById.fulfilled, (state, action) => {
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

export default albumSlice.reducer;