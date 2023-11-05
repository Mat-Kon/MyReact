import Form from './Form';
import ErrorBtn from './ErrorBtn';

const Search: React.FC = () => {
  return (
    <>
      <ErrorBtn />
      <div className="search">
        <h1 className="heading">Star Wars Searching</h1>
        <Form />
      </div>
    </>
  );
};

export default Search;
