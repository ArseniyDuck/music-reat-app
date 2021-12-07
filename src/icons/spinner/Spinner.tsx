import React from 'react';
import { withIcon, WrappedIconType } from 'high-order-components';
import s from './Spinner.module.scss';


const Spinner: React.FC<WrappedIconType> = ({ styles }) => {
   return (
      <div style={styles} className={s.Spinner}></div>
   );
};

export default withIcon(Spinner);