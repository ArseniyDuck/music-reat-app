import React, { useState, useEffect, useRef, useCallback } from 'react';
import { dynamicAttr } from '../../../tools/functions';
import s from './Dropdown.module.scss';


type PropsType = {
   isOverflow?: boolean
   trackVerticalPosition?: boolean
   initialPosition: 'top' | 'bottom'
   event: 'focus' | 'hover'
   LabelComponent: React.ComponentType
};

/* needed to create an object whose disstructuring dynamically (depending on props)
adds an event handler to the label */
const eventObj = {
   'hover': 'onMouseEnter',
   'focus': 'onFocus'
};

const Dropdown: React.FC<PropsType> & { Item: typeof DropdownItem } = ({ children, LabelComponent, event, ...props }) => {
   // dropdown position state
   const [isDropDownTopPositioned, setIsDropDownTopPositioned] = useState(props.initialPosition === 'top');

   /* reference to dropdown label.
   used to figure out how to open the dropdown: top or bottom of the label */
   const labelRef = useRef<HTMLDivElement>(null);
   
   /* if the dropdown opens on the right side of the screen,
   but the viewport is too narrow, dropdown scrolling is added.
   so the user can reach all the buttons. */
   const [dropDownMaxHeight, setDropDownMaxHeight] = useState(100);

   /* reference to dropdown list.
   used to calculate the maximum dropdown height */
   const dropDownRef = useRef<HTMLUListElement>(null);

   const calculateAndSetMaxHeight = useCallback(() => {
      if (isDropDownTopPositioned) {
         /* if the dropdown is open from the top of the label,
         its maximum width is equal to the distance
         from thetop of the viewport to the bottom of the dropdown itself */
         setDropDownMaxHeight(dropDownRef.current?.getBoundingClientRect().bottom as number);
      } else {
         /* if the dropdown is open from the bottom of the label,
         its maximum width is equal to the difference
         between the height of the viewport and the top of the dropdown itself */
         setDropDownMaxHeight(window.innerHeight - Math.abs(dropDownRef.current?.getBoundingClientRect().top as number));
      }
   }, [isDropDownTopPositioned, setDropDownMaxHeight, dropDownRef]);

   // needed to synchronize the maximum height
   useEffect(() => calculateAndSetMaxHeight(), [isDropDownTopPositioned, calculateAndSetMaxHeight]);

   /* a handler function that fires on an event passed through props.
   does not have access to the current value of the dropdown position.
   synchronization is handled by useEffect, described above. */
   const eventCallback = () => {
      if (props.trackVerticalPosition) {
         /* if the label is located above the middle of the viewport,
         the dropdown will open at the bottom of the label and vice versa */
         setIsDropDownTopPositioned(labelRef.current?.getBoundingClientRect().y as number > window.innerHeight / 2);
      }
      if (props.isOverflow) {
         calculateAndSetMaxHeight();
      }
   };
   
   // todo: recieve position values (top, bottom etc.) from props
   /* todo: create global class for styling DropdownItem
   or recieve 'small' or 'large' from props */

   return <div className={s.dropDownWrapper}>
      <div tabIndex={-1} ref={labelRef} className={`${s.dropdownLabel} ${s[`event${event.charAt(0).toUpperCase()}${event.slice(1)}`]}`} {...dynamicAttr(eventObj[event], eventCallback)}>
         <LabelComponent />
         <div className={`${s.dropdownBody} ${props.trackVerticalPosition ? (isDropDownTopPositioned ? s.topPositioned : s.bottomPositioned) : s.defaultPositioned}`}>
            <ul ref={dropDownRef} className={props.isOverflow ? `${s.dropDownList} ${s.overflow}` : s.dropDownList} style={props.isOverflow ? {maxHeight: dropDownMaxHeight} : undefined}>
               { children }
            </ul>
         </div>
      </div>
   </div>;
};

const DropdownItem: React.FC = ({ children }) => {
   return (
      <li className={s.dropDownItem}>
         { children }
      </li>
   );
};

// export 
Dropdown.Item = DropdownItem
export default Dropdown;

/*
// ------------------------------------------------------------------------
type NewDropdownPropsType = {
   isOverflow?: boolean
   trackVerticalPosition?: boolean
   initialPosition: 'top' | 'bottom'
   event: 'focus' | 'hover'
   LabelComponent: React.ComponentType
};

const Dropdown: React.FC<NewDropdownPropsType> & { Item: typeof DropdownItem } = ({ children, LabelComponent, event, ...props }) => {
   const [isDropDownTopPositioned, setIsDropDownTopPositioned] = useState(props.initialPosition === 'top');
   const [isDropdownOpened, setIsDropdownOpened, dropdownBodyRef] = usePopUp<HTMLDivElement>();

   const labelRef = useRef<HTMLDivElement>(null);

   const [dropDownMaxHeight, setDropDownMaxHeight] = useState(100);

   const dropDownRef = useRef<HTMLUListElement>(null);

   const calculateAndSetMaxHeight = useCallback(() => {
      if (isDropDownTopPositioned) {
         setDropDownMaxHeight(dropDownRef.current?.getBoundingClientRect().bottom as number);
      } else {
         setDropDownMaxHeight(window.innerHeight - Math.abs(dropDownRef.current?.getBoundingClientRect().top as number));
      }
   }, [isDropDownTopPositioned, setDropDownMaxHeight, dropDownRef]);

   useEffect(() => calculateAndSetMaxHeight(), [isDropDownTopPositioned, calculateAndSetMaxHeight]);

   const eventCallbackCreator = (func: () => void) => () => {
      if (props.trackVerticalPosition) {
         setIsDropDownTopPositioned(labelRef.current?.getBoundingClientRect().y as number > window.innerHeight / 2);
      }
      if (props.isOverflow) {
         calculateAndSetMaxHeight();
      }

      func();
   };

   type eventsType = {
      onClick?: () => void
      onMouseEnter?: () => void
      onMouseLeave?: () => void
   };

   let executableEvent: eventsType = {};

   switch (event) {
      case 'focus':
         executableEvent.onClick = eventCallbackCreator(() => setIsDropdownOpened(prev => !prev));
         break;
      case 'hover':
         executableEvent.onMouseEnter = eventCallbackCreator(() => setIsDropdownOpened(true));
         // executableEvent.onMouseLeave = eventCallbackCreator(() => setyIsDropdownOpened(false));
         break;
   }

   return (
      <div className={s.dropDownWrapper}>
         <div className={s.label} ref={labelRef} {...executableEvent}>
            <LabelComponent />
         </div>
         <div ref={dropdownBodyRef} className={`${s.dropdownBody} ${isDropdownOpened && s.opened} ${props.trackVerticalPosition ? (isDropDownTopPositioned ? s.topPositioned : s.bottomPositioned) : s.defaultPositioned}`}>
            <ul ref={dropDownRef} className={props.isOverflow ? `${s.dropDownList} ${s.overflow}` : s.dropDownList} style={props.isOverflow ? {maxHeight: dropDownMaxHeight} : undefined}>
               { children }
            </ul>
         </div>
      </div>
   );
}

const DropdownItem: React.FC = ({ children }) => {
   return (
      <li className={s.dropDownItem}>
         { children }
      </li>
   );
};

Dropdown.Item = DropdownItem
export default Dropdown;
*/