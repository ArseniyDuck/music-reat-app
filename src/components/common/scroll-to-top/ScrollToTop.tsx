import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {History} from 'history';

type PropsType = {
   history: History
};

const ScrollToTop: React.FC<PropsType> = ({ history, children }) => {
   // todo: fix bug with gradient header data. click on "go to album" after page scrolling
   useEffect(() => {
      const unlisten = history.listen(() => {
         window.scrollTo(0, 0);
      });

      return () => {
         unlisten();
      };
   });

   return <>{children}</>;
}

export default withRouter(ScrollToTop);