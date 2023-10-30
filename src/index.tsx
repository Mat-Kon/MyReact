import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App';
import { checkServerAvailability } from './api/check-server';
import ErrorBoundary from './components/ErrorBoundary';
import './sass/main.scss';
import NotFoundPage from './components/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
]);

checkServerAvailability();

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);
