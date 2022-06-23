import React, { useState, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { getSession } from 'next-auth/react';

import AccountLayout from '../../../components/app/account/AccountLayout';
import AccountBillingSubscription from '../../../components/app/account/AccountBillingSubscription';
import Box from '../../../components/layouts/Box';
import AccountBillingInvoices from '../../../components/app/account/AccountBillingInvoices';
import AccountAvailablePaymentMethod from '../../../components/app/account/AccountAvailablePaymentMethod';
import AccountPaymentMethods from '../../../components/app/account/AccountPaymentMethods';
import { get, setHeaders } from '../../../utils/http';

function billing({ paymentMethods, currentPlan }) {
  const [tabIndex, setTabIndex] = useState(0);

  const [isNewPaymentMethod, setIsNewPaymentMethod] = useState(false);

  const updateTabIndex = (index) => {
    setTabIndex(index);
  };

  return (
    <AccountLayout metaTitle="Billing">
      <Tab.Group
        selectedIndex={tabIndex}
        onChange={(index) => updateTabIndex(index)}
      >
        <Tab.List>
          <div className="accountFrameboxNav">
            <Tab as={Fragment}>
              <Box
                type={`${tabIndex == 0 ? 'black' : ''}`}
                className={`accountFrameboxNavItem border-b-0 ${
                  tabIndex == 0 && 'accountFrameboxNavItemActive'
                }`}
              >
                Subscriptions
              </Box>
            </Tab>
            <Tab as={Fragment}>
              <Box
                type={`${tabIndex == 1 ? 'black' : ''}`}
                className={`accountFrameboxNavItem border-b-0 border-l-0 ${
                  tabIndex == 1 && 'accountFrameboxNavItemActive'
                }`}
              >
                Invoices
              </Box>
            </Tab>
            <Tab as={Fragment}>
              <Box
                type={`${tabIndex == 2 ? 'black' : ''}`}
                className={`accountFrameboxNavItem border-b-0 border-l-0 ${
                  tabIndex == 2 && 'accountFrameboxNavItemActive'
                }`}
              >
                Payment Methods
              </Box>
            </Tab>
          </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div>
              <AccountBillingSubscription currentPlan={currentPlan} />
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
                <AccountAvailablePaymentMethod
                  paymentMethods={paymentMethods}
                  newMethod={() => setIsNewPaymentMethod(true)}
                />
              ) : (
                <AccountPaymentMethods
                  showMethods={() => setIsNewPaymentMethod(false)}
                />
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </AccountLayout>
  );
}

billing.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    if (session?.user) {
      const { response, error } = await get({
        url: `${process.env.BASE_URL}/api/account/get-billing-info`,
        headers: setHeaders({ token: session.user.accessToken }),
      });

      if (response.status) {
        return {
          props: {
            paymentMethods: JSON.parse(
              JSON.stringify(response.data.data.paymentMethods)
            ),
            currentPlan: JSON.parse(
              JSON.stringify(response.data.data.currentPlan)
            ),
          },
        };
      }
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
}

export default billing;
