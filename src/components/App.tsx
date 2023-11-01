import { Route, Routes } from 'react-router';
import NotFoundPage from './NotFoundPage';
import Wrapper from './Wrapper';
import Results from './Results';

const localValue = localStorage.getItem('searchValue');

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={localValue ? <Results /> : <p>What you search?</p>} />
          <Route path="search-page/:page" element={<Results />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
