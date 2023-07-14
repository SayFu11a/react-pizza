import ReactPaginate from 'react-paginate';
import React from 'react';

import styles from './Pagination.module.scss';

const Pagination = ({ setCurrentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => setCurrentPage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
