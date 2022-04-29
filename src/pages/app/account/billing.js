import React, { useState, Fragment } from 'react'
import Link from 'next/link'
import { Tab } from '@headlessui/react'

import AccountLayout from '../../../components/app/account/AccountLayout'
import AccountBillingSubscription from '../../../components/app/account/AccountBillingSubscription'
import Box from '../../../components/layouts/Box'
import AccountBillingInvoices from '../../../components/app/account/AccountBillingInvoices'
import AccountAvailablePaymentMethod from '../../../components/app/account/AccountAvailablePaymentMethod'
import AccountPaymentMethods from '../../../components/app/account/AccountPaymentMethods'

function billing() {

  const [tabIndex, setTabIndex] = useState(0)

  const [isNewPaymentMethod, setIsNewPaymentMethod] = useState(false)

  const updateTabIndex = (index) => {
    setTabIndex(index)
  }

  return (
    <AccountLayout>
      <Tab.Group selectedIndex={tabIndex} onChange={(index) => updateTabIndex(index)}>
        <Tab.List>
          <div className="accountFrameboxNav">
            <Tab as={Fragment}>
              <Box type={`${tabIndex == 0 ? 'black' : ''}`} className={`accountFrameboxNavItem border-b-0 ${tabIndex == 0 && 'accountFrameboxNavItemActive'}`}>
                Subscriptions
              </Box>
            </Tab>
            <Tab as={Fragment}>
              <Box type={`${tabIndex == 1 ? 'black' : ''}`} className={`accountFrameboxNavItem border-b-0 border-l-0 ${tabIndex == 1 && 'accountFrameboxNavItemActive'}`}>
                Invoices
              </Box>
            </Tab>
            <Tab as={Fragment}>
              <Box type={`${tabIndex == 2 ? 'black' : ''}`} className={`accountFrameboxNavItem border-b-0 border-l-0 ${tabIndex == 2 && 'accountFrameboxNavItemActive'}`}>
                Payment Methods
              </Box>
            </Tab>
          </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div>
              <AccountBillingSubscription />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div>
              <AccountBillingInvoices />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div>
              {!isNewPaymentMethod ? (
                <AccountAvailablePaymentMethod newMethod={() => setIsNewPaymentMethod(true)} />
              ) : (
                <AccountPaymentMethods />
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </AccountLayout>
  )
}

export default billing