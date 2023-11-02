import Form from './Form';
import ErrorBtn from './ErrorBtn';
import { useContext } from 'react';
import { IsLoading } from './Wrapper';

const Search: React.FC = () => {
  const { isLoading } = useContext(IsLoading);
  return (
    <>
      <ErrorBtn />
      <div className="search">
        <h1 className="heading">Star Wars Searching</h1>
        <Form isLoading={isLoading} />
      </div>
    </>
  );
};

export default Search;
