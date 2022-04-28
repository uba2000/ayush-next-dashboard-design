import React from 'react'

import AccountTeamItems from './AccountTeamItems'
import styles from '../../../styles/Account.module.css'
import { Table } from '../../layouts/Table'

function AccountBillingTable() {
  return (
    <Table>
      <Table.Head className="dark:bg-black bg-white">
        <Table.Row>
          <Table.TH main={true} className="py-5">
            <span className='pl-[9px]'>Item</span>
          </Table.TH>
          <Table.TH>
            <span className='whitespace-nowrap block w-[150px]'>Start Date</span>
          </Table.TH>
          <Table.TH>
            <span className='whitespace-nowrap block w-[150px]'>End Date</span>
          </Table.TH>
          <Table.TH>
            <span className='whitespace-nowrap block w-[150px]'>Next Billing Date</span>
          </Table.TH>
          <Table.TH>
            <span className='whitespace-nowrap block w-[150px]'>Price</span>
          </Table.TH>
        </Table.Row>
      </Table.Head>
      <Table.Body className="dark:bg-black bg-white">
        <Table.Row className="font-bold border-b-0 px-[9px] py-[14px]">
          <Table.Data className="px-[30px] py-5">
            <span className='pl-[9px]'>Life monthly plan</span>
          </Table.Data>
          <Table.Data>
            <span>30 Mar 2021</span>
          </Table.Data>
          <Table.Data>
            <span></span>
          </Table.Data>
          <Table.Data>
            <span>6 Jan 2021</span>
          </Table.Data>
          <Table.Data>
            <span>99.00 USD</span>
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default AccountBillingTable