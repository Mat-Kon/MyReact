import ReactDOM from 'react-dom/client';
import { checkServerAvailability } from './api/check-server';
import ErrorBoundary from './components/ErrorBoundary';
import './sass/main.scss';
import App from './components/App';

checkServerAvailability();

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
