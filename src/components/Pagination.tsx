import { MouseEventHandler } from 'react';

type Props = {
  page: number;
  nextPage: MouseEventHandler<HTMLDivElement>;
};

const Pagination: React.FC<Props> = ({ page, nextPage }) => {
  return (
    <div className="pagination" onClick={nextPage}>
      <button className="prev"></button>
      <p className="page-number">{page}</p>
      <button className="next"></button>
    </div>
  );
};

export default Pagination;
