import React from 'react'

import ActiveLink from '../../ActiveLink'
import DashboardLayout from '../DasboardLayout'
import styles from '../../../styles/Account.module.css'
import Link from "next/link"

function AccountLayout({ children }) {



  return (
    <DashboardLayout>
      <div className="container md:px-4 px-0">
        <div className='grid md:grid-cols-[213px_auto] grid-cols-1 border-[#f7f9fa] border border-solid'>
          <div className='md:block hidden'>
            <div className={styles.accountAside}>
              <ul>
                <li>
                  <ActiveLink href='/app/account'>
                    Profile Settings
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink href='/app/account/team'>
                    Team Member
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink href='/app/account/limits'>
                    Limit & Usage
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink href='/app/account/billing'>
                    Your Billing
                  </ActiveLink>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.accountMain}>
            <div className="container py-14 my-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AccountLayout