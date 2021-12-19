type SongType = {
   id: number
   name: string
   audio: string
   duration: string
   is_liked: boolean
};

type SongsType = SongType[] | PlaylistSongType[]

type MobilePullOutSongType = {
   id: number
   songName: string
   singerName: string
   duration: string
   isLiked: boolean
   singerId: number
   albumId: number
   photo?: string
};