import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useBannerHeight } from 'hooks';
import { clearAlbum, fetchAlbum, switchAlbumLike } from 'redux/album-reducer';
import { PlayPauseButton, Heart } from 'icons';
import Song from 'components/song/Song';
import CollectionsBanner from 'components/collections-banner/CollectionsBanner';
import GradientContent from 'components/gradient-content/GradientContent';
import StickyTableHead from 'components/sticky-table-head/StickyTableHead';
import SongsContainerHeader from 'components/songs-container-header/SongsContainerHeader';
import { AuthRequired } from 'components/common';
import WindowLoader from 'components/common/window-loader/WindowLoader';
import { withMobilePlaylists } from 'high-order-components';
import ButtonsContainer from 'components/buttons-container/ButtonsContainer';


type PathParamsType = { albumId: string };

const Album: React.FC<RouteComponentProps<PathParamsType>> = ({ match: {params: {albumId}} }) => {
   const dispatch = useAppDispatch();
   const isFetching = useAppSelector(state => state.album.isFetching);
   const error = useAppSelector(state => state.album.error);
   const albumData = useAppSelector(state => state.album.data);
   const songs = useAppSelector(state => state.songs.songs);

   // value needed for calculatings in GradientHeader
   const [bannerRef, bannerHeight, setBannerHeight] = useBannerHeight<HTMLDivElement>();

   useEffect(() => {
      dispatch(fetchAlbum(Number(albumId)));

      return () => {
         dispatch(clearAlbum());
      }
   }, [dispatch, albumId]);

   return (
      <WindowLoader isFetching={isFetching} error={error}>
         {albumData && <>
            <SongsContainerHeader
               color={albumData.best_color}
               title={albumData.name}
               bannerHeight={bannerHeight}
            />
            <CollectionsBanner 
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
               <ButtonsContainer>
                  <PlayPauseButton size={55} />
                  <AuthRequired>
                     <button onClick={() => dispatch(switchAlbumLike(albumData.id))} style={{display: 'contents'}}>
                        <Heart isLiked={albumData.is_liked} size={30} color='pink' />
                     </button>
                  </AuthRequired>
               </ButtonsContainer>
               <StickyTableHead index title time hideIndex={false} />
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
                           addSongInPlaylist: true,
                           toggleSongLike: true,
                        }}
                     />
                  )}
               </div>
            </GradientContent>
         </>}
      </WindowLoader>
   );
};

export default withMobilePlaylists(Album);