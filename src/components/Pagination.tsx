import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IsLoading } from './Wrapper';

type Props = {
  maxPage: number;
};

const Pagination: React.FC<Props> = ({ maxPage }) => {
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

  console.log(curPage);
  return (
    <div className="pagination">
      <Link
        to={`search-page/${curPage}`}
        className="prev"
        onClick={prevPage}
        style={{ pointerEvents: isLoading || curPage === 1 ? 'none' : 'auto' }}
      ></Link>
      <p className="page-number">{curPage}</p>
      <Link
        to={`search-page/${curPage}`}
        className="next"
        onClick={nextPage}
        style={{ pointerEvents: isLoading || curPage === maxPage ? 'none' : 'auto' }}
      ></Link>
    </div>
  );
};

export default Pagination;
