import React from 'react'

import { Table } from '../../layouts/Table'
import AccountTeamItems from './AccountTeamItems'
import styles from '../../../styles/Account.module.css'
import Box from '../../layouts/Box'

function AccountTeamTable() {
  return (
    <Table className='border-b'>
      <Table.Head className="dark:bg-black bg-white">
        <Table.Row>
          <Table.TH className={'w-1/3'} style={{ width: '30%' }}>User Name</Table.TH>
          <Table.TH main={true} style={{ width: '50%' }}>Email</Table.TH>
          <Table.TH style={{ width: '20%', minWidth: '245.22px' }}>Access Level</Table.TH>
        </Table.Row>
      </Table.Head>
      <Table.Body className="dark:bg-black bg-white">
        <Table.Row>
          <Table.Data>
            <span className={'line-clamp-1'}>Theresa Webb</span>
          </Table.Data>
          <Table.Data>
            <span className={'line-clamp-1'}>Theresa.webb@example.com</span>
          </Table.Data>
          <Table.Data>
            <Box className="text-center max-w-[146px] py-2 px-9 mr-7">
              Owner
            </Box>
          </Table.Data>
        </Table.Row>
        <AccountTeamItems />
      </Table.Body>
    </Table>
  )
}

export default AccountTeamTable