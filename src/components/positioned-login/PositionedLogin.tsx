import { RouteLinks } from 'app-routing';
import React from 'react';
import { Link } from 'react-router-dom';
import s from './PositionedLogin.module.scss';

type PropsType = {};

const PositionedLogin: React.FC<PropsType> = (props) => {
   return (
      <Link className={s.link} to={RouteLinks.SIGN_IN}>Sign In</Link>
   );
};

export default PositionedLogin;