import React, { Fragment } from 'react'
import { Tab } from '@headlessui/react'

import Layout from '../Layout'
import Input from '../../../components/layouts/Input'

const ExcludeFilter = () => {
  return (
    <Layout label={'Exclude'}>
      <div className='divide-y-2 dark:divide-darkMode-border divide-ash' style={{ width: '177px' }}>
        <div className="p-[10px] pb-[5px] space-y-[5px]">
          <div>
            <Input placeholder="Type A keywords" className="w-full h-[21px] text-xs px-2" />
          </div>
          <div className="" style={{ marginTop: '5px' }}>
            <p className="dark:text-darkMode-subText text-ash font-medium text-xs">
              Separate multiple words by commas.
            </p>
          </div>
        </div>
        <div>
          <button className='btn btn-primary w-full py-2'>Apply</button>
        </div>
      </div>
    </Layout>
  )
}

export { ExcludeFilter }