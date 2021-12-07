import React from 'react';
import { Link } from 'react-router-dom';
import { RouteLinks } from 'app-routing';
import s from './Playlist.module.scss';

type PropsType = {
   id: number
   name: string
};

const Playlist: React.FC<PropsType> = ({ id, name }) => {
   return (
      <Link to={`${RouteLinks.PLAYLIST}/${id}`} className={s.playlist}>
         <p className={s.playlistName}>{name}</p>
      </Link>
   );
};

export default Playlist;