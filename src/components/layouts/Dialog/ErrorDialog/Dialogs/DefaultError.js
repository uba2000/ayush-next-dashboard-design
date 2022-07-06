import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../../../../../ui/button';

import Layout from '../Layout';

const DefaultError = ({ closeModal }) => {
  const router = useRouter();

  const goToPricing = (url) => {
    router.push(url);
    closeModal();
  };
  return (
    <Layout
      errorMessage="Check your internet connection or try again."
      closeModal={closeModal}
      errorName="Unexpected Error."
    >
      <Button onClick={() => router.back()} variant="reset">
        Go Back.
      </Button>
    </Layout>
  );
};

export { DefaultError };
