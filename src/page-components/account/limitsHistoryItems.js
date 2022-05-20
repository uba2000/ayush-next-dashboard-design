import React from 'react'

import { Table } from '../../components/layouts/Table'

const LimitsHistoryItems = ({ title, credits, tags, date }) => {
  return (
    <Table.Row>
      <Table.Data>
        <div className="flex items-center justify-left cursor-pointer" onClick={() => { check(!checked) }}>

        </div>
      </Table.Data>
      <Table.Data className='main'>
        <span>
          {title}
        </span>
      </Table.Data>
      <Table.Data>
        <span>
          {credits}
        </span>
      </Table.Data>
      <Table.Data>
        <span className='line-clamp-1'>
          {tags.join(', ')}
        </span>
      </Table.Data>
      <Table.Data>
        <span className='min-w-fit'>
          {date}
        </span>
      </Table.Data>
    </Table.Row>
  )
}

export default LimitsHistoryItems