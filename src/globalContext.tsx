import { createContext, useContext } from 'react';

type GlobalContextType = {
  windowSize: WindowSizeType
}

export const MyGlobalContext = createContext<GlobalContextType>({
   windowSize: { width: 0, height: 0 }
})

export const useGlobalContext = () => useContext(MyGlobalContext)