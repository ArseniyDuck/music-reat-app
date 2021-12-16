import { useState, useEffect, useRef } from 'react';
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


// usePopUp -----------------------------------
export const usePopUp = <E extends HTMLElement>() => {
   const [isPopUpOpened, setIsPopUpOpened] = useState<boolean>(false);
   const popUpRef = useRef<E>(null);
   
   useEffect(() => {
      const handleClick = (event: MouseEvent) => {
         if (popUpRef.current) {
            const { top, bottom, left, right } = popUpRef.current.getBoundingClientRect();
            // click was ouside the popUpRef
            if (isPopUpOpened && !((left <= event.x && event.x <= right) && (top <= event.y && event.y <= bottom))) {
               setIsPopUpOpened(false);
            }
         }
      }
      document.addEventListener('click', handleClick);
      return () => {
         document.removeEventListener('click', handleClick);
      }
   }, [isPopUpOpened]);

   return [isPopUpOpened, setIsPopUpOpened, popUpRef] as const;
};


// useBannerHeight -----------------------------------
export const useBannerHeight = <E extends HTMLElement>() => {
   const bannerRef = useRef<E>(null);
   const [bannerHeight, setBannerHeight] = useState<number | undefined>();

   return [bannerRef, bannerHeight, setBannerHeight] as const;
};


// useInputType -----------------------------------
export const useInputType = () => {
   const [inputType, setInutType] = useState<'password' | 'text'>('password');
   const handleEyeClick = () => setInutType(prev => {
      return prev === 'password' ? 'text' : 'password';
   });

   return [inputType, handleEyeClick] as const;
}


// useAuth -----------------------------------
export const useAuth = () => {
   const id = useAppSelector(state => state.auth.user.id);
   return !!id;
}


// useDisableScroll -----------------------------------
export const useDisableScroll = (flag: boolean) => {
   useEffect(() => {
      if (flag) {
         document.body.classList.add('_disable-scroll');
      } else {
         document.body.classList.remove('_disable-scroll');
   }
      return () => {
         document.body.classList.remove('_disable-scroll');
      }
   }, [flag]);
}