import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { clearPlaylist, fetchPlaylistById } from 'redux/playlists-reducer';
import { useAppDispatch, useAppSelector, useBannerHeight } from 'tools/hooks';
import Banner from 'components/banner/Banner';
import GradientContent from 'components/gradient-content/GradientContent';
import { Spinner, PlayPauseButton } from 'icons';
import Song from 'components/song/Song';
import s from './Playlist.module.scss';
import StickyTableHead from 'components/sticky-table-head/StickyTableHead';
import SongsContainerHeader from 'components/songs-container-header/SongsContainerHeader';


type PathParamsType = { playlistId: string };

type PropsType = {};

const Playlist: React.FC<PropsType & RouteComponentProps<PathParamsType>> = ({ match: {params: {playlistId}} }) => {
   const dispatch = useAppDispatch();
   const playlistData = useAppSelector(state => state.playlists.playlist);
   const songsData = useAppSelector(state => state.songs);
   const songs = (songsData.containerType === 'playlist' ? songsData.songs : []) as Array<PlaylistSongType>;
   const isFetching = useAppSelector(state => state.playlists.isFetching);
   const error = useAppSelector(state => state.playlists.error);

   // value needed for calculatings in GradientHeader
   const [bannerRef, bannerHeight, setBannerHeight] = useBannerHeight<HTMLElement>();

   useEffect(() => {
      dispatch(fetchPlaylistById(Number(playlistId)));

      return () => {
         dispatch(clearPlaylist());
      }
   }, [dispatch, playlistId]);


   const getColor = (songs: Array<PlaylistSongType>) => {
      return songs.length ? songs[0].album.best_color : 'rgb(100, 100, 100)';
   };

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
         playlistData && <>
            <SongsContainerHeader color={getColor(songs)} title={playlistData.name} bannerHeight={bannerHeight} />
            <Banner
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
                           addSongToPlaylist: true,
                           removeSongFromPlaylist: {playlistId: playlistData.id},
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

export default Playlist;