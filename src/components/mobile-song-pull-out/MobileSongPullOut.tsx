import React, { useEffect, useRef, useState } from 'react';
import s from './MobileSongPullOut.module.scss';
import { conditionClassName, getArrayOfComponents } from '../../tools/functions';
import Heart from '../icons/heart/Heart';
import { Link } from 'react-router-dom';
import Headphones from '../icons/headphones/Headphones';
import CdDisk from '../icons/cd-disk/CdDisk';
import Plus from '../icons/plus/Plus';
import Trash from '../icons/trash/Trash';
import Arrow from '../icons/arrow/Arrow';
import { useAppSelector, usePopUp } from '../../tools/hooks';
import Spinner from '../icons/spinner/Spinner';
import TransitionSkeleton from '../common/transition-skeleton/TransitionSkeleton';
import { PlaylistCreationButton } from '../aside/Aside';

type PropsType = {
   isOpened: boolean
   hide: () => void
   songData: SongDataType
   likeSong: () => void
   removeSong?: () => void
   addSongToPlaylist: (id: number) => void
};


const MobileSongPullOut: React.FC<PropsType> = ({ isOpened, hide, songData, ...props }) => {
   const [isSelectionOpened, setIsSelectionOpened, selectionBodyRef] = usePopUp<HTMLDivElement>();
   
   const removeSongFromPlaylist = () => {
      props.removeSong && props.removeSong();
      hide();
   };
   
   return (
      <div className={conditionClassName(s.wrapper, isOpened, s.opened)}>
         <div className={s.body}>
            <SongInfo {...songData} />
            <div className={s.actions}>
               <Action onClick={props.likeSong}>
                  <Heart size={33} color='pink' isLiked={songData.isLiked} />
                  <span>{songData.isLiked ? 'Dislike song' : 'Like song'}</span>
               </Action>
               <Action href={`/singer/${songData.singerId}`} isArrow={true} hide={hide}>
                  <Headphones size={33} />
                  <span>Go to artist</span>
               </Action>
               <Action href={`/album/${songData.albumId}`} isArrow={true} hide={hide}>
                  <CdDisk size={30} styles={{padding: '1.5px'}} />
                  <span>Go to album</span>
               </Action>
               <Action onClick={() => setIsSelectionOpened(prev => !prev)}>
                  <Plus size={23} styles={{padding: '5px'}} />
                  <span>Add song to playlist</span>
               </Action>
               { songData.isInPlaylist && <Action onClick={removeSongFromPlaylist}>
                  <Trash size={25} styles={{padding: '4px'}} />
                  <span>Remove song from playlist</span>
               </Action> }
               <MobilePlaylistSelection
                  isOpened={isSelectionOpened}
                  selectionBodyRef={selectionBodyRef}
                  close={() => setIsSelectionOpened(false)}
                  addSongToPlaylist={props.addSongToPlaylist}
               />
            </div>
         </div>
         <button onClick={hide} className={s.cancel}>Cancel</button>
      </div>
   );
};


// SongInfo ----------------------------------------------------------
const SongInfo: React.FC<SongDataType> = (props) => {
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

type SongDataType = {
   songName: string
   singerName: string
   duration: string
   isLiked: boolean
   singerId: number
   albumId: number
   isInPlaylist: boolean
   photo?: string
};


// Action ----------------------------------------------------------
type ActionPropsType = {
   href?: string
   hide?: () => void
   onClick?: () => void
   isArrow?: boolean
};

const Action: React.FC<ActionPropsType> = (actionProps) => {
   const ActionBodyTag: React.FC = (bodyProps) => {
      return <>
         {actionProps.href ?
            <Link to={actionProps.href} onClick={actionProps.hide} className={s.action}>
               {bodyProps.children}
            </Link>
            :
            <button className={s.action} onClick={actionProps.onClick}>
               {bodyProps.children}
            </button>
         }
      </>;
   };
   
   return (
      <ActionBodyTag>
         {actionProps.children}
         { actionProps.isArrow && (
            <span className={s.arrow}>
               <Arrow size={16} direction='right' />
            </span>
         )}
      </ActionBodyTag>
   );
}


// MobilePlaylistSelection ----------------------------------------------------------
type SelectionPropsType = {
   isOpened: boolean
   selectionBodyRef: React.RefObject<HTMLDivElement>
   close: () => void 
   addSongToPlaylist: (id: number) => void
};

const MobilePlaylistSelection: React.FC<SelectionPropsType> = ({ isOpened, selectionBodyRef, close, ...props }) => {
   const { isFetching, error, playlists } = useAppSelector(state => state.playlists.smallPlaylists);

   const handleSongAdding = (id: number) => {
      props.addSongToPlaylist(id);
      close();
   };

   return (
      <div className={conditionClassName(s.selectWrapper, isOpened, s.selectOpened)}>
         <div className={s.selectBody} ref={selectionBodyRef}>
            <h3 className={s.selectHeading}>Add to playlist</h3>
            {isFetching ? 
               // if fetching data, show spinner
               <div className={s.skeletonsContainer}>
                  {getArrayOfComponents(PlaylistSkeleton, 4)}
               </div>
               :
               // if fetched, but with an error, show error
               error ?
               <p className='error'>{error}</p>
               :
               // else show content
               <>
                  <PlaylistCreationButton size='large' onclick={() => {}} />
                  <div className={s.playlistsContainer}>
                     {playlists.map(playlist => (
                        <button
                           key={playlist.id}
                           onClick={() => handleSongAdding(playlist.id)}
                           className={s.smallPlaylist}
                        >
                           <p className={s.playlistName}>{playlist.name}</p>
                           <p className={s.playlistCount}>100 songs</p>
                        </button>
                     ))}
                  </div>
                  <div className={s.cancelButtonContainer}>
                     <button onClick={close} className={s.cancelSelection}>Cancel</button>
                  </div>
               </>
            }
         </div>
      </div>
   );
}

const PlaylistSkeleton = () => {
   return <div className={s.playlistSkeleton}>
      <TransitionSkeleton width='85%' height={16} />
      <TransitionSkeleton width='30%' height={8} />
   </div>;
}


export default MobileSongPullOut;