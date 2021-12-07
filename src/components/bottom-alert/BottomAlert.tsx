import React from 'react';
import { conditionClassName } from 'tools/functions';
import { useAppSelector } from 'tools/hooks';
import s from './BottomAlert.module.scss';

type PropsType = {};

const BottomAlert: React.FC<PropsType> = (props) => {
   const { message, messageStatus, isShown } = useAppSelector(state => state.bottomAlert);

   let statusClassName;
   switch (messageStatus) {
      case 'ok':
         statusClassName = s.green
         break;
      case 'warning':
         statusClassName = s.yellow
         break;
      case 'error':
         statusClassName = s.red
         break;
   }

   return (
      <div className={conditionClassName(`${s.body} ${statusClassName}`, isShown, s.active)}>
         <span className={s.message}>{message}</span>
      </div>
   );
};

export default BottomAlert;