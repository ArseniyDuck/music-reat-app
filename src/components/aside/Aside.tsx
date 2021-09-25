import React, { useState, useEffect } from 'react';
import { createPlaylist, fetchSmallPlaylists } from '../../redux/playlists-reducer';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import { getArrayOfComponents } from '../../tools/functions';
import s from './Aside.module.scss';
import PlaylistCreationForm from '../playlist-creation/Form';
import { AsideButton, AsideLink } from './AsideActions';
import Playlist from '../small-playlist/Playlist';
import TransitionSkeleton from '../common/transition-skeleton/TransitionSkeleton';
import Search from '../common/search/Search';
import Heart from '../common/heart/Heart';


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

type PlaylistCreationPropsType = { onclick: () => void };
const PlaylistCreationButton: React.FC<PlaylistCreationPropsType> = ({ onclick }) => {
   return (
      <AsideButton onClick={onclick}>
         <svg viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg">
            <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
         </svg>
         Create playlist
      </AsideButton>
   );
};

export default Aside;