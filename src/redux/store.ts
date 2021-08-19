import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './album-reducer';
import playlistsReducer from './playlists-reducer';

const store = configureStore({
  reducer: {
     album: albumReducer,
     playlists: playlistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;