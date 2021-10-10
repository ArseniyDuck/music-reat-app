import React from 'react';
import s from './CdDisk.module.scss';

type PropsType = {
   size?: number
   styles?: React.CSSProperties
};

const CdDisk: React.FC<PropsType> = ({ size, styles={} }) => {
   const style = {
      width: size ? `${size}px` : '15x',
      height: size ? `${size}px` : '15px',
   };

   return (
      <svg style={{...styles, ...style}} xmlns="http://www.w3.org/2000/svg" viewBox='0 0 24 24'>
         <circle className={s['cls-1']} cx='12' cy='12' r='11'/>
         <circle className={s['cls-1']} cx='12' cy='12' r='3'/>
      </svg>
   );
};

export default CdDisk;