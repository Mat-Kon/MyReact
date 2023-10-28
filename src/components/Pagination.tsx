import { MouseEventHandler } from 'react';

type Props = {
  page: number;
  nextPage: MouseEventHandler<HTMLDivElement>;
};

const Pagination: React.FC<Props> = ({ page, nextPage }) => {
  return (
    <div className="pagination" onClick={nextPage}>
      <button className="prev">&#8249;</button>
      <p className="page-number">{page}</p>
      <button className="next">&#8250;</button>
    </div>
  );
};

export default Pagination;
