import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Switch, Route, Redirect, Link, NavLink } from 'react-router-dom';
import MediaQuery from '../../components/common/media-query/MediaQuery';
import TransitionSkeleton from '../../components/common/transition-skeleton/TransitionSkeleton';
import GradientHeader from '../../components/gradient-header/GradientHeader';
import { fetchSmallAlbums } from '../../redux/album-reducer';
import { getArrayOfComponents } from '../../tools/functions';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import s from './MySongs.module.scss';

type PropsType = {};

const MySongs: React.FC<PropsType> = (props) => {
   // todo: rename "rgbColor" to "color"
   const location = useLocation();

   return <>
      {location.pathname === '/my-songs' && <MediaQuery mode='min-width' width='lg'>
         <Redirect to='/my-songs/playlists' />
      </MediaQuery>}
      <div className={s.wrapper}>
         <div className={s.tabs}>
            <GradientHeader rgbColor='#222' startFinish={[0, 50]}>
               <div className={s.headerData}>
                  <NavLink to='/my-songs/playlists' className={s.tab} activeClassName={s.active}>Playlists</NavLink>
                  <NavLink to='/my-songs/albums' className={s.tab} activeClassName={s.active}>Albums</NavLink>
                  <NavLink to='/my-songs/singers' className={s.tab} activeClassName={s.active}>Singers</NavLink>
               </div>
            </GradientHeader>
         </div>
         <div className={s.content}>
            <Switch>
               <Route exact path='/my-songs/playlists' component={Playlists} />
               <Route exact path='/my-songs/albums' component={Albums} />
               <Route exact path='/my-songs/singers' component={() => <h1>Singers</h1>} />
            </Switch>
         </div>
      </div>
   </>;
};

const Playlists = () => {
   const { isFetching, playlists } = useAppSelector(state => state.playlists.smallPlaylists);
   
   return <>
      <h1 className={s.heading}>Playlists</h1>
      <div className={s.grid}>
         { isFetching ? getArrayOfComponents(CardSkeleton, 20) :
            playlists.map(({ id, name, songs_count, photo }) => (
               <Card
                  key={id}
                  linkTo={`/playlist/${id}`}
                  image={photo && `http://localhost:8000${photo}`}
                  title={name}
                  songsCount={songs_count}   
               />
            ))
         }
      </div>
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
         { isFetching ? getArrayOfComponents(CardSkeleton, 10) :
            albums.map(({ id, name, songs_count, photo }) => (
               <Card key={id} linkTo={`/album/${id}`} image={photo} title={name} songsCount={songs_count} />
            ))
         }
      </div>
   </>;
}

type CardPropsType = { linkTo: string, image: string | null, title: string, songsCount: number }
const Card: React.FC<CardPropsType> = (props) => {
   // todo: don't use template string here: `http://localhost:8000${props.image}`
   return (
      <Link to={props.linkTo} className={s.card}>
         <div className={`${s.cardBody} cropTextContainer`}>
            <div className={`${s.cardImage} ibg`}>
               { props.image && <img src={props.image} alt='album' /> }
            </div>
            <p className={`${s.cardTitle} ellipseOverflow`}>{props.title}</p>
            <p className={s.cardSubTitle}>{props.songsCount ? `${props.songsCount} songs` : 'Empty'}</p>
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

export default MySongs;