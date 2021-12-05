import React, { useEffect, useState } from 'react';
import { createPlaylist, fetchSmallPlaylists } from '../../redux/playlists-reducer';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import { getArrayOfComponents } from '../../tools/functions';
import s from './Aside.module.scss';
import PlaylistCreationForm from '../playlist-creation/Form';
import { AsideButton, AsideLink } from './AsideActions';
import Playlist from '../small-playlist/Playlist';
import TransitionSkeleton from '../common/transition-skeleton/TransitionSkeleton';
import Search from '../icons/search/Search';
import Heart from '../icons/heart/Heart';
import Plus from '../icons/plus/Plus';
import AuthRequired from '../common/auth-required/AuthRequired';


type PropsType = {};

const Aside: React.FC<PropsType> = (props) => {
   const dispatch = useAppDispatch();
   const [isFormShown, setIsFormShown] = useState(false);

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
            <AuthRequired>
               <PlaylistsSkeletons
                  isFormShown={isFormShown}
                  hideForm={hideForm}
                  createPlaylistCallback={createPlaylistCallback}
               />
            </AuthRequired>
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
};
export const PlaylistCreationButton: React.FC<PlaylistCreationPropsType> = ({ onclick }) => {
   return (
      <AsideButton onClick={onclick}>
         <Plus isFilled={true} size={12} stroke={7} styles={{ padding: 6, marginRight: 7 }} />
         Create playlist
      </AsideButton>
   );
};

type PlaylistsSkeletonsProps = {
   isFormShown: boolean
   hideForm: () => void
   createPlaylistCallback: (name: string) => void
}
const PlaylistsSkeletons: React.FC<PlaylistsSkeletonsProps> = ({ isFormShown, hideForm, createPlaylistCallback }) => {
   const dispatch = useAppDispatch();
   const playlists = useAppSelector(state => state.playlists.smallPlaylists.playlists);
   const isFetching = useAppSelector(state => state.playlists.smallPlaylists.isFetching);
   const id = useAppSelector(state => state.auth.user.id);

   useEffect(() => {
      dispatch(fetchSmallPlaylists());
   }, [dispatch, id]);

   return <>
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
   </>;
}

export default Aside;