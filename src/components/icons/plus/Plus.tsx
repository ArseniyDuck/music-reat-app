import React from 'react';
import withIcon, { WrappedIconType } from '../../../high-order-components/withIcon/withIcon';
import { conditionClassName } from '../../../tools/functions';
import s from './Plus.module.scss';


type PropsType = {
   stroke?: number
   isFilled?: boolean
};

const Plus: React.FC<PropsType & WrappedIconType> = ({ isFilled=false, styles, stroke }) => {
   const className = conditionClassName(s.plus, isFilled, s.filled);

   return (
      <svg style={styles} className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M20 0L20 40M40 20L0 20" stroke="white" strokeWidth={stroke ? stroke : 3} />
      </svg>
   );
};

export default withIcon(Plus);