import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Box from '../../components/layouts/Box'
import ExplorerForms from './ExplorerForms'

const ExplorerLayout = () => {

  const { query } = useRouter()

  const [isGenerated, setIsGenerated] = useState(false)

  return (
    <div className="grid grid-cols-[436px_auto] gap-[33px] w-full">
      <Box>
        <div className="text-left divide-y-[1px] dark:divide-darkMode-border divide-ash">
          <div className="py-[14px] px-5">
            <span className='font-semibold capitalize'>SERP Explorer</span>
          </div>
          <div className="p-5 space-y-6">
            <ExplorerForms slug={query.slug} />
          </div>
        </div>
      </Box>
      <div className='flex flex-col'>
        <Box className="h-full">
          <div className="h-full flex flex-col text-left divide-y-[1px] dark:divide-darkMode-border divide-ash">
            {!isGenerated ? (
              <>
                <div className="py-[14px] px-[35px]">
                  <span className='font-semibold'>Feature Results</span>
                </div>
                <Box className="flex-grow min-h-[792px] flex justify-center items-center border-b-0 border-l-0 border-r-0" type="black">
                  <div className="container">
                    <div className="">
                      <h2 className="font-bold text-[30px] leading-[61px] text-center tracking-tight capitalize">
                        SERP Explorer
                      </h2>
                      <p className='text-center max-w-[612px] mx-auto'>
                        <span className='font-medium'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis dictum scelerisque duis nisl lorem. Nullam tortor pretium placerat est id adipiscing.
                        </span>
                      </p>
                    </div>
                  </div>
                </Box>
              </>
            ) : (
              <>
                <div className="py-[14px] px-[35px] font-semibold space-x-5">
                  <span>All (0)</span>
                  <span>Favorites (3)</span>
                </div>
                <Box type="black" className="border-r-0 border-l-0 border-b-0 py-6 px-[18px] space-y-5 flex-grow min-h-[792px]">
                  <Box className="p-4 rounded-lg">
                    <div className="flex space-x-4">
                      <div className="">
                        <div className="h-6 w-6 rounded-full border dark:border-darkMode-border border-ash flex justify-center items-center">
                          <span className='text-xs leading-[18px]'>01</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <span className='text-lg text-justify'>
                          Content marketing is about creating valuable
                          content for your audience to consume.
                          Sometimes, it can be difficult knowing how to start
                          or what types of content to publish.
                          To help make content marketing easier, use these steps:
                          - Determine your target market
                          - Create a plan
                          - Post regularly and consistently
                          - Stay consistent with the brand's voice
                        </span>
                      </div>
                      <div className="">
                        <div className="cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-[#292929]" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Box>
              </>
            )}
          </div>
        </Box>
      </div>
    </div>
  )
}

export const LabelLayout = ({ children }) => {
  return <span className='font-semibold text-[15px] leading-[22px]'>{children}</span>
}

export const ExplorerTwoInputLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {children}
    </div>
  )
}


export default ExplorerLayout