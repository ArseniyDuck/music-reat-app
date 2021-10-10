import React from 'react';
import withIcon, { WrappedIconType } from '../../../high-order-components/withIcon';
import s from './CdDisk.module.scss';


const CdDisk: React.FC<WrappedIconType> = ({ styles }) => {
   return (
      <svg style={styles} xmlns="http://www.w3.org/2000/svg" viewBox='0 0 24 24'>
         <circle className={s['cls-1']} cx='12' cy='12' r='11'/>
         <circle className={s['cls-1']} cx='12' cy='12' r='3'/>
      </svg>
   );
};

export default withIcon(CdDisk);