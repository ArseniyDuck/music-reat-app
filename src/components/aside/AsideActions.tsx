import React from 'react';
import { Link } from 'react-router-dom';
import s from './AsideActions.module.scss';

type AsideButtonPropsType = {
   onClick: () => void
};

export const AsideButton: React.FC<AsideButtonPropsType> = ({ onClick, children }) => {
   return (
      <button onClick={onClick} className={s.button}>
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