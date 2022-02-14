import React from 'react'
import styles from '../../../styles/Account.module.css'

function AccountBillingInvoices() {
  return (
    <>
      <div className={styles.accountFrameboxCardSection} id="thead">
        <div className="grid grid-cols-5">
          <p className='col-span-2 font-bold text-[13.0398px] leading-[20px]'>
            ID
          </p>
          <p className='font-bold text-[13.0398px] leading-[20px]'>
            Date
          </p>
          <p className=' font-bold text-[13.0398px] leading-[20px]'>
            Amount
          </p>
          <p className='font-bold text-[13.0398px] leading-[20px]'>
            &nbsp;
          </p>
        </div>
      </div>
      <div className={styles.accountFrameboxCardSection}>
        <div className="grid grid-cols-5">
          <p className='col-span-2 font-bold text-[13.0398px] leading-[20px]'>
            Ah21112021-26514-784584b
          </p>
          <p className='font-bold text-[13.0398px] leading-[20px]'>
            6 december 2021
          </p>
          <p className='font-bold text-[13.0398px] leading-[20px]'>
            60.00 USD
          </p>
          <p className='block font-bold text-[13.0398px] leading-[20px]'>
            <button className='btn text-center bg-gray-1000 border border-solid border-gray-800 py-2 px-9 text-[9px] leading-[13px]'>Download</button>
          </p>
        </div>
      </div>
      <div className={styles.accountFrameboxCardSection}>
        <div className="grid grid-cols-5">
          <p className='col-span-2 font-bold text-[13.0398px] leading-[20px]'>
            Ah21112021-26514-784584b
          </p>
          <p className='font-bold text-[13.0398px] leading-[20px]'>
            6 december 2021
          </p>
          <p className='font-bold text-[13.0398px] leading-[20px]'>
            60.00 USD
          </p>
          <p className='block font-bold text-[13.0398px] leading-[20px]'>
            <button className='btn text-center bg-gray-1000 border border-solid border-gray-800 py-2 px-9 text-[9px] leading-[13px]'>Download</button>
          </p>
        </div>
      </div>
    </>
  )
}

export default AccountBillingInvoices