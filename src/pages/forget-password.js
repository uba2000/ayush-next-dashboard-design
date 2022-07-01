import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { signIn, getCsrfToken } from 'next-auth/react';

import AuthLayout from '../components/AuthLayout';
import { Button } from '../ui/button';
import { post } from '../utils/http';
import { Input } from '../ui/input';

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
        <form action="" className="w-full" onSubmit={onSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="">
            <Input
              variant="auth"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e)}
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
