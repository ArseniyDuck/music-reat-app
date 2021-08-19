import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { playlistsAPI } from '../tools/api';
import { SongType } from './album-reducer';


export type SmallPlaylistType = {
   id: number
   name: string
};

type PlaylistSongType = SongType & {
   album: {
      id: number
      name: string
      photo: string
      best_color: string
   }
   singer: {
      id: number
      name: string
   }
};

export type PlaylistType = {
   id: number
   name: string
   duration: string
   user: string
   songs: Array<PlaylistSongType>
};

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
         console.log(JSON.stringify(response));
         return response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(error.message);
      }
   }
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