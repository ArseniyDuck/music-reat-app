import React from 'react';
import s from './TransitionSkeleton.module.scss';

type PropsType = {
   width: number | string
   height: number | string
};

const TransitionSkeleton: React.FC<PropsType> = ({ width, height }) => {
   return (
      <div style={{ width, height }} className={s.skeletonRectangle}></div>
   );
};

export default TransitionSkeleton;