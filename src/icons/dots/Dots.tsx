import React from 'react';
import { withIcon, WrappedIconType } from 'high-order-components';
import s from './Dots.module.scss';


type PropsType = {
   color?: string
}

const Dots: React.FC<PropsType & WrappedIconType> = ({ styles, color }) => {
   return (
      <svg style={styles} className={s.dots} fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
         <path fill={color ? color : '#fff'} d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z" />
         <path fill={color ? color : '#fff'} d="M4 8C4 9.10457 3.10457 10 2 10C0.895431 10 0 9.10457 0 8C0 6.89543 0.895431 6 2 6C3.10457 6 4 6.89543 4 8Z" />
         <path fill={color ? color : '#fff'} d="M16 8C16 9.10457 15.1046 10 14 10C12.8954 10 12 9.10457 12 8C12 6.89543 12.8954 6 14 6C15.1046 6 16 6.89543 16 8Z" />
      </svg>
   );
};

export default withIcon(Dots);