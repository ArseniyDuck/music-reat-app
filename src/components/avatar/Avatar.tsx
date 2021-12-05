import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/auth-reducer';
import { history } from '../../routing/history';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import Dropdown from '../common/dropdown/Dropdown';
import Arrow from '../icons/arrow/Arrow';
import s from './Avatar.module.scss';

type PropsType = {};

const Avatar: React.FC<PropsType> = (props) => {
   const dispatch = useAppDispatch();
   
   const handleClick = () => {
      dispatch(logout());
      history.push('/sign-in');
   }

   return (
      <div className={s.avatarWrapper}>
         <Dropdown event='focus' initialPosition='top' LabelComponent={AvatarLabel} >
            <Dropdown.Item>
               <Link className={s.dropdownAction} to='/profile'>Go to profile</Link>
            </Dropdown.Item>
            <Dropdown.Item>
               <button onClick={handleClick} className={`${s.dropdownAction} ${s.logout}`}>Logout</button>
            </Dropdown.Item>
         </Dropdown>
      </div>
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