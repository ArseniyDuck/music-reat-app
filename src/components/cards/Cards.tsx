import React from 'react';
import { Link } from 'react-router-dom';
import s from './Cards.module.scss';
import { Music, Plus } from 'icons';
import { RouteLinks } from 'app-routing';
import { conditionClassName } from 'tools/functions';


type PropsType = {
   title: string,
   subTitle: string
   linkTo: string,
   image?: string | null,
   imageComponent?: React.ComponentType
   isRound?: boolean
}

const Card: React.FC<PropsType> = (props) => {
   return (
      <Link to={props.linkTo} className={s.card}>
         <div className={`${s.cardBody} cropTextContainer`}>
            <div className={`${conditionClassName(s.cardImage, !!props.isRound, s.round)} ibg`}>
               {
                  // If image is a component:
                  props.imageComponent ?
                  <props.imageComponent /> :
                  
                  // If image is a path
                  props.image ? <img src={props.image} alt='album' /> :
                     <Music
                        size={50}
                        fillColor='var(--dark-grey)'
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
            <p className={`${s.cardSubTitle  } ellipseOverflow`}>{props.subTitle}</p>
            </div>
         </div>
      </Link>
   );
}

export const CardsContainer: React.FC = ({ children }) => {
   return (
      <div className={s.grid}>{children}</div>
   )
};


export const LikedSongsCard: React.FC = () => (
   <Link to={RouteLinks.LIKED_SONGS} className={s.likedSongs}>
      <p>Liked Songs</p>
   </Link>
);


export const CreatePlaylistMobileCard: React.FC<{onClick: () => void}> = ({ onClick }) => {
   return (
      <button className={s.card} onClick={onClick} style={{ width: '100%', textAlign: 'left' }}>
         <div className={`${s.cardBody} cropTextContainer`}>
            <div className={`${s.cardImage} ibg`}>
               <Plus
                  size={35}
                  isFilled={false}
                  styles={{
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)'
                  }}
               />
            </div>
            <div className={s.cardInfo}>
               <p className={`${s.cardTitle} ellipseOverflow`}>Create Playlist</p>
            </div>
         </div>
      </button>
   );
};


export default Card;