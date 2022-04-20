import React from 'react'

import Box from '../../layouts/Box'
const FeatureBox = ({ feature }) => {
  return (
    <Box>
      <div className="p-7 space-y-4">
        <div className="flex justify-between">
          <div>
            <img src={`/svg/features/${feature.slug}.svg`} alt="" />
          </div>
          <div className='cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-[#292929]" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
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