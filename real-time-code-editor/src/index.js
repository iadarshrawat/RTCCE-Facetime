import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { VideoProvider } from './context/VideoContext';
import { SocketProvider } from './context/SocketProvider';
import { RemoteIdProvider } from './context/RemoteIdProvider';
import { UnameProvider } from './context/UnameProvider';
import { RefContextProvider } from './context/RefProvider';
import { PostContextProvider } from './context/PostContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <VideoProvider>
        <SocketProvider>
          <RemoteIdProvider>
            <UnameProvider>
              <RefContextProvider>
                <PostContextProvider>
                <App />
                </PostContextProvider>
              </RefContextProvider>
            </UnameProvider>
          </RemoteIdProvider>
        </SocketProvider>
      </VideoProvider>
    </BrowserRouter>
  </React.StrictMode>
);