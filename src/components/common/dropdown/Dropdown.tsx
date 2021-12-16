import React, { useCallback, useEffect, useRef, useState } from 'react';
import { conditionClassName } from 'tools/functions';
import { useDisableScroll, usePopUp } from 'tools/hooks';
import s from './NewDropdown.module.scss';


type PropsType = {
   label: React.ReactElement
   showOn: 'hover' | 'click'
   initialPosition: 'top' | 'bottom'
   dropdownStyles?: React.CSSProperties
   isOverflow?: boolean
   trackVerticalPosition?: boolean
}

export const Dropdown: React.FC<PropsType> = (props) => {
   const [isOpened, setIsOpened, dropdownRef] = usePopUp<HTMLDivElement>();
   useDisableScroll(isOpened); // disable body scroll
   const labelRef = useRef<HTMLButtonElement>(null);

   const [maxHeight, setMaxHeight] = useState(0);
   const [isTopPositioned, setIsTopPositioned] = useState(props.initialPosition === 'top');

   const calculateAndSetMaxHeight = useCallback(() => {
      if (isTopPositioned) {
         setMaxHeight(dropdownRef.current?.getBoundingClientRect().bottom as number);
      } else {
         setMaxHeight(window.innerHeight - Math.abs(dropdownRef.current?.getBoundingClientRect().top as number));
      }
   }, [isTopPositioned, setMaxHeight, dropdownRef]);

   // sync maxHeight
   useEffect(() => {
      calculateAndSetMaxHeight();
   }, [isTopPositioned, calculateAndSetMaxHeight]);
   
   // runs some logic on each possible showOn event
   const eventCallbackCreator = (func?: () => void) => () => {
      func && func();
      if (props.trackVerticalPosition) {
         setIsTopPositioned(labelRef.current?.getBoundingClientRect().y as number > window.innerHeight / 2);
      }
      if (props.isOverflow) {
         calculateAndSetMaxHeight();
      }
   };

   // onClick event listener
   const toggleDropdownState = eventCallbackCreator(() => {
      setIsOpened(prev => !prev);
   });

   //  onMouseEnter event listener. sync position on hover if showOn=='hover'
   const hoverEventListener: any = {};
   if (props.showOn === 'hover') {
      hoverEventListener.onMouseEnter = eventCallbackCreator();
   }
   
   // use CSS to set position of dropdown
   let dropdownBodyClassName = s.dropdownBody;
   if (props.showOn === 'click') {
      dropdownBodyClassName += ` ${s.clickIsEnabled}`
   }
   if (isOpened) {
      dropdownBodyClassName += ` ${s.clicked}`
   }
   if (props.trackVerticalPosition) {
      if (isTopPositioned) {
         dropdownBodyClassName += ` ${s.topPositioned}`
      } else {
         dropdownBodyClassName += ` ${s.bottomPositioned}`
      }
   } else {
      dropdownBodyClassName += ` ${s.defaultPositioned}`
   }
   if (props.isOverflow) {
      dropdownBodyClassName += ` ${s.overflow}`
   }

   return <>
      <div className={conditionClassName(s.dropdown, props.showOn === 'hover', s.hoverIsEnabled)}>
         {/* Label element */}
         <button onClick={toggleDropdownState} {...hoverEventListener} className={s.label} ref={labelRef}>
            {props.label}
         </button>

         {/* Dropdown element */}
         <div
            ref={dropdownRef}
            className={dropdownBodyClassName}
            style={{
               maxHeight: props.isOverflow ? maxHeight : 'auto',
               ...props.dropdownStyles,
            }}
         >
            {props.children}
         </div>
      </div>
   </>;
}

export default Dropdown;