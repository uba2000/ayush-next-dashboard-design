import React from 'react';
import DashboardFooter from './DashboardFooter';
import DashboardNav from './DashboardNav';

function DashboardLayout({ children }) {
  return (
    <div>
      <DashboardNav />
      <div className="page-section flex justify-center">
        <div className="container mx-0">
          {children}
        </div>
      </div>
      {/* footer */}
      <DashboardFooter />
    </div>
  );
}

export default DashboardLayout;
