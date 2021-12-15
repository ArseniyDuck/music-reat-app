import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Heart, User } from 'icons';
import s from './MobileBottom.module.scss';
import { RouteLinks } from 'app-routing';

type PropsType = {};

const MobileBottom: React.FC<PropsType> = (props) => {
   return (
      <div className={s.wrapper}>
         <div className={s.row}>
            <NavLink to={RouteLinks.SEARCH} className={s.link} activeClassName={s.active}>
               <Search size={20} color='grey' />
               <span>Search</span>
            </NavLink>
            <NavLink to={RouteLinks.MY_SONGS} className={s.link} activeClassName={s.active}>
               <Heart size={20} isLiked={false} color='grey' />
               <span>My songs</span>
            </NavLink>
            <NavLink to='/profile' className={s.link} activeClassName={s.active}>
               <User size={20} color='grey' />
               <span>Profile</span>
            </NavLink>
         </div>
      </div>
   );
};

export default MobileBottom;