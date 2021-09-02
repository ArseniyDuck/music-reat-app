import React, { useState, useEffect } from 'react';
import { createPlaylist, fetchSmallPlaylists } from '../../redux/playlists-reducer';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import { getArrayOfComponents } from '../../tools/functions';
import s from './Aside.module.scss';
import PlaylistCreationForm from '../playlist-creation/Form';
import PlaylistCreationButton from '../playlist-creation/Button';
import Playlist from '../small-playlist/Playlist';
import TransitionSkeleton from '../common/transition-skeleton/TransitionSkeleton';


type PropsType = {};

const Aside: React.FC<PropsType> = (props) => {
   const [isFormShown, setIsFormShown] = useState(false);

   const dispatch = useAppDispatch();
   const playlists = useAppSelector(state => state.playlists.smallPlaylists.playlists);
   const isFetching = useAppSelector(state => state.playlists.smallPlaylists.isFetching);

   const createPlaylistCallback = (name: string) => {
      dispatch(createPlaylist(name));
   };

   const toggleIsFormShown = () => setIsFormShown(prev => !prev);
   const hideForm = () => setIsFormShown(false);

   useEffect(() => {
      dispatch(fetchSmallPlaylists());
   }, [dispatch]);


   return (
      <aside className={s.aside}>
         <PlaylistCreationButton onClick={toggleIsFormShown} />
         <div className={s.playlists}>
            { isFetching ? 
               getArrayOfComponents(() => <TransitionSkeleton width='100%' height={15} />, 6)
               :
               <div className={s.playlistsBody}>
                  { isFormShown && <PlaylistCreationForm hideMe={hideForm} createPlaylist={createPlaylistCallback} />}
                  { playlists && playlists.map(playlist => 
                     <Playlist key={playlist.id} {...playlist} />)
                  }
               </div>
            }
         </div>
      </aside>
   );
};

export default Aside;