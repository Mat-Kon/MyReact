import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import './sass/main.scss';
import App from './components/App';
import { Provider } from 'react-redux';
import { store } from './redux';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);
