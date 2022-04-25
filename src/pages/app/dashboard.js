import React from 'react'

import DashboardLayout from '../../components/app/DasboardLayout'
import AllFeaturesView from '../../page-components/project-categories/features/AllFeaturesView'

function Dashboard() {

  return (
    <DashboardLayout>
      <AllFeaturesView />
    </DashboardLayout>
  )
}

export default Dashboard