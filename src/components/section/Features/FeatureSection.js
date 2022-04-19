import React, { Fragment, useState } from 'react'

import FeatureBox from './FeatureBox'
import Features from '../../../_mock/features'

const FeatureSection = () => {
  const [stateFeature, setStateFeature] = useState(Features)
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