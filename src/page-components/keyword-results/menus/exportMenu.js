import React from 'react'

import { ExportIcon } from '../../../ui/icons'

const ExportMenu = () => {
  return (
    <div className={`cursor-pointer border border-solid focus:dark:bg-primary focus:bg-primary focus:text-white focus:border-primary dark:bg-darkMode-bg bg-white dark:text-white text-black border-ash dark:border-darkMode-border`}>
      <div className="flex py-2 px-5 items-center">
        <span>
          <ExportIcon className="w-[17px] h-[17px]" />
        </span>
        <span style={{ marginLeft: '7px' }} className='capitalize font-medium text-sm'>Export</span>
      </div>
    </div>
  )
}

export { ExportMenu }