import React from 'react';

type ContainerPropsType = {
   size?: number
   styles?: React.CSSProperties
};

export type WrappedIconType = { styles: React.CSSProperties };

const withIcon = <P extends WrappedIconType>(Component: React.ComponentType<P>) => {
   const ContainerComponent: React.FC<ContainerPropsType & Omit<P, keyof WrappedIconType>> = ({ size, styles, ...passThroughProps }) => {
      const computedStyles = {
         ...styles,
         width: size ? `${size}px` : '15x',
         height: size ? `${size}px` : '15px',
      };
      
      // @ts-ignore
      return <Component styles={computedStyles} {...passThroughProps} /> 
   };

   return ContainerComponent;
};

export default withIcon;