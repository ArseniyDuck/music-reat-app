import React, { FocusEventHandler } from 'react';
import { likeSongById, SongType } from '../../redux/album-reducer';
import { conditionClassName } from '../../tools/functions';
import s from './Song.module.scss';
import Dropdown from '../common/dropdown/Dropdown';
import Heart from '../common/heart/Heart';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import { addSongToPlaylist } from '../../redux/playlists-reducer';

type PropsType = {
   index: number
   albumId: number
   singerId: number
   singerName: string
   removeSong?: (songId: number) => void
   photo?: string
   albumName?: string
};

const Song: React.FC<PropsType & SongType> = ({ removeSong, ...props }) => {
   const dispatch = useAppDispatch();
   const playlists = useAppSelector(state => state.playlists.smallPlaylists.playlists);

   const removeFocus: FocusEventHandler<HTMLButtonElement> = event => {
      event.target.blur();
   };

   const handleLikeTogglerClick = () => {
      dispatch(likeSongById(props.id));
   };

   const hadlePlaylistButtonClick = (playlistId: number) => {
      dispatch(addSongToPlaylist({ songId: props.id, playlistId }));
   };

   return (
      <div className={`${s.song} ${props.photo ? s.inPlaylist : s.notInPlaylist}`}>
         <p className={s.songNumber}>{props.index}</p>
         { props.photo && 
            <div className={s.photo + ' ibg'}>
               <img src={props.photo} alt='album' />
            </div>
         }
         <div className={s.songNamesWrapper}>
            <h3 className={s.songName}>{props.name}</h3>
            <Link to={`/singer/${props.singerId}`} className={s.songLink}>{props.singerName}</Link>
         </div>
         { props.albumName && <Link to={`/album/${props.albumId}`} className={s.songLink}>{props.albumName}</Link> }
         <button
            onClick={handleLikeTogglerClick}
            onFocus={removeFocus}
            className={conditionClassName(s.likeSongButton, props.is_liked, s.liked)}
         >
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
               { removeSong ? 
                  <button onClick={() => removeSong(props.id)} className={s.dropDownButton}>
                     Remove song
                  </button>
                  :
                  <Dropdown
                     initialPosition='bottom'
                     isOverflow={true}
                     trackVerticalPosition={true}
                     LabelComponent={() => <span className={s.playListsLabel}>Add to playlist</span>}
                     event='hover'
                  >
                     { playlists.map(playlist => (
                        <Dropdown.Item key={playlist.id}>
                           <button
                              onClick={() => hadlePlaylistButtonClick(playlist.id)}
                              className={s.dropDownButtonPlayList}
                           >
                              {playlist.name}
                           </button>
                        </Dropdown.Item>
                     )) }
                  </Dropdown>
               }
            </Dropdown.Item>
            <Dropdown.Item>
               <button onClick={handleLikeTogglerClick} className={s.dropDownButton}>
                  {props.is_liked ? 'Dislike song' : 'Like song'}
               </button>
            </Dropdown.Item>
         </Dropdown>
      </div>
   );
};

export default Song;