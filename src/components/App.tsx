import { Route, Routes } from 'react-router';
import NotFoundPage from './NotFoundPage';
import Wrapper from './Wrapper';
import Results from './Results';
import Pagination from './Pagination';
import Detail from './Detail';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Wrapper />}>
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
