import React from 'react';
import { breakpoints } from 'tools/variables';
import { useGlobalContext } from 'globalContext';

type PropsType = {
   mode: 'max-width' | 'min-width'
   width: keyof typeof breakpoints
};

const MediaQuery: React.FC<PropsType> = (props) => {
   const { windowSize: { width } } = useGlobalContext()
   let checkQueryCondition: (() => boolean);

   switch (props.mode) {
      case 'max-width':
         checkQueryCondition = () => breakpoints[props.width] >= width;
         break;
      case 'min-width':
         checkQueryCondition = () => breakpoints[props.width] < width;
         break;
      default:
         checkQueryCondition = () => false;
   }

   return <>
      { checkQueryCondition() && props.children }
   </>;
};

export default MediaQuery;