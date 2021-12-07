import React from 'react';
import s from './withLoading.module.scss';
import { Spinner } from 'icons';
import { RouteComponentProps } from 'react-router';


type ContainerPropsType = {
   isFetching: boolean
   error: string | null
};

// todo: use withLoading HOC in Playlist and Album
function withLoading<P extends RouteComponentProps<{}>>(Component: React.ComponentType<P>) {
   const ContainerComponent: React.FC<ContainerPropsType & P> = ({ isFetching, error, ...passThroughProps }) => {
      return <>
         {isFetching ? 
            // if fetching data, show spinner
            <div className={s.spinnerBody}>
               <Spinner size={45} />
            </div>
            :
            // if fetched, but with an error, show error
            error ?
            <h1 className='error'>{error}</h1>
            :
            // else show content
            // @ts-ignore
            <Component {...passThroughProps} />
         }
      </>;
   };

   return ContainerComponent;
};

export default withLoading;