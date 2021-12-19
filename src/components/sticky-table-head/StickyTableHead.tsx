import React from 'react';
import { Sticky } from 'components/common';
import s from './StickyTableHead.module.scss';
import { conditionClassName } from 'tools/functions';

type PropsType = {
   index?: boolean
   title?: boolean
   album?: boolean
   time?: boolean
   hideIndex?: boolean
};

const StickyTableHead: React.FC<PropsType> = ({ hideIndex=true, ...props }) => {
   return (
      <Sticky stuckOn={60} defaultWrapperClasses={s.tableHeaderWrapper} stuckClasses={s.stuck}>
         <ul className={s.tableHeader}>
            {props.index && <li className={conditionClassName(s.index, hideIndex, s.hideIndex)}>#</li>}
            {props.title && <li className={s.title}>Title</li>}
            {props.album && <li className={s.album}>Album</li>}
            {props.time && <li className={s.time}>Time</li>}
         </ul>
      </Sticky>
   );
};

export default StickyTableHead;