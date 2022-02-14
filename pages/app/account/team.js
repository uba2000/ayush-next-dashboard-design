import React, { useState } from 'react'
import styles from '../../../styles/Account.module.css'
import AccountLayout from '../../../components/app/account/AccountLayout'
import AccountTeamTable from '../../../components/app/account/AccountTeamTable'


function Team() {

  const [confirmNav, setConfirmNav] = useState(true)
  const [pendingNav, setPendingNav] = useState(false)

  function toggleNav(nav) {
    setConfirmNav(false)
    setPendingNav(false)
    if (nav == 'c') {
      setConfirmNav(true)
    } else if (nav == 'p') {
      setPendingNav(true)
    }
  }

  return (
    <AccountLayout>
      <div className={styles.accountFramebox}>
        <h3 className={styles.accountFrameboxTitle}>
          Invite Team
        </h3>
        <p className={styles.accountFrameboxContent}>
          Invite others to join your workspace. There will be an additional charge of $30 month for each number that exceeds the user seats available on your plan
        </p>
        <button className='btn btn-primary'>Invite Team</button>
      </div>
      <div className="">
        <div className='accountFrameboxNav'>
          <div onClick={() => toggleNav('c')} className={`accountFrameboxNavItem ${confirmNav && 'accountFrameboxNavItemActive'}`}>
            Confirmed
          </div>
          <div className='accountFrameboxNavItem' onClick={() => toggleNav('p')} className={`accountFrameboxNavItem ${pendingNav && 'accountFrameboxNavItemActive'}`}>
            Pending
          </div>
        </div>
        <div className='flex items-center justify-center border border-solid border-gray-800 bg-white w-full' style={{ minHeight: '62.45px' }}>
          {confirmNav && <AccountTeamTable />}
          {pendingNav && <div className='text-center py-9'>
            <span className="capitalize font-bold text-3xl">There is no <br />pending account</span>
          </div>}
        </div>
      </div>
    </AccountLayout>
  )
}

export default Team