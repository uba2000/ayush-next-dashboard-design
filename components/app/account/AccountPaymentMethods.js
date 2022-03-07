import React, { useState } from 'react'

import {
  RadioChecked,
  IconRadio,
  Paypal,
  Maestro,
  Visa,
  Mastercard,
  PaypayButton
} from '../../../ui/icons/index'
import styles from '../../../styles/Account.module.css'
import FormGroup from '../../FormGroup'

function AccountPaymentMethods() {
  const [cardChecked, setCardChecked] = useState(false)
  const [payPalChecked, setPayPalChecked] = useState(!cardChecked)
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
          <div>
            <input type="checkbox" className='hidden' id='cardPayment' name='payment_method' checked={cardChecked} onChange={(e) => { setCardChecked(!cardChecked); setPayPalChecked(!cardChecked) }} />
          </div>
          <label htmlFor='cardPayment' className='flex items-center text-[15.7287px] leading-[135%] text-[#404145] mr-[18px]'>
            <span className='mr-[18px]'>{cardChecked ? <RadioChecked /> : <IconRadio />}</span>
            Credit & Debit cards <span className='ml-[17.31px]'><Visa /></span><span className='ml-[9.16px]'><Mastercard /></span><span className='ml-[9.16px]'><Maestro /></span>
          </label>
          <div></div>
        </div>
      </div>
      {cardChecked && <div className={styles.accountFrameboxCardSection}>
        <div className="pl-[23px] pr-[23px] py-6 cardItemStyle">
          <div className="grid md:grid-cols-2 gap-[18.32px] grid-cols-1">
            <FormGroup label='Card Number' labelFor='cardno'>
              <input id='cardno' type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className={styles.formGroupInput} />
            </FormGroup>
            <div className="grid md:grid-cols-2 gap-[18.32px] grid-cols-1">
              <FormGroup label='Expiration Date' labelFor='expDate'>
                <input id='expDate' type="text" value={expDate} onChange={(e) => setExpDate(e.target.value)} placeholder='MM/YY' className={styles.formGroupInput} />
              </FormGroup>
              <FormGroup label='Security Code' labelFor='secCode'>
                <input id='secCode' type="text" value={secCode} onChange={(e) => setSecCode(e.target.value)} className={styles.formGroupInput} />
              </FormGroup>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-[18.32px] grid-cols-1">
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
          <div>
            <input type="checkbox" id='paypalPayment' className='hidden' name='payment_method' checked={payPalChecked} onChange={(e) => { setPayPalChecked(cardChecked); setCardChecked(!cardChecked); }} />
          </div>
          <label htmlFor='paypalPayment' className='flex items-center text-[15.7287px] leading-[135%] text-[#404145] mr-[18px]'>
            <span className='mr-[18px]'>{!cardChecked ? <RadioChecked /> : <IconRadio />}</span>
            <Paypal />
          </label>
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
      {!cardChecked && <div className={styles.accountFrameboxCardSection}>
        <PaypayButton />
      </div>}
    </>
  )
}

export default AccountPaymentMethods