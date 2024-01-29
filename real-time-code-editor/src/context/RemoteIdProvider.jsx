import React, { createContext, useState, useContext } from 'react';

const RemoteIdContext = createContext();

export const RemoteIdProvider = ({ children }) => {
  const [remoteSocketId, setRemoteSocketId] = useState(null);

  return (
    <RemoteIdContext.Provider value={{ remoteSocketId, setRemoteSocketId }}>
      {children}
    </RemoteIdContext.Provider>
  );
};

export const useRemoteContext = () => {
  const context = useContext(RemoteIdContext);

  if (!context) {
    throw new Error('useRemoteContext must be used within a RemoteIdProvider');
  }

  return context;
};
