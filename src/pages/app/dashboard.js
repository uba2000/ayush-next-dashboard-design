import React from 'react';
import { getSession } from 'next-auth/react';

import DashboardLayout from '../../components/app/DasboardLayout';
import AllFeaturesView from '../../page-components/project-categories/features/AllFeaturesView';
import { setHeaders, get } from '../../utils/http';
import features from '../../_mock/features';

function Dashboard({ features }) {
  return (
    <DashboardLayout>
      <AllFeaturesView stateFeature={features} isGetStarted={true} />
    </DashboardLayout>
  );
}

Dashboard.auth = true;

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

export default Dashboard;
