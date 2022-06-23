import React, { useEffect } from 'react';
import Head from 'next/head';
// import { getSession } from 'next-auth/client'

import DashboardFooter from '../layouts/DashboardFooter';
import DashboardNav from '../layouts/DashboardNav';
import ScrollbarsLayout from '../layouts/Scrollbars';

function DashboardLayout({ children, customChildren, metaTitle }) {
  return (
    <>
      <Head>
        <title>
          {metaTitle ? `${metaTitle} • SEO Content Ai` : 'SEO Content Ai'}
        </title>
      </Head>
      <div>
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
