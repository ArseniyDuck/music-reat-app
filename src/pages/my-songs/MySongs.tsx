import React from 'react';
import { Switch, Redirect, NavLink } from 'react-router-dom';
import { composeRoutesFromArr } from 'tools/functions';
import { NestedRouteLinks, NestedRoutes, RouteLinks } from 'app-routing';
import { MediaQuery, OnExactPage } from 'components/common';
import s from './MySongs.module.scss';
import GradientHeader from 'components/gradient-header/GradientHeader';


type PropsType = {};

const MySongs: React.FC<PropsType> = () => {
   return <>
      <RedirectLargeDevicesFromMain />
      <div className={s.wrapper}>
         <MediaQuery mode='min-width' width='sm'>
            <OnExactPage isOnPage={false} page={RouteLinks.MY_SONGS}>
               <Tabs />
            </OnExactPage>
         </MediaQuery>
         <div className={s.content}>
            <Switch>
               {composeRoutesFromArr(NestedRoutes)}
            </Switch>
         </div>
      </div>
   </>;
};

const RedirectLargeDevicesFromMain = () => {
   return (
      <MediaQuery mode='min-width' width='sm'>
         <OnExactPage isOnPage={true} page={RouteLinks.MY_SONGS}>
            <Redirect to={NestedRouteLinks.PLAYLISTS} />
         </OnExactPage>
      </MediaQuery>
   );
}

const Tabs = () => {
   return (
      <div className={s.tabs}>
         <GradientHeader color='#222' startFinish={[0, 50]}>
            <div className={s.headerData}>
               <NavLink to={NestedRouteLinks.PLAYLISTS} className={s.tab} activeClassName={s.active}>Playlists</NavLink>
               <NavLink to={NestedRouteLinks.ALBUMS} className={s.tab} activeClassName={s.active}>Albums</NavLink>
               <NavLink to={NestedRouteLinks.SINGERS} className={s.tab} activeClassName={s.active}>Singers</NavLink>
            </div>
         </GradientHeader>
      </div>
   );
}

export default MySongs;