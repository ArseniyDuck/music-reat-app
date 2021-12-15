import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import PlaylistService from 'services/PlaylistService';
import { setSongs } from './songs-reducer';


type initialStateType = {
   username: string
   duration: string
   isFetching: boolean
   error: null | string
};

const initialState: initialStateType = {
   username: '',
   duration: '',
   isFetching: false,
   error: '',
};

export const fetchLikedSongs = createAsyncThunk(
   'likedSongs/fetchLikedSongs',
   async (_, thunkAPI) => {
      try {
         const response = await PlaylistService.getLikedSongs();
         thunkAPI.dispatch(setSongs({ songs: response.data.songs, containerType: 'playlist' }));
         const { songs, ...dataWithoutSongs } = response.data;
         return dataWithoutSongs;
      } catch (error) {
         const err = error as AxiosError;
         return thunkAPI.rejectWithValue(err.message)
      }
   }
)


export const likedSongsSlice = createSlice({
   name: 'likedSongs',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      // fetchLikedSongs --------------------------------------------------------
      builder.addCase(fetchLikedSongs.pending, (state, action) => {
         state.isFetching = true
      });
      
      builder.addCase(fetchLikedSongs.fulfilled, (state, action) => {
         state.isFetching = false
         state.username =  action.payload.username
         state.duration =  action.payload.duration
      });
      
      builder.addCase(fetchLikedSongs.rejected, (state, action) => {
         state.isFetching = false
         if (action.payload) {
            state.error = action.payload as string
         }
      });
   },
});

export default likedSongsSlice.reducer;