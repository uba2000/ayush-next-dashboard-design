import React, { useRef, useState } from 'react';

import {
  RadioChecked,
  IconRadio,
  Paypal,
  Maestro,
  Visa,
  Mastercard,
  PaypayButton,
} from '../../../ui/icons';
import styles from '../../../styles/Account.module.css';
import FormGroup from '../../FormGroup';
import Box from '../../layouts/Box';
import Input from '../../layouts/Input';
import useUser from '../../../hooks/useUser';
import { post, setHeaders } from '../../../utils/http';
import { Button } from '../../../ui/button';

function AccountPaymentMethods({ showMethods }) {
  const { user } = useUser();

  const paymentForm = useRef(null);

  const [cardChecked, setCardChecked] = useState(false);
  const [payPalChecked, setPayPalChecked] = useState(!cardChecked);

  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [secCode, setSecCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [loading, setLoading] = useState(false);

  const createNewMethod = async () => {
    setLoading(true);
    let reqObject = {
      cardNumber,
      firstName,
      lastName,
      expDate,
      secCode,
    };

    const { response, error } = await post({
      url: `${process.env.BASE_URL}/api/account/payment-method`,
      headers: setHeaders({ token: user.accessToken }),
      data: reqObject,
    });

    if (response.status) {
      setLoading(false);
      showMethods();
    }
  };

  return (
    <Box type="black">
      <div className="flex justify-between py-[21px] px-[30px] items-center border-b border-ash dark:border-darkMode-border">
        <h4 className="text-sm font-semibold">
          Select Method for the future payment
        </h4>
      </div>
      <div
        className={`${styles.accountFrameboxCardSection} border-b border-ash dark:border-darkMode-border`}
      >
        <div className="flex">
          <div>
            <input
              type="checkbox"
              className="hidden"
              id="cardPayment"
              name="payment_method"
              checked={cardChecked}
              onChange={(e) => {
                setCardChecked(!cardChecked);
                setPayPalChecked(!cardChecked);
              }}
            />
          </div>
          <label
            htmlFor="cardPayment"
            className="flex items-center text-[15.7287px] leading-[135%] mr-[18px]"
          >
            <span className="mr-[18px]">
              {cardChecked ? <RadioChecked /> : <IconRadio />}
            </span>
            Credit &amp; Debit cards{' '}
            <span className="ml-[17.31px]">
              <Visa />
            </span>
            <span className="ml-[9.16px]">
              <Mastercard />
            </span>
            <span className="ml-[9.16px]">
              <Maestro />
            </span>
          </label>
          <div></div>
        </div>
      </div>
      {cardChecked && (
        <div
          className={`${styles.accountFrameboxCardSection} border-b border-ash dark:border-darkMode-border`}
        >
          <form
            ref={paymentForm}
            className="pl-[23px] pr-[23px] py-6 cardItemStyle"
          >
            <div className="grid md:grid-cols-2 gap-[18.32px] grid-cols-1">
              <FormGroup label="Card Number" labelFor="cardno">
                <Input
                  id="cardno"
                  type="text"
                  value={cardNumber}
                  maxLength={16}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className={`${styles.formGroupInput} dark:bg-darkMode-bg`}
                />
              </FormGroup>
              <div className="grid md:grid-cols-2 gap-[18.32px] grid-cols-1">
                <FormGroup label="Expiration Date" labelFor="expDate">
                  <Input
                    id="expDate"
                    type="text"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    placeholder="MM/YY"
                    className={`${styles.formGroupInput} dark:bg-darkMode-bg`}
                  />
                </FormGroup>
                <FormGroup label="Security Code" labelFor="secCode">
                  <Input
                    id="secCode"
                    type="text"
                    value={secCode}
                    maxLength={3}
                    onChange={(e) => setSecCode(e.target.value)}
                    className={`${styles.formGroupInput} dark:bg-darkMode-bg`}
                  />
                </FormGroup>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-[18.32px] grid-cols-1">
              <FormGroup label="First Name" labelFor="firstName">
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`${styles.formGroupInput} dark:bg-darkMode-bg`}
                />
              </FormGroup>
              <FormGroup label="Last Name" labelFor="lastName">
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`${styles.formGroupInput} dark:bg-darkMode-bg`}
                />
              </FormGroup>
            </div>
          </form>
        </div>
      )}
      <div
        className={`${styles.accountFrameboxCardSection} border-b border-ash dark:border-darkMode-border`}
      >
        <div className="flex">
          <div>
            <input
              type="checkbox"
              id="paypalPayment"
              className="hidden"
              name="payment_method"
              checked={payPalChecked}
              onChange={(e) => {
                setPayPalChecked(cardChecked);
                setCardChecked(!cardChecked);
              }}
            />
          </div>
          <label
            htmlFor="paypalPayment"
            className="flex items-center text-[15.7287px] leading-[135%] text-[#404145] mr-[18px]"
          >
            <span className="mr-[18px]">
              {!cardChecked ? <RadioChecked /> : <IconRadio />}
            </span>
            <Paypal />
          </label>
          <div></div>
        </div>
      </div>
      {cardChecked && (
        <div className={styles.accountFrameboxCardSection}>
          <Button
            state={loading && 'loading'}
            onClick={() => createNewMethod()}
          >
            Setup Payment Methods
          </Button>
          <Button variant="reset" onClick={() => paymentForm.current.reset()}>
            Reset
          </Button>
        </div>
      )}
      {!cardChecked && (
        <div className={styles.accountFrameboxCardSection}>
          <PaypayButton />
        </div>
      )}
    </Box>
  );
}

export default AccountPaymentMethods;
