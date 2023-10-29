import { MouseEventHandler, useState } from 'react';

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
      <button className="prev" onClick={prevPage} disabled={isLoading || page === 1}></button>
      <p className="page-number">{page}</p>
      <button className="next" onClick={nextPage} disabled={isLoading || page === maxPage}></button>
    </div>
  );
};

export default Pagination;
