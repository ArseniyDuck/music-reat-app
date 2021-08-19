import React, { CSSProperties, useLayoutEffect, useRef, useState } from 'react';

type PropsType = {
   defaultWrapperClasses?: string
   stuckClasses?: string
   unstuckClasses?: string
   stuckStyles?: CSSProperties
   unstuckStyles?: CSSProperties
};

const Sticky: React.FC<PropsType> = ({ defaultWrapperClasses="", stuckClasses="", unstuckClasses="", stuckStyles={}, unstuckStyles={}, children }) => {
   const [isStuck, setIsStuck] = useState(false)
   const wrapperRef = useRef<HTMLDivElement>(null);
 
   const classes = isStuck ? stuckClasses : unstuckClasses
   const styles = isStuck ? stuckStyles : unstuckStyles
 
   useLayoutEffect(() => {
      const copiedCurrent = wrapperRef.current;
      const observer = new IntersectionObserver(
         (entries) => setIsStuck(!entries[0].isIntersecting),
         { threshold: 1.0 }
      );
      if (copiedCurrent) {
         observer.observe(copiedCurrent)
      }
      return () => {
         if (copiedCurrent) {
            observer.unobserve(copiedCurrent)
         }
      };
   }, [wrapperRef])
 
   return <>
      {/* todo: get height from props */}
      <div ref={wrapperRef} style={{ height: 45, position: 'absolute', top: 0, left: 0 }}>
         {/* element for triggering the intersection observer event */}
      </div>
      <div style={{ position: 'sticky', ...styles }} className={`${defaultWrapperClasses} ${classes}`}>
         {children}
      </div>
   </>
};

export default Sticky;