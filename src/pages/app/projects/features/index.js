import React from 'react';
import { getSession } from 'next-auth/react';

import AllFeaturesView from '../../../../page-components/project-categories/features/AllFeaturesView';
import DashboardLayout from '../../../../components/app/DasboardLayout';
import { setHeaders, get } from '../../../../utils/http';

const Index = ({ features }) => {
  return (
    <DashboardLayout>
      <AllFeaturesView stateFeature={features} />
    </DashboardLayout>
  );
};

Index.auth = true;

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);

    if (session?.user) {
      const { response, error } = await get({
        url: `${process.env.BASE_URL}/api/feature`,
        headers: setHeaders({ token: session.user.accessToken }),
      });
      if (response) {
        return {
          props: {
            features: response.data.data,
          },
        };
      }
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
export default Index;
