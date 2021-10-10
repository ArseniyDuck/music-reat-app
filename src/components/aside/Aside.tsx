import React, { useState } from 'react';
import { createPlaylist } from '../../redux/playlists-reducer';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import { conditionClassName, getArrayOfComponents } from '../../tools/functions';
import s from './Aside.module.scss';
import PlaylistCreationForm from '../playlist-creation/Form';
import { AsideButton, AsideLink } from './AsideActions';
import Playlist from '../small-playlist/Playlist';
import TransitionSkeleton from '../common/transition-skeleton/TransitionSkeleton';
import Search from '../icons/search/Search';
import Heart from '../icons/heart/Heart';
import Plus from '../icons/plus/Plus';


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


   return (
      <aside className={s.aside}>
         <SearchLink />
         <MySongsLink />
         <PlaylistCreationButton onclick={toggleIsFormShown} />
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

const SearchLink: React.FC = () => {
   return (
      <div>
         <AsideLink to='/search'>
            <Search color='grey' />
            Search
         </AsideLink>
      </div>
   );
};

const MySongsLink: React.FC = () => {
   return (
      <div>
         <AsideLink to='/my-songs'>
            <Heart isLiked={false} color='grey' size={14} />
            My Songs
         </AsideLink>
      </div>
   );
};

type PlaylistCreationPropsType = {
   onclick: () => void
   size?: 'small' | 'large'
};
export const PlaylistCreationButton: React.FC<PlaylistCreationPropsType> = ({ onclick, size='small' }) => {
   return (
      <AsideButton size={size} onClick={onclick}>
         { size === 'large' ? 
            <Plus size={15} stroke={7} />
            :
            <Plus size={12} stroke={7} />
         }
         Create playlist
      </AsideButton>
   );
};

export default Aside;