import Form from './Form';
import ErrorBtn from './ErrorBtn';
import { ISearchProps } from '../types/types';

const Search: React.FC<ISearchProps> = ({ isLoading, setQuantity }) => {
  return (
    <>
      <ErrorBtn />
      <div className="search">
        <h1 className="heading">Star Wars Searching</h1>
        <Form isLoading={isLoading} setQuantity={setQuantity} />
      </div>
    </>
  );
};

export default Search;
