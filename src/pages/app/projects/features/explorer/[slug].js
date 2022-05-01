import React, { useContext } from 'react'

import DashboardLayout from '../../../../../components/app/DasboardLayout'
import ExplorerLayout from '../../../../../page-components/feature-explorer/ExplorerLayout'
import { ExplorerWrapper, useExplorerContext } from '../../../../../context/explorer'


const index = () => {
  return (
    <ExplorerWrapper>
      <DashboardLayout>
        <ExplorerLayout>

        </ExplorerLayout>
      </DashboardLayout>
    </ExplorerWrapper>
  )
}

export default index