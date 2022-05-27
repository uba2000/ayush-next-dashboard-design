import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { Tick, Processing, Waiting, ChevDown, Mini } from '../../ui/icons'
import { Table } from '../../components/layouts/Table'

const GenerateListItem = ({ content }) => {

  const router = useRouter()

  const [openSmallPreview, setOpenSmallPreview] = useState(false)
  const [processStatus, setProcessStatus] = useState('completed')

  const showSmallPreview = () => {
    setOpenSmallPreview(!openSmallPreview)
  }

  const showPreview = () => {
    router.push(`/app/projects/keywords/generate/1234567`)
  }

  return (
    <>
      <Table.Row className="cursor-default">
        <Table.Data>
          <span>{content.id}</span>
        </Table.Data>
        <Table.Data>
          <span>{content.title}</span>
        </Table.Data>
        <Table.Data>
          <span>{content.words}</span>
        </Table.Data>
        <Table.Data>
          <div>
            <TableStatus status={content.status} />
          </div>
        </Table.Data>
        <Table.Data>
          <div className={'flex items-center'}>
            <button disabled={content.status !== 'completed'} className='cursor-pointer' onClick={showSmallPreview}>
              {!openSmallPreview ? (
                <ChevDown className="w-5 h-5 dark:text-darkMode-border text-ash duration-200 ease-out hover:translate-y-[2px]" />
              ) : (
                <Mini className="w-5 h-5 dark:text-darkMode-border text-ash" />
              )}
            </button>
          </div>
        </Table.Data>
      </Table.Row>
      {openSmallPreview && (
        <Table.Row className='table-row cursor-default relative overflow-hidden pt-[25px] pb-[30px] h-[315px] w-full border-b dark:border-b-darkMode-border border-b-ash border-b-solid'>
          <div className="table-cell pt-[25px]"></div>
          <div className="table-cell line-clamp-10 pt-[25px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, nihil ea magnam totam quo recusandae eveniet soluta? Consectetur cupiditate animi ducimus, quos quia nemo voluptates modi maxime eos odit.
          </div>
          <div className="table-cell relative z-10 pt-[25px]">
            <button className="btn btn-primary" onClick={showPreview}>
              Preview
            </button>
          </div>
          <div className="table-cell relative z-10 pt-[25px]">
            <button className="btn btn-reset dark:text-white text-black">
              Edit Article
            </button>
          </div>
          <div className="absolute table-cell" style={backDropStyles}></div>
        </Table.Row>
      )}
    </>
  )
}

const backDropStyles = {
  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.95) 20.05%, rgba(0, 0, 0, 0) 75.6%)',
  width: '100%',
  height: '100%',
  left: '2px',
  top: '0px',
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
            <svg {...dim} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="16" rx="8" className='dark:fill-black fill-white' />
              <path d="M8 15.0029C4.13401 15.0029 1 11.8689 1 8.00293C1 4.13694 4.13401 1.00293 8 1.00293C11.866 1.00293 15 4.13694 15 8.00293C15 11.8689 11.866 15.0029 8 15.0029Z" className='dark:stroke-white stroke-black' strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6 11L7.60933 9.3102C7.8594 9.04771 7.99992 8.69167 8 8.3204V4" className='dark:stroke-white stroke-black' strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        )}
        <span className='capitalize'>{status}</span>
      </div>
    </>
  )
}

export default GenerateListItem