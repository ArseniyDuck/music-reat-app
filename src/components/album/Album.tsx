import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import { fetchAlbumById, likeAlbumById, likeSongById } from '../../redux/album-reducer';
import s from './Album.module.scss';
import Spinner from '../common/spinner/Spinner';
import Song from '../song/Song';
import Heart from '../common/heart/Heart';
import PlayPauseButton from '../common/play-pause/PlayPauseButton';
import Sticky from '../common/sticky/Sticky';
import AlbumHeader from '../album-header/AlbumHeader';
import Banner from '../banner/Banner';
import GradientBackground from '../common/gradient-background/GradientBackground';


type PathParamsType = { albumId: string };

type PropsType = {};

const Album: React.FC<PropsType & RouteComponentProps<PathParamsType>> = ({ match: {params: {albumId}} }) => {
   const dispatch = useAppDispatch();
   const isFetching = useAppSelector(state => state.album.isFetching);
   const error = useAppSelector(state => state.album.error);
   const albumData = useAppSelector(state => state.album.data);

   useEffect(() => {
      dispatch(fetchAlbumById(Number(albumId)));
   }, [dispatch, albumId]);

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
         albumData && <>
            {/* reduce calling useAppSelector hook */}
            {/* todo: create more components */}
            <AlbumHeader rgbColorString={albumData.best_color} albumName={albumData.name} />
            <Banner 
               name={albumData.name}
               songsCount={albumData.songs.length}
               year={albumData.year}
               duration={albumData.duration}
               photo={albumData.photo}
               rgbColor={albumData.best_color}
               subTitle='Album'
               linkUrl={`/singer/${albumData.singer.id}`}
               linkPhoto={albumData.singer.photo}
               linkText={albumData.singer.name}
            />
            <GradientBackground rgbColor={albumData.best_color}>
               <div className={s.albumButtonsWrapper}>
                  {/* <button className={s.mixSongsButton}>MIX SONGS</button> */}
                  <PlayPauseButton size={55} />
                  <button className={s.albumLikeButton} onClick={() => dispatch(likeAlbumById(albumData.id))}>
                     <Heart isLiked={albumData.is_liked} size={30} color='pink' />
                  </button>
               </div>
               <Sticky defaultWrapperClasses={s.tableHeaderWrapper} stuckClasses={s.stuck}>
                  <div className={s.tableHeader}>
                     <p>#</p>
                     <p>Title</p>
                     <p>Time</p>
                  </div>
               </Sticky>
               <div className={s.songsContainer}>
                  {albumData.songs.map((song, index) =>
                     <Song key={song.id}
                        index={index + 1}
                        albumId={albumData.id}
                        singerId={albumData.singer.id}
                        singerName={albumData.singer.name}
                        // reduce calling useAppDisptach hook
                        toggleIsLiked={() => dispatch(likeSongById(song.id))}
                        {...song}
                     />
                  )}
               </div>
            </GradientBackground>
         </>
      }
   </>;
};

export default Album;