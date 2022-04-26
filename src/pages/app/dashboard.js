import React from 'react'

import DashboardLayout from '../../components/app/DasboardLayout'
import AllFeaturesView from '../../page-components/project-categories/features/AllFeaturesView'

function Dashboard() {

  return (
    <DashboardLayout>
      <AllFeaturesView isGetStarted={true} />
    </DashboardLayout>
  )
}

export default Dashboard