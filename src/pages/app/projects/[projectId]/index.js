import Link from 'next/link'
import React, { useState, useReducer, Fragment } from 'react'
import { Tab } from '@headlessui/react'
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

const tabs = [
  'Articles',
  'Keywords',
  'Features',
]

function index() {

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
  }

  return (
    <DashboardLayout>
      <ArticleLayout crumbs={[{ link: '', txt: tabs[tabIndex] }]}>
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
                  <Link href={`/app/projects/${query.projectId}/feature-list`}>
                    <a className="block w-fit btn h-[45px] btn-primary bg-primary text-white font-poppins">
                      View All Features
                    </a>
                  </Link>
                )}
              </Tab.List>
              {tabIndex == 2 && (
                <div className="flex w-full">
                  <div className="flex-grow">
                    <FilterSection />
                  </div>
                  <div className="">
                    <SearchInput />
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
                  <FeaturesList features={projectFeatureList} />
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

export default index