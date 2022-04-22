import React from 'react'

import DashboardLayout from '../../../../../components/app/DasboardLayout'
import Box from '../../../../../components/layouts/Box'
import { SearchIcon } from '../../../../../ui/icons/search-icon'
import {
  VolumeFilter,
  IncludeFilter,
} from '../../../../../page-components/keyword-results'

const results = () => {
  return (
    <DashboardLayout>
      <div className="space-y-[26px] w-full">
        <div className="grid grid-cols-4 w-full">
          <div className={`cursor-pointer py-5 border-r-0 text-center dark:bg-primary bg-primary border-primary text-white`}>
            <span className='font-semibold leading-[135%] capitalize'>Keywords</span>
          </div>
          <div className={`cursor-pointer py-5 border-r-0 text-center dark:bg-darkMode-bg bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border`}>
            <span className='font-semibold leading-[135%] capitalize'>Top Related Terms</span>
          </div>
          <div className={`cursor-pointer py-5 border-r-0 text-center dark:bg-darkMode-bg bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border`}>
            <span className='font-semibold leading-[135%] capitalize'>Rising Related Terms</span>
          </div>
          <div className={`cursor-pointer py-5 text-center dark:bg-darkMode-bg bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border`}>
            <span className='font-semibold leading-[135%] capitalize'>Search suggestions</span>
          </div>
        </div>
        <Box className={'py-5 px-[31px]'}>
          <div className="flex justify-between">
            <div>
              <span className='text-sm font-medium'>Keyword 1, keyword 2, Keyword 3, keyword 4, keyword 5, keyword 6</span>
            </div>
            <div>
              <SearchIcon
                className="h-5 w-5 dark:text-white text-black"
              />
            </div>
          </div>
        </Box>
        <div className='flex justify-between'>
          <div className="flex flex-grow space-x-2">
            <VolumeFilter />
            <IncludeFilter />
          </div>
          <div className="flex"></div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default results