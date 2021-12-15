import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import PlaylistService from 'services/PlaylistService';
import { alertMessage } from './bottom-alert-reducer';
import { songsContainerFetcherCreator } from './songs-reducer';


type initialStateType = {
   playlist: Omit<PlaylistType, 'songs'> | null
   isFetching: boolean
   error: null | string
   smallPlaylists: {
      playlists: Array<SmallPlaylistType>
      isFetching: boolean
      error: null | string
   }
};

const initialState: initialStateType = {
   playlist: null,
   isFetching: false,
   error: null,
   smallPlaylists: {
      playlists: [],
      isFetching: false,
      error: null
   },
};

export const fetchSmallPlaylists = createAsyncThunk(
   'playlists/fetchSmallPlaylists',
   async (_, thunkAPI) => {
      try {
         const response = await PlaylistService.getPlaylists();
         return response.data;
      } catch (error) {
         const err = error as AxiosError;
         thunkAPI.dispatch(alertMessage({ message: 'Playlist skeletons weren\'t loaded', messageStatus: 'error' }));
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);

export const createPlaylist = createAsyncThunk(
   'playlists/createPlaylist',
   async (name: string, thunkAPI) => {
      try {
         const response = await PlaylistService.createPlaylist(name ? name : 'New Playlist');
         thunkAPI.dispatch(alertMessage({ message: 'Playlist was created', messageStatus: 'ok' }));
         return response.data;
      } catch (error) {
         const err = error as AxiosError;
         thunkAPI.dispatch(alertMessage({ message: 'Playlist wasn\'t created', messageStatus: 'error' }));
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);


export const fetchPlaylistById = songsContainerFetcherCreator('playlists/fetchPlaylistById',  'playlist', PlaylistService.getPlaylist);

export const playlistsSlice = createSlice({
   name: 'likedSongs',
   initialState,
   reducers: {
      clearSmallPlaylists(state) {
         state.smallPlaylists.playlists = []
      },
      clearPlaylist(state) {
         state.playlist = null;
      },
   },
   extraReducers: (builder) => {
      // fetchSmallPlaylists --------------------------------------------------------
      builder.addCase(fetchSmallPlaylists.pending, (state, action) => {
         state.smallPlaylists.isFetching = true
      });

      builder.addCase(fetchSmallPlaylists.fulfilled, (state, action) => {
         state.smallPlaylists.isFetching = false
         state.smallPlaylists.playlists = action.payload
      });
      
      builder.addCase(fetchSmallPlaylists.rejected, (state, action) => {
         state.smallPlaylists.isFetching = false
         if (action.payload) {
            state.smallPlaylists.error = action.payload as string
         }
      });

      // createPlaylist --------------------------------------------------------
      builder.addCase(createPlaylist.fulfilled, (state, action) => {
         state.smallPlaylists.playlists = [{
            id: action.payload.id,
            name: action.payload.name,
            songs_count: 0,
            photo: null,
         }, ...state.smallPlaylists.playlists]
      });

      // fetchPlaylistById --------------------------------------------------------
      builder.addCase(fetchPlaylistById.pending, (state, action) => {
         state.isFetching = true
      });

      builder.addCase(fetchPlaylistById.fulfilled, (state, action) => {
         state.isFetching = false
         state.playlist = action.payload
      });
      
      builder.addCase(fetchPlaylistById.rejected, (state, action) => {
         state.isFetching = false
         if (action.payload) {
            state.error = action.payload as string
         }
      });
   },
});

export const { clearPlaylist, clearSmallPlaylists } = playlistsSlice.actions;
export default playlistsSlice.reducer;