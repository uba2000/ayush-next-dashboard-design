import React, { useState, useEffect, useMemo, Fragment } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect
} from 'react-table'

import { useAppContext } from '../../../context/state'
import { PROJECTS_COLUNM } from '../../../components/layouts/Table/columns'
import Projects from '../../../_mock/projects'
import { fTags } from '../../../utils/formatTags'
import DashboardLayout from '../../../components/app/DasboardLayout'
import DashboardLanding from '../../../components/app/DashboardLanding'
import ProjectList from '../../../components/app/project/ProjectList'
import SearchTable from '../../../components/layouts/Table/components/SearchTable'
import ProjectsIndexDialog from '../../../page-components/projects/ProjectsIndexDialog'
import { Table } from '../../../components/layouts/Table'
import Pagination from '../../../components/layouts/Pagination'
import TableCheckBox from '../../../components/layouts/Table/components/TableCheckBox'
import { Dots, Settings } from '../../../ui/icons'
import ProjectsIndexItemDialog from '../../../page-components/projects/ProjectsIndexItemDialog'

function AllProjects() {

  const contextState = useAppContext()

  const [projects, setProjects] = useState(Projects)
  const [projectDialog, setProjectDialog] = useState(false)

  useEffect(() => {
    setTimeout(() => setProjectDialog(contextState.layout.showNewProject), 200)

    return () => {
      contextState.layout.setShowNewProject(false)
    }
  }, [])

  const openProjectDialog = () => {
    setProjectDialog(true)
  }

  const closeProjectDialog = () => {
    setProjectDialog(false)
  }

  const columns = useMemo(() => PROJECTS_COLUNM, [])
  const data = useMemo(() => projects, [])

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
    selectedFlatRows
  } = useTable({
    columns,
    data
  }, useGlobalFilter, useSortBy, usePagination, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((columns) => {
      return [
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
        ...columns,
        {
          Header: <Settings className="mx-auto h-[18px] w-[18px] dark:text-white text-black" />,
          Cell: ({ row }) => {
            return (
              <ProjectsIndexItemDialog item={row.original} />
            )
          }
        }
      ]
    })
  })

  const { globalFilter, pageIndex } = state

  return (
    <DashboardLayout>
      <ProjectsIndexDialog projectDialog={projectDialog} closeProjectDialog={closeProjectDialog} />
      <DashboardLanding
        landingText='All Projects'
        oneChild={true}
        subLandingShort={true}
        subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
      >
        <div className="mt-12">
          <div className="flex justify-end mb-[21px]">
            <button type='button' onClick={openProjectDialog} className="block w-fit btn btn-primary bg-primary text-white">
              New Project
            </button>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="">
              <p className="text-left text-wild capitalize font-semibold font-poppins">
                All Projects
              </p>
            </div>
            <div className="flex items-center justify-end">
              <SearchTable
                filter={globalFilter}
                setFilter={setGlobalFilter}
              />
            </div>
          </div>
          <div className="mt-7">
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
                          }}
                          className="flex items-center space-x-1"
                        >
                          {column.render('Header')}
                          <span>
                            {column.isSorted ? (column.isSortedDesc ? (

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            )) : ''}
                          </span>
                        </div>
                      </Table.TH>
                    ))}
                  </Table.Row>
                ))}
              </Table.Head>
              <Table.Body {...getTableBodyProps()}>
                {page.map(row => {
                  prepareRow(row)
                  return (
                    <Table.Row {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <Table.Data {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </Table.Data>
                        )
                      })}
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
            {/* <ProjectList projects={projects} /> */}
          </div>
          <Pagination
            nextPage={nextPage}
            previousPage={previousPage}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            itemsLength={projects.length}
            pages={page}
            gotoPage={gotoPage}
            pageCount={pageCount}
          />
        </div>
      </DashboardLanding>
    </DashboardLayout>
  )
}

AllProjects.auth = true

export default AllProjects