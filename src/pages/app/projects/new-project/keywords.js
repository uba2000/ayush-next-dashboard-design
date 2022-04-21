import React, { useState, Fragment } from 'react'
import { useRouter } from 'next/router'

import DashboardLayout from '../../../../components/app/DasboardLayout'
import DashboardLanding from '../../../../components/app/DashboardLanding'
import FormGroup from '../../../../components/FormGroup'
import Box from '../../../../components/layouts/Box'
import keywords from '../../../../_mock/keywords'

function KeywordsPage() {

  const router = useRouter()

  const [projectKeywords, setProjectKeywords] = useState(keywords)
  return (
    <DashboardLayout>
      <DashboardLanding
        oneChild={true}
        landingText='Provide Keywords'
        subLandingShort={true}
        subLandingText='I am so lorem ipum deloas In working with you Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
      >
        <div className='space-y-4'>
          <Box className={`min-h-[532px] mt-[55px] py-6 px-7 rounded-sm`}>
            <div className="flex flex-wrap space-x-2">
              {projectKeywords.map((k) => (
                <Fragment key={k.id}>
                  <Box type={'black'} className='p-2 w-fit min-w-fit mb-[11px]'>
                    <div className="flex space-x-[6px]">
                      <span className='font-medium text-sm'>
                        {k.keyword}
                      </span>
                      <span className='cursor-pointer'></span>
                    </div>
                  </Box>
                </Fragment>
              ))}
            </div>
          </Box>
          <Box className={'py-6 px-[59px]'}>
            <div className="flex justify-between">
              <button className="btn btn-primary bg-black border border-solid border-ash dark:border-darkMode-border">
                Go Back
              </button>
              <div className='space-x-4'>
                <button className="btn btn-reset text-sm dark:text-white text-black">Import CSV</button>
                <button className="btn btn-primary">Start Analysis</button>
              </div>
            </div>
          </Box>
        </div>
      </DashboardLanding>
    </DashboardLayout>
  )
}

export default KeywordsPage