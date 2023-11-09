import { Navigate, Route, createRoutesFromElements } from 'react-router';
import NotFoundPage from './NotFoundPage';
import Wrapper from './Wrapper';
import Results from './Results';
import Detail from './Detail';
import ErrorPage from './ErrorPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />} errorElement={<ErrorPage />}>
      <Route index element={<Results />} />
      <Route path="search-page" element={<Navigate to="search-page/1" replace />} />
      <Route path="search-page/:page" element={<Results />}>
        <Route path=":name" element={<Detail />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
