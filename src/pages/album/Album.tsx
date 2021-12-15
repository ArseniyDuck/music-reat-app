import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useBannerHeight } from 'tools/hooks';
import { clearAlbum, fetchAlbumById, toggleAlbumLikeById } from 'redux/album-reducer';
import s from './Album.module.scss';
import { Spinner, PlayPauseButton, Heart } from 'icons';
import Song from 'components/song/Song';
import Banner from 'components/banner/Banner';
import GradientContent from 'components/gradient-content/GradientContent';
import StickyTableHead from 'components/sticky-table-head/StickyTableHead';
import SongsContainerHeader from 'components/songs-container-header/SongsContainerHeader';
import { AuthRequired } from 'components/common';


type PathParamsType = { albumId: string };

const Album: React.FC<RouteComponentProps<PathParamsType>> = ({ match: {params: {albumId}} }) => {
   const dispatch = useAppDispatch();
   const isFetching = useAppSelector(state => state.album.isFetching);
   const error = useAppSelector(state => state.album.error);
   const albumData = useAppSelector(state => state.album.data);
   const songs = useAppSelector(state => state.songs.songs);

   // value needed for calculatings in GradientHeader
   const [bannerRef, bannerHeight, setBannerHeight] = useBannerHeight<HTMLElement>();

   useEffect(() => {
      dispatch(fetchAlbumById(Number(albumId)));

      return () => {
         dispatch(clearAlbum());
      }
   }, [dispatch, albumId]);

   return <>
      {isFetching ? 
         // if fetching data, show spinner
         <div className={s.spinnerBody}>
            <Spinner size={45} />
         </div>
         :
         // if fetched, but with an error, show error
         error ?
         <h1 className='error'>{error}</h1>
         :
         // else show content
         albumData && <>
            <SongsContainerHeader
               color={albumData.best_color}
               title={albumData.name}
               bannerHeight={bannerHeight}
            />
            <Banner 
               bannerRef={bannerRef}
               setBannerHeight={setBannerHeight}
               name={albumData.name}
               songsCount={songs.length}
               year={albumData.year}
               duration={albumData.duration}
               photo={albumData.photo}
               color={albumData.best_color}
               subTitle='Album'
               linkUrl={`/singer/${albumData.singer.id}`}
               linkPhoto={albumData.singer.photo}
               linkText={albumData.singer.name}
            />
            <GradientContent color={albumData.best_color}>
               <div className='buttonsContainer'>
                  <PlayPauseButton size={55} />
                  <AuthRequired>
                     <button onClick={() => dispatch(toggleAlbumLikeById(albumData.id))} className={s.albumLikeButton}>
                        <Heart isLiked={albumData.is_liked} size={30} color='pink' />
                     </button>
                  </AuthRequired>
               </div>
               <StickyTableHead>
                  <ul className={s.tableHeader}>
                     <li>#</li>
                     <li>Title</li>
                     <li>Time</li>
                  </ul>
               </StickyTableHead>
               <div className='songsContainer'>
                  {songs.map((song, index) =>
                     <Song
                        key={song.id}
                        id={song.id}
                        index={{
                           number: index + 1,
                           hideIndex: false,
                        }}
                        photo={{
                           path: albumData.photo,
                           isShownOnDesktop: false,
                        }}
                        name={song.name}
                        singer={{
                           id: albumData.singer.id,
                           name: albumData.singer.name
                        }}
                        album={{
                           id: albumData.id
                        }}
                        isLiked={song.is_liked}
                        duration={song.duration}
                        audio={song.audio}
                        songActions={{
                           addSongToPlaylist: true,
                           toggleSongLike: true,
                        }}
                     />
                  )}
               </div>
            </GradientContent>
         </>
      }
   </>;
};

export default Album;