import React from 'react';
import { conditionClassName } from '../../tools/functions';
import s from './withPopUp.module.scss';


type ContainerPropsType = {
   isOpened: boolean
   popUpRef: React.RefObject<HTMLDivElement>
   close: () => void
   heading: string
};

export type WrappedPopUpType = { close: () => void };

const withPopUp = <P extends WrappedPopUpType>(Component: React.ComponentType<P>) => {
   const ContainerComponent: React.FC<ContainerPropsType & P> = ({ isOpened, popUpRef, heading, ...passThroughProps }) => {
      return (
         <div className={conditionClassName(s.selectWrapper, isOpened, s.selectOpened)}>
            <div className={s.selectBody} ref={popUpRef}>
               <h3 className={s.selectHeading}>{heading}</h3>
               {/* @ts-ignore */}
               <Component {...passThroughProps} />
            </div>
         </div>
      );
   };

   return ContainerComponent;
};

export default withPopUp;