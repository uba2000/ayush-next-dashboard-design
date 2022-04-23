import React, { useState } from 'react'

import { Table } from '../../components/layouts/Table'
import CheckBox from '../../components/layouts/CheckBox'

const KeywordItem = ({ k, index, handleCheck }) => {

  const [isChecked, setIsChecked] = useState(k.checked)

  const checkKeyword = () => {
    setIsChecked(!isChecked)
    handleCheck({ index, value: !isChecked })
  }

  return (
    <Table.Row onClick={checkKeyword}>
      <Table.Data className='w-[41.5px] pl-[21px]'>
        <div className="flex items-center justify-center">
          <CheckBox checked={k.checked} />
        </div>
      </Table.Data>
      <Table.Data className='main' main={true}>
        <span>
          {k.keyword}
        </span>
      </Table.Data>
      <Table.Data>
        <span>
          {k.volume}
        </span>
      </Table.Data>
      <Table.Data>
        <span>
          {k.traffic}
        </span>
      </Table.Data>
      <Table.Data>
        <span>
          {`$${k.cpc}`}
        </span>
      </Table.Data>
      <Table.Data>
        <span>
          {k.difficulty}
        </span>
      </Table.Data>
      <Table.Data>
        <span>
          -{k.trending}%
        </span>
      </Table.Data>
      <Table.Data>
        <span>
          {k.ait}
        </span>
      </Table.Data>
    </Table.Row>
  )
}

export default KeywordItem