import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { playlistsAPI, SongInPlaylistTogglerRequestType } from '../tools/api';
import { PlaylistType, SmallPlaylistType } from '../types/data-structures';


type initialStateType = {
   playlist: null | PlaylistType
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
         const response = await playlistsAPI.getPlaylists();
         return response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(error.message);
      }
   }
);

export const createPlaylist = createAsyncThunk(
   'playlists/createPlaylist',
   async (name: string, thunkAPI) => {
      try {
         const response = await playlistsAPI.createPlaylist(name);
         return response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(error.message);
      }
   }
);

const _songInPlaylistTogglerThunkCreator = (thunkName: string, apiMethod: SongInPlaylistTogglerRequestType) => {
   return createAsyncThunk<{ id: number }, { songId: number, playlistId: number }>(
      `playlists/${thunkName}`,
      async ({ songId, playlistId }, thunkAPI) => {
         try {
            const response = await apiMethod(songId, playlistId);
            return response.data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
         }
      }
   );
};

export const addSongToPlaylist = _songInPlaylistTogglerThunkCreator(
   'addSongToPlaylist',
   playlistsAPI.addSongToPlaylist,
);

export const removeSongFromPlaylist = _songInPlaylistTogglerThunkCreator(
   'removeSongFromPlaylist',
   playlistsAPI.removeSongFromPlaylist,
);

export const fetchPlaylistById = createAsyncThunk(
   'album/fetchPlaylistById',
   async (playlistId: number, thunkAPI) => {
      try {
         const response = await playlistsAPI.getPlaylist(playlistId);
         return response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(error.message);
      }
   }
);

export const playlistsSlice = createSlice({
   name: 'playlists',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      // fetchSmallPlaylists --------------------------------------------------------
      builder.addCase(fetchSmallPlaylists.pending, (state, action) => {
         state.smallPlaylists.isFetching = true
      });

      builder.addCase(fetchSmallPlaylists.fulfilled, (state, action) => {
         state.smallPlaylists.isFetching = false
         state.smallPlaylists.playlists = action.payload
      });
      
      // todo: don't ctrl+c ctrl+v addCase
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
         }, ...state.smallPlaylists.playlists]
      });

      // addSongToPlaylist --------------------------------------------------------
      builder.addCase(addSongToPlaylist.fulfilled, (state, action) => {
         // todo: show string in bottom alert
      });
      
      // removeSongFromPlaylist --------------------------------------------------------
      builder.addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
         // todo: show string in bottom alert
         if (state.playlist) {
            state.playlist.songs = state.playlist.songs.filter(song => song.id !== action.payload.id)
         }
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
      
      // todo: process the playlistCreationError
      /*
      builder.addCase(createPlaylist.rejected, (state, action) => {
         state.smallPlaylists.isFetching = false
         if (action.payload) {
            state.smallPlaylists.error = action.payload as string
         }
      });
      */
   },
});

export default playlistsSlice.reducer;