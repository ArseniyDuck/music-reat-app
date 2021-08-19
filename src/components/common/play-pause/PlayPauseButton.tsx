import React, { useState } from 'react';
import s from './PlayPauseButton.module.scss';

type PropsType = {
   size?: number
};

const PlayPauseButton: React.FC<PropsType> = ({ size }) => {
   const [isPaused, setIsPaused] = useState(false);

   const style = {
      width: size ? `${size}px` : '45px',
      height: size ? `${size}px` : '45px',
   };

   const handleClick = async () => {
      setIsPaused(prevMode => !prevMode);
   };

   return (
      <button onClick={handleClick} style={style} className={s.Button}>
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

export default PlayPauseButton;