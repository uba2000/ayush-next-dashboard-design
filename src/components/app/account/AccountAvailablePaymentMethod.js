import React from 'react'

import { RoundTickActive, Mastercard } from '../../../ui/icons'
import styles from '../../../styles/Account.module.css'
import Box from '../../layouts/Box'

function AccountAvailablePaymentMethod({ newMethod }) {
  return (
    <>
      <Box type="black">
        <div className="flex justify-between py-3 px-8 items-center">
          <h4 className='text-sm font-semibold'>Payment Method</h4>
          <div className="">
            <button onClick={newMethod} className='btn btn-primary py-2 px-3 bg-[#b3ffd133] border-transparent text-primary'>
              New Method
            </button>
          </div>
        </div>
      </Box>
      <Box className="border-t-0 py-[26px] px-[63px]" type="black">
        <div className="flex justify-between items-center mb-7">
          <div className="flex relative">
            <span className={`${styles.removerPaymentContainer} rounded py-2 px-1 dark:bg-white bg-black`}>
              <span className={`${styles.removerPayment} dark:bg-black bg-white`}> </span>
            </span>
            <span className='w-10 flex items-center justify-center mr-[10px] pt-[4.5px] px-2 pb-[3px] h-6 bg-[#F6F8FA] rounded'>
              <Mastercard />
            </span>
            <div className='flex flex-col relative'>
              <span className='text-sm leading-[21px]'>Mastecard</span>
              <span className='text-[13px] leading-[21px] text-[#A1A5B7]'>Expires Dec 2024</span>
              <span className="right-[-44px] top-[-10px] text-[11px] absolute bg-[#F1FAFF] rounded-[14.95px] py-[5px] px-[9.5px] text-primary">Primary</span>
            </div>
          </div>

        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-sm'>Name</p>
            <p className='font-roboto text-sm text-darkMode-subText'>Emma Smith</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-sm'>Billing Address</p>
            <p className='font-roboto text-text-[#A1A5B7] text-darkMode-subText'>AU</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-sm'>Number</p>
            <p className='font-roboto text-sm text-darkMode-subText'>**** 8501</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-sm'>Phone</p>
            <p className='font-roboto text-sm text-darkMode-subText'>No phone provided</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-sm'>Expires</p>
            <p className='font-roboto text-sm text-darkMode-subText'>12/2024</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-sm'>Email</p>
            <p className='font-roboto text-sm text-darkMode-subText'>e.smith@kpmg.com.au</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-sm'>Type</p>
            <p className='font-roboto text-sm text-darkMode-subText'>Mastercard credit card</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-sm'>Origin</p>
            <p className='font-roboto text-sm text-darkMode-subText'>
              <span>Australia</span>
              <span>
                {/* flag */}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-sm'>Issuer</p>
            <p className='font-roboto text-sm text-darkMode-subText'>VICBANK</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-sm'>CVC check</p>
            <p className='flex font-roboto text-sm text-darkMode-subText'>
              <span>Passed</span>
              <span>&nbsp;</span>
              <span>
                <RoundTickActive className="text-primary" />
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className='font-roboto text-sm'>ID</p>
            <p className='font-roboto text-sm text-darkMode-subText'>id_4325df90sdf8</p>
          </div>
        </div>
      </Box>
    </>
  )
}

export default AccountAvailablePaymentMethod