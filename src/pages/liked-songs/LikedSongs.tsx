import React, { useEffect } from 'react';
import CollectionsBanner from 'components/collections-banner/CollectionsBanner';
import GradientContent from 'components/gradient-content/GradientContent';
import Song from 'components/song/Song';
import SongsContainerHeader from 'components/songs-container-header/SongsContainerHeader';
import StickyTableHead from 'components/sticky-table-head/StickyTableHead';
import { PlayPauseButton } from 'icons';
import MySongsBackground from 'components/my-songs-background/MySongsBackground';
import { clearLikedSongs, fetchLikedSongs } from 'redux/liked-songs-reducer';
import { useAppDispatch, useAppSelector, useBannerHeight } from 'hooks';
import WindowLoader from 'components/common/window-loader/WindowLoader';
import { withMobilePlaylists } from 'high-order-components';
import ButtonsContainer from 'components/buttons-container/ButtonsContainer';
import { clearSongs } from 'redux/songs-reducer';

type PropsType = {};

const LikedSongs: React.FC<PropsType> = (props) => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchLikedSongs());

      return () => {
         dispatch(clearLikedSongs());
         dispatch(clearSongs());
      }
   }, [dispatch]);

   const { username, duration } = useAppSelector(state => state.likedSongs);
   const songsData = useAppSelector(state => state.songs);
   const songs = songsData.songs as PlaylistSongType[];
   const isFetching = useAppSelector(state => state.likedSongs.isFetching);
   const error = useAppSelector(state => state.likedSongs.error);

   // value needed for calculatings in GradientHeader
   const [bannerRef, bannerHeight, setBannerHeight] = useBannerHeight<HTMLDivElement>();

   return (
      <WindowLoader isFetching={isFetching} error={error}>
         {(username && duration) && <>
            <SongsContainerHeader color={'#333'} title='Liked Songs' bannerHeight={bannerHeight} />
            <CollectionsBanner
               bannerRef={bannerRef}
               setBannerHeight={setBannerHeight}
               name='Liked Songs'
               songsCount={songs.length}
               duration={duration}
               photo={MySongsBackground}
               color='#333'
               subTitle='Playlist'
               linkUrl='/profile'
               linkText={username}
            />
            <GradientContent color='#333'>
               {songs.length > 0 && <>
                  <ButtonsContainer>
                     <PlayPauseButton size={55} />
                  </ButtonsContainer>
                  <StickyTableHead index title album time />
               </>}
               <div className='songsContainer'>
                  {songs.map((song, index) =>
                     <Song
                        key={song.id}
                        id={song.id}
                        index={{
                           number: index + 1
                        }}
                        photo={{
                           path: song.album.photo,
                           isShownOnDesktop: true,
                        }}
                        name={song.name}
                        singer={{
                           id: song.singer.id,
                           name: song.singer.name
                        }}
                        album={{
                           id: song.album.id,
                           name: song.album.name
                        }}
                        isLiked={song.is_liked}
                        duration={song.duration}
                        audio={song.audio}
                        songActions={{
                           addSongInPlaylist: true,
                           removeSongFromLiked: true,
                        }}
                     />
                  )}
               </div>
            </GradientContent>
         </>}
      </WindowLoader>
   )
};

export default withMobilePlaylists(LikedSongs);