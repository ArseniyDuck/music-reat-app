import Banner from 'components/banner/Banner';
import GradientContent from 'components/gradient-content/GradientContent';
import Song from 'components/song/Song';
import SongsContainerHeader from 'components/songs-container-header/SongsContainerHeader';
import StickyTableHead from 'components/sticky-table-head/StickyTableHead';
import { PlayPauseButton, Spinner } from 'icons';
import MySongsBackground from 'components/my-songs-background/MySongsBackground';
import React, { useEffect } from 'react';
import { fetchLikedSongs } from 'redux/liked-songs-reducer';
import { useAppDispatch, useAppSelector, useBannerHeight } from 'tools/hooks';
import s from './LikedSongs.module.scss';

type PropsType = {};

const LikedSongs: React.FC<PropsType> = (props) => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchLikedSongs());
   }, [dispatch]);

   const { username, duration } = useAppSelector(state => state.likedSongs);
   const songsData = useAppSelector(state => state.songs);
   const songs = (songsData.containerType === 'playlist' ? songsData.songs : []) as Array<PlaylistSongType>;
   const isFetching = useAppSelector(state => state.likedSongs.isFetching);
   const error = useAppSelector(state => state.likedSongs.error);

   // value needed for calculatings in GradientHeader
   const [bannerRef, bannerHeight, setBannerHeight] = useBannerHeight<HTMLElement>();

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
         <>
            <SongsContainerHeader color={'#333'} title='Liked Songs' bannerHeight={bannerHeight} />
            <Banner
               bannerRef={bannerRef}
               setBannerHeight={setBannerHeight}
               name='Liked Songs'
               songsCount={songs.length}
               duration={duration}
               photoComponent={MySongsBackground}
               color='#333'
               subTitle='Playlist'
               linkUrl='/profile'
               linkText={username}
            />
            <GradientContent color='#333'>
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
                           removeSongFromLiked: true,
                        }}
                     />
                  )}
               </div>
            </GradientContent>
         </>
      }
   </>;
};

export default LikedSongs;