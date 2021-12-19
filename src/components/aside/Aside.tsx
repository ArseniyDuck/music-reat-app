import React, { useEffect, useState } from 'react';
import { clearSmallPlaylists, fetchSmallPlaylists } from 'redux/playlists-reducer';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getArrayOfComponents } from 'tools/functions';
import s from './Aside.module.scss';
import AsidePlaylistCreation from '../aside-playlist-creation/AsidePlaylistCreation';
import Playlist from '../small-playlist/Playlist';
import { TransitionSkeleton, AuthRequired } from 'components/common';
import { Search, Heart, Plus } from 'icons';
import { RouteLinks } from 'app-routing';
import { Link } from 'react-router-dom';


type PropsType = {};

const Aside: React.FC<PropsType> = (props) => {
   const [isFormShown, setIsFormShown] = useState(false);

   return (
      <aside className={s.aside}>
         <SearchLink />
         <MySongsLink />
         <PlaylistCreationButton onClick={() => setIsFormShown(prev => !prev)} />
         <div className={s.playlists}>
            <AuthRequired>
               <Playlists
                  isFormShown={isFormShown}
                  close={() => setIsFormShown(false)}
               />
            </AuthRequired>
         </div>
      </aside>
   );
};

const SearchLink: React.FC = () => (
   <Link to={RouteLinks.SEARCH} className={s.link}>
      <Search color='grey' />
      Search
   </Link>
);

const MySongsLink: React.FC = () => (
   <Link to={RouteLinks.MY_SONGS} className={s.link}>
      <Heart isLiked={false} color='grey' size={14} />
      My Songs
   </Link>
);


export const PlaylistCreationButton: React.FC<{onClick: () => void}> = ({ onClick }) => {
   return (
      <button onClick={onClick} className={s.button}>
         <Plus isFilled={true} size={12} stroke={7} styles={{ padding: 6, marginRight: 7 }} />
         Create playlist
      </button>
   );
};


type PlaylistsPropsType = {
   isFormShown: boolean
   close: () => void
}

const Playlists: React.FC<PlaylistsPropsType> = (props) => {
   const dispatch = useAppDispatch();
   const id = useAppSelector(state => state.auth.user.id);
   const playlists = useAppSelector(state => state.playlists.smallPlaylists.playlists);
   const isFetching = useAppSelector(state => state.playlists.smallPlaylists.isFetching);
   
   useEffect(() => {
      dispatch(fetchSmallPlaylists());

      return () => {
         dispatch(clearSmallPlaylists());
      }
   }, [dispatch, id]);

   return <>
      {isFetching ? 
         getArrayOfComponents(() => <TransitionSkeleton width='100%' height={15} />, 8)
         :
         <div className={s.playlistsBody}>
            {props.isFormShown && (
               <AsidePlaylistCreation close={props.close} />
            )}
            {playlists && (
               playlists.map(playlist => 
                  <Playlist
                     key={playlist.id}
                     id={playlist.id}
                     name={playlist.name}
                  />
               )
            )}
         </div>
      }
   </>;
}

export default Aside;