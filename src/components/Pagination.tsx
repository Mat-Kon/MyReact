type Props = {
  page: number;
};

const Pagination: React.FC<Props> = ({ page }) => {
  return (
    <div className="pagination">
      <div className="prev">&#8249;</div>
      <p className="page-number">{page}</p>
      <div className="next">&#8250;</div>
    </div>
  );
};

export default Pagination;
