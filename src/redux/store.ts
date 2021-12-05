import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './album-reducer';
import bottomAlertReducer from './bottom-alert-reducer';
import playlistsReducer from './playlists-reducer';
import songsReducer from './songs-reducer';
import authReducer from './auth-reducer';


const store = configureStore({
  reducer: {
     auth: authReducer,
     album: albumReducer,
     playlists: playlistsReducer,
     songs: songsReducer,
     bottomAlert: bottomAlertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;