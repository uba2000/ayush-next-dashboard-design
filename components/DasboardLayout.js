import React from 'react';
import DashboardFooter from './DashboardFooter';
import DashboardNav from './DashboardNav';

function DashboardLayout({ children }) {
  return (
    <div>
      <DashboardNav />
      <div className="page-section flex justify-center">
        {children}
      </div>
      {/* footer */}
      <DashboardFooter />
    </div>
  );
}

export default DashboardLayout;
