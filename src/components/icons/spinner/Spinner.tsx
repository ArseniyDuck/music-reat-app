import React from 'react';
import withIcon, { WrappedIconType } from '../../../high-order-components/withIcon/withIcon';
import s from './Spinner.module.scss';


const Spinner: React.FC<WrappedIconType> = ({ styles }) => {
   return (
      <div style={styles} className={s.Spinner}></div>
   );
};

export default withIcon(Spinner);