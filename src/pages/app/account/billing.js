import React, { useState, useEffect, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { getSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';

import AccountLayout from '../../../components/app/account/AccountLayout';
import AccountBillingSubscription from '../../../components/app/account/AccountBillingSubscription';
import Box from '../../../components/layouts/Box';
import AccountBillingInvoices from '../../../components/app/account/AccountBillingInvoices';
import AccountAvailablePaymentMethod from '../../../components/app/account/AccountAvailablePaymentMethod';
import AccountPaymentMethods from '../../../components/app/account/AccountPaymentMethods';
import { get, setHeaders } from '../../../utils/http';
import { useThemeContext } from '../../../context/theme';
import { DialogLayout } from '../../../components/layouts/Dialog';
import { X } from '../../../ui/icons';

const tabs = [
  { tab: 'Subscriptions', q: 's' },
  { tab: 'Invoices', q: 'i' },
  { tab: 'Payment Methods', q: 'p' },
];

console.log(process.env.STRIPE_CLIENT_PUBLIC_KEY);
const stripePromise = loadStripe(
  'pk_test_51JH1OEEOvhBgdP3wopZQ9CS9nAj6bMrpJ6PJk4VB5aoE2w1LtZmlwAkuxUCRDHua8clckICf8t5BWZnnFqC9ZZOJ00rcgO9Nag'
);
function billing({ paymentMethods, currentPlan, intent }) {
  const state = useThemeContext();
  const router = useRouter();

  const { query } = router;

  const [tabIndex, setTabIndex] = useState(0);

  const [isNewPaymentMethod, setIsNewPaymentMethod] = useState(false);

  const updateTabIndex = (index) => {
    setTabIndex(index);
  };

  const options = {
    // passing the client secret obtained in step 2
    clientSecret: intent.client_secret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
      theme: 'none',
      rules: {
        '.Tab': {
          backgroundColor: !state.themeMode.isDarkMode
            ? 'rgb(17,17,17)'
            : '#ffffff',
        },
        '.Tab--selected': {
          border: `1px solid ${
            !state.themeMode.isDarkMode
              ? 'rgb(177,177,177)'
              : 'rgb(247, 249, 250)'
          }`,
        },
        '.TabLabel': {
          colorText: !state.themeMode.isDarkMode ? '#ffffff' : '#000000',
        },
        '.Input': {
          padding: '11.5px 17.18px',
          fontFamily: 'Poppins',
          border: `1px solid ${
            !state.themeMode.isDarkMode ? 'rgb(177,177,177)' : '#000000'
          }`,
          colorText: !state.themeMode.isDarkMode ? '#ffffff' : '#000000',
          backgroundColor: !state.themeMode.isDarkMode
            ? 'rgb(17,17,17)'
            : '#ffffff',
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '25px',
          height: '45px',
          outline: 'none',
          borderRadius: '0px',
        },
        '.Label': {
          fontFamily: 'Poppins',
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '135%',
          marginBottom: '12px',
        },
      },
    },
  };

  const [openBillingProcessing, setOpenBillingProcessing] = useState(false);

  const closeBillingProcessing = () => {
    setOpenBillingProcessing(false);
    router.push('/app/account/billing');
  };

  const checkWhichTab = () => {
    let cQuery = query;
    if (cQuery.tab) {
      let queryTabIndex = tabs.findIndex((t) => t.q == cQuery.tab);
      if (queryTabIndex != -1) {
        setTabIndex(queryTabIndex);
      } else {
        setTabIndex(0);
      }
    }
  };

  useEffect(() => {
    if (query.setup_intent && query.setup_intent_client_secret) {
      updateTabIndex(2);
      setIsNewPaymentMethod(true);
      setOpenBillingProcessing(true);
    }
    checkWhichTab();
  }, []);

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
              <div className={`${!isNewPaymentMethod ? 'block' : 'hidden'}`}>
                <AccountAvailablePaymentMethod
                  paymentMethods={paymentMethods}
                  newMethod={() => setIsNewPaymentMethod(true)}
                />
              </div>
              <div className={`${isNewPaymentMethod ? 'block' : 'hidden'}`}>
                <Elements stripe={stripePromise} options={options}>
                  <AccountPaymentMethods
                    intent={intent}
                    openBillingProcessing={openBillingProcessing}
                    closeBillingProcessing={closeBillingProcessing}
                    showMethods={() => setIsNewPaymentMethod(false)}
                  />
                </Elements>
              </div>
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
            intent: JSON.parse(JSON.stringify(response.data.data.intent)),
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
