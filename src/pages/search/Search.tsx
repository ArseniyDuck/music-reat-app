import React from 'react';
import s from './Search.module.scss';

type PropsType = {};

const Search: React.FC<PropsType> = (props) => {
   return (
      <h1 className={s.heading}>Search</h1>
   );
};

export default Search;