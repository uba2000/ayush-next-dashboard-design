import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { signIn, getCsrfToken } from 'next-auth/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import AuthLayout from '../components/AuthLayout';
import { Button } from '../ui/button';
import { post } from '../utils/http';
import { Input } from '../ui/input';

function ForgetPassword({ csrfToken }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
  };

  const onSubmit = async (values, submitProps) => {
    setLoading(true);

    try {
      setLoading(true);

      const { response, error } = await post({
        url: `${process.env.BASE_URL}/api/auth/forget-password`,
        data: {
          email: values.email,
        },
      });

      if (response) {
        // Check Email...
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('invalid email').required('email is required'),
  });

  return (
    <AuthLayout metaTitle="Forgot Password">
      <div className="z-20 w-full max-w-sm text-white">
        {/* TITLE */}
        <div className="flex justify-center mb-2">
          <h1 className="text-title font-bold text-center font-poppins flex flex-col ">
            Forgot Password
          </h1>
        </div>
        {/* SUBTITLE */}
        <div className="mb-3">
          <p className="text-subtitle text-center">
            I am so lorem ipum deloas In working with you sit amet, consectetur
            adipiscing elit. Porta pharetra scelerisque
          </p>
        </div>

        {/* FORM */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="w-full">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="">
              <Field
                as={Input}
                returnEvent={true}
                variant="auth"
                type="email"
                placeholder="Email"
                name="email"
              />
              <ErrorMessage name="email" component={FieldErrorText} />
            </div>
            <div className="mt-3">
              <Button
                className="w-full"
                type="submit"
                variant="gradient"
                state={loading && 'loading'}
              >
                Send recovery mail
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </AuthLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default ForgetPassword;
