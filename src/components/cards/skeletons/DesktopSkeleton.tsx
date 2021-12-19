import React from 'react';
import { TransitionSkeleton } from 'components/common';
import s from '../Cards.module.scss';

type PropsType = {
   isRound?: boolean
}

const DesktopCardSkeleton: React.FC<PropsType> = (props) => {
   return (
      <TransitionSkeleton dark={true} height={'auto'} width={'auto'} styles={{ padding: 12, margin: 0 }}>
         <TransitionSkeleton
            width={'auto'}
            height={'auto'}
            styles={{
               paddingBottom: '100%',
               borderRadius: props.isRound ? '50%' : 'auto'
            }}
         />
         <div className={s.cardTitle}>
            <TransitionSkeleton width={'80%'} height={12} />
         </div>
         <div className={s.cardSubTitle}>
            <TransitionSkeleton width={'35%'} height={8} />
         </div>
      </TransitionSkeleton>
   );
}

export default DesktopCardSkeleton;