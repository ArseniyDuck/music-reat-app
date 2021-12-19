import React from 'react';
import s from './ButtonsContainer.module.scss';

type PropsType = {};

const ButtonsContainer: React.FC<PropsType> = (props) => {
   return (
      <div className={s.container}>{props.children}</div>
   );
};

export default ButtonsContainer;