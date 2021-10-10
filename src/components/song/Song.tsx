import React, { FocusEventHandler, useState } from 'react';
import { addSongToPlaylist, toggleSongLikeById } from '../../redux/songs-reducer';
import { conditionClassName } from '../../tools/functions';
import s from './Song.module.scss';
import Dropdown from '../common/dropdown/Dropdown';
import Heart from '../icons/heart/Heart';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import { SongType } from '../../types/data-structures';
import MediaQuery from '../common/media-query/MediaQuery';
import MobileSongPullOut from '../mobile-song-pull-out/MobileSongPullOut';

type PropsType = {
   index: number
   albumId: number
   singerId: number
   singerName: string
   removeSong?: (songId: number) => void
   photo?: string
   albumName?: string
   isInPlaylist?: boolean
};

const Song: React.FC<PropsType & SongType> = ({ removeSong, isInPlaylist=false, ...props }) => {
   const dispatch = useAppDispatch();
   const playlists = useAppSelector(state => state.playlists.smallPlaylists.playlists);
   const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

   const removeFocus: FocusEventHandler<HTMLButtonElement> = event => {
      event.target.blur();
   };

   const handleLikeTogglerClick = () => {
      dispatch(toggleSongLikeById(props.id));
   };

   const hideMobileMenu = () => {
      document.body.classList.remove('_disable-scroll');
      setIsMobileMenuOpened(false);
   };

   const handleMobileDottsClick = () => {
      document.body.classList.toggle('_disable-scroll');
      setIsMobileMenuOpened(prev => !prev);
   };

   const hadlePlaylistButtonClick = (playlistId: number) => {
      dispatch(addSongToPlaylist({ songId: props.id, playlistId }));
   };

   return (
      <div className={`${s.song} ${isInPlaylist ? s.inPlaylist : s.notInPlaylist}`}>
         <p className={s.songNumber}>{props.index}</p>
         { isInPlaylist && 
            <div className={s.photo + ' ibg'}>
               <img src={props.photo} alt='album' />
            </div>
         }
         <div className={`${s.songNamesWrapper} cropTextContainer`}>
            <h3 className={`${s.songName} ellipseOverflow`}>{props.name}</h3>
            <Link to={`/singer/${props.singerId}`} className={s.songLink}>{props.singerName}</Link>
         </div>
         { props.albumName && <Link to={`/album/${props.albumId}`} className={`${s.songLink} ${s.albumLink}`}>{props.albumName}</Link> }
         <button
            onClick={handleLikeTogglerClick}
            onFocus={removeFocus}
            className={conditionClassName(s.likeSongButton, props.is_liked, s.liked)}
         >
            <Heart isLiked={props.is_liked} color='pink' />
         </button>
         <p className={s.songDuration}>{props.duration}</p>
         
         {/* show dots below SM */}
         <MediaQuery mode='max-width' width='sm'>
            <div className={s.dots} onClick={handleMobileDottsClick}>
               <span></span>
            </div>
            <MobileSongPullOut
               isOpened={isMobileMenuOpened}
               hide={hideMobileMenu}
               songData={{
                  songName: props.name,
                  singerName: props.singerName,
                  duration: props.duration,
                  photo: props.photo,
                  singerId: props.singerId,
                  isLiked: props.is_liked,
                  albumId: props.albumId,
                  isInPlaylist: isInPlaylist,
               }}
               likeSong={handleLikeTogglerClick}
               removeSong={() => removeSong && removeSong(props.id)}
               addSongToPlaylist={hadlePlaylistButtonClick}
            />
         </MediaQuery>

         {/* hide dropdown below SM */}
         <MediaQuery mode='min-width' width='sm'>
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
                  { isInPlaylist && removeSong  ? 
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
                     { props.is_liked ? 'Dislike song' : 'Like song' }
                  </button>
               </Dropdown.Item>
            </Dropdown>
         </MediaQuery>
      </div>
   );
};

export default Song;