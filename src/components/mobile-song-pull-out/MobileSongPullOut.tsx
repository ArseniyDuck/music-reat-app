import React from 'react';
import { usePopUp } from '../../tools/hooks';
import { conditionClassName } from '../../tools/functions';
import { MobilePullOupSongType } from '../../types/data-structures';
import s from './MobileSongPullOut.module.scss';
import SongSelection from './SongSelection/SongSelection';
import SongCreation from './SongCreation/SongCreation';
import SongInfo from './SongInfo/SongInfo';
import Action from './Action/Action';
import Heart from '../icons/heart/Heart';
import Headphones from '../icons/headphones/Headphones';
import CdDisk from '../icons/cd-disk/CdDisk';
import Plus from '../icons/plus/Plus';
import Trash from '../icons/trash/Trash';


type PropsType = {
   isOpened: boolean
   hide: () => void
   songData: MobilePullOupSongType
   likeSong: () => void
   removeSong?: () => void
   addSongToPlaylist: (id: number) => void
};

const MobileSongPullOut: React.FC<PropsType> = ({ isOpened, hide, songData, ...props }) => {
   const [isSelectionOpened, setIsSelectionOpened, selectionBodyRef] = usePopUp<HTMLDivElement>();
   const [isCreationOpened, setIsCreationOpened, creationBodyRef] = usePopUp<HTMLDivElement>();

   const hadleCreationButtonClick = () => {
      setIsSelectionOpened(false);
      setIsCreationOpened(true);
   };
   
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
            </div>
            <SongSelection
               heading='Add song'
               isOpened={isSelectionOpened}
               popUpRef={selectionBodyRef}
               close={() => setIsSelectionOpened(false)}
               creationButtonOnClick={hadleCreationButtonClick}
               addSongToPlaylist={props.addSongToPlaylist}
            />
            <SongCreation
               heading='Create playlist'
               isOpened={isCreationOpened}
               popUpRef={creationBodyRef}
               close={() => setIsCreationOpened(false)}
               songId={songData.id}
            />
         </div>
         <button onClick={hide} className={s.cancel}>Cancel</button>
      </div>
   );
};

export default MobileSongPullOut;