import React from 'react';
import { withIcon, WrappedIconType } from 'high-order-components';


type PropsType = {
   fillColor?: string
}

const Eye: React.FC<PropsType & WrappedIconType> = ({ styles, fillColor }) => {
   return (
      <svg stroke={fillColor} fill='none' style={styles} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
         <circle cx="12" cy="12" r="3"/>
      </svg>
   );
};

export default withIcon(Eye);