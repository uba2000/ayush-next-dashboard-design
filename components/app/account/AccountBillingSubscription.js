import React from 'react'
import AccountBillingTable from './AccountBillingTable'
import styles from '../../../styles/Account.module.css'

function AccountBillingSubscription() {
  return (
    <>
      <div className={styles.accountFrameboxCardSection}>
        <p>
          Active Subscriptions
        </p>
      </div>
      <div className="overflow-x-auto">
        <AccountBillingTable />
      </div>
      <div className="mt-6 px-7 mb-6 grid md:grid-cols-[163px_245px] grid-cols-1 gap-4">
        <button className="btn btn-primary">Upgrade Plan</button>
        <button className="btn btn-danger">Cancel Subscriptions</button>
      </div>
    </>
  )
}

export default AccountBillingSubscription