import React from 'react';
import { Link } from 'react-router-dom';
import { conditionClassName } from '../../tools/functions';
import s from './AsideActions.module.scss';

type AsideButtonPropsType = {
   size?: 'small' | 'large'
   onClick: () => void
};

export const AsideButton: React.FC<AsideButtonPropsType> = ({ onClick, size='small', children }) => {
   return (
      <button onClick={onClick} className={conditionClassName(s.button, size === 'large', s.large)}>
         {children}
      </button>
   );
};


type AsideLinkPropsType = { to: string };

export const AsideLink: React.FC<AsideLinkPropsType> = ({ to, children }) => {
   return (
      <Link to={to} className={s.link}>
         {children}
      </Link>
   );
};