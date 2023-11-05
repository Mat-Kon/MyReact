import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IContext } from '../types/types';
import { useOutletContext } from 'react-router';

const Pagination: React.FC = () => {
  const { maxPage, isLoading } = useOutletContext<IContext>();
  const { page } = useParams();
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    if (page) setCurPage(+page);
  }, [page]);

  const nextPage = () => {
    setCurPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setCurPage((prev) => prev - 1);
  };

  return (
    <div className="pagination">
      <div className="btn-container">
        <Link
          to={`/search-page/${curPage - 1}`}
          className="prev"
          onClick={prevPage}
          style={
            isLoading || curPage === 1
              ? { pointerEvents: 'none' }
              : { pointerEvents: 'auto', backgroundColor: 'yellow' }
          }
        ></Link>
        <p className="page-number">{page}</p>
        <Link
          to={`/search-page/${curPage + 1}`}
          className="next"
          onClick={nextPage}
          style={
            isLoading || curPage === maxPage
              ? { pointerEvents: 'none' }
              : { pointerEvents: 'auto', backgroundColor: 'yellow' }
          }
        ></Link>
      </div>
    </div>
  );
};

export default Pagination;
