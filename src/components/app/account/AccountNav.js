import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from '../../../styles/Account.module.css'

function AccountNav() {
  return (
    <div className='md:block hidden'>
      <div className={styles.accountAside}>
        <ul>
          <li>
            <NavLink to='/app/account' activeClassName="active" exact={true}>
              <a>
                Profile Settings
              </a>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='/app/account/team' activeClassName="active" exact={true}>
              <a>
                Team Member
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink to='/app/account/limits' activeClassName="active" exact={true}>
              <a>
                Limit &amp; Usage
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink to='/app/account/billing' activeClassName="active" exact={true}>
              <a>
                Your Billing
              </a>
            </NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default AccountNav