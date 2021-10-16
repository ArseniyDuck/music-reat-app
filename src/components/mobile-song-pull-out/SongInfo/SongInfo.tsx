import React from 'react';
import { MobilePullOupSongType } from '../../../types/data-structures';
import s from './SongInfo.module.scss';


type PropsType = MobilePullOupSongType;

const SongInfo: React.FC<PropsType> = (props) => {
   return (
      <div className={s.songInfo}>
         <div className={s.photo + ' ibg'}>
            { props.photo && <img src={props.photo} alt='album' /> }
         </div>
         <div className={`${s.songNamesWrapper} cropTextContainer`}>
            <h3 className={`${s.songName} ellipseOverflow`}>{props.songName}</h3>
            <p className={s.songLink}>{props.singerName}</p>
         </div>
         <p className={s.songDuration}>{props.duration}</p>
      </div>
   );
};

export default SongInfo;