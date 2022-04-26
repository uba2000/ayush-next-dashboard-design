import React, { Fragment, useState } from 'react'

import FeatureBox from './FeatureBox'
import { useProjectsContext } from '../../../context/projects'

const FeatureSection = () => {
  const state = useProjectsContext()

  const [stateFeature, setStateFeature] = useState(state.projectFeatures)

  return (
    <div className="grid grid-cols-4 gap-5">
      {stateFeature.map((feature) => {
        return (
          <Fragment key={feature.id}>
            <FeatureBox
              feature={feature}
            />
          </Fragment>
        )
      })}

    </div>
  )
}

export default FeatureSection