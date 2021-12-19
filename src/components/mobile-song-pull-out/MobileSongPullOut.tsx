import React from 'react';
import { useAppDispatch, usePopUp } from 'hooks';
import { conditionClassName } from 'tools/functions';
import s from './MobileSongPullOut.module.scss';
import SongSelection from './SongSelection/SongSelection';
import PlaylistCreationPopUp from '../playlist-creation-pop-up/PlaylistCreationPopUp';
import SongInfo from './SongInfo/SongInfo';
import Action from './Action/Action';
import { Heart, Headphones, CdDisk, Plus, Trash } from 'icons';
import { addSongInNewPlaylist } from 'redux/songs-reducer';
import { RouteLinks } from 'app-routing';


type PropsType = MobilePullOutSongType & {
   isOpened: boolean
   close: () => void
   songActions?: {
      toggleSongLike?: () => void
      removeSong?: () => void
      addSongInPlaylist?: (id: number) => void
      removeSongFromLiked?: () => void
   }
};

const MobileSongPullOut: React.FC<PropsType> = (props) => {
   const [isSelectionOpened, setIsSelectionOpened, selectionBodyRef] = usePopUp<HTMLDivElement>();
   const [isCreationOpened, setIsCreationOpened, creationBodyRef] = usePopUp<HTMLDivElement>();
   const dispatch = useAppDispatch();

   const hadleCreationButtonClick = () => {
      setIsSelectionOpened(false);
      setIsCreationOpened(true);
   };

   const createAndAdd = (name: string) => {
      if (props.songActions?.addSongInPlaylist) {
         dispatch(addSongInNewPlaylist({
            songId: props.id,
            playlistName: name,
         }));
      }
   };
   
   return (
      <div className={conditionClassName(s.wrapper, props.isOpened, s.opened)}>
         <div className={s.body}>
            <SongInfo
               id={props.id}
               songName={props.songName}
               singerName={props.singerName}
               duration={props.duration}
               isLiked={props.isLiked}
               singerId={props.singerId}
               albumId={props.albumId}
               photo={props.photo}
            />
            <div className={s.actions}>
               {props.songActions?.toggleSongLike && (
                  <Action onClick={props.songActions.toggleSongLike}>
                     <Heart size={33} color='pink' isLiked={props.isLiked} />
                     <span>{props.isLiked ? 'Dislike song' : 'Like song'}</span>
                  </Action>
               )}
               <Action to={`${RouteLinks.SINGER}/${props.singerId}`} isArrow={true} close={props.close}>
                  <Headphones size={33} />
                  <span>Go to artist</span>
               </Action>
               <Action to={`${RouteLinks.ALBUM}/${props.albumId}`} isArrow={true} close={props.close}>
                  <CdDisk size={30} styles={{padding: '1.5px'}} />
                  <span>Go to album</span>
               </Action>
               {props.songActions?.addSongInPlaylist && (
                  <Action onClick={() => setIsSelectionOpened(prev => !prev)}>
                     <Plus size={23} styles={{padding: '5px'}} />
                     <span>Add song to playlist</span>
                  </Action>
               )}
               {props.songActions?.removeSong && (
                  <Action onClick={props.songActions.removeSong}>
                     <Trash size={25} styles={{padding: '4px'}} />
                     <span>Remove song from playlist</span>
                  </Action>
               )}
               {props.songActions?.removeSongFromLiked && (
                  <Action onClick={props.songActions.removeSongFromLiked}>
                     <Trash size={25} styles={{padding: '4px'}} />
                     <span>Remove from Liked Songs</span>
                  </Action>
               )}
            </div>

            {/* Pop-ups for adding songs in playlists */}
            {props.songActions?.addSongInPlaylist && <>
               <SongSelection
                  heading='Add song'
                  isOpened={isSelectionOpened}
                  popUpRef={selectionBodyRef}
                  close={() => setIsSelectionOpened(false)}
                  creationButtonOnClick={hadleCreationButtonClick}
                  addSongToPlaylist={props.songActions.addSongInPlaylist}
               />
               <PlaylistCreationPopUp
                  heading='Create playlist'
                  isOpened={isCreationOpened}
                  popUpRef={creationBodyRef}
                  close={() => setIsCreationOpened(false)}
                  actionAfterSubmit={createAndAdd}
               />
            </>}
         </div>
         <button onClick={props.close} className={s.cancel}>Cancel</button>
      </div>
   );
};

export default MobileSongPullOut;