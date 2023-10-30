import { useState } from 'react';

const ErrorBtn: React.FC = () => {
  const [isError, setIsError] = useState(false);

  const handlerErr = (): void => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('This is a test error!');
  }
  return (
    <button className="error-btn" onClick={handlerErr}>
      Get an error
    </button>
  );
};

export default ErrorBtn;
