import React, { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import { Transition, Menu } from '@headlessui/react'

import { useAppContext } from '../../../context/state'
import { useProjectsContext } from '../../../context/projects'
import GradientDesign from '../../../components/GradientDesign'
import SearchInput from '../../../components/SearchInput'
import FilterSection from '../../../components/section/Filter/FilterSection'
import Box from '../../../components/layouts/Box'
import FeatureSection from '../../../components/section/Features/FeatureSection'
import DashboardLanding from '../../../components/app/DashboardLanding'
import { SearchIcon } from '../../../ui/icons/search-icon'
import filters from '../../../_mock/filters'
import { ChevDown } from '../../../ui/icons/chev-down'

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

  // Beginning Search / Filter Functionality
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState(reserveFeatures)

  // Search query
  const [q, setQ] = useState('')

  const [searchParam] = useState(['name'])
  const [filterParam, setFilterParam] = useState("all");

  const searchFor = (itemsSearchFor) => {
    return itemsSearchFor.filter((item) => {
      if (item.type == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "all") {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  const clickSearchHandler = () => {
    // if (q == '') {
    //   searchedFeatures(items)
    // } else {
    //   searchedFeatures(searchFor(items))
    // }
  }

  const searchedFeatures = (filteredFeatures) => {
    setStateFeature(filteredFeatures)
  }

  const searchByFilter = (filterParam) => {
    setFilterParam(filterParam)
    // console.log(filterParam);
    // if (filterParam == 'all') {
    //   searchedFeatures(items)
    // } else {
    //   searchedFeatures(searchFor(items))
    // }
  }


  // Beginning of Filter
  const [stateFilter, setStateFilter] = useState(filters)

  // Filter query
  const [f, setF] = useState('all')

  const [topFilters, setTopFilters] = useState([])
  const [moreFilters, setMoreFilters] = useState([])

  const selectFilter = (slug, index) => {
    searchByFilter(f)
    let a = stateFilter
    let b = [];
    for (let i = 0; i < stateFilter.length; i++) {
      a[i].selected = false;
      b.push(a[i]);
    }
    b[index].selected = true
    setStateFilter(b)
  }

  const onFilter = (value, index) => {
    setF(value)
    selectFilter(value, index)
  }

  const updateSelectedState = (filter, index) => {
    // setSelected = true
    // filter.selected = true
    onFilter(filter.slug, index)
  }

  useEffect(() => {
    setTopFilters(stateFilter.slice(0, 7))
    setMoreFilters(stateFilter)
  }, [f])

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
            {/* <FilterSection
              filterThrough={reserveFeatures}
              searchByFilter={searchByFilter}
            /> */}
            <div className='md:flex hidden space-x-1'>
              {topFilters.map((filter, index) => {
                return (
                  <div
                    onClick={() => updateSelectedState(filter, index)}
                    className={`${filter.selected ? 'bg-primary text-white' : 'border border-solid border-[#414141] dark:bg-[#000000] bg-white dark:text-white text-black'} cursor-pointer py-[10px] px-5 font-semibold capitalize text-center text-sm leading-5`}
                  >
                    <span className='whitespace-nowrap'>
                      {filter.name}
                    </span>
                  </div>
                )
              })}

              <Menu as='div' className='inline-block'>
                <div className='relative'>
                  <div>
                    <Menu.Button className='flex items-center space-x-[5px] bg-white dark:text-white text-black dark:bg-[#000000] py-[10px] px-5 font-semibold capitalize text-center text-sm leading-5 border border-solid border-[#414141]'>
                      <span>
                        More
                      </span>
                      <span>
                        <ChevDown
                          className="h-2 w-2 dark:text-white text-black"
                        />
                      </span>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='z-30 origin-top-left absolute left-0 mt-2 w-fit shadow-lg dark:bg-[#000000] dark:text-white text-black bg-white ring-1 ring-[#000000] ring-opacity-5 focus:outline-none'>
                      {moreFilters.slice(7).map((filter) => (
                        <Fragment key={filter.id}>
                          <Menu.Item>
                            {({ active }) => (
                              <div className={`py-[10px] px-5 capitalize font-semibold ${active ? 'bg-primary text-white cursor-pointer' : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'}`}>
                                <span>
                                  {filter.name}
                                </span>
                              </div>
                            )}
                          </Menu.Item>
                        </Fragment>
                      ))}
                    </Menu.Items>
                  </Transition>
                </div>
              </Menu>
            </div>
            <div className="md:hidden flex">
              <Menu as='div' className='inline-block'>
                <div className='relative'>
                  <div>
                    <Menu.Button className='flex items-center space-x-[5px] bg-white dark:text-white text-black dark:bg-[#000000] py-[10px] px-5 font-semibold capitalize text-center text-sm leading-5 border border-solid border-[#414141]'>
                      <span>
                        Filter
                      </span>
                      <span>
                        <ChevDown
                          className="h-2 w-2 dark:text-white text-black"
                        />
                      </span>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='z-30 origin-top-left absolute left-0 mt-2 w-fit shadow-lg dark:bg-[#000000] dark:text-white text-black bg-white ring-1 ring-[#000000] ring-opacity-5 focus:outline-none'>
                      {stateFilter.map((filter) => (
                        <Fragment key={filter.id}>
                          <Menu.Item>
                            {({ active }) => (
                              <div className={`py-[10px] px-5 capitalize font-semibold ${active ? 'bg-primary text-white cursor-pointer' : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'}`}>
                                <span>
                                  {filter.name}
                                </span>
                              </div>
                            )}
                          </Menu.Item>
                        </Fragment>
                      ))}
                    </Menu.Items>
                  </Transition>
                </div>
              </Menu>
            </div>
          </div>
          <div className="">
            <div className="min-w-[190px] flex items-center border border-solid border-darkMode-border dark:bg-darkMode-bg h-[43px] bg-white max-w-[293px]">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="flex-grow flex-shrink border-none pl-6 py-3 rounded-none dark:bg-darkMode-bg h-[40px] bg-white"
                placeholder='Search...'
              />
              <div
                onClick={clickSearchHandler}
                className="py-3 pr-4 px-[15.5px] dark:bg-darkMode-bg h-[40px] bg-white cursor-pointer"
              >
                <SearchIcon
                  className="h-5 w-5 dark:text-white text-black"
                />
              </div>
            </div>
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
          <FeatureSection features={searchFor(stateFeature)} />
        </div>
      </div>
    </>
  )
}

export default AllFeaturesView