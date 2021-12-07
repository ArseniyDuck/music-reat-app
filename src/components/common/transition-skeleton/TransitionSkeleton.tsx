import React, { CSSProperties } from 'react';
import { conditionClassName } from 'tools/functions';
import s from './TransitionSkeleton.module.scss';

type PropsType = {
   width: number | string
   height: number | string
   dark?: boolean
   styles?: CSSProperties
};

const TransitionSkeleton: React.FC<PropsType> = ({ width, height, ...props }) => {
   return (
      <div style={{ width, height, ...props.styles }} className={conditionClassName(s.skeletonRectangle, !!props.dark, s.dark)}>
         {props.children}
      </div>
   );
};

export default TransitionSkeleton;