import React, { useEffect } from 'react'
// import { getSession } from 'next-auth/client'

import DashboardFooter from '../layouts/DashboardFooter';
import DashboardNav from '../layouts/DashboardNav';

function DashboardLayout({ children, customChildren }) {
  console.log(children.props);
  return (
    <div>
      <DashboardNav />
      <div className="page-section relative overflow-hidden flex flex-col items-center">
        {!customChildren ? <div className="container flex-grow mx-0 flex justify-center items-center flex-col">
          {children}
        </div> : <div className='h-full w-full'>
          {children}
        </div>}
      </div>
      {/* footer */}
      <DashboardFooter />
      {/* delete modal */}
      {false && <div className="overlay z-50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="container mx-auto">
          <div className="modal-container mx-auto">
            <div className="title">
              <span>Are you sure?</span>
            </div>
            <div className="subtitle">
              <span>Deleting is final and cannot be reversed. are you sure you still want to proceed?</span>
            </div>
            <div className="flex justify-center">
              <button className="btn btn-primary bg-primary text-white">
                Confirm
              </button>
              <div className="ml-3 btn btn-reset">Cancel</div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default DashboardLayout;
