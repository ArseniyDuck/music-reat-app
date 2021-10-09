import React, { useState } from 'react';
import s from './MobileSongPullOut.module.scss';
import { conditionClassName } from '../../tools/functions';

type PropsType = {
   isOpened: boolean
   hide: () => void
};

const MobileSongPullOut: React.FC<PropsType> = ({ isOpened, hide }) => {
   const wrapperCLassName = conditionClassName(s.wrapper, isOpened, s.opened);

   return (
      <div className={wrapperCLassName}>
         <div className={s.body}>Hello world</div>
         <button onClick={hide} className={s.cancel}>Cancel</button>
      </div>
   );
};

export default MobileSongPullOut;