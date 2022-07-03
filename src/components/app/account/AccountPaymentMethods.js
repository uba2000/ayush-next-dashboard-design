import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import valid from 'card-validator';

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
import { Input } from '../../../ui/input';
import useUser from '../../../hooks/useUser';
import { post, setHeaders } from '../../../utils/http';
import { Button } from '../../../ui/button';
import FieldErrorText from '../../layouts/FieldErrorText';

function AccountPaymentMethods({ showMethods }) {
  const { user } = useUser();

  const paymentForm = useRef(null);

  const [cardChecked, setCardChecked] = useState(false);
  const [payPalChecked, setPayPalChecked] = useState(!cardChecked);

  const [loading, setLoading] = useState(false);

  const createNewMethod = async (values, submitProps) => {
    setLoading(true);
    let reqObject = {
      cardNumber: values.cardNumber,
      firstName: values.firstName,
      lastName: values.lastName,
      expDate: values.expDate,
      secCode: values.secCode,
    };

    const { response, error } = await post({
      url: `${process.env.BASE_URL}/api/account/payment-method`,
      headers: setHeaders({ token: user.accessToken }),
      data: reqObject,
    });

    if (response.status) {
      submitProps.resetForm();
      setLoading(false);
      showMethods();
    }
  };

  const initialValues = {
    cardNumber: '',
    firstName: '',
    lastName: '',
    expDate: '',
    secCode: '',
  };

  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .test(
        'test-number',
        'credit card number is invalid',
        (value) => valid.number(value).isValid
      )
      .required(),
    expDate: Yup.string()
      .test(
        'test-number',
        'credit card number is invalid',
        (value) => valid.expirationDate(value).isValid
      )
      .required(),
    secCode: Yup.string()
      .test(
        'test-number',
        'credit card number is invalid',
        (value) => valid.cvv(value).isValid
      )
      .required(),
    firstName: Yup.string().required('first name is required'),
    lastName: Yup.string().required('last name is required'),
  });

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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={createNewMethod}
          >
            <Form
              ref={paymentForm}
              className="pl-[23px] pr-[23px] py-6 cardItemStyle"
            >
              <div className="grid md:grid-cols-2 gap-[18.32px] grid-cols-1">
                <FormGroup label="Card Number" labelFor="cardno">
                  <Field
                    as={Input}
                    returnEvent={true}
                    id="cardno"
                    name="cardNumber"
                    maxLength={16}
                    className={`${styles.formGroupInput}`}
                  />
                  <ErrorMessage name="cardNumber" component={FieldErrorText} />
                </FormGroup>
                <div className="grid md:grid-cols-2 gap-[18.32px] grid-cols-1">
                  <FormGroup label="Expiration Date" labelFor="expDate">
                    <Field
                      as={Input}
                      returnEvent={true}
                      id="expDate"
                      name="expDate"
                      placeholder="MM/YY"
                      className={`${styles.formGroupInput}`}
                    />
                    <ErrorMessage name="expDate" component={FieldErrorText} />
                  </FormGroup>
                  <FormGroup label="Security Code" labelFor="secCode">
                    <Field
                      as={Input}
                      returnEvent={true}
                      id="secCode"
                      name="secCode"
                      maxLength={3}
                      className={`${styles.formGroupInput}`}
                    />
                    <ErrorMessage name="secCode" component={FieldErrorText} />
                  </FormGroup>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-[18.32px] grid-cols-1">
                <FormGroup label="First Name" labelFor="firstName">
                  <Field
                    as={Input}
                    returnEvent={true}
                    id="firstName"
                    name="firstName"
                    className={`${styles.formGroupInput}`}
                  />
                  <ErrorMessage name="firstName" component={FieldErrorText} />
                </FormGroup>
                <FormGroup label="Last Name" labelFor="lastName">
                  <Field
                    as={Input}
                    returnEvent={true}
                    id="lastName"
                    name="lastName"
                    className={`${styles.formGroupInput}`}
                  />
                  <ErrorMessage name="lastName" component={FieldErrorText} />
                </FormGroup>
              </div>
            </Form>
          </Formik>
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
