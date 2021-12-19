import React from 'react';
import { useAppDispatch, useAppSelector, usePopUp } from 'hooks';
import { AuthRequired, MediaQuery, OnExactPage } from 'components/common';
import { getArrayOfComponents } from 'tools/functions';
import { createPlaylist } from 'redux/playlists-reducer';
import s from './SubPages.module.scss';
import PlaylistCreationPopUp from 'components/playlist-creation-pop-up/PlaylistCreationPopUp';
import Card, { CardsContainer, CreatePlaylistMobileCard, LikedSongsCard } from 'components/cards/Cards';
import { Plus } from 'icons';
import MySongsBackground from 'components/my-songs-background/MySongsBackground';
import { RouteLinks } from 'app-routing';
import { DesktopCardSkeleton, MobileCardSkeleton } from 'components/cards/skeletons';
import { withMobilePlaylists } from 'high-order-components';


const Playlists: React.FC = () => {
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
      <MediaQuery mode='min-width' width='sm'>
         <MediaQuery mode='max-width' width='lg'>
            <OnExactPage isOnPage={false} page={RouteLinks.MY_SONGS}>
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
      <CardsContainer>
         <MediaQuery mode='max-width' width='sm'>
            <CreatePlaylistMobileCard onClick={hadleCreationButtonClick} />
            <Card
               title='Liked songs'
               subTitle=''
               imageComponent={MySongsBackground}
               linkTo={RouteLinks.LIKED_SONGS}
            />
         </MediaQuery>
         { isFetching ?
            <>
               <MediaQuery width='sm' mode='min-width'>{getArrayOfComponents(DesktopCardSkeleton, 20)}</MediaQuery>
               <MediaQuery width='sm' mode='max-width'>{getArrayOfComponents(MobileCardSkeleton, 10)}</MediaQuery>
            </>
         :
            <AuthRequired>
               <MediaQuery mode='min-width' width='sm'>
                  <LikedSongsCard />
               </MediaQuery>
               {playlists.map(({ id, name, songs_count, photo }) => (
                  <Card
                     key={id}
                     title={name}
                     subTitle={songs_count ? `${songs_count} songs` : 'Empty'}
                     // todo: don't use template string here: `http://localhost:8000${props.image}`
                     image={photo && `http://localhost:8000${photo}`}
                     linkTo={`${RouteLinks.PLAYLIST}/${id}`}
                  />
               ))}
            </AuthRequired>
         }
      </CardsContainer>
      <PlaylistCreationPopUp
         heading='Create playlist'
         isOpened={isCreationOpened}
         popUpRef={creationBodyRef}
         close={() => setIsCreationOpened(false)}
         actionAfterSubmit={createPlaylistAfterSubmit}
      />
   </>;
}

export default withMobilePlaylists(Playlists);