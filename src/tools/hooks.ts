import { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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