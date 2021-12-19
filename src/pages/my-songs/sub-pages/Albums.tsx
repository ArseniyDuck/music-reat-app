import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getArrayOfComponents } from 'tools/functions';
import { MediaQuery } from 'components/common';
import { fetchSmallAlbums, clearSmallAlbums } from 'redux/album-reducer';
import s from './SubPages.module.scss';
import Card, { CardsContainer } from '../../../components/cards/Cards';
import { RouteLinks } from 'app-routing';
import { DesktopCardSkeleton, MobileCardSkeleton } from 'components/cards/skeletons';


const Albums = () => {
   const { isFetching, albums } = useAppSelector(state => state.album.smallAlbums);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchSmallAlbums());

      return () => {
         dispatch(clearSmallAlbums());
      }
   }, [dispatch]);
   
   return <>
      <h1 className={s.heading}>Albums</h1>
      <CardsContainer>
         { isFetching ?
            <>
               <MediaQuery width='sm' mode='min-width'>{getArrayOfComponents(DesktopCardSkeleton, 20)}</MediaQuery>
               <MediaQuery width='sm' mode='max-width'>{getArrayOfComponents(MobileCardSkeleton, 10)}</MediaQuery>
            </>
         :
            albums.map(({ id, name, songs_count, photo }) => (
               <Card
                  key={id}
                  title={name}
                  subTitle={songs_count ? `${songs_count} songs` : 'Empty'}
                  linkTo={`${RouteLinks.ALBUM}/${id}`}
                  image={photo}
               />
            ))
         }
      </CardsContainer>
   </>;
}

export default Albums;