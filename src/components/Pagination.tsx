import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IsLoading, MaxPage } from './Wrapper';

const Pagination: React.FC = () => {
  const { maxPage } = useContext(MaxPage);
  const { isLoading } = useContext(IsLoading);
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
      <Link
        to={`search-page/${curPage - 1}`}
        className="prev"
        onClick={prevPage}
        style={{ pointerEvents: isLoading || curPage === 1 ? 'none' : 'auto' }}
      ></Link>
      <p className="page-number">{page}</p>
      <Link
        to={`/search-page/${curPage + 1}`}
        className="next"
        onClick={nextPage}
        style={{ pointerEvents: isLoading || curPage === maxPage ? 'none' : 'auto' }}
      ></Link>
    </div>
  );
};

export default Pagination;
