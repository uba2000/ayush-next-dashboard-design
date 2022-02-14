import React, { useState } from 'react'
import ProjectListItem from './ProjectListItem'

function ProjectList(props) {
  const { projects, perpage } = props
  const [page, setPage] = useState(1)

  const buildProjectList = (projects) => {
    if (projects.length <= 10) {
      return projects.map((item, index) => {
        return <ProjectListItem item={item} key={index} />
      })
    }
    return projects.slice((page - 1) * 10, page * 10).map((item, index) => {
      return <ProjectListItem item={item} key={index} />
    })
  }
  return (
    <>
      <div className="mt-8 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th className='cursor-pointer' style={{ width: '10%', minWidth: '98px' }}>
                <div className="flex items-center justify-center">
                  <label className="custom-checkbox-container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </th>
              <th style={{ width: '40%', minWidth: '397pxpx' }}>
                <span className="capitalize">
                  All Projects
                </span>
              </th>
              <th style={{ width: '20%', minWidth: '198px' }}>
                <span className="capitalize">
                  Project Tags
                </span>
              </th>
              <th style={{ width: '20%', minWidth: '198px' }}>
                <span className="capitalize">
                  Date
                </span>
              </th>
              <th style={{ minWidth: '98px' }}></th>
            </tr>
          </thead>
          <tbody>
            {buildProjectList(projects)}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        {/* Pagination */}
        <div className="flex justify-between">
          <span className="text-gray-500 font-poppins text-sm">
            {(page - 1) * 10 + 1} - {page * 10} of {projects.length} Projects
          </span>
          <div className="flex items-center">
            <button
              className={`py-1 px-2 border border-solid border-gray-900 ${page == 1 && 'cursor-not-allowed'
                }`}
              disabled={page == 1}
              onClick={() => setPage(page - 1)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='icon icon-tabler icon-tabler-chevron-left'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#2c3e50'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <polyline points='15 6 9 12 15 18' />
              </svg>
            </button>
            <p className="text-sm mx-4 font-poppins">
              {page}
            </p>
            <button
              className={`py-1 px-2 border border-solid border-gray-900 ${page == Math.ceil(projects.length / 10) && 'cursor-not-allowed'
                }`}
              disabled={page == Math.ceil(projects.length / 10)}
              onClick={() => setPage(page + 1)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='icon icon-tabler icon-tabler-chevron-right'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#2c3e50'
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
    </>
  )
}

export default ProjectList