import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import AuthLayout from '../components/AuthLayout';

const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <AuthLayout>
      <div className="z-20 w-full max-w-sm">

        {/* TITLE */}
        <div className="flex justify-center mb-2">
          <p className="text-title mt-12 md:mt-12 font-bold text-center font-poppins flex flex-col text-white">
            Sign Up
          </p>
        </div>
        {/* SUBTITLE */}
        <div className="mb-3">
          <p className="text-subtitle text-center font-poppins text-white">
            I am so lorem ipum deloas In working with you
            sit amet, consectetur adipiscing elit. Porta pharetra scelerisque
          </p>
        </div>

        {/* FORM */}
        <form action="" className='w-full'>
          <div className="">
            <input
              className="font-poppins px-5 py-3 text-white text-base border border-white rounded-md focus:outline-none bg-black focus:border-green-600"
              type="text"
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <input
              className="font-poppins px-5 py-3 text-white text-base border border-white rounded-md focus:outline-none bg-black focus:border-green-600"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-3 relative">
            <input
              className="font-poppins px-5 py-3 text-white text-base border border-white rounded-md focus:outline-none bg-black focus:border-green-600"
              type={!passwordVisible ? 'password' : 'text'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{
              top: 'calc(50% - 10px)',
              right: '19.67px',
            }} className="absolute cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
              {
                !passwordVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="3" y1="3" x2="21" y2="21" />
                    <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                    <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                  </svg>
                )
              }
            </div>
          </div>
          <div className="mt-3 flex justify-start">
            <input
              className="text-gray-300 bg-black focus:outline-none w-fit"
              type="checkbox"
              value={agreeToTerms}
              id="termsAgree"
              onChange={(e) => setAgreeToTerms(e.target.value)}
            />
            <label for="termsAgree" className="text-white text-xs ml-2 font-poppins flex-grow flex-shrink">
              I agree to the Terms of Service and Privacy Policy.
            </label>
          </div>
          <div className="mt-3">
            <button className="font-inter w-full bg-gradient-to-r from-green via-green-500 to-yellow text-black py-3 px-4 font-bold text-base rounded-md">
              Create An Account
            </button>
          </div>
          <div className="mt-3 text-center">
            <p className="text-white text-inter font-inter">
              Have an account?&nbsp;
              <Link href='/signin'>
                <a>
                  <span className="font-semibold">Sign In</span>
                </a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Signup;