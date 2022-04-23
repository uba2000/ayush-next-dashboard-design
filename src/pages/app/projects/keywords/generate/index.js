import React from 'react'

import { Table } from '../../../../../components/layouts/Table'
import DashboardLayout from '../../../../../components/app/DasboardLayout'
import { Tick, Processing, Waiting, ChevDown } from '../../../../../ui/icons'

const index = () => {
  return (
    <DashboardLayout>
      <div className="w-full">
        <div>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.TH>
                  <span>ID</span>
                </Table.TH>
                <Table.TH main={true}>
                  <span>Title</span>
                </Table.TH>
                <Table.TH>
                  <span>Words</span>
                </Table.TH>
                <Table.TH>
                  <span>Status</span>
                </Table.TH>
                <Table.TH>
                  <span></span>
                </Table.TH>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              <Table.Row className="cursor-default">
                <Table.Data>
                  <span>1234567</span>
                </Table.Data>
                <Table.Data>
                  <span>What is the most important factor in an SEO campaign?</span>
                </Table.Data>
                <Table.Data>
                  <span>1000</span>
                </Table.Data>
                <Table.Data>
                  <div>
                    <TableStatus status={'completed'} />
                  </div>
                </Table.Data>
                <Table.Data>
                  <div className='cursor-pointer'>
                    <ChevDown className="w-5 h-5 dark:text-darkMode-border text-black" />
                  </div>
                </Table.Data>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <div className="dark:bg-darkMode-bg border-t-0 bg-white border dark:border-darkMode-border border-ash border-solid">
          <div className="flex justify-between pl-11 pr-10 py-4">
            <span className="font-poppins text-sm align-middle">
              1-20 of 1000 projects
            </span>
            <div className="flex items-center">
              <button
                className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash`}
              // disabled={page == 1}
              // onClick={() => setPage(page - 1)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-chevron-left'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <polyline points='15 6 9 12 15 18' />
                </svg>
              </button>
              <p className="text-sm mx-4 font-poppins">
                {/* {page} */}1
              </p>
              <button
                className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash`}
              // disabled={page == Math.ceil(projects.length / 10)}
              // onClick={() => setPage(page + 1)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-chevron-right'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <polyline points='9 6 15 12 9 18' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const TableStatus = ({ status }) => {

  const dim = {
    className: 'w-4 h-4'
  }

  return (
    <>
      <div className="flex space-x-2 items-center">
        {status == 'completed' ? (
          <span>
            <Tick {...dim} />
          </span>
        ) : status == 'processing' ? (
          <span>
            <Processing {...dim} />
          </span>
        ) : status == 'waiting' && (
          <span>
            <Waiting {...dim} />
          </span>
        )}
        <span className='capitalize'>{status}</span>
      </div>
    </>
  )
}

export default index