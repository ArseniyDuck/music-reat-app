import React from 'react';
import withIcon, { WrappedIconType } from '../../../high-order-components/withIcon';
import s from './Search.module.scss';

type PropsType = {
   color: 'grey'
};

const Search: React.FC<PropsType & WrappedIconType> = ({ styles, color }) => {
   return (
      <svg className={s[color]} style={styles} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 192.904 192.904">
         <path d="M190.707,180.101l-47.078-47.077c11.702-14.072,18.752-32.142,18.752-51.831C162.381,36.423,125.959,0,81.191,0
            C36.422,0,0,36.423,0,81.193c0,44.767,36.422,81.187,81.191,81.187c19.688,0,37.759-7.049,51.831-18.751l47.079,47.078
            c1.464,1.465,3.384,2.197,5.303,2.197c1.919,0,3.839-0.732,5.304-2.197C193.637,187.778,193.637,183.03,190.707,180.101z M15,81.193
            C15,44.694,44.693,15,81.191,15c36.497,0,66.189,29.694,66.189,66.193c0,36.496-29.692,66.187-66.189,66.187
            C44.693,147.38,15,117.689,15,81.193z"/>
      </svg>
   );
};

export default withIcon(Search);