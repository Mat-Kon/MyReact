import Form from './Form';
import ErrorBtn from './ErrorBtn';
import { useContext } from 'react';
import { useOutletContext } from 'react-router';
import { IContext } from '../types/types';

const Search: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
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
