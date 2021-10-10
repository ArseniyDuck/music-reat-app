import React from 'react';
import withIcon, { WrappedIconType } from '../../../high-order-components/withIcon';


const Trash: React.FC<WrappedIconType> = ({ styles }) => {
   return (
      <svg style={styles} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 64 64">
         <path d="M54,8H42V4c0-2.2-1.8-4-4-4H26c-2.2,0-4,1.8-4,4v4H10c-2.2,0-4,1.8-4,4v8h4.1l2.6,38.4c0.2,3.1,2.8,5.6,6,5.6h26.5
            c3.1,0,5.8-2.5,6-5.6L53.9,20H58v-8C58,9.8,56.2,8,54,8z M26,4h12v4H26V4z M47.3,58.1c-0.1,1-0.9,1.9-2,1.9H18.7
            c-1,0-1.9-0.8-2-1.9L14.1,20h35.7L47.3,58.1z M54,16H10v-4h44V16z"/>
      </svg>
   );
};

export default withIcon(Trash);