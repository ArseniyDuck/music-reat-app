import { RouteLinks } from 'app-routing';
import { MediaQuery } from 'components/common';
import React, { useEffect } from 'react';
import { clearSmallSingers, fetchSmallSingers } from 'redux/singer-reducer';
import { getArrayOfComponents } from 'tools/functions';
import { useAppDispatch, useAppSelector } from 'hooks';
import Card, { CardsContainer } from '../../../components/cards/Cards';
import s from './SubPages.module.scss';
import { DesktopCardSkeleton, MobileCardSkeleton } from 'components/cards/skeletons';

type PropsType = {};

const Singers: React.FC<PropsType> = (props) => {
   const { isFetching, singers } = useAppSelector(state => state.singer.smallSingers);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchSmallSingers());

      return () => {
         dispatch(clearSmallSingers());
      }
   }, [dispatch]);
   
   return <>
      <h1 className={s.heading}>Singers</h1>
      <CardsContainer>
         { isFetching ?
            <>
               <MediaQuery width='sm' mode='min-width'>
                  {getArrayOfComponents(() => <DesktopCardSkeleton isRound={true} />, 20)}
               </MediaQuery>
               <MediaQuery width='sm' mode='max-width'>
                  {getArrayOfComponents(() => <MobileCardSkeleton isRound={true} />, 10)}
               </MediaQuery>
            </>
         :
            singers.map(({ id, name, genres, photo }) => (
               <Card
                  key={id}
                  title={name}
                  subTitle={genres.join(', ')}
                  linkTo={`${RouteLinks.SINGER}/${id}`}
                  image={photo}
                  isRound={true}
               />
            ))
         }
      </CardsContainer>
   </>;
};

export default Singers;