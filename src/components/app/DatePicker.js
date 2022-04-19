import React from 'react'

import styles from '../../styles/Account.module.css'

function DatePicker() {

  const bindDatePicker = () => {

  }

  return (
    <div className="relative">
      <input type="text" className={styles.formGroupInput} />
      <span className='absolute right-4 top-[12px] cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
  )
}

export default DatePicker