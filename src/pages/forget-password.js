import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { signIn, getCsrfToken } from 'next-auth/react';

import AuthLayout from '../components/AuthLayout';
import { Button } from '../ui/button';
import { post } from '../utils/http';

function ForgetPassword({ csrfToken }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (!email || !email.includes('@')) {
        // Show error...
        return;
      }
      setLoading(true);

      const { response, error } = await post({
        url: `${process.env.BASE_URL}/api/auth/forget-password`,
        data: {
          email,
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

  return (
    <AuthLayout metaTitle="Forgot Password">
      <div className="z-20 w-full max-w-sm">
        {/* TITLE */}
        <div className="flex justify-center mb-2">
          <p className="text-title mt-12 md:mt-12 font-bold text-center font-poppins flex flex-col ">
            Forgot Password
          </p>
        </div>
        {/* SUBTITLE */}
        <div className="mb-3">
          <p className="text-subtitle text-center font-poppins ">
            I am so lorem ipum deloas In working with you sit amet, consectetur
            adipiscing elit. Porta pharetra scelerisque
          </p>
        </div>

        {/* FORM */}
        <form action="" className="w-full" onSubmit={onSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="">
            <input
              className="font-poppins px-5 py-3  text-base border border-white rounded-md focus:outline-none bg-black focus:border-green-600"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
        </form>
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
