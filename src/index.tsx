import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { checkServerAvailability } from './api/check-server';
import './sass/main.scss';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

checkServerAvailability();
