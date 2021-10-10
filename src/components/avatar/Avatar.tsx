import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../common/dropdown/Dropdown';
import Arrow from '../icons/arrow/Arrow';
import s from './Avatar.module.scss';

type PropsType = {};

const Avatar: React.FC<PropsType> = (props) => {
   return (
      <div className={s.avatarWrapper}>
         <Dropdown event='focus' initialPosition='top' LabelComponent={AvatarLabel} >
            <Dropdown.Item>
               <Link className={s.dropdownAction} to='/profile'>Go to profile</Link>
            </Dropdown.Item>
            <Dropdown.Item>
               <button className={`${s.dropdownAction} ${s.logout}`}>Logout</button>
            </Dropdown.Item>
         </Dropdown>
      </div>
   );
};

const AvatarLabel = () => {
   return (
      <div className={s.avatarBlock}>
         <div className={s.avatarPhotoWrapper + ' ibg'}>
            {/* <img src='path/to/user/photo' alt='user avatar' /> */}
         </div>
         <p className={s.username}>Username</p>
         <Arrow direction='bottom' />
      </div>
   );
};

export default Avatar;