import React from 'react'

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
                  <Link exact href='/app/account' activeClassName="active">
                    <a>
                      Profile Settings
                    </a>
                  </Link>
                </li>
                <li>
                  <Link exact href='/app/account/team' activeClassName="active">
                    <a>
                      Team Member
                    </a>
                  </Link>
                </li>
                <li>
                  <Link exact href='/app/account/limits' activeClassName="active">
                    <a>
                      Limit & Usage
                    </a>
                  </Link>
                </li>
                <li>
                  <Link exact href='/app/account/billing' activeClassName="active">
                    <a>
                      Your Billing
                    </a>
                  </Link>
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