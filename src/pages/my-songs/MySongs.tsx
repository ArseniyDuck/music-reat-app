import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Switch, Route, Redirect, Link, NavLink } from 'react-router-dom';
import MediaQuery from '../../components/common/media-query/MediaQuery';
import TransitionSkeleton from '../../components/common/transition-skeleton/TransitionSkeleton';
import GradientHeader from '../../components/gradient-header/GradientHeader';
import Plus from '../../components/icons/plus/Plus';
import PlaylistCreationPopUp from '../../components/PlaylistCreationPopUp/PlaylistCreationPopUp';
import { fetchSmallAlbums } from '../../redux/album-reducer';
import { getArrayOfComponents } from '../../tools/functions';
import { useAppDispatch, useAppSelector, usePopUp } from '../../tools/hooks';
import s from './MySongs.module.scss';
import { createPlaylist } from '../../redux/playlists-reducer';
import Music from '../../components/icons/music/Mucis';
import MobileMySongs from './MobileMySongs/MobileMySongs';


type PropsType = {};

const MySongs: React.FC<PropsType> = (props) => {
   // todo: rename "rgbColor" to "color"
   return <>
      <MediaQuery mode='min-width' width='sm'>
         <OnExactPage isOnPage={true} page='/my-songs'>
            <Redirect to='/my-songs/playlists' />
         </OnExactPage>
      </MediaQuery>
      <div className={s.wrapper}>
         <MediaQuery mode='min-width' width='sm'>
            <OnExactPage isOnPage={false} page='/my-songs'>
               <div className={s.tabs}>
                  <GradientHeader rgbColor='#222' startFinish={[0, 50]}>
                     <div className={s.headerData}>
                        <NavLink to='/my-songs/playlists' className={s.tab} activeClassName={s.active}>Playlists</NavLink>
                        <NavLink to='/my-songs/albums' className={s.tab} activeClassName={s.active}>Albums</NavLink>
                        <NavLink to='/my-songs/singers' className={s.tab} activeClassName={s.active}>Singers</NavLink>
                     </div>
                  </GradientHeader>
               </div>
            </OnExactPage>
         </MediaQuery>
         <div className={s.content}>
            <Switch>
               <Route exact path='/my-songs' component={MobileMySongs} />
               <Route exact path='/my-songs/playlists' component={Playlists} />
               <Route exact path='/my-songs/albums' component={Albums} />
               <Route exact path='/my-songs/singers' component={() => <h1>Singers</h1>} />
            </Switch>
         </div>
      </div>
   </>;
};

const OnExactPage: React.FC<{ isOnPage: boolean, page: string }> = (props) => {
   const location = useLocation();

   let locationCondition;
   if (props.isOnPage) {
      locationCondition = (location.pathname === props.page)
   } else {
      locationCondition = (location.pathname !== props.page)  
   }
   
   return <>{locationCondition && props.children}</>;
}

const Playlists = () => {
   const [isCreationOpened, setIsCreationOpened, creationBodyRef] = usePopUp<HTMLDivElement>();
   const { isFetching, playlists } = useAppSelector(state => state.playlists.smallPlaylists);
   const dispatch = useAppDispatch();

   const hadleCreationButtonClick = () => {
      setIsCreationOpened(true);
   };

   const createPlaylistAfterSubmit = (name: string) => {
      dispatch(createPlaylist(name));
   };
   
   return <>
      <h1 className={s.heading}>Playlists</h1>
      <MediaQuery mode='min-width' width='sm'>
         <MediaQuery mode='max-width' width='lg'>
            <OnExactPage isOnPage={false} page='/my-songs'>
               <button style={{ display: 'block' }} onClick={hadleCreationButtonClick}>
                  <Plus
                     size={20} stroke={5}
                     styles={{
                        padding: 8,
                        position: 'fixed',
                        top: 10,
                        right: 25,
                        zIndex: 99,
                        border: '1.5px solid #fff',
                     }}
                  />
               </button>
            </OnExactPage>
         </MediaQuery>
      </MediaQuery>
      <div className={s.grid}>
         { isFetching ?
            <>
               <MediaQuery width='sm' mode='min-width'>{getArrayOfComponents(CardSkeleton, 20)}</MediaQuery>
               <MediaQuery width='sm' mode='max-width'>{getArrayOfComponents(MobileCardSkeleton, 10)}</MediaQuery>
            </>
         :
            playlists.map(({ id, name, songs_count, photo }) => (
               <Card
                  key={id}
                  linkTo={`/playlist/${id}`}
                  // todo: don't use template string here: `http://localhost:8000${props.image}`
                  image={photo && `http://localhost:8000${photo}`}
                  title={name}
                  songsCount={songs_count}   
               />
            ))
         }
      </div>
      <PlaylistCreationPopUp
         heading='Create playlist'
         isOpened={isCreationOpened}
         popUpRef={creationBodyRef}
         close={() => setIsCreationOpened(false)}
         actionAfterSubmit={createPlaylistAfterSubmit}
      />
   </>;
}

const Albums = () => {
   const { isFetching, albums } = useAppSelector(state => state.album.smallAlbums);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchSmallAlbums());
   }, [dispatch]);
   
   return <>
      <h1 className={s.heading}>Albums</h1>
      <div className={s.grid}>
         { isFetching ?
            <>
               <MediaQuery width='sm' mode='min-width'>{getArrayOfComponents(CardSkeleton, 20)}</MediaQuery>
               <MediaQuery width='sm' mode='max-width'>{getArrayOfComponents(MobileCardSkeleton, 10)}</MediaQuery>
            </>
         :
            albums.map(({ id, name, songs_count, photo }) => (
               <Card key={id} linkTo={`/album/${id}`} image={photo} title={name} songsCount={songs_count} />
            ))
         }
      </div>
   </>;
}

type CardPropsType = { linkTo: string, image: string | null, title: string, songsCount: number }
const Card: React.FC<CardPropsType> = (props) => {
   return (
      <Link to={props.linkTo} className={s.card}>
         <div className={`${s.cardBody} cropTextContainer`}>
            <div className={`${s.cardImage} ibg`}>
               { props.image ? <img src={props.image} alt='album' /> :
                  <Music
                     size={50}
                     fillColor='#333'
                     styles={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                     }}
                  />
               }
            </div>
            <div className={s.cardInfo}>
               <p className={`${s.cardTitle} ellipseOverflow`}>{props.title}</p>
               <p className={s.cardSubTitle}>{props.songsCount ? `${props.songsCount} songs` : 'Empty'}</p>
            </div>
         </div>
      </Link>
   );
}

const CardSkeleton = () => {
   return (
      <TransitionSkeleton dark={true} height={'auto'} width={'auto'} styles={{ padding: 12, margin: 0 }}>
         <TransitionSkeleton styles={{ paddingBottom: '100%' }} width={'auto'} height={'auto'} />
         <div className={s.cardTitle}>
            <TransitionSkeleton width={'80%'} height={12} />
         </div>
         <div className={s.cardSubTitle}>
            <TransitionSkeleton width={'35%'} height={8} />
         </div>
      </TransitionSkeleton>
   );
}

const MobileCardSkeleton = () => {
   return (
      <div className={s.cardBody}>
         <div className={s.cardImage}>
            <TransitionSkeleton width={'auto'} height={'auto'} styles={{ paddingBottom: '100%' }} />
         </div>
         <div className={s.cardInfo}>
            <TransitionSkeleton width={'65%'} height={12} />
            <TransitionSkeleton width={'20%'} height={8} />
         </div>
      </div>
   );
}

export default MySongs;