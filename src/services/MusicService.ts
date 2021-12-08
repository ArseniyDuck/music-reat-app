import $api from 'http-requests';
import { AxiosResponse } from 'axios';


export default class MusicService {
   static async getAlbum(id: number): Promise<AxiosResponse<AlbumType>> {
      return $api.get(`album/${id}/`);
   }

   static async getAlbums(): Promise<AxiosResponse<SmallPlaylistType[]>> {
      return $api.get('albums/');
   }

   static async likeSong(id: number): Promise<AxiosResponse<{ id: number }>> {
      return $api.post('toggle_song_like/', { id });
   }

   static async likeAlbum(id: number): Promise<AxiosResponse<{ id: number }>> {
      return $api.post('toggle_album_like/', { id });
   }
};