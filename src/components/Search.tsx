import Loader from './Loader';
import Form from './Form';
import ErrorBtn from './ErrorBtn';

type Props = {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Search: React.FC<Props> = ({ isLoading, setSearchValue, setPage }) => {
  return (
    <>
      <ErrorBtn />
      <div className="search">
        <h1 className="heading">Star Wars Searching</h1>
        {isLoading ? <Loader /> : null}
        <Form setPage={setPage} isLoading={isLoading} setSearchValue={setSearchValue} />
      </div>
    </>
  );
};

export default Search;
