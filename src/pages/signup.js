import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

import AuthLayout from '../components/AuthLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Signup = () => {
  const router = useRouter();

  const form = useRef(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    try {
      if (agreeToTerms) {
        setLoading(true);
        if (!email || !email.includes('@') || !password || !fullName) {
          // Show error...
          return;
        }

        const { data, status } = await axios.post('/api/auth/signup', {
          email,
          password,
          fullName,
        });
        console.log(status);

        if ((status == 200 || status == 201) && data) {
          form.current.reset();
          router.push('/signin');
        }

        setLoading(false);
      } else {
        console.log('Agree terms');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <AuthLayout metaTitle="Sign Up">
      <div className="z-20 w-full max-w-sm">
        {/* TITLE */}
        <div className="flex justify-center mb-2">
          <h1 className="text-title font-bold text-center font-poppins flex flex-col">
            Sign Up
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
        <form action="" className="w-full" onSubmit={onSubmitSignUp} ref={form}>
          <div className="">
            <Input
              variant="auth"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e)}
            />
          </div>
          <div className="mt-3">
            <Input
              variant="auth"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e)}
            />
          </div>
          <div className="mt-3 relative">
            <Input
              variant="auth"
              type={!passwordVisible ? 'password' : 'text'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e)}
            />
            <div
              style={{
                top: 'calc(50% - 10px)',
                right: '19.67px',
              }}
              className="absolute cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {!passwordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye-off"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="3" y1="3" x2="21" y2="21" />
                  <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                  <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                </svg>
              )}
            </div>
          </div>
          <div
            className="mt-3 flex justify-start cursor-pointer"
            onClick={() => setAgreeToTerms(!agreeToTerms)}
          >
            {!agreeToTerms ? (
              <span className="w-[16.33px] h-[16.33px] bg-white"></span>
            ) : (
              <div className="pop-in-animation">
                <svg
                  width="16.33"
                  height="16.33"
                  className="tick-svg"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.49988 0.833984C5.51075 0.833984 3.6031 1.58026 2.19658 2.90864C0.790054 4.23703 -0.00012207 6.0387 -0.00012207 7.91732V22.084C-0.00012207 23.9626 0.790054 25.7643 2.19658 27.0927C3.6031 28.421 5.51075 29.1673 7.49988 29.1673H22.4999C24.489 29.1673 26.3967 28.421 27.8032 27.0927C29.2097 25.7643 29.9999 23.9626 29.9999 22.084V7.91732C29.9999 6.0387 29.2097 4.23703 27.8032 2.90864C26.3967 1.58026 24.489 0.833984 22.4999 0.833984H7.49988ZM20.5949 13.1363C20.7296 13.0005 20.8347 12.841 20.9042 12.6668C20.9736 12.4926 21.0061 12.3073 20.9997 12.1212C20.9932 11.9352 20.9481 11.7522 20.8668 11.5827C20.7855 11.4132 20.6697 11.2604 20.5259 11.1332C20.3821 11.0059 20.2132 10.9066 20.0287 10.8411C19.8443 10.7755 19.648 10.7448 19.4511 10.7509C19.2541 10.7569 19.0604 10.7995 18.8809 10.8763C18.7014 10.9531 18.5396 11.0625 18.4049 11.1983L13.7804 15.8592L11.4959 13.9424C11.1966 13.7074 10.8123 13.5915 10.4241 13.6191C10.036 13.6468 9.67445 13.8159 9.41586 14.0906C9.15727 14.3654 9.02189 14.7243 9.03831 15.0916C9.05474 15.4589 9.22168 15.8057 9.50388 16.0589L12.8789 18.8922C13.1709 19.1372 13.5526 19.265 13.9428 19.2483C14.333 19.2316 14.701 19.0719 14.9684 18.803L20.5934 13.1363H20.5949Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            )}
            <label
              htmlFor="termsAgree"
              className="cursor-pointer select-none text-xs ml-2 font-poppins flex-grow flex-shrink"
            >
              I agree to the Terms of Service and Privacy Policy.
            </label>
          </div>
          <div className="mt-3">
            <Button
              className="w-full"
              type="submit"
              variant="gradient"
              state={loading && 'loading'}
            >
              Create An Account
            </Button>
          </div>
          <div className="mt-3 text-center">
            <p className="">
              Have an account?&nbsp;
              <Link href="/signin">
                <a>
                  <span className="font-semibold foot-link font-base">
                    Sign In
                  </span>
                </a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
