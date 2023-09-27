import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { checkServerAvailability } from './api/check-server';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

checkServerAvailability();
