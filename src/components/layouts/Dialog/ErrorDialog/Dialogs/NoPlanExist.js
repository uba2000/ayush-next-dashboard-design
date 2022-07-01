import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../../../../../ui/button';

import Layout from '../Layout';

const NoPlanExist = ({ closeModal }) => {
  const router = useRouter();

  const goToPricing = () => {
    router.push('/app/account/pricing');
    closeModal();
  };
  return (
    <Layout
      errorMessage="Select an active plan to generate content."
      closeModal={closeModal}
      errorName="You do not have an active plan"
    >
      <Button onClick={goToPricing}>Select Plan</Button>
      <Button variant="reset" className="dark:text-darkMode-subText text-ash">
        Cancel
      </Button>
    </Layout>
  );
};

export { NoPlanExist };
