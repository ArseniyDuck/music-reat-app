import { useState } from "react";

export const useInputType = () => {
   const [inputType, setInutType] = useState<'password' | 'text'>('password');
   const handleEyeClick = () => setInutType(prev => {
      return prev === 'password' ? 'text' : 'password';
   });

   return [inputType, handleEyeClick] as const;
}