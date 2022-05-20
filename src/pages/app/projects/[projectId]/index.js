import Link from 'next/link'
import React, { useState, useReducer, Fragment, useEffect } from 'react'
import { Menu, Tab, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'

import { useProjectsContext } from '../../../../context/projects'
import ArticleLayout from '../../../../page-components/project-categories/ArticleLayout'
import ArticlesList from '../../../../page-components/project-categories/articles/ArticlesList'
import DashboardLayout from '../../../../components/app/DasboardLayout'
import SearchInput from '../../../../components/SearchInput'
import FilterSection from '../../../../components/section/Filter/FilterSection'
import KeywordList from '../../../../page-components/project-categories/keywords/KeywordList'
import NewKeywordListButton from '../../../../page-components/keyword-generate/NewKeywordListButton'
import FeaturesList from '../../../../page-components/project-categories/features/FeatureList'
import { ChevDown, SearchIcon } from '../../../../ui/icons'
import filters from '../../../../_mock/filters'

const tabs = [
  { tab: 'Articles', q: 'a' },
  { tab: 'Keywords', q: 'k' },
  { tab: 'Features', q: 'f' },
]

function Index() {

  const state = useProjectsContext()

  const router = useRouter()
  const { query } = router

  const {
    articles,
    keywordList,
    projectFeatureList,
  } = state;

  const [tabIndex, setTabIndex] = useState(0)

  const updateTabIndex = (index) => {
    setTabIndex(index)
    router.push({
      pathname: `/app/projects/${query.projectId}`,
      query: { tab: tabs[index].q }
    })
  }

  const checkWhichTab = () => {
    if (query.tab) {
      let queryTabIndex = tabs.findIndex((t) => t.q == query.tab)
      if (queryTabIndex != -1) {
        setTabIndex(queryTabIndex)
      } else {
        setTabIndex(0)
      }
    } else {
      router.push({
        pathname: `/app/projects/${query.projectId}`,
        query: { tab: tabs[0].q }
      })
    }
  }

  useEffect(() => {
    checkWhichTab()
  }, [])

  // Filter / Search Functionality
  const [stateFeature] = useState(projectFeatureList)

  // Beginning Search / Filter Functionality

  // Search query
  const [q, setQ] = useState('')

  const [searchParam] = useState(['feature'])
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

  // Beginning of Filter
  const [stateFilter, setStateFilter] = useState(filters)

  // Filter query
  const [f, setF] = useState('all')

  const [topFilters, setTopFilters] = useState(stateFilter.slice(0, 7))
  const [moreFilters, setMoreFilters] = useState(stateFilter.slice(7))

  const selectFilter = () => {
    let a = stateFilter
    let b = [];
    for (let i = 0; i < stateFilter.length; i++) {
      if (a[i].slug == filterParam) {
        a[i].selected = true;
      } else {
        a[i].selected = false;
      }
      b.push(a[i]);
    }
    setStateFilter(b)
    setTopFilters(b.slice(0, 7))
    setMoreFilters(b.slice(7))
  }

  const updateSelectedState = (filter, index) => {
    setF(filter.slug)
    setFilterParam(filter.slug)
    selectFilter()
  }

  const selectFromMore = (indexOfMore, filter) => {
    stateFilter.splice(indexOfMore + 7, 1)
    stateFilter.splice(6, 0, moreFilters[indexOfMore])
    updateSelectedState(filter, indexOfMore)
  }

  return (
    <DashboardLayout>
      <ArticleLayout crumbs={[{ link: '', txt: tabs[tabIndex].tab }]}>
        <div className='mt-8'>
          <div className="flex justify-end mb-8">
            {tabIndex == 0 ? (
              <Link href='/app/projects/keywords/'>
                <a className="block w-fit btn btn-primary bg-primary text-white font-poppins">
                  Write New Article
                </a>
              </Link>
            ) : tabIndex == 1 && (
              <NewKeywordListButton />
            )}
          </div>
          <Tab.Group selectedIndex={tabIndex} onChange={(index) => updateTabIndex(index)}>
            <div className="space-y-5">
              <Tab.List className="flex justify-between items-center">
                <div className="flex space-x-[10px]">
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <div>
                        <TabLayout selected={selected} children={'Articles'} />
                      </div>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <div>
                        <TabLayout selected={selected} children={'Keywords'} />
                      </div>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <div>
                        <TabLayout selected={selected} children={'Features'} />
                      </div>
                    )}
                  </Tab>
                </div>
                {tabIndex !== 2 && (
                  <div className="flex items-center justify-end">
                    <SearchInput />
                  </div>
                )}
                {tabIndex == 2 && (
                  <Link href={`/app/projects/features`}>
                    <a className="block w-fit btn h-[45px] btn-primary bg-primary text-white font-poppins">
                      View All Features
                    </a>
                  </Link>
                )}
              </Tab.List>
              {tabIndex == 2 && (
                <div className="flex w-full">
                  <div className="flex md:flex-row flex-col w-full md:space-x-10 space-x-0 space-y-5 md:space-y-0">
                    <div className="flex-grow">
                      <div className='md:flex hidden space-x-1'>
                        {topFilters.map((filter, index) => {
                          return (
                            <Fragment key={filter.id}>
                              <div
                                onClick={() => updateSelectedState(filter, index)}
                                className={`${filter.slug == filterParam ? 'bg-primary text-white' : 'border border-solid border-[#414141] dark:bg-[#000000] bg-white dark:text-white text-black'} cursor-pointer py-[10px] px-5 font-semibold capitalize text-center text-sm leading-5`}
                              >
                                <span className='whitespace-nowrap'>
                                  {filter.name}
                                </span>
                              </div>
                            </Fragment>
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
                                {moreFilters.map((filter, index) => (
                                  <Fragment key={filter.id}>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div
                                          onClick={() => selectFromMore(index, filter)}
                                          className={`py-[10px] px-5 capitalize font-semibold ${active ? 'bg-primary text-white cursor-pointer' : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'}`}
                                        >
                                          <span className='whitespace-nowrap'>
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
                                  Filters
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
                          className="py-3 pr-4 px-[15.5px] dark:bg-darkMode-bg h-[40px] bg-white cursor-pointer"
                        >
                          <SearchIcon
                            className="h-5 w-5 dark:text-white text-black"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <div>
                  <ArticlesList articles={articles} />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <KeywordList keywords={keywordList} />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <FeaturesList features={searchFor(stateFeature)} />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </ArticleLayout>
    </DashboardLayout>
  )
}

const TabLayout = ({ selected, children }) => {
  return (
    <div
      className={`
        cursor-pointer py-[13px] px-[39px] text-center
        ${selected ?
          'dark:bg-primary bg-primary border-primary border border-solid text-white'
          : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border'
        }
      `}
    >
      <span className='text-sm leading-4 text-center font-medium'>{children}</span>
    </div>
  )
}

Index.auth = true
export default Index