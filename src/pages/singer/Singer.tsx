import { Dropdown } from 'components/common/dropdown/Dropdown';
import { Heart } from 'icons';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import s from './Singer.module.scss';

type PathParamsType = { singerId: string };

type PropsType = {};

const Singer: React.FC<PropsType & RouteComponentProps<PathParamsType>> = ({ match: {params: {singerId}} }) => {
   return <>
      <h1 style={{color: '#000', fontSize: 40}}>Singer with id={singerId}</h1>
   </>;
};

export default Singer;