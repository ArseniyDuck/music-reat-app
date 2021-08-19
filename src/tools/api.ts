import axios from 'axios';
import Cookie from 'js-cookie';
import { AlbumType } from '../redux/album-reducer';
import { PlaylistType, SmallPlaylistType } from '../redux/playlists-reducer';

export const instance = axios.create({
   withCredentials: true,
   baseURL: 'http://localhost:8000/',
})

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

   likeSong: _likeTogglerRequestCreator('song'),

   likeAlbum: _likeTogglerRequestCreator('album'),
};

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
};