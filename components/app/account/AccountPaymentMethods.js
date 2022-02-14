import React, { useState } from 'react'
import styles from '../../../styles/Account.module.css'
import FormGroup from '../../FormGroup'

function AccountPaymentMethods() {
  const [cardChecked, setCardChecked] = useState(true)
  const [payPalChecked, setPayPalChecked] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expDate, setExpDate] = useState('')
  const [secCode, setSecCode] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  return (
    <>
      <div className={styles.accountFrameboxCardSection}>
        <h4 className='text-[13.0398px] leading-[20px]'>Select Method for the future payment </h4>
      </div>
      <div className={styles.accountFrameboxCardSection}>
        <div className="flex">
          <div className='mr-[18px]'>
            <input type="radio" id='cardPayment' name='paymentMethod' checked={cardChecked} onChange={(e) => setCardChecked(e.target.checked)} />
          </div>
          <label htmlFor='cardPayment' className='text-[15.7287px] leading-[135%] text-[#404145] mr-[18px]'>Credit & Debit cards </label>
          <div></div>
        </div>
      </div>
      {cardChecked && <div className={styles.accountFrameboxCardSection}>
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
            <FormGroup label='First Name' labelFor='firstName'>
              <input id='firstName' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={styles.formGroupInput} />
            </FormGroup>
            <FormGroup label='Last Name' labelFor='lastName'>
              <input id='lastName' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={styles.formGroupInput} />
            </FormGroup>
          </div>
        </div>
      </div>}
      <div className={styles.accountFrameboxCardSection}>
        <div className="flex">
          <div className='mr-[18px]'>
            <input type="radio" id='paypalPayment' name='paymentMethod' checked={payPalChecked} onChange={(e) => setPayPalChecked(e.target.checked)} />
          </div>
          <label htmlFor='paypalPayment' className='text-[15.7287px] leading-[135%] text-[#404145] mr-[18px]'>PayPal</label>
          <div></div>
        </div>
      </div>
      {cardChecked && <div className={styles.accountFrameboxCardSection}>
        <button className="btn btn-primary mr-4">
          Setup Payment Methods
        </button>
        <button className="btn btn-reset">
          Reset
        </button>
      </div>}
      {payPalChecked && <div className={styles.accountFrameboxCardSection}>
        <button className="btn btn-primary mr-4 bg-[#009CDE]">
          <span className='mr-[4.38px]'></span>
          <span>Setup</span>
        </button>
      </div>}
    </>
  )
}

export default AccountPaymentMethods