import React from 'react';
import s from './Spinner.module.scss';

type PropsType = { size?: number };

const Spinner: React.FC<PropsType> = ({ size }) => {
   const style = {
      width: size ? `${size}px` : '45px',
      height: size ? `${size}px` : '45px',
   };

   return (
      <div style={style} className={s.Spinner}></div>
   );
};

export default Spinner;