import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { useAppContext } from '../../../context/state'
import { useProjectsContext } from '../../../context/projects'
import GradientDesign from '../../../components/GradientDesign'
import SearchInput from '../../../components/SearchInput'
import FilterSection from '../../../components/section/Filter/FilterSection'
import Box from '../../../components/layouts/Box'
import FeatureSection from '../../../components/section/Features/FeatureSection'
import DashboardLanding from '../../../components/app/DashboardLanding'

const AllFeaturesView = ({ isGetStarted }) => {

  const router = useRouter()
  const state = useAppContext()

  const projectsState = useProjectsContext()

  const [stateFeature, setStateFeature] = useState(projectsState.projectFeatures)
  const [reserveFeatures] = useState(projectsState.projectFeatures)

  const getStartedCTA = (route) => {
    state.layout.setShowNewProject(true)
    router.push(route)
  }

  const searchedFeatures = (filteredFeatures) => {
    setStateFeature(filteredFeatures)
  }

  return (
    <>
      <DashboardLanding
        oneChild={true}
        className="mb-[107px]"
        landingText='Hey, what will you create today?'
        subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aeneanI am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consec' />

      <GradientDesign />

      <div className="relative w-full">
        <div className="flex md:flex-row flex-col w-full md:space-x-10 space-x-0 space-y-5 md:space-y-0">
          <div className="flex-grow">
            <FilterSection
              filterThrough={reserveFeatures}
              setItemsAfterFilter={searchedFeatures}
            />
          </div>
          <div className="">
            <SearchInput
              searchThrough={reserveFeatures}
              setItemsAfterSearch={searchedFeatures}
            />
          </div>
        </div>

        {isGetStarted && <div className="pt-[30px] w-full">
          <Box>
            <div className="py-[39px] md:pl-[60px] pl-[40px] md:pr-[90px] pr-[40px] space-y-[10px]">
              <div className="flex md:flex-row flex-col md:space-x-4 space-x-0 md:space-y-0 space-y-4">
                <div className="flex-grow max-w-[847px]">
                  <h3 className='font-bold text-2xl capitalize'>Start bulk blog writing content</h3>
                  <p className='text-lg leading-7 dark:text-darkMode-subText text-ash'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa at nibh aliquam nec sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  </p>
                </div>
                <div className='flex flex-grow md:justify-end justify-start items-center'>
                  <button type='button' onClick={() => getStartedCTA('/app/projects')} className="block w-fit btn btn-primary bg-primary text-white font-poppins">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </div>}

        <div className="pt-[35px]">
          <FeatureSection features={stateFeature} />
        </div>
      </div>
    </>
  )
}

export default AllFeaturesView