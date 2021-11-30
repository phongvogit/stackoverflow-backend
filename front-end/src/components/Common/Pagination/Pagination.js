import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

const PaginationCustom = ({ pageCount, page, changePage }) => {
	return (
		<ReactPaginate
			previousLabel={'Previous'}
			nextLabel={'Next'}
			pageCount={pageCount}
			forcePage={page}
			onPageChange={changePage}
			containerClassName={'paginationBtns'}
			disabledClassName={'paginationDisabled'}
			activeClassName={'paginationActive'}
		/>
	);
};

export default PaginationCustom;
