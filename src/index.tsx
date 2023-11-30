import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/main.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);