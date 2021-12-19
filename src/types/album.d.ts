type AlbumType = {
   id: number
   name: string
   year: number
   photo: string
   duration: string
   best_color: string
   is_liked: boolean
   singer: {
      id: number
      name: string
      photo: string
   }
   songs: SongType[]
}

type SmallAlbumType = {
   id: number
   name: string
   year: number
   photo: string | null
}