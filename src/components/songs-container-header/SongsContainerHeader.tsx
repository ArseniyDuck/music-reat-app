import React from 'react';
import GradientHeader from '../gradient-header/GradientHeader';
import PlayPauseButton from '../icons/play-pause/PlayPauseButton';
import s from './SongsContainerHeader.module.scss';

type PropsType = {
   rgbColor: string
   title: string
   bannerHeight?: number
};

const SongsContainerHeader: React.FC<PropsType> = ({ title, rgbColor, ...props }) => {
   const bannerHeight = props.bannerHeight as number

   return (
      <GradientHeader
         rgbColor={rgbColor}
         startFinish={[bannerHeight * 0.55, bannerHeight * 0.80]}
         showingSettings={{ at: bannerHeight }}
      >
         <div className={`${s.headerData} cropTextContainer`}>
            <PlayPauseButton size={35} />
            <p className={`${s.name} ellipseOverflow`}>{title}</p>
         </div>
      </GradientHeader>
   );
};

export default SongsContainerHeader;