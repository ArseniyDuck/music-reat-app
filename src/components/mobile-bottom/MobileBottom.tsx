import React from 'react';
import { NavLink } from 'react-router-dom';
import Heart from '../icons/heart/Heart';
import Search from '../icons/search/Search';
import User from '../icons/user/User';
import s from './MobileBottom.module.scss';

type PropsType = {};

const MobileBottom: React.FC<PropsType> = (props) => {
   return (
      <div className={s.wrapper}>
         <div className={s.row}>
            <NavLink to='/search' className={s.link} activeClassName={s.active}>
               <Search size={20} color='grey' />
               <span>Search</span>
            </NavLink>
            <NavLink to='/my-songs' className={s.link} activeClassName={s.active}>
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