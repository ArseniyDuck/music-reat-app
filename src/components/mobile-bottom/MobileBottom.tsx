import React from 'react';
import s from './MobileBottom.module.scss';

type PropsType = {};

const MobileBottom: React.FC<PropsType> = (props) => {
   return (
      <div className={s.wrapper}>
         <div className={s.row}>
            <div className={s.column}>
               <span>My songs</span>
            </div>
            <div className={s.column}>
               <span>Search</span>
            </div>
            <div className={s.column}>
               <span>Profile</span>
            </div>
         </div>
      </div>
   );
};

export default MobileBottom;