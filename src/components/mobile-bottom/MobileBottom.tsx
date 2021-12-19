import React from 'react';
import { NavLink } from 'react-router-dom';
import { NestedRouteLinks, RouteLinks } from 'app-routing';
import s from './MobileBottom.module.scss';
import { Search, Heart, User } from 'icons';
import { MediaQuery } from 'components/common';

type PropsType = {};

const MobileBottom: React.FC<PropsType> = (props) => {
   return (
      <div className={s.wrapper}>
         <div className={s.row}>
            <NavLink to={RouteLinks.SEARCH} className={s.link} activeClassName={s.active}>
               <Search size={20} color='grey' />
               <span>Search</span>
            </NavLink>
            <MySongsNavLink />
            <NavLink to='/profile' className={s.link} activeClassName={s.active}>
               <User size={20} color='grey' />
               <span>Profile</span>
            </NavLink>
         </div>
      </div>
   );
};

const MySongsNavLink: React.FC = () => {
   return <>
      <MediaQuery mode='min-width' width='sm'>
         <MySongsLink to={NestedRouteLinks.PLAYLISTS} />
      </MediaQuery>
      <MediaQuery mode='max-width' width='sm'>
         <MySongsLink to={RouteLinks.MY_SONGS} />
      </MediaQuery>
   </>
}

const MySongsLink: React.FC<{to: string}> = (props) => {
   return (
      <NavLink to={props.to} className={s.link} activeClassName={s.active}>
         <Heart size={20} isLiked={false} color='grey' />
         <span>My songs</span>
      </NavLink>
   );
}

export default MobileBottom;