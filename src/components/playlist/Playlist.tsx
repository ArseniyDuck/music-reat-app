import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { fetchPlaylistById, removeSongFromPlaylist } from '../../redux/playlists-reducer';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import Banner from '../banner/Banner';
import GradientContent from '../gradient-content/GradientContent';
import Spinner from '../common/spinner/Spinner';
import Song from '../song/Song';
import s from './Playlist.module.scss';
import StickyTableHead from '../sticky-table-head/StickyTableHead';
import GradientHeader from '../gradient-header/GradientHeader';
import PlayPauseButton from '../common/play-pause/PlayPauseButton';
import { PlaylistSongType } from '../../types/data-structures';


type PathParamsType = { playlistId: string };

type PropsType = {};

const Playlist: React.FC<PropsType & RouteComponentProps<PathParamsType>> = ({ match: {params: {playlistId}} }) => {
   const dispatch = useAppDispatch();
   const playlistData = useAppSelector(state => state.playlists.playlist);
   const isFetching = useAppSelector(state => state.playlists.isFetching);
   const error = useAppSelector(state => state.playlists.error);

   useEffect(() => {
      dispatch(fetchPlaylistById(Number(playlistId)))
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
            <Spinner />
         </div>
         :
         // if fetched, but with an error, show error
         error ?
         <h1 className={s.error}>{error}</h1>
         :
         // else show content
         playlistData && <>
            <GradientHeader rgbColor={getRgbColor(playlistData.songs)} title={playlistData.name} />
            <Banner
               name={playlistData.name}
               songsCount={playlistData.songs.length}
               duration={playlistData.duration}
               photo={playlistData.songs.length ? playlistData.songs[0].album.photo : ''}
               rgbColor={getRgbColor(playlistData.songs)}
               subTitle='Playlist'
               linkUrl='/profile'
               linkText={playlistData.user}
            />
            <GradientContent rgbColor={getRgbColor(playlistData.songs)}>
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
               <div className='songsContainer'>
                  {playlistData.songs.map((song, index) =>
                     <Song key={song.id}
                        index={index + 1}
                        albumId={song.album.id}
                        singerId={song.singer.id}
                        singerName={song.singer.name}
                        photo={song.album.photo}
                        albumName={song.album.name}
                        removeSong={removeSong}
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