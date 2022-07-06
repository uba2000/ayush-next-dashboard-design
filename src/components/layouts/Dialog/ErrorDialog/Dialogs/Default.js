import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../../../../../ui/button';

import Layout from '../Layout';

const Default = ({ closeModal }) => {
  const router = useRouter();

  const goToPricing = (url) => {
    router.push(url);
    closeModal();
  };
  return (
    <Layout
      errorMessage="Check your internet connection and try again."
      closeModal={closeModal}
      errorName="Unexpected Error."
    >
      <Button onClick={() => router.back()} variant="reset">
        Go Back.
      </Button>
    </Layout>
  );
};

export { Default };
