import React from 'react';
import Link from 'next/link';
import GradientDesign from '../components/GradientDesign';

function AuthLayout({ children }) {
  return (
    <div className='bg-black absolute top-0 left-0 min-h-screen min-w-screen flex justify-center overflow-hidden'>
      <div className='container'>
        {/* HEADER */}
        <div className="flex w-full text-white px-12 md:px-2 py-10 justify-between items-center z-10">
          <Link href="/">
            <a>
              <div className="font-bold text-2xl md:text-3xl font-poppins">
                SEO CONTENT .AI
              </div>
            </a>
          </Link>
          <div className="hidden text md:text-xl font-poppins md:flex">
            <Link href="/login">
              <a>
                <p className="mx-5 text-green-200 border border-green-200 rounded-lg hover:bg-green-600 hover:text-white px-8 py-3 cursor-pointer">Sign In</p>
              </a>
            </Link>
          </div>

        </div>

        { /* MAIN BODY */}
        <div className='flex container justify-center'>
          <GradientDesign />


          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
