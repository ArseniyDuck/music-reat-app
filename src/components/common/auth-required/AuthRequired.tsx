import React from 'react';
import { useAppSelector } from 'tools/hooks';


const AuthRequired: React.FC= (props) => {
   const id = useAppSelector(state => state.auth.user.id);
   return id ? <>{props.children}</> : null;
};

export default AuthRequired;