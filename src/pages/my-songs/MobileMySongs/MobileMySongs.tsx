import React from 'react';
import { Link } from 'react-router-dom';
import { NestedRouteLinks } from 'app-routing';
import s from './MobileMySongs.module.scss';
import { Music, CdDisk, Headphones, Arrow } from 'icons';


type PropsType = {};

const MobileMySongs: React.FC<PropsType> = (props) => {
   return <>
      <h1 className='mobilePageHeading'>My songs</h1>

      <Link to='/liked' className={`${s.section} ${s.likedSongs}`}>
         <div className={s.likedImage}></div>
         <div className={s.likedDetails}>
            <p className={s.text}>Liked songs</p>
            <p className={s.lightText}>This includes all tracks marked with a "heart"</p>
         </div>
      </Link>

      <Link to={NestedRouteLinks.PLAYLISTS} className={`${s.section} ${s.link} ${s.margin} ${s.text}`}>
         <Music size={25} fillColor='#fff' />
         Playlists
         <Arrow direction='right' size={15} styles={{ marginLeft: 'auto'}} />
      </Link>
      <Link to={NestedRouteLinks.ALBUMS} className={`${s.section} ${s.link} ${s.text}`}>
         <CdDisk size={25} styles={{ strokeWidth: 5 }} />
         Albums
         <Arrow direction='right' size={15} styles={{ marginLeft: 'auto'}} />
      </Link>
      <Link to={NestedRouteLinks.SINGERS} className={`${s.section} ${s.link} ${s.text}`}>
         <Headphones size={26} />
         Singers
         <Arrow direction='right' size={15} styles={{ marginLeft: 'auto'}} />
      </Link>

      <div className={`${s.section} ${s.margin} ${s.recently}`}>
         <p className={`${s.text} ${s.bold}`}>Recently played</p>
      </div>
   </>;
};

export default MobileMySongs;