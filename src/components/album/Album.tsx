import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import { fetchAlbumById, likeAlbumById } from '../../redux/album-reducer';
import s from './Album.module.scss';
import Spinner from '../common/spinner/Spinner';
import Song from '../song/Song';
import Heart from '../common/heart/Heart';
import PlayPauseButton from '../common/play-pause/PlayPauseButton';
import GradientHeader from '../gradient-header/GradientHeader';
import Banner from '../banner/Banner';
import GradientContent from '../gradient-content/GradientContent';
import StickyTableHead from '../sticky-table-head/StickyTableHead';


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
            <GradientHeader rgbColor={albumData.best_color} title={albumData.name} />
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
            <GradientContent rgbColor={albumData.best_color}>
               <div className='buttonsContainer'>
                  {/* todo: <button className={s.mixSongsButton}>MIX SONGS</button> */}
                  <PlayPauseButton size={55} />
                  <button onClick={() => dispatch(likeAlbumById(albumData.id))} className={s.albumLikeButton}>
                     <Heart isLiked={albumData.is_liked} size={30} color='pink' />
                  </button>
               </div>
               <StickyTableHead>
                  <ul className={s.tableHeader}>
                     <li>#</li>
                     <li>Title</li>
                     <li>Time</li>
                  </ul>
               </StickyTableHead>
               <div className='songsContainer'>
                  {albumData.songs.map((song, index) =>
                     <Song
                        key={song.id}
                        index={index + 1}
                        albumId={albumData.id}
                        singerId={albumData.singer.id}
                        singerName={albumData.singer.name}
                        {...song}
                     />
                  )}
               </div>
            </GradientContent>
         </>
      }
   </>;
};

export default Album;