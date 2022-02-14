import React from 'react'
import DashboardLayout from '../DasboardLayout'
import styles from '../../../styles/Account.module.css'
import Link from 'next/link'

// const StyledLink = styled(Link)`
//   color: red;
//   background: blue;
// `


function AccountLayout({ children }) {
  return (
    <DashboardLayout>
      <div className="container">
        <div className={styles.accountContainer}>
          <div className={styles.accountAside}>
            <ul>
              <li>
                <Link href='/app/account'>
                  <a>
                    Profile Settings
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/app/account/team'>
                  <a>
                    Team Member
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/app/account/limits'>
                  <a>
                    Limit & Usage
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/app/account/billing'>
                  <a>
                    Your Billing
                  </a>
                </Link>
              </li>
            </ul>
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