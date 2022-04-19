import React from 'react';
import GradientDesign from '../components/GradientDesign';
import AuthNav from './AuthNav';

function AuthLayout({ children }) {
  return (
    <div className='bg-black absolute top-0 left-0 min-h-screen min-w-screen flex justify-center overflow-hidden'>
      <div className='container'>
        {/* HEADER */}
        <AuthNav />

        { /* MAIN BODY */}
        <div className='flex container justify-center px-0'>
          <GradientDesign isTopView={true} />


          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
