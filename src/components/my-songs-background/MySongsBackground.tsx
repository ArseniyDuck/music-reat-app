import { Heart } from 'icons';
import React from 'react';
import s from './MySongsBackground.module.scss';

type PropsType = {};

const MySongsBackground: React.FC<PropsType> = (props) => {
   return (
      <div className={s.bg}>
         <Heart styles={{ width: '35%', height: '35%' }} isLiked={false} color='pink' />
      </div>
   );
};

export default MySongsBackground;