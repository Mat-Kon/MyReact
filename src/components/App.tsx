import { Route, Routes } from 'react-router';
import NotFoundPage from './NotFoundPage';
import { useState } from 'react';
import Wrapper from './Wrapper';

const App: React.FC = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      <Routes>
        <Route path="/" element={<Wrapper page={1} setPage={setPage} />} />
        <Route path="/page/:numPage" element={<Wrapper page={page} setPage={setPage} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
