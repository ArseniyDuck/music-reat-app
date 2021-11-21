import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import s from './App.module.scss';
import Album from '../../pages/album/Album';
import Avatar from '../avatar/Avatar';
import Aside from '../aside/Aside';
import Playlist from '../../pages/playlist/Playlist';
import MobileBottom from '../mobile-bottom/MobileBottom';
import MediaQuery from '../common/media-query/MediaQuery';
import { fetchSmallPlaylists } from '../../redux/playlists-reducer';
import { useAppDispatch } from '../../tools/hooks';
import BottomAlert from '../bottom-alert/BottomAlert';
import MySongs from '../../pages/my-songs/MySongs';


const App = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchSmallPlaylists());
   }, [dispatch]);

   return <>
      <div className={s.wrapper}>
         <MediaQuery mode='min-width' width='lg'>
            <Aside />
         </MediaQuery>
         <main className={s.content}>
            <MediaQuery mode='min-width' width='lg'>
               <Avatar />
            </MediaQuery>
            <Switch>
               <Route path='/album/:albumId' component={Album} />
               <Route path='/playlist/:playlistId' component={Playlist} />
               <Route path='/my-songs' component={MySongs} />
            </Switch>
            <BottomAlert />
         </main>
         <MediaQuery mode='max-width' width='lg'>
            <MobileBottom />
         </MediaQuery>
      </div>
   </>;
};

export default App;