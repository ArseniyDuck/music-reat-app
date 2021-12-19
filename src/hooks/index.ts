import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { useAuth } from './useAuth';
import { useBannerHeight } from './useBannerHeight';
import { useDisableScroll } from './useDisableScroll';
import { useInputType } from './useInputType';
import { useOpacity } from './useOpacity';
import { usePopUp } from './usePopUp';
import { useWindowSize } from './useWindowSize';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
   useAuth,
   useBannerHeight,
   useDisableScroll,
   useInputType,
   useOpacity,
   usePopUp,
   useWindowSize,
}