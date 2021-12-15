import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import PlaylistService, { SongInPlaylistTogglerRequestType } from 'services/PlaylistService';
import MusicService from 'services/MusicService';
import { alertMessage } from './bottom-alert-reducer';


type SognsContainerType = 'album' | 'playlist';

type initialStateType = {
   songs: SongsType
   containerType: SognsContainerType | null
};

const initialState: initialStateType = {
   songs: [],
   containerType: null
};

export const songsContainerFetcherCreator = (thunkName: string, containerType: SognsContainerType, apiMethod: any) => createAsyncThunk(
   thunkName,
   async (id: number, thunkAPI) => {
      try {
         const response = await apiMethod(id);
         thunkAPI.dispatch(setSongs({ songs: response.data.songs, containerType }));
         const { songs, ...dataWithoutSongs } = response.data;
         return dataWithoutSongs;
      } catch (error) {
         const err = error as AxiosError;
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);

export const toggleSongLikeById = createAsyncThunk(
   'songs/toggleSongLikeById',
   async (id: number, thunkAPI) => {
      try {
         const response = await MusicService.likeSong(id);
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

const _songInPlaylistTogglerThunkCreator = (thunkName: string, apiMethod: SongInPlaylistTogglerRequestType, verb: 'added' | 'removed') => {
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

export const addSongToNewCreatedPlaylist = createAsyncThunk<void, {songId: number, playlistName: string}>(
   'songs/addSongToNewCreatedPlaylist',
   async ({ songId, playlistName }, thunkAPI) => {
      try {
         const creationResponse = await PlaylistService.createPlaylist(playlistName ? playlistName : 'New playlist');
         thunkAPI.dispatch(addSongToPlaylist({songId, playlistId: creationResponse.data.id}));
         thunkAPI.dispatch(alertMessage({ message: 'Song was added to new playlist', messageStatus: 'ok' }));
      } catch (error) {
         const err = error as AxiosError;
         thunkAPI.dispatch(alertMessage({ message: 'Error occured', messageStatus: 'error' }));
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);

export const addSongToPlaylist = _songInPlaylistTogglerThunkCreator(
   'addSongToPlaylist',
   PlaylistService.addSongToPlaylist,
   'added'
);

export const removeSongFromPlaylist = _songInPlaylistTogglerThunkCreator(
   'removeSongFromPlaylist',
   PlaylistService.removeSongFromPlaylist,
   'removed'
);

export const removeSongFromLiked = createAsyncThunk(
   'songs/removeSongFromLiked',
   async (id: number, thunkAPI) => {
      try {
         const response = await MusicService.likeSong(id);
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
      setSongs(state, action: PayloadAction<{ songs: SongsType; containerType: SognsContainerType }>) {
         state.songs = action.payload.songs;
         state.containerType = action.payload.containerType;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(toggleSongLikeById.fulfilled, (state, action) => {
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