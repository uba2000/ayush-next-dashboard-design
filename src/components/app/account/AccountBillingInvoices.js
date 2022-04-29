import React, { Fragment } from 'react'

import Box from '../../layouts/Box'
import { Table } from '../../layouts/Table'
import { fCurrency } from '../../../utils/formatNumber'
import invoices from '../../../_mock/billingInvoices'

function AccountBillingInvoices() {
  return (
    <div className='overflow-x-auto'>
      <Table className='new'>
        <Table.Head className='dark:bg-black bg-white'>
          <Table.Row>
            <Table.TH className='font-semibold text-sm pl-[30px] py-[21px]' main={true}>ID</Table.TH>
            <Table.TH className='font-semibold text-sm pl-[30px] py-[21px] w-[18.19%] min-w-[131.4px]'>Date</Table.TH>
            <Table.TH className='font-semibold text-sm pl-[30px] py-[21px] w-[18.19%] min-w-[131.4px]'>Amount</Table.TH>
            <Table.TH className='font-semibold text-sm leading-[20px] px-[30px] py-[18.5px] w-[18.19%] min-w-[131.4px]'>&nbsp;</Table.TH>
          </Table.Row>
        </Table.Head>
        <Table.Body className='dark:bg-black bg-white'>
          {invoices.map((invoice) => (
            <Fragment key={invoice.id}>
              <InvoiceRow
                id={invoice.id}
                date={invoice.date}
                amount={fCurrency(invoice.amount)}
              />
            </Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

const InvoiceRow = ({ id, date, amount }) => {
  return (
    <Table.Row className='border-b-[0.90956px] border-b-[#dcd8e7] border-solid'>
      <Table.Data className='font-semibold text-sm pl-[30px] py-[21px]'>{id}</Table.Data>
      <Table.Data className='font-semibold text-sm pl-[30px] py-[21px]'>{date}</Table.Data>
      <Table.Data className='font-semibold text-sm pl-[30px] py-[21px]'>{amount} USD</Table.Data>
      <Table.Data className='font-semibold text-sm leading-[20px] py-[18.5px]'>
        <Box className="cursor-pointer">
          <div className='py-[10px] px-[37px]'>
            <span>Download</span>
          </div>
        </Box>
      </Table.Data>
    </Table.Row>
  )
}

export default AccountBillingInvoices