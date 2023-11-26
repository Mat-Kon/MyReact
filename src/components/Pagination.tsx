import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Props = {
  maxPage: number;
};

const Pagination: React.FC<Props> = ({ maxPage }) => {
  const { isLoading } = useAppSelector((store) => store.loading);
  const { pageNum } = useParams();
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    if (pageNum) setCurPage(+pageNum);
  }, [pageNum]);

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
          href={`/search-page/${curPage - 1}`}
          className="prev"
          onClick={prevPage}
          style={
            isLoading || curPage === 1
              ? { pointerEvents: 'none' }
              : { pointerEvents: 'auto', backgroundColor: 'yellow' }
          }
        ></Link>
        <p className="page-number">{pageNum}</p>
        <Link
          data-testid="next"
          href={`/search-page/${curPage + 1}`}
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
