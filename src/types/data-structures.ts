// Playlist ---------------------------------------------------------------------
export type PlaylistType = {
   id: number
   name: string
   duration: string
   user: string
   songs: Array<PlaylistSongType>
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

export type SmallPlaylistType = {
   id: number
   name: string
   songs_count: number
   photo: string | null
};





// Album ---------------------------------------------------------------------
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
   songs: Array<AlbumSongType>
};

export type AlbumSongType = SongType

export type SongType = {
   id: number
   name: string
   audio: string
   duration: string
   is_liked: boolean
};





// Songs ---------------------------------------------------------------------
export type SongsType = Array<AlbumSongType> | Array<PlaylistSongType>

export type SognsContainerType = 'album' | 'playlist';

export type MobilePullOupSongType = {
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





// Auth ---------------------------------------------------------------------
export type UserType = {
   id: number | null
   username: string
}

export type SignUpUserType = {
   username: string,
   password1: string,
   password2: string
}

export type SignInUserType = {
   username: string
   password: string
}