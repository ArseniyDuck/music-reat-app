import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './album-reducer';
import bottomAlertReducer from './bottom-alert-reducer';
import playlistsReducer from './playlists-reducer';
import songsReducer from './songs-reducer';


const store = configureStore({
  reducer: {
     album: albumReducer,
     playlists: playlistsReducer,
     songs: songsReducer,
     bottomAlert: bottomAlertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;