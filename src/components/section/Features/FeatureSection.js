import React, { Fragment } from 'react'
import ScrollbarsLayout from '../../layouts/Scrollbars'

import FeatureBox from './FeatureBox'

const FeatureSection = ({ features }) => {
  return (
    <ScrollbarsLayout h="600px">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-5 max-h-[230px]">
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
    </ScrollbarsLayout>
  )
}

export default FeatureSection