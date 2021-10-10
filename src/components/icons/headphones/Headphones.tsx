import React from 'react';
import withIcon, { WrappedIconType } from '../../../high-order-components/withIcon';
import s from './Headphones.module.scss';


const Headphones: React.FC<WrappedIconType> = ({ styles }) => {
   return (
      <svg style={styles} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32">
         <path className={s.st0} d="M5,17v-3C5,7.9,9.9,3,16,3s11,4.9,11,11v3"/>
         <path className={s.st0} d="M27,17c0,5.5-4,10.1-9.3,10.9C16.8,28,16,27.3,16,26.4v0c0-0.8,0.6-1.4,1.4-1.4h0c0.9,0,1.6,0.7,1.6,1.6V27"/>
         <path className={s.st0} d="M9,13c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4V13z"/>
         <path className={s.st0} d="M23,21c2.2,0,4-1.8,4-4c0-2.2-1.8-4-4-4V21z"/>
      </svg>
   );
};

export default withIcon(Headphones);