import React, { useState } from 'react';
import { withIcon, WrappedIconType } from 'high-order-components';
import s from './PlayPauseButton.module.scss';

type PropsType = {
   onClick?: () => void
};

const PlayPauseButton: React.FC<PropsType & WrappedIconType> = ({ styles, onClick }) => {
   const [isPaused, setIsPaused] = useState(false);

   const handleClick = () => {
      setIsPaused(prevMode => !prevMode);
      onClick && onClick();
   };

   return (
      <button onClick={handleClick} style={styles} className={s.Button}>
         <svg className={s.PlayPauseSvg} viewBox='0 0 24 24'>
            {isPaused ?
               <>
                  <rect x='5' y='3' width='4' height='18'></rect>
                  <rect x='15' y='3' width='4' height='18'></rect>
               </>
               :
               <polygon points='21.57 12 5.98 3 5.98 21 21.57 12'></polygon>
            }
         </svg>
      </button>
   );
};

export default withIcon(PlayPauseButton);