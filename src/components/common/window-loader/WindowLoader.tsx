import React from 'react';
import s from './WindowLoader.module.scss';
import { Error, Spinner } from 'icons';

type PropsType = {
   isFetching: boolean
   error: string | null
};

const WindowLoader: React.FC<PropsType> = (props) => {
   return <>
      {props.isFetching ? 
         // if fetching data, show spinner
         <div className={s.fullscreen}>
            <Spinner size={45} />
         </div>
         :
         // if fetched, but with an error, show error
         props.error ?
         <div className={s.fullscreen}>
            <Error size={40} fillColor='red' />
            <p className={s.error}>{props.error}</p>
         </div>
         :
         // else show content
         // @ts-ignore
         props.children
      }
   </>;
};

export default WindowLoader;