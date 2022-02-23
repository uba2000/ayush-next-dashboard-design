import React from 'react'
import AccountTeamItems from './AccountTeamItems'
import styles from '../../../styles/Account.module.css'

function AccountTeamTable() {
  return (
    <table className='new'>
      <thead className={styles.accountTableHead}>
        <tr>
          <th style={{ width: '30%' }}>User Name</th>
          <th style={{ width: '50%' }}>Email</th>
          <th style={{ width: '20%', minWidth: '245.22px' }}>Access Level</th>
        </tr>
      </thead>
      <tbody className={styles.accountTableBody}>
        <tr>
          <td>Theresa Webb</td>
          <td>Theresa.webb@example.com</td>
          <td>
            <div className="text-center max-w-[146px] bg-gray-1000 border border-solid border-gray-800 py-2 px-9 mr-7">
              Owner
            </div>
          </td>
        </tr>
        <AccountTeamItems />
      </tbody>
    </table>
  )
}

export default AccountTeamTable