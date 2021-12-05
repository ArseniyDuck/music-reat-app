import React from 'react';
import s from './SubPages.module.scss';

type PropsType = {};

const Singers: React.FC<PropsType> = (props) => {
   return (
      <h1 className={s.heading}>Singers</h1>
   );
};

export default Singers;