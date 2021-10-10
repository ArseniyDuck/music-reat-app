import React from 'react';
import s from './Arrow.module.scss';

type PropsType = {
   size?: number
   direction: 'top' | 'right' | 'bottom' | 'left'
};

const Arrow: React.FC<PropsType> = ({ size, direction }) => {
   let rotateDegree;
   switch (direction) {
      case 'top':
         rotateDegree = 180;
         break;
      case 'right':
         rotateDegree = -90;
         break;
      case 'bottom':
         rotateDegree = -180;
         break;
      case 'left':
         rotateDegree = 90;
         break;
   }

   const style: React.CSSProperties = {
      width: size ? `${size}px` : '15x',
      height: size ? `${size}px` : '15px',
      transform: `rotate(${rotateDegree}deg)`
   };

   return (
      <svg style={style} className={s.arrow} width='11' height='6' viewBox='0 0 11 6' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
         <path d='M5.49997 6.27031C5.30283 6.27031 5.10571 6.19503 4.95541 6.04481L0.225655 1.31501C-0.0752185 1.01413 -0.0752185 0.526316 0.225655 0.225564C0.526408 -0.0751881 1.01413 -0.0751881 1.31502 0.225564L5.49997 4.41075L9.68494 0.22571C9.98581 -0.0750419 10.4735 -0.0750419 10.7742 0.22571C11.0752 0.526463 11.0752 1.01428 10.7742 1.31515L6.04453 6.04495C5.89416 6.19521 5.69704 6.27031 5.49997 6.27031Z' fill='white'/>
      </svg>
   );
};

export default Arrow;