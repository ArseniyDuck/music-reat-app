import React from 'react';
import s from './Cards.module.scss';
import { Plus } from 'icons';

type PropsType = {
   onClick: () => void
};

const CreatePlaylistButton: React.FC<PropsType> = (props) => {
   return (
      <button className={s.card} onClick={props.onClick} style={{ width: '100%', textAlign: 'left' }}>
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

export default CreatePlaylistButton;