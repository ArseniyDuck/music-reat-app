import React from 'react';
import { Route, Switch } from 'react-router-dom';
import s from './App.module.scss';
import Album from '../../pages/album/Album';
import Avatar from '../avatar/Avatar';
import Aside from '../aside/Aside';
import Playlist from '../../pages/playlist/Playlist';
import MobileBottom from '../mobile-bottom/MobileBottom';
import MediaQuery from '../common/media-query/MediaQuery';


const App = () => {
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
            </Switch>
         </main>
         <MediaQuery mode='max-width' width='lg'>
            <MobileBottom />
         </MediaQuery>
      </div>
   </>;
};

export default App;