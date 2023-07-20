import ReactPaginate from 'react-paginate';
import React from 'react';

import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, onChangePage }) => {
   return (
      <ReactPaginate
         className={styles.root}
         breakLabel="..."
         nextLabel=">"
         previousLabel="<"
         onPageChange={(event) => onChangePage(event.selected + 1)}
         pageRangeDisplayed={4}
         pageCount={3}
         forcePage={currentPage - 1}
         renderOnZeroPageCount={null}
      />
   );
};

export default Pagination;
