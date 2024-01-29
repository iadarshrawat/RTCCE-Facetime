import React, { createContext, useContext, useRef } from 'react';

// Create a context with an initial value of null
const RefContext = createContext(null);

// A provider component that will wrap your application
export const RefContextProvider = ({ children }) => {
  // Create a useRef to store the mutable value
  const myRef = useRef(null);

  // The value provided by the context includes the useRef object
  const contextValue = myRef;

  return (
    <RefContext.Provider value={contextValue}>
      {children}
    </RefContext.Provider>
  ); 
};

// A custom hook to easily access the context value
export const useRefContext = () => {
  const context = useContext(RefContext);

  if (!context) {
    throw new Error('useMyContext must be used within a RefContextProvider');
  }

  return context;
};