import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { fetchPlaylistById, PlaylistSongType } from '../../redux/playlists-reducer';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import Banner from '../banner/Banner';
import GradientBackground from '../common/gradient-background/GradientBackground';
import Spinner from '../common/spinner/Spinner';
import s from './Playlist.module.scss';


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
         <h1 className={s.red}>{error}</h1>
         :
         // else show content
         playlistData && <>
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
            <GradientBackground rgbColor={getRgbColor(playlistData.songs)}>

            </GradientBackground>
         </>
      }
   </>;
};

export default Playlist;