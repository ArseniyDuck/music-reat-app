import React, { useState, useEffect } from 'react';
import { conditionClassName } from 'tools/functions';
import { useOpacity } from 'hooks';
import s from './GradientHeader.module.scss';


type PropsType = {
   color: string
   startFinish: [number, number]
   showingSettings?: {
      at: number
   }
};

const GradientHeader: React.FC<PropsType> = ({ children, ...props }) => {
   const [isHeaderDataShown, setIsHeaderDataShown] = useState(!props.showingSettings);
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
         <HeaderBackground color={props.color} startFinish={props.startFinish} />
         <div className={conditionClassName(s.headerData, isHeaderDataShown, s.active)}>
            { children }
         </div>
      </header>
   );
};


const HeaderBackground: React.FC<{color: string, startFinish: [number, number]}> = (props) => {
   const [startTransition, finishTransition] = props.startFinish;
   const opacity = useOpacity(startTransition, finishTransition);
   
   return (
      <div className={s.bg} style={{opacity: opacity, background: props.color}}></div>
   );
};


export default GradientHeader;