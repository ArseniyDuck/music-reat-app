import React, { useState, useEffect } from 'react';
import { useOpacityPercentWithWindowScroll } from '../../tools/hooks';
import PlayPauseButton from '../common/play-pause/PlayPauseButton';
import s from './AlbumHeader.module.scss';

type PropsType = {
   rgbColorString: string
   albumName: string
};

// todo: implement a file structure and place AlbumHeader into Album
const AlbumHeader: React.FC<PropsType> = (props) => {
   const [isAlbumDataShown, setIsAlbumDataShown] = useState(false);

   const showAt = 275;
   const handleScroll = () => {
      if (window.scrollY >= showAt && !isAlbumDataShown) {
         setIsAlbumDataShown(true);
      } else if (window.scrollY < showAt && isAlbumDataShown) {
         setIsAlbumDataShown(false);
      }
   };
   
   useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   });

   return (
      <header className={s.albumHeader}>
         <HeaderBackground rgbColor={props.rgbColorString} />
         {/* todo: animate the apperience of button and album name */}
         { isAlbumDataShown && <>
            <PlayPauseButton size={35} />
            {/* todo: add text-overflow: ellipsis */}
            <p className={s.name}>{props.albumName}</p>
         </> }
      </header>
   );
};

const HeaderBackground: React.FC<{rgbColor: string}> = ({ rgbColor }) => {
   /* the transition from transparency to opacity will start at 100 pixels and end at 200 pixels.
   the opacity variable stores 0, 1, or a non-integer number,
   meaning an intermediate value of transparency. */
   const [startTransition, finishTransition] = [100, 200];
   const opacity = useOpacityPercentWithWindowScroll(startTransition, finishTransition);
   
   return (
      <div className={s.bg} style={{opacity: opacity, background: rgbColor}}></div>
   );
};

export default AlbumHeader;