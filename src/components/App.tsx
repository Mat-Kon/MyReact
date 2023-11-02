import { Route, Routes } from 'react-router';
import NotFoundPage from './NotFoundPage';
import Wrapper from './Wrapper';
import Results from './Results';
import Detail from './Detail';
import ErrorPage from './ErrorPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Wrapper />} errorElement={<ErrorPage />}>
          <Route index element={<Results />} />
          <Route path="search-page/:page" element={<Results />}>
            <Route path=":name" element={<Detail />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
