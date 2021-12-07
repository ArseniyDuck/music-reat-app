import React from 'react';
import s from './GradientContent.module.scss';

type PropsType = {
   color: string
   gradientHeight?: number
};

const GradientContent: React.FC<PropsType> = ({ color, gradientHeight=300, children }) => {
   return (
      <div className={s.body}>
         <div
            className={s.gradientPart}
            style={{
               height: gradientHeight,
               background: `linear-gradient(rgba(0,0,0,.65) 0, #222 100%), ${color}`,
            }}
         />
         <div
            className={s.plainColorPart}
            style={{
               top: gradientHeight,
               height: `calc(100% - ${gradientHeight}px)`,
            }}
         />
         {children}
      </div>
   );
};

export default GradientContent;