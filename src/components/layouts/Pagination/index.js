import React from 'react';

const Pagination = ({
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageIndex,
  pageOptions,
  itemsLength,
  pageItemsName = 'projects',
  pages,
  gotoPage,
  pageCount,
}) => {
  return (
    <div className="dark:bg-darkMode-bg bg-white border border-t-0 dark:border-darkMode-border border-ash border-solid">
      <div className="flex justify-between pl-11 pr-10 py-4">
        <span className="font-poppins text-sm align-middle leading-8">
          {pageIndex + 1} - {pageOptions.length} of {itemsLength}{' '}
          {pageItemsName}
        </span>
        <div className="flex items-center">
          <button
            className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash ${
              !canPreviousPage ? 'cursor-not-allowed' : ''
            }`}
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-left"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
          <p className="text-sm mx-4 font-poppins space-x-[10px]">
            <span>{pageIndex + 1}</span>
            {/* <template
                v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
              >
                <span
                  class="page"
                @click="upPage(pageNumber)"
                  :class="{active: page == pageNumber }"
                  :key="index"
              >
                  {{ pageNumber }}
              </span> */}
          </p>
          <button
            className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash ${
              !canNextPage ? 'cursor-not-allowed' : ''
            }`}
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-right"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
