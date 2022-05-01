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
                <Box className="flex-grow flex justify-center items-center border-b-0 border-l-0 border-r-0" type="black">
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