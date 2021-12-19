type PlaylistType = {
   id: number
   name: string
   duration: string
   user: string
   songs: PlaylistSongType[]
};

type PlaylistSongType = SongType & {
   album: {
      id: number
      name: string
      photo: string
      best_color: string
   }
   singer: {
      id: number
      name: string
   }
};

type SmallPlaylistType = {
   id: number
   name: string
   songs_count: number
   photo: string | null
};