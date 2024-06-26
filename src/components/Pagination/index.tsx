import ReactPaginate from 'react-paginate';
import React from 'react';

import styles from './Pagination.module.scss';

type PaginationProps = {
   currentPage: number;
   onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => 
   <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      // renderOnZeroPageCount={null}
   />

export default Pagination;
