import React from 'react';
import { Link } from 'react-router-dom';
import s from './CollectionsBanner.module.scss';
import { withBanner } from 'high-order-components';

type PropsType = {
   name: string
   photo: string | React.ComponentType
   subTitle: 'Album' | 'Playlist'
   linkPhoto?: string
   linkText: string
   linkUrl: string
   year?: number
   songsCount: number
   duration: string
   color: string
};

const CollectionsBanner: React.FC<PropsType> = (props) => {
   const gradient = `linear-gradient(transparent 0, rgba(0,0,0, .5) 100%), ${props.color}`

   return (
      <section className={s.banner} style={{background: gradient}}>
         <BannerImage photo={props.photo} />
         <div className={s.bannerBody}>
            <p className={s.preHeadingDesktop}>{props.subTitle}</p>
            {/* todo: change font-size depending on AlbumName's length */}
            <h1 className={s.heading}>{props.name}</h1>
            <div className={s.metadata}>
               <BannerLink to={props.linkUrl} text={props.linkText} photo={props.linkPhoto} />
               <p className={s.preHeadingMobile}>{props.subTitle}</p>
               {props.year && <p>{props.year}</p>}
               <p>{props.songsCount} songs</p>
               {/* todo: get new duration after removing song */}
               <p>{props.duration}</p>
            </div>
         </div>
      </section>
   );
};

const BannerImage: React.FC<{photo: string | React.ComponentType}> = (props) => {
   return (
      <div className={`${s.image} ibg`}>
         {props.photo && (typeof props.photo === 'string' ?
            <img src={props.photo} alt='banner' /> :
            <props.photo />)
         }
      </div>
   );
}

const BannerLink: React.FC<{ to: string, text: string, photo?: string }> = (props) => {
   return (
      <Link to={props.to} className={s.linkToSomebody}>
         {props.photo && (
            <div className={`${s.linkPhoto} ibg`}>
               <img src={props.photo} alt='singer' />
            </div>
         )}
         <span className={s.linkText}>{props.text}</span>
      </Link>
   );
}

export default withBanner(CollectionsBanner);