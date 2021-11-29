import React, { useEffect } from 'react';
import MediaQuery from '../../../components/common/media-query/MediaQuery';
import { fetchSmallAlbums } from '../../../redux/album-reducer';
import { getArrayOfComponents } from '../../../tools/functions';
import { useAppDispatch, useAppSelector } from '../../../tools/hooks';
import Card, { CardSkeleton, MobileCardSkeleton } from '../cards/Cards';
import s from './SubPages.module.scss';


const Albums = () => {
   const { isFetching, albums } = useAppSelector(state => state.album.smallAlbums);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchSmallAlbums());
   }, [dispatch]);
   
   return <>
      <h1 className={s.heading}>Albums</h1>
      <div className={s.grid}>
         { isFetching ?
            <>
               <MediaQuery width='sm' mode='min-width'>{getArrayOfComponents(CardSkeleton, 20)}</MediaQuery>
               <MediaQuery width='sm' mode='max-width'>{getArrayOfComponents(MobileCardSkeleton, 10)}</MediaQuery>
            </>
         :
            albums.map(({ id, name, songs_count, photo }) => (
               <Card key={id} linkTo={`/album/${id}`} image={photo} title={name} songsCount={songs_count} />
            ))
         }
      </div>
   </>;
}

export default Albums;