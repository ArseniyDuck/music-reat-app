import $api from 'http-requests';
import { AxiosResponse } from 'axios';


export default class MusicService {
   static async getAlbum(id: number): Promise<AxiosResponse<AlbumType>> {
      return $api.get(`album/${id}/`);
   }

   static async getSinger(id: number): Promise<AxiosResponse<SingerType>> {
      return $api.get(`singer/${id}/`);
   }

   static async getAlbums(): Promise<AxiosResponse<SmallPlaylistType[]>> {
      return $api.get('albums/');
   }

   static async getSingers(): Promise<AxiosResponse<SmallSingerType[]>> {
      return $api.get('singers/');
   }

   static async switchSongLike(id: number): Promise<AxiosResponse<{ id: number }>> {
      return $api.post('switch_song_like/', { id });
   }

   static async switchAlbumLike(id: number): Promise<AxiosResponse<{ id: number }>> {
      return $api.post('switch_album_like/', { id });
   }

   static async switchSingerLike(id: number): Promise<AxiosResponse<{ id: number }>> {
      return $api.post('switch_singer_like/', { id });
   }
};