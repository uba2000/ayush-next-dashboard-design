import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../../../../../ui/button';

import Layout from '../Layout';

const NoPaymentMethod = ({ closeModal }) => {
  const router = useRouter();

  const goToPricing = () => {
    router.push('/app/account/billing');
    closeModal();
  };
  return (
    <Layout
      errorMessage="You do not have an active payment method."
      closeModal={closeModal}
      errorName="No payment method."
    >
      <Button onClick={goToPricing}>Set Payment Method</Button>
      <Button
        onClick={closeModal}
        variant="reset"
        className="dark:text-darkMode-subText text-ash"
      >
        Cancel
      </Button>
    </Layout>
  );
};

export { NoPaymentMethod };
