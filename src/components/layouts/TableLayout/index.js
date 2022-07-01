import React from 'react';
import Pagination from '../Pagination';

import { Table } from '../Table';

const TableLayout = ({
  tableInstance,
  bodyStyle = {},
  rowToClick = false,
  rowClick = () => {},
  itemsName,
  defaultStyles = { headerCenter: false },
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    pageIndex,
    rowsLength,
  } = tableInstance;

  return (
    <>
      <div>
        <Table {...getTableProps()}>
          <Table.Head>
            {headerGroups.map((headerGroup) => (
              <Table.Row {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Table.TH
                    main={column.main}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div
                      style={{
                        width: `${column.width ? column.width : ''}`,
                        minWidth: `${column.minWidth ? column.minWidth : ''}`,
                        maxWidth: `${column.maxWidth ? column.maxWidth : ''}`,
                      }}
                      className={`flex items-center space-x-1 ${
                        !column.main &&
                        column.id !== 'selection' &&
                        defaultStyles.headerCenter
                          ? 'justify-center'
                          : 'justify-start'
                      }`}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </div>
                  </Table.TH>
                ))}
              </Table.Row>
            ))}
          </Table.Head>
          <Table.Body
            className="dark:bg-black bg-white"
            {...getTableBodyProps()}
            style={{ ...bodyStyle }}
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <Table.Row
                  {...row.getRowProps()}
                  className={`${rowToClick ? 'cursor-pointer' : ''}`}
                  onClick={(e) => rowClick(e, row)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <Table.Data {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Table.Data>
                    );
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <Pagination
        nextPage={nextPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        itemsLength={rowsLength}
        pages={page}
        gotoPage={gotoPage}
        pageCount={pageCount}
        pageItemsName={itemsName}
      />
    </>
  );
};

export default TableLayout;
