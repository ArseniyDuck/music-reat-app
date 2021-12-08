import React from 'react';
import { withIcon, WrappedIconType } from 'high-order-components';


type PropsType = {
   fillColor?: string
}

const Error: React.FC<PropsType & WrappedIconType> = ({ styles, fillColor }) => {
   return (
      <svg fill={fillColor} style={styles} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
         <path d="M257,461.46c-114,0-206.73-92.74-206.73-206.73S143,48,257,48s206.73,92.74,206.73,206.73S371,461.46,257,461.46ZM257,78C159.55,78,80.27,157.28,80.27,254.73S159.55,431.46,257,431.46s176.73-79.28,176.73-176.73S354.45,78,257,78Z"/>
         <path d="M342.92,358a15,15,0,0,1-10.61-4.39L160.47,181.76a15,15,0,1,1,21.21-21.21L353.53,332.4A15,15,0,0,1,342.92,358Z"/>
         <path d="M171.07,358a15,15,0,0,1-10.6-25.6L332.31,160.55a15,15,0,0,1,21.22,21.21L181.68,353.61A15,15,0,0,1,171.07,358Z"/>
      </svg>
   );
};

export default withIcon(Error);