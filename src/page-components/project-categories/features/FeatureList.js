import React, { useState } from 'react'

import { Settings } from '../../../ui/icons'
import { Table } from '../../../components/layouts/Table'
import FeatureListItem from './FeatureListItem'

function FeaturesList(props) {
  const { features, perpage } = props

  const [page, setPage] = useState(1)

  return (
    <>
      <div className="mt-8">
        <Table>
          <Table.Head>
            <Table.Row className="cursor-default">
              <Table.TH className='pl-0 cursor-pointer w-[41.5px]'>

              </Table.TH>
              <Table.TH main={true} style={{ width: '50%', minWidth: '397px' }}>
                <span className="capitalize">
                  All Features
                </span>
              </Table.TH>
              <Table.TH style={{ width: '27%', minWidth: '169px' }}>
                <span className='flex items-center space-x-1'>
                  <span className="capitalize">
                    User
                  </span>
                </span>
              </Table.TH>
              <Table.TH style={{ width: '12%', minWidth: '144px' }}>
                <span className="capitalize">
                  Date
                </span>
              </Table.TH>
              <Table.TH style={{ minWidth: '50px' }}>
                <Settings className="mx-auto h-[18px] w-[18px] dark:text-white text-black" />
              </Table.TH>
            </Table.Row>
          </Table.Head>
          <tbody>
            {
              features.length <= 10 ? features.map((item) => {
                return <FeatureListItem
                  item={item}
                  key={item.id}
                />
              }) : features.slice((page - 1) * 10, page * 10).map((item) => {
                return <FeatureListItem
                  item={item}
                  key={item}
                />
              })
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default FeaturesList