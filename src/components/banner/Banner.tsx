import React, { RefObject, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from '../common/media-query/MediaQuery';
import s from './Banner.module.scss';

type PropsType = {
   bannerRef: RefObject<HTMLElement>
   setBannerHeight: (height: number) => void
   name: string
   photo: string
   subTitle: 'Album' | 'Playlist'
   linkPhoto?: string
   linkText: string
   linkUrl: string
   year?: number
   songsCount: number
   duration: string
   rgbColor: string
};

const Banner: React.FC<PropsType> = ({setBannerHeight, bannerRef, ...props}) => {
   useEffect(() => {
      setBannerHeight(bannerRef.current?.offsetHeight as number);
   }, [setBannerHeight, bannerRef]);

   return (
      <section ref={bannerRef} className={s.banner} style={{background: `linear-gradient(transparent 0, rgba(0,0,0,.5) 100%), ${props.rgbColor}`}}>
         <div className={s.image + ' ibg'}>
            { props.photo && <img src={props.photo} alt='banner' /> }
         </div>
         <div className={s.bannerBody}>
            <MediaQuery mode='min-width' width='sm'>
               <p className={s.preHeading}>{props.subTitle}</p>
            </MediaQuery>
            {/* todo: change font-size depending on AlbumName's length */}
            <h1 className={s.heading}>{props.name}</h1>
            <div className={s.metadata}>
               <Link to={props.linkUrl} className={s.linkToSomebody}>
                  { props.linkPhoto && 
                     <div className={s.linkPhoto + ' ibg'}>
                        <img src={props.linkPhoto} alt='singer' />
                     </div>
                  }
                  <span className={s.linkText}>{props.linkText}</span>
               </Link>
               <MediaQuery mode='max-width' width='sm'>
                  <p className={s.preHeading}>{props.subTitle}</p>
               </MediaQuery>
               { props.year && <p>{props.year}</p> }
               <p>{props.songsCount} songs</p>
               {/* todo: get new duration after removing song */}
               <p>{props.duration}</p>
            </div>
         </div>
      </section>
   );
};

export default Banner;