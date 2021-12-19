import React, { useEffect, useState } from 'react';
import { RouteLinks } from 'app-routing';
import GradientContent from 'components/gradient-content/GradientContent';
import Song from 'components/song/Song';
import SongsContainerHeader from 'components/songs-container-header/SongsContainerHeader';
import { PlayPauseButton } from 'icons';
import { RouteComponentProps } from 'react-router-dom';
import { clearSinger, fetchSinger, switchSingerLike } from 'redux/singer-reducer';
import { conditionClassName } from 'tools/functions';
import { useAppDispatch, useAppSelector, useBannerHeight } from 'hooks';
import s from './Singer.module.scss';
import Card, { CardsContainer } from 'components/cards/Cards';
import SingerBanner from 'components/singer-banner/SingerBanner';
import WindowLoader from 'components/common/window-loader/WindowLoader';
import { withMobilePlaylists } from 'high-order-components';
import ButtonsContainer from 'components/buttons-container/ButtonsContainer';
import { AuthRequired } from 'components/common';

type PathParamsType = { singerId: string };

type PropsType = {};

const Singer: React.FC<PropsType & RouteComponentProps<PathParamsType>> = ({ match: {params: {singerId}} }) => {
   const dispatch = useAppDispatch();
   const { data: singerData, isFetching, error } = useAppSelector(state => state.singer);
   const songsData = useAppSelector(state => state.songs);
   const songs = songsData.songs as PlaylistSongType[];

   const [isSeeMore, setIsSeeMore] = useState(false);

   // value needed for calculatings in GradientHeader
   const [bannerRef, bannerHeight, setBannerHeight] = useBannerHeight<HTMLDivElement>();

   useEffect(() => {
      dispatch(fetchSinger(Number(singerId)));
      
      return () => {
         dispatch(clearSinger());
      }
   }, [dispatch, singerId]);

   return (
      <WindowLoader isFetching={isFetching} error={error}>
         {singerData && <>
            <SongsContainerHeader
               color={singerData.best_color}
               title={singerData.name}
               bannerHeight={bannerHeight}
            />
            <SingerBanner
               bannerRef={bannerRef}
               setBannerHeight={setBannerHeight}
               title={singerData.name}
               photo={singerData.photo}
               genres={singerData.genres}
               likesCount={singerData.likes_count}
               color={singerData.best_color}
            />
            <GradientContent color={singerData.best_color}>
               <ButtonsContainer>
                  <PlayPauseButton size={55} />
                  <AuthRequired>
                     <button
                        onClick={() => dispatch(switchSingerLike(singerData.id))}
                        className={conditionClassName(s.follow, singerData.is_liked, s.followed)}
                     >
                        {singerData.is_liked ? 'Following' : 'Follow'}
                     </button>
                  </AuthRequired>
               </ButtonsContainer>
               <h3 className={s.subHeading}>Popular</h3>
               <div className='songsContainer'>
                  {songs.slice(0, isSeeMore ? 10 : 5).map((song, index) =>
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
                           name: song.singer.name,
                           showName: false
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
                           toggleSongLike: true,
                        }}
                     />
                  )}
                  <button className={s.more} onClick={() => setIsSeeMore(prev => !prev)}>
                     {isSeeMore ? 'See less' : 'See more'}
                  </button>
               </div>
               <div className={s.section}>
                  <h3 className={s.subHeading}>Albums</h3>
                  <CardsContainer>
                     {singerData.albums.map(album => (
                        <Card
                           key={album.id}
                           title={album.name}
                           subTitle={String(album.year)}
                           image={album.photo}
                           linkTo={`${RouteLinks.ALBUM}/${album.id}`}
                        />
                     ))}
                  </CardsContainer>
               </div>
            </GradientContent>
         </>}
      </WindowLoader>
   );
};

export default withMobilePlaylists(Singer);