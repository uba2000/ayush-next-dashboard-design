import React, { useState, useEffect, useMemo, Fragment } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';

import TableCheckBox from '../components/layouts/Table/components/TableCheckBox';
import ProjectsIndexItemDialog from '../page-components/projects/ProjectsIndexItemDialog';
import { Settings } from '../ui/icons';

const useScaiTable = (
  { tableColumns, tableData },
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
  const data = useMemo(() => tableData, []);

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
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
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

  const { globalFilter, pageIndex } = state;

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
    rowsLength: data.length,
  };
};

export default useScaiTable;
