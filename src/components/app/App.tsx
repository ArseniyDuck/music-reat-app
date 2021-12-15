import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useAppDispatch, useAuth } from 'tools/hooks';
import { composeRoutesFromArr } from 'tools/functions';
import { Routes } from 'app-routing';
import s from './App.module.scss';
import { me } from 'redux/auth-reducer';
import Avatar from '../avatar/Avatar';
import Aside from '../aside/Aside';
import MobileBottom from '../mobile-bottom/MobileBottom';
import { MediaQuery, ScrollToTop } from 'components/common';
import BottomAlert from '../bottom-alert/BottomAlert';
import PositionedLogin from 'components/positioned-login/PositionedLogin';


const App = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(me());
   }, [dispatch]);

   return (
      <div className={s.wrapper}>
         <MediaQuery mode='min-width' width='lg'>
            <Aside />
         </MediaQuery>
         <main className={s.content}>
            <PositionedAuthButton />
            <ScrollToTop>
               <Switch>
                  {composeRoutesFromArr(Routes)}
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

const PositionedAuthButton = () => {
   const isAuth = useAuth();
   return (
      <MediaQuery mode='min-width' width='lg'>
         { isAuth ? <Avatar /> : <PositionedLogin /> }
      </MediaQuery>
   );
}

export default App;