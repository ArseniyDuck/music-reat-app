import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import MediaQuery from '../../components/common/media-query/MediaQuery';
import GradientHeader from '../../components/gradient-header/GradientHeader';
import s from './MySongs.module.scss';
import MobileMySongs from './MobileMySongs/MobileMySongs';
import OnExactPage from '../../components/common/on-exact-page/OnExactPage';
import Playlists from './sub-pages/Playlists';
import Albums from './sub-pages/Albums';
import Singers from './sub-pages/Singers';


type PropsType = {};

const MySongs: React.FC<PropsType> = () => {
   // todo: rename "rgbColor" to "color"
   return <>
      <RedirectLargeDevicesFromMain />
      <div className={s.wrapper}>
         <MediaQuery mode='min-width' width='sm'>
            <OnExactPage isOnPage={false} page='/my-songs'>
               <Tabs />
            </OnExactPage>
         </MediaQuery>
         <div className={s.content}>
            <Switch>
               <Route exact path='/my-songs' component={MobileMySongs} />
               <Route exact path='/my-songs/playlists' component={Playlists} />
               <Route exact path='/my-songs/albums' component={Albums} />
               <Route exact path='/my-songs/singers' component={Singers} />
            </Switch>
         </div>
      </div>
   </>;
};

const RedirectLargeDevicesFromMain = () => {
   return (
      <MediaQuery mode='min-width' width='sm'>
         <OnExactPage isOnPage={true} page='/my-songs'>
            <Redirect to='/my-songs/playlists' />
         </OnExactPage>
      </MediaQuery>
   );
}

const Tabs = () => {
   return (
      <div className={s.tabs}>
         <GradientHeader rgbColor='#222' startFinish={[0, 50]}>
            <div className={s.headerData}>
               <NavLink to='/my-songs/playlists' className={s.tab} activeClassName={s.active}>Playlists</NavLink>
               <NavLink to='/my-songs/albums' className={s.tab} activeClassName={s.active}>Albums</NavLink>
               <NavLink to='/my-songs/singers' className={s.tab} activeClassName={s.active}>Singers</NavLink>
            </div>
         </GradientHeader>
      </div>
   );
}

export default MySongs;