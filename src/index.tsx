import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/main.scss';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);