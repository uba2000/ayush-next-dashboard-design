import React from 'react'

import AccountTeamItems from './AccountTeamItems'
import styles from '../../../styles/Account.module.css'

function AccountBillingTable() {
  return (
    <table className='new'>
      <thead className={styles.accountTableHead}>
        <tr>
          <th style={{ width: '60%' }}>Item</th>
          <th style={{ width: '15%' }}>Start Date</th>
          <th style={{ width: '15%' }}>End Date</th>
          <th style={{ width: '15%' }}>Next Billing Date</th>
          <th style={{ width: '15%' }}>Price</th>
        </tr>
      </thead>
      <tbody className={styles.accountTableBody}>
        <tr>
          <td className='font-bold'>Life monthly plan</td>
          <td className='font-bold'>30 mar 2021</td>
          <td className='font-bold'></td>
          <td className='font-bold'>6 jan 2021</td>
          <td className='font-bold'>99.00 USD</td>
        </tr>

      </tbody>
    </table>
  )
}

export default AccountBillingTable