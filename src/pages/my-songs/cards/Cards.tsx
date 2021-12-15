import React from 'react';
import { Link } from 'react-router-dom';
import s from './Cards.module.scss';
import { Music } from 'icons';
import { TransitionSkeleton } from 'components/common';
import { RouteLinks } from 'app-routing';


type PropsType = {
   linkTo: string,
   image?: string | null,
   imageComponent?: React.ComponentType
   title: string,
   songsCount: number
}

const Card: React.FC<PropsType> = (props) => {
   return (
      <Link to={props.linkTo} className={s.card}>
         <div className={`${s.cardBody} cropTextContainer`}>
            <div className={`${s.cardImage} ibg`}>
               {
                  // If image is a component:
                  props.imageComponent ?
                  <props.imageComponent /> :
                  // If image is a path
                  props.image ? <img src={props.image} alt='album' /> :
                     <Music
                        size={50}
                        fillColor='#333'
                        styles={{
                           position: 'absolute',
                           top: '50%',
                           left: '50%',
                           transform: 'translate(-50%, -50%)'
                        }}
                     />
               }
            </div>
            <div className={s.cardInfo}>
               <p className={`${s.cardTitle} ellipseOverflow`}>{props.title}</p>
               <p className={s.cardSubTitle}>{props.songsCount ? `${props.songsCount} songs` : 'Empty'}</p>
            </div>
         </div>
      </Link>
   );
}

export const CardSkeleton = () => {
   return (
      <TransitionSkeleton dark={true} height={'auto'} width={'auto'} styles={{ padding: 12, margin: 0 }}>
         <TransitionSkeleton styles={{ paddingBottom: '100%' }} width={'auto'} height={'auto'} />
         <div className={s.cardTitle}>
            <TransitionSkeleton width={'80%'} height={12} />
         </div>
         <div className={s.cardSubTitle}>
            <TransitionSkeleton width={'35%'} height={8} />
         </div>
      </TransitionSkeleton>
   );
}

export const MobileCardSkeleton = () => {
   return (
      <div className={s.cardBody}>
         <div className={s.cardImage}>
            <TransitionSkeleton width={'auto'} height={'auto'} styles={{ paddingBottom: '100%' }} />
         </div>
         <div className={s.cardInfo}>
            <TransitionSkeleton width={'65%'} height={12} />
            <TransitionSkeleton width={'20%'} height={8} />
         </div>
      </div>
   );
}

export const LikedSongsCard: React.FC = () => {
   return (
      <Link to={RouteLinks.LIKED_SONGS} className={s.likedSongs}>
         <p>Liked Songs</p>
      </Link>
   );
}

export default Card;