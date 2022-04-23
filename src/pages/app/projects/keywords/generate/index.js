import React from 'react'

import { Table } from '../../../../../components/layouts/Table'
import DashboardLayout from '../../../../../components/app/DasboardLayout'

const index = () => {
  return (
    <DashboardLayout>
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
      </Table>
    </DashboardLayout>
  )
}

export default index