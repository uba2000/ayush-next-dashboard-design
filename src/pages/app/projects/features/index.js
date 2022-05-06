import React from 'react'

import AllFeaturesView from '../../../../page-components/project-categories/features/AllFeaturesView'
import DashboardLayout from '../../../../components/app/DasboardLayout'

const Index = () => {
  return (
    <DashboardLayout>
      <AllFeaturesView />
    </DashboardLayout>
  )
}

Index.auth = true
export default Index