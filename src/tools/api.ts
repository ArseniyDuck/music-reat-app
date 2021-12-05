import axios, { AxiosError } from 'axios';
import Cookie from 'js-cookie';
import { AlbumType, SignInUserType, PlaylistType, SignUpUserType, SmallPlaylistType, UserType } from '../types/data-structures';

export const instance = axios.create({
   withCredentials: true,
   baseURL: 'http://localhost:8000/',
});

instance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) { config.headers['Authorization'] = `Bearer ${token}`; }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
 );
 
instance.interceptors.response.use(
   (res) => {
      return res;
   },
   async (err: AxiosError) => {
      const originalConfig = err.config;
      if (originalConfig.url !== 'token/obtain/' && err.response) {
         // Access Token was expired
         if (err.response.status === 401) {
            try {
               type ResponseType = { access: string, refresh: string }
               const { data: { access, refresh } } = await instance.post<ResponseType>(
                  'token/refresh/', {refresh: localStorage.getItem('refreshToken')}
               );
               localStorage.setItem('accessToken', access);
               localStorage.setItem('refreshToken', refresh);
               return instance(originalConfig);
            } catch (_error) {
               return Promise.reject(_error);
            }
         }
      }
      return Promise.reject(err);
   }
 );


const _likeTogglerRequestCreator = (entity: 'song' | 'album') => {
   return (id: number) => {
      type ResponseType = { id: number };
      return instance.post<ResponseType>(`toggle_${entity}_like/`, { id }, {
         headers: {'X-CSRFToken': Cookie.get('csrftoken')}
      });
   };
};

export type LikeTogglerRequestType = ReturnType<typeof _likeTogglerRequestCreator>;

export const musicDataAPI = {
   getAlbum(id: number) {
      return instance.get<AlbumType>(`album/${id}/`);
   },

   getAlbums() {
      type ResponseType = Array<SmallPlaylistType>;
      return instance.get<ResponseType>('albums/');
   },

   likeSong: _likeTogglerRequestCreator('song'),

   likeAlbum: _likeTogglerRequestCreator('album'),
};


const _songInPlaylistTogglerReuestCreator = (action: 'add' | 'remove') => {
   return (song_id: number, playlist_id: number) => {
      return instance.post<{ id: number }>(`${action}_song/`, { song_id, playlist_id }, {
         headers: {'X-CSRFToken': Cookie.get('csrftoken')}
      });
   };
};

export type SongInPlaylistTogglerRequestType = ReturnType<typeof _songInPlaylistTogglerReuestCreator>;

export const playlistsAPI = {
   getPlaylists() {
      type ResponseType = Array<SmallPlaylistType>;
      return instance.get<ResponseType>('playlists/');
   },

   createPlaylist(name: string) {
      return instance.post<SmallPlaylistType>('create_playlist/', { name }, {
         headers: {'X-CSRFToken': Cookie.get('csrftoken')}
      });
   },

   getPlaylist(id: number) {
      return instance.get<PlaylistType>(`playlist/${id}/`);
   },

   addSongToPlaylist: _songInPlaylistTogglerReuestCreator('add'),

   removeSongFromPlaylist: _songInPlaylistTogglerReuestCreator('remove'),
};


export const authAPI = {
   me() {
      return instance.get<UserType>('me/');
   },
   
   signIn(user: SignInUserType) {
      type ResponseType = { access: string, refresh: string };
      return instance.post<ResponseType>('token/obtain/', { ...user });
   },

   refresh() {
      type ResponseType = { access: string, refresh: string }
      return instance.post<ResponseType>('token/refresh/', { refresh: localStorage.getItem('refreshToken') });
   },

   signUp(user: SignUpUserType) {
      type ResponseType = {};
      return instance.post<ResponseType>('register/', { ...user }, {
         headers: {'X-CSRFToken': Cookie.get('csrftoken')}
      });
   }
};