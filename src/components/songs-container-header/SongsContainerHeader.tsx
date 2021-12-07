import React from 'react';
import GradientHeader from '../gradient-header/GradientHeader';
import { PlayPauseButton } from 'icons';
import s from './SongsContainerHeader.module.scss';

type PropsType = {
   color: string
   title: string
   bannerHeight?: number
};

const SongsContainerHeader: React.FC<PropsType> = ({ title, color, ...props }) => {
   const bannerHeight = props.bannerHeight as number

   return (
      <GradientHeader
         color={color}
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