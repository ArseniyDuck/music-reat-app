import React from 'react';
import { TransitionSkeleton } from 'components/common';
import s from '../Cards.module.scss';
import { conditionClassName } from 'tools/functions';

type PropsType = {
   isRound?: boolean
}

const MobileCardSkeleton: React.FC<PropsType> = (props) => {
   return (
      <div className={s.cardBody}>
         <div className={conditionClassName(s.cardImage, !!props.isRound, s.round)}>
            <TransitionSkeleton
               width={'auto'}
               height={'auto'}
               styles={{ paddingBottom: '100%' }}
            />
         </div>
         <div className={s.cardInfo}>
            <TransitionSkeleton width={'65%'} height={12} />
            <TransitionSkeleton width={'20%'} height={8} />
         </div>
      </div>
   );
}

export default MobileCardSkeleton;