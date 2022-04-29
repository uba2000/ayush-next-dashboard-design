import React, { Fragment, useState } from 'react'

import FeatureBox from './FeatureBox'
import { useProjectsContext } from '../../../context/projects'

const FeatureSection = () => {
  const state = useProjectsContext()

  const [stateFeature, setStateFeature] = useState(state.projectFeatures)

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-5">
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