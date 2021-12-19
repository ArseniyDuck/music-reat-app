import React from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from 'icons';
import s from './Action.module.scss';

type PropsType = {
   to?: string
   close?: () => void
   onClick?: () => void
   isArrow?: boolean
};

const Action: React.FC<PropsType> = (actionProps) => {
   // todo: refactor component inside another component

   const ActionBodyTag: React.FC = (bodyProps) => {
      return <>
         {actionProps.to ?
            <Link to={actionProps.to} onClick={actionProps.close} className={s.action}>
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