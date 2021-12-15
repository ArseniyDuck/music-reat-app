import React from 'react';
import { useAuth } from 'tools/hooks';


const AuthRequired: React.FC= (props) => {
   const isAuth = useAuth();
   return isAuth ? <>{props.children}</> : null;
};

export default AuthRequired;