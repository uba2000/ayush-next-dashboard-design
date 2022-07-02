import React, { useState, useEffect, useMemo, Fragment } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from 'react-table';

import TableCheckBox from '../components/layouts/Table/components/TableCheckBox';
import ProjectsIndexItemDialog from '../page-components/projects/ProjectsIndexItemDialog';
import { Settings } from '../ui/icons';

const useScaiTable = (
  { tableColumns, tableData, scaiPageSize = 10 },
  afterColumn = [
    {
      Header: (
        <Settings className="mx-auto h-[18px] w-[18px] dark:text-white text-black" />
      ),
      Cell: ({ row }) => {
        return <ProjectsIndexItemDialog item={row.original} />;
      },
    },
  ],
  isCheckBox = true,
  beforeColumn = () =>
    isCheckBox
      ? [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <TableCheckBox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <TableCheckBox {...row.getToggleRowSelectedProps()} />
            ),
            width: '41.5px',
          },
        ]
      : []
) => {
  const columns = useMemo(() => tableColumns, []);
  const data = tableData;

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
    setPageSize,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [...beforeColumn(), ...columns, ...afterColumn];
      });
    }
  );

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    setPageSize(scaiPageSize);
  }, []);

  return {
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
    globalFilter,
    pageIndex,
    selectedFlatRows,
    setPageSize,
    rowsLength: data.length,
  };
};

export default useScaiTable;
