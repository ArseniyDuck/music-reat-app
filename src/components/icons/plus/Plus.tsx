import React from 'react';
import { conditionClassName } from '../../../tools/functions';
import s from './Plus.module.scss';

type PropsType = {
   size?: number
   stroke?: number
   isFilled?: boolean
   styles?: React.CSSProperties
};

const Plus: React.FC<PropsType> = ({ size, isFilled=false, styles, stroke }) => {
   const className = conditionClassName(s.plus, isFilled, s.filled);
   const style = {
      width: size ? `${size}px` : '15x',
      height: size ? `${size}px` : '15px',
   };

   return (
      <svg style={{...style, ...styles}} className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M20 0L20 40M40 20L0 20" stroke="white" strokeWidth={stroke ? stroke : 3} />
      </svg>
   );
};

export default Plus;