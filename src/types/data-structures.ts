// Playlist ---------------------------------------------------------------------
export type SmallPlaylistType = {
   id: number
   name: string
};

export type PlaylistSongType = SongType & {
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


export type PlaylistType = {
   id: number
   name: string
   duration: string
   user: string
   songs: Array<PlaylistSongType>
};


// Album ---------------------------------------------------------------------
export type SongType = {
   id: number
   name: string
   audio: string
   duration: string
   is_liked: boolean
};

export type AlbumType = {
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
   songs: Array<SongType>
};