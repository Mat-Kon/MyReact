import { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  page: number;
  maxPage: number;
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<Props> = ({ page, maxPage, isLoading, setPage }) => {
  const nextPage = () => {
    setPage((prevCount) => prevCount + 1);
  };
  const prevPage = () => {
    setPage((prevCount) => prevCount - 1);
  };

  return (
    <div className="pagination">
      <Link to={`page/${page}`}>
        <button className="prev" onClick={prevPage} disabled={isLoading || page === 1}></button>
      </Link>
      <p className="page-number">{page}</p>
      <Link to={`page/${page}`}>
        <button
          className="next"
          onClick={nextPage}
          disabled={isLoading || page === maxPage}
        ></button>
      </Link>
    </div>
  );
};

export default Pagination;
