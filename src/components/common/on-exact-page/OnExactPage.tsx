import React from 'react';
import { useLocation } from 'react-router';
import s from './OnExactPage.module.scss';

type PropsType = {
   isOnPage: boolean,
   page: string
};

const OnExactPage: React.FC<PropsType> = (props) => {
   const location = useLocation();

   let locationCondition;
   if (props.isOnPage) {
      locationCondition = (location.pathname === props.page)
   } else {
      locationCondition = (location.pathname !== props.page)  
   }
   
   return <>{locationCondition && props.children}</>;
}

export default OnExactPage;