import React, { useState } from 'react';
import s from './PlayPauseButton.module.scss';

type PropsType = {
   size?: number
   onClick?: () => void
};

const PlayPauseButton: React.FC<PropsType> = ({ size, onClick }) => {
   const [isPaused, setIsPaused] = useState(false);

   const style = {
      width: size ? `${size}px` : '45px',
      height: size ? `${size}px` : '45px',
   };

   const handleClick = () => {
      setIsPaused(prevMode => !prevMode);
      onClick && onClick();
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