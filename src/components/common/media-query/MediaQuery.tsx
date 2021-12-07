import React from 'react';
import { useWindowSize } from 'tools/hooks';
import { breakpoints } from 'tools/variables';

type PropsType = {
   mode: 'max-width' | 'min-width'
   width: keyof typeof breakpoints
};

const MediaQuery: React.FC<PropsType> = (props) => {
   const { width } = useWindowSize();
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