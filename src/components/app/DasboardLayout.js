import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
// import { getSession } from 'next-auth/client'

import DashboardFooter from '../layouts/DashboardFooter';
import DashboardNav from '../layouts/DashboardNav';
import ScrollbarsLayout from '../layouts/Scrollbars';
import ErrorDialog from '../layouts/Dialog/ErrorDialog';
import { setShowErrorDialog } from '../../features/error/errorSlice';

function DashboardLayout({ children, customChildren, metaTitle }) {
  const dispatch = useDispatch();

  const { showErrorDialog, errorDetails } = useSelector((state) => state.error);
  return (
    <>
      <Head>
        <title>
          {metaTitle ? `${metaTitle} • SEO Content Ai` : 'SEO Content Ai'}
        </title>
      </Head>
      <div>
        <ErrorDialog
          isOpen={showErrorDialog}
          errorDetails={errorDetails}
          closeModal={() => dispatch(setShowErrorDialog(false))}
        />
        <DashboardNav />
        <ScrollbarsLayout h="calc(100vh - 96.01px)">
          <div
            id="page-section"
            className="min-h-[calc(100vh_-_204px)] pt-[100.98px] pb-[50px] relative overflow-hidden flex flex-col items-center"
          >
            {!customChildren ? (
              <div className="container mx-0 flex justify-center items-center flex-col">
                {children}
              </div>
            ) : (
              <div className="h-full w-full">{children}</div>
            )}
          </div>
          <DashboardFooter />
        </ScrollbarsLayout>
        {/* footer */}
      </div>
    </>
  );
}

export default DashboardLayout;
