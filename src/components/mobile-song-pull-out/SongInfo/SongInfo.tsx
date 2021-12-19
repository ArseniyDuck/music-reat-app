import React from 'react';
import s from './SongInfo.module.scss';


type PropsType = MobilePullOutSongType;

const SongInfo: React.FC<PropsType> = (props) => {
   return (
      <div className={s.songInfo}>
         <div className={s.photo + ' ibg'}>
            {props.photo && <img src={props.photo} alt='album' />}
         </div>
         <div className={`${s.songNamesWrapper}`}>
            <h3 className={`${s.songName}`}>{props.songName}</h3>
            <p className={s.singerName}>{props.singerName}</p>
         </div>
         <p className={s.songDuration}>{props.duration}</p>
      </div>
   );
};

export default SongInfo;