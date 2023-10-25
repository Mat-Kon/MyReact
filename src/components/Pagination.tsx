import { Component, ReactNode } from 'react';

class Pagination extends Component {
  render(): ReactNode {
    return (
      <div className="pagination">
        <span className="prev">&#8249;</span>
        <p className="page-number">1</p>
        <span className="next">&#8250;</span>
      </div>
    );
  }
}

export default Pagination;
