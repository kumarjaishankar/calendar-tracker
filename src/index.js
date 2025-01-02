import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CommunicationProvider } from './contexts/CommunicationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
  <CommunicationProvider>
    <App />
  </CommunicationProvider>
  </>
);
