import React, { useState } from 'react'
import styles from '../../../styles/Account.module.css'
import FormGroup from '../../FormGroup'

function AccountPaymentMethods() {
  const [cardChecked, setCardChecked] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expDate, setExpDate] = useState('')
  const [secCode, setSecCode] = useState('')
  return (
    <>
      <div className={styles.accountFrameboxCardSection}>
        <h4 className='text-[13.0398px] leading-[20px]'>Select Method for the future payment </h4>
      </div>
      <div className={styles.accountFrameboxCardSection}>
        <div className="flex">
          <div className='mr-[18px]'>
            <input type="radio" checked={cardChecked} onChange={(e) => setCardChecked(e.target.checked)} />
          </div>
          <h4 className='text-[15.7287px] leading-[135%] text-[#404145] mr-[18px]'>Credit & Debit cards </h4>
          <div></div>
        </div>
      </div>
      <div className={styles.accountFrameboxCardSection}>
        <div className="pl-[23px] pr-[23px] py-6 cardItemStyle">
          <div className="grid grid-cols-2 gap-[18.32px]">
            <FormGroup label='Card Number' labelFor='cardno'>
              <input id='cardno' type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className={styles.formGroupInput} />
            </FormGroup>
            <div className="grid grid-cols-2 gap-[18.32px]">
              <FormGroup label='Expiration Date' labelFor='expDate'>
                <input id='expDate' type="text" value={expDate} onChange={(e) => setExpDate(e.target.value)} placeholder='MM/YY' className={styles.formGroupInput} />
              </FormGroup>
              <FormGroup label='Security Code' labelFor='secCode'>
                <input id='secCode' type="text" value={secCode} onChange={(e) => setSecCode(e.target.value)} className={styles.formGroupInput} />
              </FormGroup>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[18.32px]">
            <FormGroup label='Card Number' labelFor='cardno'>
              <input id='cardno' type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className={styles.formGroupInput} />
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountPaymentMethods