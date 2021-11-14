import React, { useState, useEffect } from 'react';
import { conditionClassName } from '../../tools/functions';
import { useOpacityPercentWithWindowScroll } from '../../tools/hooks';
import PlayPauseButton from '../icons/play-pause/PlayPauseButton';
import s from './GradientHeader.module.scss';

type PropsType = {
   rgbColor: string
   title: string
   bannerHeight?: number
};

const GradientHeader: React.FC<PropsType> = (props) => {
   const [isHeaderDataShown, setIsHeaderDataShown] = useState(false);

   const showAt = props.bannerHeight as number;
   const handleScroll = () => {
      if (window.scrollY >= showAt && !isHeaderDataShown) {
         setIsHeaderDataShown(true);
      } else if (window.scrollY < showAt && isHeaderDataShown) {
         setIsHeaderDataShown(false);
      }
   };
   
   useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   });

   return (
      <header className={`${s.header} cropTextContainer`}>
         <HeaderBackground rgbColor={props.rgbColor} bannerHeight={props.bannerHeight as number} />
         <div className={conditionClassName(s.headerData, isHeaderDataShown, s.active)}>
            <PlayPauseButton size={35} />
            <p className={`${s.name} ellipseOverflow`}>{props.title}</p>
         </div>
      </header>
   );
};

const HeaderBackground: React.FC<{rgbColor: string, bannerHeight: number}> = ({ rgbColor, bannerHeight }) => {
   /* the transition from transparency to opacity will start at 100 pixels and end at 200 pixels.
   the opacity variable stores 0, 1, or a non-integer number,
   meaning an intermediate value of transparency. */
   const [startTransition, finishTransition] = [bannerHeight * 0.55, bannerHeight * 0.80];
   const opacity = useOpacityPercentWithWindowScroll(startTransition, finishTransition);
   
   return (
      <div className={s.bg} style={{opacity: opacity, background: rgbColor}}></div>
   );
};

export default GradientHeader;