import React from 'react'
import Link from 'next/link'

import DashboardLayout from '../../components/app/DasboardLayout'
import DashboardLanding from '../../components/app/DashboardLanding'
import GradientDesign from '../../components/GradientDesign'
import SearchInput from '../../components/SearchInput'
import FilterSection from '../../components/section/Filter/FilterSection'
import Box from '../../components/layouts/Box'

function Dashboard() {
  return (
    <DashboardLayout>
      {/* Landing Section */}
      <DashboardLanding
        oneChild={true}
        className="mb-[107px]"
        landingText='Hey, what will you create today?'
        subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aeneanI am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consec' />
      <GradientDesign />

      <div className="relative w-full">
        <div className="flex w-full">
          <div className="flex-grow">
            <FilterSection />
          </div>
          <div className="">
            <SearchInput />
          </div>
        </div>

        <div className="pt-[30px] pb-[35px] w-full">
          <Box>
            <div className="py-[39px] pl-[60px] pr-[90px] space-y-[10px]">
              <div className="flex space-x-4">
                <div className="flex-grow max-w-[847px]">
                  <h3 className='font-bold text-2xl capitalize'>Start bulk blog writing content</h3>
                  <p className='text-lg leading-7 dark:text-darkMode-subText text-ash'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa at nibh aliquam nec sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  </p>
                </div>
                <div className='flex flex-grow justify-end items-center'>
                  <Link href='/'>
                    <a className="block w-fit btn btn-primary bg-primary text-white font-poppins">
                      Get Started
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard