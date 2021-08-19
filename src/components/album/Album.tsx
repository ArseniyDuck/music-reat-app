import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
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
            {/* <section className={s.header} style={{background: `linear-gradient(transparent 0, rgba(0,0,0,.5) 100%), ${rgbColor}`}}>
               <div className={s.albumImage + ' ibg'}>
                  { albumData.photo && <img src={albumData.photo} alt='album' /> }
               </div>
               <div className={s.albumData}>
                  <p className={s.albumText}>Album</p>
                  <h1 className={s.albumName}>{albumData.name}</h1>
                  <div className={s.metadata}>
                     <Link to={`/singer/${albumData.singer.id}`} className={s.linkToSinger}>
                        <div className={s.singerPhoto + ' ibg'}>
                           { albumData.singer.photo && <img src={albumData.singer.photo} alt='singer' /> }
                        </div>
                        <span className={s.singerName}>{albumData.singer.name}</span>
                     </Link>
                     <p>{albumData.year}</p>
                     <p>{albumData.songs.length} songs</p>
                     <p>{albumData.duration}</p>
                  </div>
               </div>
            </section> */}
            <Banner 
               name={albumData.name}
               songsCount={albumData.songs.length}
               year={albumData.year}
               duration={albumData.duration}
               photo={albumData.photo}
               rgbColor={albumData.best_color}
               bannerPreHeading='Album'
               linkUrl={`/singer/${albumData.singer.id}`}
               linkPhoto={albumData.singer.photo}
               linkText={albumData.singer.name}
            />
            <div className={s.content}>
               <div className={s.gradientBackground} style={{background: `linear-gradient(rgba(0,0,0,.65) 0, #222 100%), ${albumData.best_color}`}}></div>
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
            </div>
         </>
      }
   </>;
};

export default Album;