type SingerType = {
   id: number
   name: string
   is_liked: boolean
   likes_count: number
   best_color: string
   photo: string
   genres: string[]
   albums: SmallAlbumType[]
   songs: PlaylistSongType[]
}

type SmallSingerType = {
   id: number
   name: string
   photo: string
   genres: string[]
}