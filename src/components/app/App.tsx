import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useAppDispatch } from 'tools/hooks';
import { composeRoutesFromArr } from 'tools/functions';
import { Routes } from 'app-routing';
import s from './App.module.scss';
import { me } from 'redux/auth-reducer';
import Avatar from '../avatar/Avatar';
import Aside from '../aside/Aside';
import MobileBottom from '../mobile-bottom/MobileBottom';
import { MediaQuery, ScrollToTop } from 'components/common';
import BottomAlert from '../bottom-alert/BottomAlert';


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

export default App;