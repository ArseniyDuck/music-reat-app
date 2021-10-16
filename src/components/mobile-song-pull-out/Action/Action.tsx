import React from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../../icons/arrow/Arrow';
import s from './Action.module.scss';

type PropsType = {
   href?: string
   hide?: () => void
   onClick?: () => void
   isArrow?: boolean
};

const Action: React.FC<PropsType> = (actionProps) => {
   const ActionBodyTag: React.FC = (bodyProps) => {
      return <>
         {actionProps.href ?
            <Link to={actionProps.href} onClick={actionProps.hide} className={s.action}>
               {bodyProps.children}
            </Link>
            :
            <button className={s.action} onClick={actionProps.onClick}>
               {bodyProps.children}
            </button>
         }
      </>;
   };
   
   return (
      <ActionBodyTag>
         {actionProps.children}
         { actionProps.isArrow && (
            <span className={s.arrow}>
               <Arrow size={16} direction='right' />
            </span>
         )}
      </ActionBodyTag>
   );
};

export default Action;