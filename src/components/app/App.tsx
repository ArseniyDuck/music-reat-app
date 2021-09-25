import React from 'react';
import { breakpoints } from '../../tools/variables';
import { useWindowSize } from '../../tools/hooks';
import { Route, Switch } from 'react-router-dom';
import s from './App.module.scss';
import Album from '../../pages/album/Album';
import Avatar from '../avatar/Avatar';
import Aside from '../aside/Aside';
import Playlist from '../../pages/playlist/Playlist';
import MobileBottom from '../mobile-bottom/MobileBottom';


const App = () => {
   const windowDimensions = useWindowSize();

   return <>
      <div className={s.wrapper}>
         { windowDimensions.width > breakpoints.lg && <Aside /> }
         <main className={s.content}>
            <Avatar />
            <Switch>
               <Route path='/album/:albumId' component={Album} />
               <Route path='/playlist/:playlistId' component={Playlist} />
            </Switch>
         </main>
         { windowDimensions.width <= breakpoints.lg && <MobileBottom /> }
      </div>
   </>;
};

export default App;