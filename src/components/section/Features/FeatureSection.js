import React, { Fragment } from 'react'

import FeatureBox from './FeatureBox'

const FeatureSection = ({ features }) => {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-5">
      {features.map((feature) => {
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