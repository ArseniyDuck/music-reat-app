import React from 'react';
import { Link } from 'react-router-dom';
import s from './Banner.module.scss';

type PropsType = {
   photo: string
   name: string
   bannerPreHeading: 'Album' | 'Playlist'
   linkPhoto?: string
   linkText: string
   linkUrl: string
   year?: number
   songsCount: number
   duration: string
   rgbColor: string
};

const Banner: React.FC<PropsType> = (props) => {
   return (
      <section className={s.banner} style={{background: `linear-gradient(transparent 0, rgba(0,0,0,.5) 100%), ${props.rgbColor}`}}>
         <div className={s.image + ' ibg'}>
            { props.photo && <img src={props.photo} alt='banner' /> }
         </div>
         <div className={s.bannerBody}>
            <p className={s.preHeading}>{props.bannerPreHeading}</p>
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
               { props.year && <p>{props.year}</p> }
               <p>{props.songsCount} songs</p>
               <p>{props.duration}</p>
            </div>
         </div>
      </section>
   );
};

export default Banner;