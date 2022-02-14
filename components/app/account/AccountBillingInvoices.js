import React from 'react'
import styles from '../../../styles/Account.module.css'

function AccountBillingInvoices() {
  return (
    <div className='overflow-x-auto'>
      <table className='new'>
        <thead className=''>
          <tr className='border-b-[0.90956px] border-b-[#dcd8e7] border-solid'>
            <th className='col-span-2 font-bold text-[13.0398px] leading-[20px] pl-[30px] py-[18.5px]'>ID</th>
            <th className='col-span-2 font-bold text-[13.0398px] leading-[20px] pl-[30px] py-[18.5px] w-[18.19%] min-w-[131.4px]'>Date</th>
            <th className='col-span-2 font-bold text-[13.0398px] leading-[20px] pl-[30px] py-[18.5px] w-[18.19%] min-w-[131.4px]'>Amount</th>
            <th className='col-span-2 font-bold text-[13.0398px] leading-[20px] px-[30px] py-[18.5px] w-[18.19%] min-w-[131.4px]'>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b-[0.90956px] border-b-[#dcd8e7] border-solid'>
            <td className='col-span-2 font-bold text-[13.0398px] leading-[20px] pl-[30px] py-[18.5px]'>Ah21112021-26514-784584b</td>
            <td className='col-span-2 font-bold text-[13.0398px] leading-[20px] pl-[30px] py-[18.5px]'>6 december 2021</td>
            <td className='col-span-2 font-bold text-[13.0398px] leading-[20px] pl-[30px] py-[18.5px]'>60.00 USD</td>
            <td className='col-span-2 font-bold text-[13.0398px] leading-[20px] py-[18.5px]'>
              <button className='btn text-center bg-gray-1000 border border-solid border-gray-800 py-2 px-9 text-[9px] leading-[13px]'>Download</button>
            </td>
          </tr>
          <tr className='border-b-[0.90956px] border-b-[#dcd8e7] border-solid'>
            <td className='col-span-2 font-bold text-[13.0398px] leading-[20px] pl-[30px] py-[18.5px]'>Ah21112021-26514-784584b</td>
            <td className='col-span-2 font-bold text-[13.0398px] leading-[20px] pl-[30px] py-[18.5px]'>6 december 2021</td>
            <td className='col-span-2 font-bold text-[13.0398px] leading-[20px] pl-[30px] py-[18.5px]'>60.00 USD</td>
            <td className='col-span-2 font-bold text-[13.0398px] leading-[20px] py-[18.5px]'>
              <button className='btn text-center bg-gray-1000 border border-solid border-gray-800 py-2 px-9 text-[9px] leading-[13px]'>Download</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AccountBillingInvoices