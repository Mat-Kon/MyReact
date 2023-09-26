import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { checkServerAvailability } from './api/check-server';
import { Api } from './api/api';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

checkServerAvailability();
new Api().getCategory('starships');
