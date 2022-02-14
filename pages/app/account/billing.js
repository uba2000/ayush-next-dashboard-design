import React, { useState } from 'react'
import styles from '../../../styles/Account.module.css'
import AccountLayout from '../../../components/app/account/AccountLayout'
import Link from 'next/link'
import AccountBillingSubscription from '../../../components/app/account/AccountBillingSubscription'
import AccountBillingInvoices from '../../../components/app/account/AccountBillingInvoices'
import AccountPaymentMethods from '../../../components/app/account/AccountPaymentMethods'

function billing() {

  const [subscriptionsNav, setSubscriptionsNav] = useState(true)
  const [invoiceNav, setInvoiceNav] = useState(false)
  const [methodsNav, setMethodsNav] = useState(false)

  function toggleNav(nav) {
    setSubscriptionsNav(false)
    setInvoiceNav(false)
    setMethodsNav(false)
    if (nav == 's') {
      setSubscriptionsNav(true)
    } else if (nav == 'i') {
      setInvoiceNav(true)
    } else if (nav == 'm') {
      setMethodsNav(true)
    }
  }
  return (
    <AccountLayout>
      <div className="mb-8">
        <div className='accountFrameboxNav'>
          <div onClick={() => toggleNav('s')} className={`accountFrameboxNavItem ${subscriptionsNav && 'accountFrameboxNavItemActive'}`}>
            Subscriptions
          </div>
          <div className='accountFrameboxNavItem' onClick={() => toggleNav('i')} className={`accountFrameboxNavItem ${invoiceNav && 'accountFrameboxNavItemActive'}`}>
            Invoices
          </div>
          <div className='accountFrameboxNavItem' onClick={() => toggleNav('m')} className={`accountFrameboxNavItem ${methodsNav && 'accountFrameboxNavItemActive'}`}>
            Payment Methods
          </div>
        </div>
        <div className='border border-solid border-gray-800 bg-white w-full' style={{ minHeight: '62.45px' }}>
          {subscriptionsNav && <AccountBillingSubscription />}
          {invoiceNav && <AccountBillingInvoices />}
          {methodsNav && <AccountPaymentMethods />}
        </div>
      </div>
      {subscriptionsNav && <div className={styles.accountFramebox}>
        <h3 className={styles.accountFrameboxTitle}>
          See your current plan
        </h3>
        <p className={styles.accountFrameboxContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium pulvinar luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <Link href='/app/account/pricing'>
          <a>
            <button className='btn btn-primary'>Plans &amp; pricing</button>
          </a>
        </Link>
      </div>}
    </AccountLayout>
  )
}

export default billing