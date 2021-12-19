import React from 'react';
import { withBanner } from 'high-order-components';
import s from './SingerBanner.module.scss';
import { Heart } from 'icons';

type PropsType = {
   title: string
   photo: string | null
   genres: string[]
   likesCount: number
   color: string
};

const SingerBanner: React.FC<PropsType> = (props) => {
   const gradient = `linear-gradient(transparent 0, rgba(0,0,0, .5) 100%), ${props.color}`;

   return (
      <div className={s.banner} style={{background: gradient}}>
         <div className={`ibg ${s.bannerPhoto}`}>
            {props.photo && <img src={props.photo} alt='singer' />}
         </div>
         <div className={s.content}>
            <p className={s.singerName}>{props.title}</p>
            <div className={s.metadata}>
               <p>{props.genres.join(', ')}</p>
               <p className={s.singerFollowings}>
                  <Heart color='pink' isLiked={false} />
                  <span>{props.likesCount} are following</span>
               </p>
            </div>
         </div>
      </div>
   );
};

export default withBanner(SingerBanner);