import React from 'react'

import Mastercard from '../../../ui/icons/mastercard'
import RoundTickActive from '../../../ui/icons/round-tick-active'
import styles from '../../../styles/Account.module.css'

function AccountAvailablePaymentMethod() {
  return (
    <>
      <div className={styles.accountFrameboxCardSection}>
        <h4 className='text-[13.0398px] leading-[20px]'>Payment Method </h4>
      </div>
      <div className={styles.accountPaymentAvailableContainer}>
        <div className="flex justify-between items-center mb-7">
          <div className="flex relative">
            <span className={styles.removerPaymentContainer}>
              <span className={styles.removerPayment}> </span>
            </span>
            <span className='w-10 flex items-center justify-center mr-[10px] pt-[4.5px] px-2 pb-[3px] h-6 bg-[#F6F8FA] rounded'>
              {/* mastercard icon */}
              <Mastercard />
            </span>
            <div className='flex flex-col relative'>
              <span className='text-[14px] leading-[21px] text-[#181C32]'>Mastecard</span>
              <span className='text-[13px] leading-[21px] text-[#A1A5B7]'>Expires Dec 2024</span>
              <span className="right-[-44px] top-[-10px] text-[11px] absolute bg-[#F1FAFF] rounded-[14.95px] py-[5px] px-[9.5px] text-[#00B2FF]">Primary</span>
            </div>
          </div>
          <div className="">
            <button className='btn btn-primary font-normal bg-[#b3ffd133] text-primary border-[#b3ffd133]'>
              New Method
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-[14px] leading-5 text-[#A1A5B7]'>Name</p>
            <p className='font-roboto text-[14px] leading-5 text-[#3F4254]'>Emma Smith</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-[14px] leading-5 text-[#A1A5B7]'>Billing Address</p>
            <p className='font-roboto text-[14px] leading-5 text-[#3F4254]'>AU</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-[14px] leading-5 text-[#A1A5B7]'>Number</p>
            <p className='font-roboto text-[14px] leading-5 text-[#3F4254]'>**** 8501</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-[14px] leading-5 text-[#A1A5B7]'>Phone</p>
            <p className='font-roboto text-[14px] leading-5 text-[#3F4254]'>No phone provided</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-[14px] leading-5 text-[#A1A5B7]'>Expires</p>
            <p className='font-roboto text-[14px] leading-5 text-[#3F4254]'>12/2024</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-[14px] leading-5 text-[#A1A5B7]'>Email</p>
            <p className='font-roboto text-[14px] leading-5 text-[#3F4254]'>e.smith@kpmg.com.au</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-[14px] leading-5 text-[#A1A5B7]'>Type</p>
            <p className='font-roboto text-[14px] leading-5 text-[#3F4254]'>Mastercard credit card</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-[14px] leading-5 text-[#A1A5B7]'>Origin</p>
            <p className='font-roboto text-[14px] leading-5 text-[#3F4254]'>
              <span>Australia</span>
              <span>
                {/* flag */}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-[14px] leading-5 text-[#A1A5B7]'>Issuer</p>
            <p className='font-roboto text-[14px] leading-5 text-[#3F4254]'>VICBANK</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-[14px] leading-5 text-[#A1A5B7]'>CVC check</p>
            <p className='flex font-roboto text-[14px] leading-5 text-[#3F4254]'>
              <span>Passed</span>
              <span>&nbsp;</span>
              <span>
                <RoundTickActive className="text-primary" />
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-[14px] leading-5 text-[#A1A5B7]'>ID</p>
            <p className='font-roboto text-[14px] leading-5 text-[#3F4254]'>id_4325df90sdf8</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountAvailablePaymentMethod