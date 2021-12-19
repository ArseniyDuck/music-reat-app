import React from 'react';
import { Link } from 'react-router-dom';
import { history, RouteLinks } from 'app-routing';
import { useAppDispatch, useAppSelector } from 'hooks';
import { logout } from 'redux/auth-reducer';
import s from './Avatar.module.scss';
import { AuthRequired, Dropdown } from 'components/common';
import { Arrow } from 'icons';

type PropsType = {};

const Avatar: React.FC<PropsType> = (props) => {
   const dispatch = useAppDispatch();
   
   const handleLogoutClick = () => {
      dispatch(logout());
      history.push(RouteLinks.SIGN_IN);
   }

   return (
      <AuthRequired>
         <div className={s.avatarWrapper}>
            <Dropdown
               showOn='click'
               label={<AvatarLabel />}
               initialPosition='top'
               dropdownStyles={{transform: 'translateY(5px)'}}
            >
               <Link className={s.action} to='/profile'>Go to profile</Link>
               <button onClick={handleLogoutClick} className={`${s.action} ${s.logout}`}>Logout</button>
            </Dropdown>
         </div>
      </AuthRequired>
   );
};

const AvatarLabel = () => {
   const username = useAppSelector(state => state.auth.user.username);

   return (
      <div className={s.avatarBlock}>
         <div className={s.avatarPhotoWrapper + ' ibg'}>
            {/* <img src='path/to/user/photo' alt='user avatar' /> */}
         </div>
         <p className={s.username}>{username ? username : 'Unauthorized!'}</p>
         <Arrow direction='bottom' />
      </div>
   );
};

export default Avatar;