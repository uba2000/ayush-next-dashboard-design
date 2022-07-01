import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../../../../../ui/button';

import Layout from '../Layout';

const LimitExceed = ({ closeModal }) => {
  const router = useRouter();

  const goToPricing = () => {
    router.push('/app/account/pricing');
    closeModal();
  };
  return (
    <Layout
      errorMessage="Your current plan limit has been exceeded."
      closeModal={closeModal}
      errorName="Plan Limit Exceeded"
    >
      <Button onClick={goToPricing}>Upgrade Plan</Button>
      <Button variant="reset" className="dark:text-darkMode-subText text-ash">
        Cancel
      </Button>
    </Layout>
  );
};

export { LimitExceed };
