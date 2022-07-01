import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../../../../../ui/button';

import Layout from '../Layout';

const PlanExpired = ({ closeModal }) => {
  const router = useRouter();

  const goToPricing = () => {
    router.push('/app/account/pricing');
    closeModal();
  };
  return (
    <Layout
      errorMessage="Select an active plan to generate content."
      closeModal={closeModal}
      errorName="Select a new plan"
    >
      <Button onClick={goToPricing}>Renew Plan</Button>
      <Button variant="reset" className="dark:text-darkMode-subText text-ash">
        Cancel
      </Button>
    </Layout>
  );
};

export { PlanExpired };
