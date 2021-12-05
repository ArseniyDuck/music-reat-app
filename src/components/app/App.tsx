import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import s from './App.module.scss';
import Album from '../../pages/album/Album';
import Avatar from '../avatar/Avatar';
import Aside from '../aside/Aside';
import Playlist from '../../pages/playlist/Playlist';
import MobileBottom from '../mobile-bottom/MobileBottom';
import MediaQuery from '../common/media-query/MediaQuery';
import BottomAlert from '../bottom-alert/BottomAlert';
import MySongs from '../../pages/my-songs/MySongs';
import ScrollToTop from '../common/scroll-to-top/ScrollToTop';
import SignIn from '../../pages/auth/SignIn';
import SignUp from '../../pages/auth/SignUp';
import { useAppDispatch } from '../../tools/hooks';
import { me } from '../../redux/auth-reducer';


const App = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(me())
   }, [dispatch]);

   return (
      <div className={s.wrapper}>
         <MediaQuery mode='min-width' width='lg'>
            <Aside />
         </MediaQuery>
         <main className={s.content}>
            <MediaQuery mode='min-width' width='lg'>
               <Avatar />
            </MediaQuery>
            <ScrollToTop>
               <Switch>
                  <Route exact path='/album/:albumId' component={Album} />
                  <Route exact path='/playlist/:playlistId' component={Playlist} />
                  <Route path='/my-songs' component={MySongs} />
                  <Route exact path='/sign-up' component={SignUp} />
                  <Route exact path='/sign-in' component={SignIn} />
               </Switch>
            </ScrollToTop>
            <BottomAlert />
         </main>
         <MediaQuery mode='max-width' width='lg'>
            <MobileBottom />
         </MediaQuery>
      </div>
   );
};

export default App;