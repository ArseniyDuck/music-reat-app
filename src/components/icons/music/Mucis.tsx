import React from 'react';
import withIcon, { WrappedIconType } from '../../../high-order-components/withIcon/withIcon';


type PropsType = {
   fillColor?: string
}

const Music: React.FC<PropsType & WrappedIconType> = ({ styles, fillColor }) => {
   return (
      <svg fill={fillColor} style={styles} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
         <path d="M14,46c-3.309,0-6-2.691-6-6s2.691-6,6-6h6v6C20,43.196,17.196,46,14,46z M14,36c-2.206,0-4,1.794-4,4s1.794,4,4,4     c2.289,0,4-2.112,4-4v-4H14z"/>
         <path d="M34,40c-3.309,0-6-2.691-6-6s2.691-6,6-6h6v6C40,37.196,37.196,40,34,40z M34,30c-2.206,0-4,1.794-4,4s1.794,4,4,4     c2.289,0,4-2.112,4-4v-4H34z"/>
         <polygon points="20,35 18,35 18,10.323 40,1.523 40,29 38,29 38,4.477 20,11.677    "/>
         <rect height="21.541" transform="matrix(0.3711 0.9286 -0.9286 0.3711 31.24 -18.1245)" width="2" x="28" y="3.23"/>
      </svg>
   );
};

export default withIcon(Music);