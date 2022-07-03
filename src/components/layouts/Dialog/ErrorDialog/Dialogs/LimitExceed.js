import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../../../../../ui/button';

import Layout from '../Layout';

const LimitExceed = ({ closeModal }) => {
  const router = useRouter();

  const goToPricing = (url) => {
    router.push(url);
    closeModal();
  };
  return (
    <Layout
      errorMessage="Your current plan limit has been exceeded."
      closeModal={closeModal}
      errorName="Plan Limit Exceeded"
    >
      <Button onClick={() => goToPricing('/app/account/pricing')}>
        Upgrade Plan
      </Button>
      <Button
        onClick={() => goToPricing('/app/account/limits')}
        variant="reset"
      >
        Check Limit
      </Button>
    </Layout>
  );
};

export { LimitExceed };
