import React from 'react';
import { NavLink } from 'react-router-dom';
import Heart from '../common/heart/Heart';
import Search from '../common/search/Search';
import UserIcon from '../common/user-icon/UserIcon';
import s from './MobileBottom.module.scss';

type PropsType = {};

const MobileBottom: React.FC<PropsType> = (props) => {
   return (
      <div className={s.wrapper}>
         <div className={s.row}>
            <NavLink to='/search' className={s.link} activeClassName={s.active}>
               <Search color='grey' />
               <span>Search</span>
            </NavLink>
            <NavLink to='/my-songs' className={s.link} activeClassName={s.active}>
               <Heart isLiked={false} color='grey' />
               <span>My songs</span>
            </NavLink>
            <NavLink to='/profile' className={s.link} activeClassName={s.active}>
               <UserIcon color='grey' />
               <span>Profile</span>
            </NavLink>
         </div>
      </div>
   );
};

export default MobileBottom;