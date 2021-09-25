import { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';


// React Redux Typed hooks -----------------------------------
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// useOpacityPercentWithWindowScroll -----------------------------------
export const useOpacityPercentWithWindowScroll = (startTransition: number, finishTransition: number) => {
   const [opacityPercentage, setOpacityPercentage] = useState(0);

   useEffect(() => {
      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   });

   const handleScroll = () => {
      let diff = window.scrollY - startTransition;
      if (diff < 0) {
         diff = 0
      }

      let opacityValue = diff / (finishTransition - startTransition);
      if (opacityValue > 1) {
         opacityValue = 1
      }
      
      setOpacityPercentage(opacityValue);
   };

   return opacityPercentage;
};


// useWindowSize -----------------------------------
export type WindowSizeType = {
   width: number
   height: number
};

export const useWindowSize = (): WindowSizeType => {
   function getWindowDimensions(): WindowSizeType {
      const { innerWidth: width, innerHeight: height } = window;
      return { width, height };
   };
   
   const [windowDimensions, setWindowDimensions] = useState<WindowSizeType>(getWindowDimensions());

   useEffect(() => {
      const handleResize = () => {
         setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return windowDimensions;
};