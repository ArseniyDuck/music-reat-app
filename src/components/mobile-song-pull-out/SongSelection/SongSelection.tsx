import React from 'react';
import withPopUp, { WrappedPopUpType } from '../../../high-order-components/withPopUp/withPopUp';
import { getArrayOfComponents } from '../../../tools/functions';
import { useAppSelector } from '../../../tools/hooks';
import TransitionSkeleton from '../../common/transition-skeleton/TransitionSkeleton';
import Plus from '../../icons/plus/Plus';
import s from './SongSelection.module.scss';


type PropsType = {
   creationButtonOnClick: () => void
   addSongToPlaylist: (id: number) => void
};

const SongSelection: React.FC<PropsType & WrappedPopUpType> = ({ close, ...props }) => {
   const { isFetching, error, playlists } = useAppSelector(state => state.playlists.smallPlaylists);

   const handleSongAdding = (id: number) => {
      props.addSongToPlaylist(id);
      close();
   };

   return <>
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
            <button className={s.createPlaylistButton} onClick={props.creationButtonOnClick}>
               <Plus size={15} stroke={7} />
               Create playlist
            </button>
            <div className={s.playlistsContainer}>
               {playlists.map(playlist => (
                  <button
                     key={playlist.id}
                     onClick={() => handleSongAdding(playlist.id)}
                     className={s.smallPlaylist}
                  >
                     <p className={s.playlistName}>{playlist.name}</p>
                     <p className={s.playlistCount}>
                        {/* todo: select number of songs from state */}
                        100 songs
                     </p>
                  </button>
               ))}
            </div>
            <div className='mobilePopUpCancelButtons'>
               <button onClick={close} className='mobilePopUpButton'>Cancel</button>
            </div>
         </>
      }
   </>;
};

const PlaylistSkeleton = () => {
   return <div className={s.playlistSkeleton}>
      <TransitionSkeleton width='85%' height={16} />
      <TransitionSkeleton width='30%' height={8} />
   </div>;
}

export default withPopUp(SongSelection);