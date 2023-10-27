import Search from './Search';
import ErrorBtn from './ErrorBtn';
import { useState } from 'react';

const App: React.FC = () => {
  const [isError, setIsError] = useState(false);

  const handlerErr = (): void => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('This is a test error!');
  }

  return (
    <div className="wrapper">
      <ErrorBtn handlerErr={handlerErr} />
      <Search />
    </div>
  );
};

export default App;
