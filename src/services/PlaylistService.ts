import $api from 'http-requests';
import { AxiosResponse } from 'axios';

export type SongInPlaylistTogglerRequestType = (song_id: number, playlist_id: number) => Promise<AxiosResponse<{id: number}>>

export default class PlaylistService {
   static async getPlaylists(): Promise<AxiosResponse<SmallPlaylistType[]>> {
      return $api.get('playlists/');
   }

   static async createPlaylist(name: string): Promise<AxiosResponse<SmallPlaylistType>> {
      return $api.post('create_playlist/', { name });
   }

   static async getPlaylist(id: number): Promise<AxiosResponse<PlaylistType>> {
      return $api.get(`playlist/${id}/`);
   }

   static async addSongToPlaylist(song_id: number, playlist_id: number): Promise<AxiosResponse<{id: number}>> {
      return $api.post('add_song/', { song_id, playlist_id });
   }

   static async removeSongFromPlaylist(song_id: number, playlist_id: number): Promise<AxiosResponse<{id: number}>> {
      return $api.post('remove_song/', { song_id, playlist_id });
   }
};