import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useAppDispatch, useAuth, useWindowSize } from 'hooks';
import { composeRoutesFromArr } from 'tools/functions';
import { me } from 'redux/auth-reducer';
import { Routes } from 'app-routing';
import { MyGlobalContext } from 'globalContext';
import s from './App.module.scss';
import Avatar from '../avatar/Avatar';
import Aside from '../aside/Aside';
import MobileBottom from '../mobile-bottom/MobileBottom';
import { MediaQuery, ScrollToTop } from 'components/common';
import BottomAlert from '../bottom-alert/BottomAlert';
import PositionedLogin from 'components/positioned-login/PositionedLogin';


const App = () => {
   const dispatch = useAppDispatch();
   const windowSize = useWindowSize();

   useEffect(() => {
      dispatch(me());
   }, [dispatch]);

   return (
      <MyGlobalContext.Provider value={{ windowSize }}>
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
      </MyGlobalContext.Provider>
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