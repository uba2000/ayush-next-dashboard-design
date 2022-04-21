import React from 'react'

import Layout from '../Layout'
import Input from '../../../components/layouts/Input'

const VolumeFilter = () => {
  return (
    <Layout label={'Volume'}>
      <div className='divide-x-2 dark:divide-darkMode-border divide-ash'>
        <div className="p-[10px] flex" style={{ width: '177px' }}>
          <Input placeholder="Min" className="w-[78px] h-[21px] text-xs px-2" />
          <Input placeholder="Max" className="w-[78px] h-[21px] text-xs px-2" />
        </div>
        <div>
          <button className='btn btn-primary w-full py-2'>Apply</button>
        </div>
      </div>
    </Layout>
  )
}

export { VolumeFilter }