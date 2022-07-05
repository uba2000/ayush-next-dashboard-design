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
import { DialogLayout } from '../../../components/layouts/Dialog';
import { X } from '../../../ui/icons';

console.log(process.env.STRIPE_CLIENT_PUBLIC_KEY);
const stripePromise = loadStripe(
  'pk_test_51JH1OEEOvhBgdP3wopZQ9CS9nAj6bMrpJ6PJk4VB5aoE2w1LtZmlwAkuxUCRDHua8clckICf8t5BWZnnFqC9ZZOJ00rcgO9Nag'
);
function billing({ paymentMethods, currentPlan, intent }) {
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
      theme: 'stripe',
      colorPrimary: '#0570de',
      colorBackground: '#111111',
      colorText: '#30313d',
      colorDanger: '#FF3749',
      fontFamily: 'Poppins, sans-serif',
      spacingUnit: '2px',
      borderRadius: '0px',
    },
  };

  const [openBillingProcessing, setOpenBillingProcessing] = useState(false);

  const closeBillingProcessing = () => {
    setOpenBillingProcessing(false);
    router.push('/app/account/billing');
  };

  useEffect(() => {
    if (query.setup_intent && query.setup_intent_client_secret) {
      updateTabIndex(2);
      setIsNewPaymentMethod(true);
      setOpenBillingProcessing(true);
    }
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
              {!isNewPaymentMethod ? (
                <AccountAvailablePaymentMethod
                  paymentMethods={paymentMethods}
                  newMethod={() => setIsNewPaymentMethod(true)}
                />
              ) : (
                <Elements stripe={stripePromise} options={options}>
                  <AccountPaymentMethods
                    intent={intent}
                    openBillingProcessing={openBillingProcessing}
                    closeBillingProcessing={closeBillingProcessing}
                    showMethods={() => setIsNewPaymentMethod(false)}
                  />
                </Elements>
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
