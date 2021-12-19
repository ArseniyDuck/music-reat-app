import $api from 'http-requests';
import { AxiosResponse } from 'axios';

export type SongInPlaylistSwitcherRequestType = (song_id: number, playlist_id: number) => Promise<AxiosResponse<{id: number}>>

export default class PlaylistService {
   static async getPlaylists(): Promise<AxiosResponse<SmallPlaylistType[]>> {
      return $api.get('playlists/');
   }

   static async getLikedSongs(): Promise<AxiosResponse<{ username: string, songs: SongType[], duration: string }>> {
      return $api.get('liked/');
   }

   static async createPlaylist(name: string): Promise<AxiosResponse<SmallPlaylistType>> {
      return $api.post('create_playlist/', { name });
   }

   static async getPlaylist(id: number): Promise<AxiosResponse<PlaylistType>> {
      return $api.get(`playlist/${id}/`);
   }

   static async addSongInPlaylist(song_id: number, playlist_id: number): Promise<AxiosResponse<{id: number}>> {
      return $api.post('add_song/', { song_id, playlist_id });
   }

   static async removeSongFromPlaylist(song_id: number, playlist_id: number): Promise<AxiosResponse<{id: number}>> {
      return $api.post('remove_song/', { song_id, playlist_id });
   }
};