import React, { FocusEventHandler } from 'react';
import { SongType } from '../../redux/album-reducer';
import { conditionClassName } from '../../tools/functions';
import s from './Song.module.scss';
import Dropdown from '../common/dropdown/Dropdown';
import Heart from '../common/heart/Heart';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../tools/hooks';


type PropsType = {
   toggleIsLiked: () => void
   index: number
   albumId: number
   singerId: number
   singerName: string
};

const Song: React.FC<PropsType & SongType> = (props) => {
   const playlists = useAppSelector(state => state.playlists.smallPlaylists.playlists);

   const removeFocus: FocusEventHandler<HTMLButtonElement> = event => {
      event.target.blur();
   };

   return (
      <div className={s.song}>
         <p className={s.songNumber}>{props.index}</p>
         <div className={s.songNamesWrapper}>
            <h3 className={s.songName}>{props.name}</h3>
            <Link to={`/singer/${props.singerId}`} className={s.songSingerName}>{props.singerName}</Link>
         </div>
         <button onClick={props.toggleIsLiked} onFocus={removeFocus} className={conditionClassName(s.likeSongButton, props.is_liked, s.liked)}>
            <Heart isLiked={props.is_liked} color='pink' />
         </button>
         <p className={s.songDuration}>{props.duration}</p>
         <Dropdown
            initialPosition='top'
            trackVerticalPosition={true}
            LabelComponent={() => <div className={s.dots}><span></span></div>}
            event='focus'
         >
            <Dropdown.Item>
               <Link className={s.dropDownLink} to={`/singer/${props.singerId}`}>Go to artist</Link>
            </Dropdown.Item>
            <Dropdown.Item>
               <Link className={s.dropDownLink} to={`/album/${props.albumId}`}>Go to album</Link>
            </Dropdown.Item>
            <Dropdown.Item>
               <Dropdown
                  initialPosition='bottom'
                  isOverflow={true}
                  trackVerticalPosition={true}
                  LabelComponent={() => <span className={s.playListsLabel}>Add to playlist</span>}
                  event='hover'
               >
                  { playlists.map(playlist => (
                     <Dropdown.Item key={playlist.id}><button className={s.dropDownButtonPlayList}>{playlist.name}</button></Dropdown.Item>
                  )) }
               </Dropdown>
            </Dropdown.Item>
            <Dropdown.Item>
               <button onClick={props.toggleIsLiked} className={s.dropDownButton}>{props.is_liked ? 'Dislike song' : 'Like song'}</button>
            </Dropdown.Item>
         </Dropdown>
      </div>
   );
};

export default Song;