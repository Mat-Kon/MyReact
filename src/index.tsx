import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { checkServerAvailability } from './api/check-server';
import ErrorBoundary from './components/ErrorBoundary';
import './sass/main.scss';

checkServerAvailability();

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <ErrorBoundary>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </ErrorBoundary>
);
