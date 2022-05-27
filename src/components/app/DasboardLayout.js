import React, { useEffect } from 'react'
// import { getSession } from 'next-auth/client'

import DashboardFooter from '../layouts/DashboardFooter';
import DashboardNav from '../layouts/DashboardNav';
import ScrollbarsLayout from '../layouts/Scrollbars';

function DashboardLayout({ children, customChildren }) {

  return (
    <div>
      <DashboardNav />
      <ScrollbarsLayout h="calc(100vh - 204.01px)">
        <div
          id='page-section'
          className="pt-[100.98px] pb-[50px] relative overflow-hidden flex flex-col items-center">
          {!customChildren ? <div className="container flex-grow mx-0 flex justify-center items-center flex-col">
            {children}
          </div> : <div className='h-full w-full'>
            {children}
          </div>}
        </div>
      </ScrollbarsLayout>
      {/* footer */}
      <DashboardFooter />
    </div>
  );
}

export default DashboardLayout;
