import React, { useRef, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import valid from 'card-validator';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';

import {
  RadioChecked,
  IconRadio,
  Paypal,
  Maestro,
  Visa,
  Mastercard,
  PaypayButton,
  X,
} from '../../../ui/icons';
import styles from '../../../styles/Account.module.css';
import FormGroup from '../../FormGroup';
import Box from '../../layouts/Box';
import { Input } from '../../../ui/input';
import useUser from '../../../hooks/useUser';
import { post, setHeaders } from '../../../utils/http';
import { Button } from '../../../ui/button';
import FieldErrorText from '../../layouts/FieldErrorText';
import { DialogLayout } from '../../layouts/Dialog';

function AccountPaymentMethods({
  showMethods,
  intent,
  openBillingProcessing,
  closeBillingProcessing,
}) {
  const { user } = useUser();

  const stripe = useStripe();

  const elements = useElements();

  const [billingProcessMessage, setbillingProcessMessage] = useState(
    "Processing payment details. We'll update you when processing is complete."
  );
  const [isProcessing, setIsProcessing] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const paymentForm = useRef(null);

  const [cardChecked, setCardChecked] = useState(true);
  const [payPalChecked, setPayPalChecked] = useState(!cardChecked);

  const [loading, setLoading] = useState(false);

  const createNewMethod = async (values) => {
    setLoading(true);

    const { response, error } = await post({
      url: `${process.env.BASE_URL}/api/account/payment-method`,
      headers: setHeaders({ token: user.accessToken }),
      data: values,
    });

    if (response.status) {
      // close modal...
    }
  };

  const handleStripeSubmit = async (values, submitProps) => {
    try {
      setLoading(true);
      console.log('Handling card setup...');
      if (!stripe || !elements) {
        return;
      }

      const stripeResult = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${process.env.BASE_URL}/app/account/billing`,
        },
      });

      console.log(stripeResult);

      if (stripeResult.error) {
        setErrorMessage(error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    firstName: '',
    lastName: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('first name is required'),
    lastName: Yup.string().required('last name is required'),
  });

  useEffect(() => {
    if (openBillingProcessing) {
      if (!stripe) {
        return;
      }

      const clientSecret = new URLSearchParams(window.location.search).get(
        'setup_intent_client_secret'
      );

      // Retrieve the SetupIntent
      stripe.retrieveSetupIntent(clientSecret).then(async ({ setupIntent }) => {
        console.log(setupIntent);
        switch (setupIntent.status) {
          case 'succeeded':
            setbillingProcessMessage(
              'Success! Your payment method has been saved.'
            );
            setIsProcessing(false);
            await createNewMethod({
              payment_method: setupIntent.payment_method,
              customer_id: intent.customer_id,
              client_secret: setupIntent.client_secret,
              intent_id: setupIntent.id,
            });
            break;

          case 'processing':
            setbillingProcessMessage(
              "Processing payment details. We'll update you when processing is complete."
            );
            break;

          case 'requires_payment_method':
            setbillingProcessMessage(
              'Failed to process payment details. Please try another payment method.'
            );
            break;
        }
      });
    }
  }, [stripe]);

  return (
    <>
      <DialogLayout
        isOpen={openBillingProcessing}
        closeModal={closeBillingProcessing}
      >
        <div className="md:px-[130px] px-4 py-20 relative">
          <div
            className="absolute top-[30px] right-7 cursor-pointer"
            onClick={closeBillingProcessing}
          >
            <span>
              <X className="w-[21px] h-[21px]" />
            </span>
          </div>
          <div className="space-y-6">
            <div className="mb-[26.85px]">
              <span>{/* Spinning loader */}</span>
            </div>
            <div className="space-y-2">
              <DialogLayout.Title
                className={'capitalize text-xl font-semibold'}
              >
                {billingProcessMessage}
              </DialogLayout.Title>
            </div>
            <div className="space-x-4">{/* close button or so... */}</div>
          </div>
        </div>
      </DialogLayout>
      <Box type="black">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleStripeSubmit}
        >
          <Form ref={paymentForm} className=" py-6 cardItemStyle">
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
                <div className="hidden md:grid-cols-2 gap-[18.32px] grid-cols-1">
                  <FormGroup label="Card Number" labelFor="cardno">
                    <Field
                      as={Input}
                      returnEvent={true}
                      id="cardno"
                      name="cardNumber"
                      maxLength={16}
                      className={`${styles.formGroupInput}`}
                    />
                    <ErrorMessage
                      name="cardNumber"
                      component={FieldErrorText}
                    />
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
                <div className={`${stripe ? 'block' : 'hidden'}`}>
                  <PaymentElement />
                  <div className="mt-3 grid md:grid-cols-2 gap-[18.32px] grid-cols-1">
                    <FormGroup label="First Name" labelFor="firstName">
                      <Field
                        as={Input}
                        returnEvent={true}
                        id="firstName"
                        name="firstName"
                        className={`${styles.formGroupInput}`}
                      />
                      <ErrorMessage
                        name="firstName"
                        component={FieldErrorText}
                      />
                    </FormGroup>
                    <FormGroup label="Last Name" labelFor="lastName">
                      <Field
                        as={Input}
                        returnEvent={true}
                        id="lastName"
                        name="lastName"
                        className={`${styles.formGroupInput}`}
                      />
                      <ErrorMessage
                        name="lastName"
                        component={FieldErrorText}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className={`${!stripe ? 'block' : 'hidden'}`}>
                  Loading...
                </div>
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
                <Button state={loading && 'loading'} type="submit">
                  Setup Payment Methods
                </Button>
                <Button
                  variant="reset"
                  onClick={() => paymentForm.current.reset()}
                >
                  Reset
                </Button>
                {errorMessage && <div>{errorMessage}</div>}
              </div>
            )}
            {!cardChecked && (
              <div className={styles.accountFrameboxCardSection}>
                <PaypayButton />
              </div>
            )}
          </Form>
        </Formik>
      </Box>
    </>
  );
}

export default AccountPaymentMethods;
