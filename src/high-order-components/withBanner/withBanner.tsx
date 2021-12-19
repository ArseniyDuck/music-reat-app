import React, { RefObject, useEffect } from 'react';

type ContainerPropsType = {
   bannerRef: RefObject<HTMLDivElement>
   setBannerHeight: (height: number) => void
};

const withBanner = function<P>(Component: React.ComponentType<P>) {
   const ContainerComponent: React.FC<ContainerPropsType & P> = ({ bannerRef, setBannerHeight, ...passThroughProps }) => {
      useEffect(() => {
         setBannerHeight(bannerRef.current?.offsetHeight as number);
      }, [setBannerHeight, bannerRef]);

      return (
         <div ref={bannerRef}>
            {/* @ts-ignore */}
            <Component {...passThroughProps} /> 
         </div>
      )
   };

   return ContainerComponent;
};

export default withBanner;