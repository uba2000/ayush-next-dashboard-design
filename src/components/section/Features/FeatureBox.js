import React from 'react'

import Box from '../../layouts/Box'
const FeatureBox = ({ feature }) => {
  return (
    <Box>
      <div className="p-7 space-y-4">
        <div className="flex justify-between">
          <div>
            <img src={`/svg/${feature.slug}.svg`} alt="" />
          </div>
          <div>

          </div>
        </div>
        <div className="space-y-2">
          <h5 className='capitalize font-semibold tracking-tight text-lg'>
            {feature.name}
          </h5>
          <p className="dark:text-darkMode-subText text-ash">
            {feature.description}
          </p>
        </div>
      </div>
    </Box>
  )
}

export default FeatureBox