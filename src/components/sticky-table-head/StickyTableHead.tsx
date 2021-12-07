import React from 'react';
import { Sticky } from 'components/common';
import s from './StickyTableHead.module.scss';

type PropsType = {};

const StickyTableHead: React.FC<PropsType> = ({ children }) => {
   return (
      <Sticky stuckOn={60} defaultWrapperClasses={s.tableHeaderWrapper} stuckClasses={s.stuck}>
         {children}
      </Sticky>
   );
};

export default StickyTableHead;