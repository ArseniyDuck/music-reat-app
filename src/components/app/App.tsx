import React from 'react';
import { Route, Switch } from 'react-router-dom';
import s from './App.module.scss';
import Album from '../../pages/album/Album';
import Avatar from '../avatar/Avatar';
import Aside from '../aside/Aside';
import Playlist from '../../pages/playlist/Playlist';

const App = () => {
   return <>
      <div className={s.wrapper}>
         <Aside />
         <main className={s.content}>
            <Avatar />
            <Switch>
               <Route path='/album/:albumId' component={Album} />
               <Route path='/playlist/:playlistId' component={Playlist} />
            </Switch>
         </main>
      </div>
   </>;
};

export default App;