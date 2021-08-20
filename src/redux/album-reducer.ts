import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LikeTogglerRequestType, musicDataAPI } from '../tools/api';
import { AlbumType } from '../types/data-structures';


type initialStateType = {
   data: AlbumType | null
   error: string | null
   isFetching: boolean
};

const initialState: initialStateType = {
   data: null,
   error: null,
   isFetching: false,
};

export const fetchAlbumById = createAsyncThunk(
   'album/fetchAlbumById',
   async (albumId: number, thunkAPI) => {
      try {
         const response = await musicDataAPI.getAlbum(albumId);
         return response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(error.message);
      }
   }
);

const _likeTogglerThunkCreator = (thunkName: string, apiMethod: LikeTogglerRequestType)  => {
   return createAsyncThunk(
      `album/${thunkName}`,
      async (id: number, thunkAPI) => {
         try {
            const response = await apiMethod(id);
            return {
               data: response.data,
               status: response.status,
            };
         } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
         }
      }
   );
};

// todo: rename thunks from "like" to "toggle"
export const likeSongById = _likeTogglerThunkCreator('likeSongById', musicDataAPI.likeSong);

export const likeAlbumById = _likeTogglerThunkCreator('likeAlbumById', musicDataAPI.likeAlbum);

export const albumSlice = createSlice({
   name: 'album',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
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

      // todo: handle error when user likes or dislikes a song
      builder.addCase(likeSongById.fulfilled, (state, action) => {
         if (action.payload.status === 201) {
            // like
            const song = state.data?.songs.find(song => song.id === action.payload.data.id)
            if (song) {
               song.is_liked = true
            }
         } else if (action.payload.status === 200) {
            // dislike
            const song = state.data?.songs.find(song => song.id === action.payload.data.id)
            if (song) {
               song.is_liked = false
            }
         }
      });

      builder.addCase(likeAlbumById.fulfilled, (state, action) => {
         if (action.payload.status === 201) {
            // like
            if (state.data) {
               state.data.is_liked = true
            }
         } else if (action.payload.status === 200) {
            // dislike
            if (state.data) {
               state.data.is_liked = false
            }
         }
      });
   },
});

export default albumSlice.reducer;