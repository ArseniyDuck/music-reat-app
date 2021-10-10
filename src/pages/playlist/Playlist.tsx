import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { fetchPlaylistById } from '../../redux/playlists-reducer';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import Banner from '../../components/banner/Banner';
import GradientContent from '../../components/gradient-content/GradientContent';
import Spinner from '../../components/icons/spinner/Spinner';
import Song from '../../components/song/Song';
import s from './Playlist.module.scss';
import StickyTableHead from '../../components/sticky-table-head/StickyTableHead';
import GradientHeader from '../../components/gradient-header/GradientHeader';
import PlayPauseButton from '../../components/icons/play-pause/PlayPauseButton';
import { PlaylistSongType } from '../../types/data-structures';
import { removeSongFromPlaylist } from '../../redux/songs-reducer';


type PathParamsType = { playlistId: string };

type PropsType = {};

const Playlist: React.FC<PropsType & RouteComponentProps<PathParamsType>> = ({ match: {params: {playlistId}} }) => {
   const dispatch = useAppDispatch();
   const playlistData = useAppSelector(state => state.playlists.playlist);

   const songsData = useAppSelector(state => state.songs);
   const songs = (songsData.containerType === 'playlist' ? songsData.songs : []) as Array<PlaylistSongType>;

   const isFetching = useAppSelector(state => state.playlists.isFetching);
   const error = useAppSelector(state => state.playlists.error);

   useEffect(() => {
      dispatch(fetchPlaylistById(Number(playlistId)));
      
   }, [dispatch, playlistId]);


   const getRgbColor = (songs: Array<PlaylistSongType>) => {
      return songs.length ? songs[0].album.best_color : 'rgb(100, 100, 100)';
   };

   const removeSong = (songId: number) => {
      dispatch(removeSongFromPlaylist({ songId, playlistId: Number(playlistId) }));
   };
   
   // todo: reduce jsx copy-paste here and in Album
   return <>
      {isFetching ? 
         // if fetching data, show spinner
         <div className={s.spinnerBody}>
            <Spinner size={45} />
         </div>
         :
         // if fetched, but with an error, show error
         error ?
         <h1 className={s.error}>{error}</h1>
         :
         // else show content
         playlistData && <>
            <GradientHeader rgbColor={getRgbColor(songs)} title={playlistData.name} />
            <Banner
               name={playlistData.name}
               songsCount={songs.length}
               duration={playlistData.duration}
               photo={songs.length ? songs[0].album.photo : ''}
               rgbColor={getRgbColor(songs)}
               subTitle='Playlist'
               linkUrl='/profile'
               linkText={playlistData.user}
            />
            <GradientContent rgbColor={getRgbColor(songs)}>
               {songs.length > 0 && <>
                  <div className='buttonsContainer'>
                     <PlayPauseButton size={55} />
                  </div>
                  <StickyTableHead>
                     <ul className={s.tableHeader}>
                        <li>#</li>
                        <li>Title</li>
                        <li>Album</li>
                        <li>Time</li>
                     </ul>
                  </StickyTableHead>
               </>}
               <div className='songsContainer'>
                  {songs.map((song, index) =>
                     <Song key={song.id}
                        index={index + 1}
                        albumId={song.album.id}
                        singerId={song.singer.id}
                        singerName={song.singer.name}
                        photo={song.album.photo}
                        albumName={song.album.name}
                        removeSong={removeSong}
                        isInPlaylist={true}
                        {...song}
                     />
                  )}
               </div>
            </GradientContent>
         </>
      }
   </>;
};

export default Playlist;