import React, { useEffect } from 'react';
import { useAppDispatch, useAuth } from 'hooks';
import { clearPlaylist, fetchSmallPlaylists } from 'redux/playlists-reducer';
import { MediaQuery } from 'components/common';


const withMobilePlaylists = function<P>(Component: React.ComponentType<P>): React.ComponentType<P> {
   const FetchPlaylists: React.FC = () => {
      const dispatch = useAppDispatch();
      const isAuth = useAuth();

      useEffect(() => {
         if (isAuth) {
            dispatch(fetchSmallPlaylists());
         }

         return () => {
            dispatch(clearPlaylist());
         }
      }, [dispatch, isAuth]);

      return null
   }

   const ContainerComponent: React.FC<P> = (props) => {
      return <>
         <MediaQuery mode='max-width' width='lg'>
            <FetchPlaylists />
         </MediaQuery>
         <Component {...props} />
      </>
   };

   return ContainerComponent;
};

export default withMobilePlaylists;