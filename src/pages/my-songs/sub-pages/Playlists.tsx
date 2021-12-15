import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector, usePopUp } from 'tools/hooks';
import { AuthRequired, MediaQuery, OnExactPage } from 'components/common';
import { getArrayOfComponents } from 'tools/functions';
import { clearPlaylist, createPlaylist, fetchSmallPlaylists } from 'redux/playlists-reducer';
import s from './SubPages.module.scss';
import PlaylistCreationPopUp from 'components/playlist-creation-pop-up/PlaylistCreationPopUp';
import Card, { CardSkeleton, LikedSongsCard, MobileCardSkeleton } from '../cards/Cards';
import { Plus } from 'icons';
import CreatePlaylistButton from '../cards/CreatePlaylistButton';
import MySongsBackground from 'components/my-songs-background/MySongsBackground';


const Playlists = () => {
   const dispatch = useAppDispatch();
   const [isCreationOpened, setIsCreationOpened, creationBodyRef] = usePopUp<HTMLDivElement>();
   const { isFetching, playlists } = useAppSelector(state => state.playlists.smallPlaylists);

   const hadleCreationButtonClick = () => {
      setIsCreationOpened(true);
   };

   const createPlaylistAfterSubmit = (name: string) => {
      dispatch(createPlaylist(name));
   };
   
   return <>
      <h1 className={s.heading}>Playlists</h1>
      <MediaQuery mode='max-width' width='lg'>
         <SyncPlaylistsOnMobiles />
      </MediaQuery>
      <MediaQuery mode='min-width' width='sm'>
         <MediaQuery mode='max-width' width='lg'>
            <OnExactPage isOnPage={false} page='/my-songs'>
               <button style={{ display: 'block' }} onClick={hadleCreationButtonClick}>
                  <Plus
                     size={20} stroke={5}
                     styles={{
                        padding: 8,
                        position: 'fixed',
                        top: 10,
                        right: 25,
                        zIndex: 99,
                        border: '1.5px solid #fff',
                     }}
                  />
               </button>
            </OnExactPage>
         </MediaQuery>
      </MediaQuery>
      <div className={s.grid}>
         <MediaQuery mode='max-width' width='sm'>
            <CreatePlaylistButton onClick={hadleCreationButtonClick} />
            <Card
               linkTo={'/liked'}
               imageComponent={MySongsBackground}
               title={'Liked songs'}
               songsCount={1000}
            />
         </MediaQuery>
         { isFetching ?
            <>
               <MediaQuery width='sm' mode='min-width'>{getArrayOfComponents(CardSkeleton, 20)}</MediaQuery>
               <MediaQuery width='sm' mode='max-width'>{getArrayOfComponents(MobileCardSkeleton, 10)}</MediaQuery>
            </>
         :
            <AuthRequired>
               {/* todo: turn on slow 3g and fix bug with with displaying */}
               <MediaQuery mode='min-width' width='sm'>
                  <LikedSongsCard />
               </MediaQuery>
               {playlists.map(({ id, name, songs_count, photo }) => (
                  <Card
                     key={id}
                     linkTo={`/playlist/${id}`}
                     // todo: don't use template string here: `http://localhost:8000${props.image}`
                     image={photo && `http://localhost:8000${photo}`}
                     title={name}
                     songsCount={songs_count}
                  />
               ))}
            </AuthRequired>
         }
      </div>
      <PlaylistCreationPopUp
         heading='Create playlist'
         isOpened={isCreationOpened}
         popUpRef={creationBodyRef}
         close={() => setIsCreationOpened(false)}
         actionAfterSubmit={createPlaylistAfterSubmit}
      />
   </>;
}

const SyncPlaylistsOnMobiles: React.FC = () => {
   const dispatch = useAppDispatch();
   const id = useAppSelector(state => state.auth.user.id);

   useEffect(() => {
      dispatch(fetchSmallPlaylists());

      return () => {
         dispatch(clearPlaylist());
      }
   }, [dispatch, id]);

   return null;
}

export default Playlists;