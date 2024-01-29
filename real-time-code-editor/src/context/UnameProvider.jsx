import React, { createContext, useState, useContext } from 'react';

const unameContext = createContext();

export const UnameProvider = ({ children }) => {
  const [uname, setUname] = useState(null);

  return (
    <unameContext.Provider value={{ uname, setUname }}>
      {children}
    </unameContext.Provider>
  );
};

export const useUnameContext = () => {
  const context = useContext(unameContext);

  if (!context) {
    throw new Error('useRemoteContext must be used within a RemoteIdProvider');
  }

  return context;
};
