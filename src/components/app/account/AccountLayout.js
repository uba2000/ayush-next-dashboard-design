import React from 'react';

import ActiveLink from '../../ActiveLink';
import DashboardLayout from '../DasboardLayout';
import styles from '../../../styles/Account.module.css';
import Link from 'next/link';
import Box from '../../layouts/Box';

function AccountLayout({ children, metaTitle }) {
  return (
    <DashboardLayout metaTitle={metaTitle}>
      <div className="container md:px-4 px-0">
        <div className="grid pb-[137px] md:grid-cols-[213px_auto] grid-cols-1">
          <Box className="md:block hidden" type={'black'}>
            <div className={styles.accountAside}>
              <ul>
                <li>
                  <ActiveLink href="/app/account">Profile Settings</ActiveLink>
                </li>
                <li>
                  <ActiveLink href="/app/account/team">Team Member</ActiveLink>
                </li>
                <li>
                  <ActiveLink href="/app/account/limits">
                    Limit & Usage
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink href="/app/account/billing">
                    Your Billing
                  </ActiveLink>
                </li>
              </ul>
            </div>
          </Box>
          <Box className={styles.accountMain}>
            <div className="container py-14 my-1">{children}</div>
          </Box>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AccountLayout;
