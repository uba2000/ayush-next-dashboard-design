import React from 'react'
import styles from '../../../styles/Account.module.css'
import AccountLayout from '../../../components/app/account/AccountLayout'

function limits() {
  return (
    <AccountLayout>
      <div className="">
        <div className='border border-solid border-gray-800 bg-white w-full mb-8'>
          <div className={styles.accountFrameboxCardSection}>
            <h4>Subscription Information</h4>
          </div>
          <div className={styles.accountFrameboxCardSection}>
            <div className="grid grid-cols-2">
              <p>
                Current plan
              </p>
              <p className='text-right'>
                Standard, Billed Monthly
              </p>
            </div>
          </div>
          <div className={styles.accountFrameboxCardSection}>
            <div className="grid grid-cols-2">
              <p>
                Next Billing Date
              </p>
              <p className='text-right'>
                25 january 2022
              </p>
            </div>
          </div>
          <div className={styles.accountFrameboxCardSection}>
            <div className="grid grid-cols-2">
              <p>
                Usage reset date for weekly limits
              </p>
              <p className='text-right'>
                Tuesday
              </p>
            </div>
          </div>
          <div className={styles.accountFrameboxCardSection}>
            <div className="grid grid-cols-2">
              <p>
                Usage reset date for month limits
              </p>
              <p className='text-right'>
                30 December 2021
              </p>
            </div>
          </div>
        </div>
        <div className='border border-solid border-gray-800 bg-white w-full'>
          <div className={styles.accountFrameboxCardSection}>
            <h4>Subscription Limits</h4>
          </div>
          <div className={styles.accountFrameboxCardSection}>
            <div className="grid grid-cols-2">
              <p>
                AI-Writing
              </p>
              <p className='text-right'>
                Usage & Limit
              </p>
            </div>
          </div>
          <div className={styles.accountFrameboxCardSection}>
            <div className="grid grid-cols-2">
              <p>
                AI-Rewriting
              </p>
              <p className='text-right'>
                25 january 2022
              </p>
            </div>
          </div>
          <div className={styles.accountFrameboxCardSection}>
            <div className="grid grid-cols-2">
              <p>
                AI-Simplifying
              </p>
              <p className='text-right'>
                Tuesday
              </p>
            </div>
          </div>
          <div className={styles.accountFrameboxCardSection}>
            <div className="grid grid-cols-2">
              <p>
                AI-Expanding
              </p>
              <p className='text-right'>
                30 December 2021
              </p>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  )
}

export default limits