import { MouseEventHandler } from 'react';

type Props = {
  page: number;
  nextPage: MouseEventHandler<HTMLDivElement>;
};

const Pagination: React.FC<Props> = ({ page, nextPage }) => {
  return (
    <div className="pagination" onClick={nextPage}>
      <div className="prev">&#8249;</div>
      <p className="page-number">{page}</p>
      <div className="next">&#8250;</div>
    </div>
  );
};

export default Pagination;
