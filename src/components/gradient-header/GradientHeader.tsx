import React, { useState, useEffect } from 'react';
import { conditionClassName } from '../../tools/functions';
import { useOpacityPercentWithWindowScroll } from '../../tools/hooks';
import s from './GradientHeader.module.scss';


type PropsType = {
   rgbColor: string
   startFinish: [number, number]
   showingSettings?: {
      at: number
   }
};

const GradientHeader: React.FC<PropsType> = ({ children, ...props }) => {
   const [isHeaderDataShown, setIsHeaderDataShown] = useState(!Boolean(props.showingSettings));
   let handleScroll: () => void;

   if (props.showingSettings) {
      const showAt = props.showingSettings.at;
      handleScroll = () => {
         if (window.scrollY >= showAt && !isHeaderDataShown) {
            setIsHeaderDataShown(true);
         } else if (window.scrollY < showAt && isHeaderDataShown) {
            setIsHeaderDataShown(false);
         }
      };
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   });

   return (
      <header className={s.header}>
         <HeaderBackground rgbColor={props.rgbColor} startFinish={props.startFinish} />
         <div className={conditionClassName(s.headerData, isHeaderDataShown, s.active)}>
            { children }
         </div>
      </header>
   );
};


const HeaderBackground: React.FC<{rgbColor: string, startFinish: [number, number]}> = (props) => {
   const [startTransition, finishTransition] = props.startFinish;
   const opacity = useOpacityPercentWithWindowScroll(startTransition, finishTransition);
   
   return (
      <div className={s.bg} style={{opacity: opacity, background: props.rgbColor}}></div>
   );
};


export default GradientHeader;