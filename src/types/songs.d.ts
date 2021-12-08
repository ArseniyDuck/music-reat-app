type SongType = {
   id: number
   name: string
   audio: string
   duration: string
   is_liked: boolean
};

type SongsType = Array<SongType> | Array<PlaylistSongType>

type SognsContainerType = 'album' | 'playlist';

type MobilePullOutSongType = {
   id: number
   songName: string
   singerName: string
   duration: string
   isLiked: boolean
   singerId: number
   albumId: number
   isInPlaylist: boolean
   photo?: string
};