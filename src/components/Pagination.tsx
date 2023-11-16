import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';

type Props = {
  maxPage: number;
};

const Pagination: React.FC<Props> = ({ maxPage }) => {
  const { isLoading } = useAppSelector((store) => store.loading);
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
    <div className="pagination" data-testid="pagination">
      <div className="btn-container">
        <Link
          data-testid="prev"
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
          data-testid="next"
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
