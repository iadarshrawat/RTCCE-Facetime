// VideoContext.js
import React, { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  return (
    <VideoContext.Provider value={{ myStream, setMyStream, remoteStream, setRemoteStream }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);

  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }

  return context;
};
