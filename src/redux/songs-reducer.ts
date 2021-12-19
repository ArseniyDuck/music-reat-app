import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import PlaylistService, { SongInPlaylistSwitcherRequestType } from 'services/PlaylistService';
import MusicService from 'services/MusicService';
import { alertMessage } from './bottom-alert-reducer';


type initialStateType = {
   songs: SongsType
};

const initialState: initialStateType = {
   songs: [],
};

export const songsContainerFetcherCreator = (thunkName: string, apiMethod: any) => createAsyncThunk(
   thunkName,
   async (id: number, thunkAPI) => {
      try {
         const response = await apiMethod(id);
         thunkAPI.dispatch(setSongs({ songs: response.data.songs }));
         const { songs, ...dataWithoutSongs } = response.data;
         return dataWithoutSongs;
      } catch (error) {
         const err = error as AxiosError;
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);

export const switchSongLike = createAsyncThunk(
   'songs/switchSongLike',
   async (id: number, thunkAPI) => {
      try {
         const { data, status } = await MusicService.switchSongLike(id);
         return { data, status };
      } catch (error) {
         const err = error as AxiosError;
         thunkAPI.dispatch(alertMessage({ message: `Error occured while toggling like`, messageStatus: 'error' }));
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);

const _songInPlaylistSwitcher = (thunkName: string, apiMethod: SongInPlaylistSwitcherRequestType, verb: 'added' | 'removed') => {
   return createAsyncThunk<{ id: number }, { songId: number, playlistId: number }>(
      `playlists/${thunkName}`,
      async ({ songId, playlistId }, thunkAPI) => {
         try {
            const response = await apiMethod(songId, playlistId);
            thunkAPI.dispatch(alertMessage({ message: `Song was ${verb}`, messageStatus: 'ok' }));
            return response.data;
         } catch (error) {
            const err = error as AxiosError;
            thunkAPI.dispatch(alertMessage({ message: `Song wasn't ${verb}`, messageStatus: 'error' }));
            return thunkAPI.rejectWithValue(err.message);
         }
      }
   );
};

export const addSongInNewPlaylist = createAsyncThunk<void, {songId: number, playlistName: string}>(
   'songs/addSongInNewPlaylist',
   async ({ songId, playlistName }, thunkAPI) => {
      try {
         const { data } = await PlaylistService.createPlaylist(playlistName ? playlistName : 'New playlist');
         thunkAPI.dispatch(addSongInPlaylist({songId, playlistId: data.id}));
         thunkAPI.dispatch(alertMessage({ message: 'Song was added to new playlist', messageStatus: 'ok' }));
      } catch (error) {
         const err = error as AxiosError;
         thunkAPI.dispatch(alertMessage({ message: 'Error occured', messageStatus: 'error' }));
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);

export const addSongInPlaylist = _songInPlaylistSwitcher(
   'addSongInPlaylist',
   PlaylistService.addSongInPlaylist,
   'added'
);

export const removeSongFromPlaylist = _songInPlaylistSwitcher(
   'removeSongFromPlaylist',
   PlaylistService.removeSongFromPlaylist,
   'removed'
);

export const removeSongFromLiked = createAsyncThunk(
   'songs/removeSongFromLiked',
   async (id: number, thunkAPI) => {
      try {
         const response = await MusicService.switchSongLike(id);
         // 200 means that song was disliked
         if (response.status === 200) {
            thunkAPI.dispatch(alertMessage({ message: 'Song was removed from Liked Songs', messageStatus: 'ok' }));
            return response.data;
         } else {
            throw Error('Something went wrong while removing')
         }
      } catch (error) {
         const err = error as AxiosError;
         thunkAPI.dispatch(alertMessage({ message: err.message, messageStatus: 'error' }));
         return thunkAPI.rejectWithValue(err.message);
      }
   }
)

export const songsSile = createSlice({
   name: 'songs',
   initialState,
   reducers: {
      setSongs(state, action: PayloadAction<{ songs: SongsType }>) {
         state.songs = action.payload.songs;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(switchSongLike.fulfilled, (state, action) => {
         if ([200, 201].includes(action.payload.status)) {
            const song = state.songs.find(song => song.id === action.payload.data.id);

            if (song && action.payload.status === 201) {
               song.is_liked = true
            } else if (song && action.payload.status === 200) {
               song.is_liked = false
            }
         }
      });

      // removeSongFromPlaylist --------------------------------------------------------
      builder.addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
         state.songs = state.songs.filter(song => song.id !== action.payload.id)
      });

      // removeSongFromLiked --------------------------------------------------------
      builder.addCase(removeSongFromLiked.fulfilled, (state, action) => {
         state.songs = state.songs.filter(song => song.id !== action.payload.id)
      });
   },
});

export const { setSongs } = songsSile.actions;
export default songsSile.reducer;