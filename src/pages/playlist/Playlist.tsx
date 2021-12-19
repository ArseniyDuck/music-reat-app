import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { clearPlaylist, fetchPlaylist } from 'redux/playlists-reducer';
import { useAppDispatch, useAppSelector, useBannerHeight } from 'hooks';
import CollectionsBanner from 'components/collections-banner/CollectionsBanner';
import GradientContent from 'components/gradient-content/GradientContent';
import { PlayPauseButton } from 'icons';
import Song from 'components/song/Song';
import StickyTableHead from 'components/sticky-table-head/StickyTableHead';
import SongsContainerHeader from 'components/songs-container-header/SongsContainerHeader';
import WindowLoader from 'components/common/window-loader/WindowLoader';
import { withMobilePlaylists } from 'high-order-components';
import ButtonsContainer from 'components/buttons-container/ButtonsContainer';


type PathParamsType = { playlistId: string };

type PropsType = {};

const Playlist: React.FC<PropsType & RouteComponentProps<PathParamsType>> = ({ match: {params: {playlistId}} }) => {
   const dispatch = useAppDispatch();
   const playlistData = useAppSelector(state => state.playlists.playlist);
   const songsData = useAppSelector(state => state.songs);
   const songs = songsData.songs as PlaylistSongType[];
   const isFetching = useAppSelector(state => state.playlists.isFetching);
   const error = useAppSelector(state => state.playlists.error);

   // value needed for calculatings in GradientHeader
   const [bannerRef, bannerHeight, setBannerHeight] = useBannerHeight<HTMLDivElement>();

   useEffect(() => {
      dispatch(fetchPlaylist(Number(playlistId)));

      return () => {
         dispatch(clearPlaylist());
      }
   }, [dispatch, playlistId]);


   const getColor = (songs: PlaylistSongType[]) => {
      return songs.length ? songs[0].album.best_color : 'rgb(100, 100, 100)';
   };

   return (
      <WindowLoader isFetching={isFetching} error={error}>
         {playlistData && <>
            <SongsContainerHeader color={getColor(songs)} title={playlistData.name} bannerHeight={bannerHeight} />
            <CollectionsBanner
               bannerRef={bannerRef}
               setBannerHeight={setBannerHeight}
               name={playlistData.name}
               songsCount={songs.length}
               duration={playlistData.duration}
               photo={songs.length ? songs[0].album.photo : ''}
               color={getColor(songs)}
               subTitle='Playlist'
               linkUrl='/profile'
               linkText={playlistData.user}
            />
            <GradientContent color={getColor(songs)}>
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
                           removeSongFromPlaylist: {playlistId: playlistData.id},
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

export default withMobilePlaylists(Playlist);