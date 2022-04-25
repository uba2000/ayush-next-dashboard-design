import Link from 'next/link'
import React, { useState, useReducer, Fragment } from 'react'
import { Tab } from '@headlessui/react'

import Articles from '../../../../_mock/articles'
import ArticleLayout from '../../../../page-components/project-categories/ArticleLayout'
import ArticlesList from '../../../../page-components/project-categories/articles/ArticlesList'
import DashboardLayout from '../../../../components/app/DasboardLayout'
import SearchInput from '../../../../components/SearchInput'
import NewKeywordListButton from '../../../../page-components/keyword-generate/NewKeywordListButton'

const tabs = [
  'Articles',
  'Keywords',
  'Features',
]

function index() {

  const [articles, setArticles] = useState(Articles)
  const [tabIndex, setTabIndex] = useState(0)

  const updateTabIndex = (index) => {
    setTabIndex(index)
  }

  return (
    <DashboardLayout>

      <div className="-mt-11 w-full">
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
              <Tab.List className="grid md:grid-cols-2 grid-cols-1 gap-4">
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
                <div className="flex items-center justify-end">
                  <SearchInput />
                </div>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div>
                    <ArticlesList articles={articles} />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div>
                    <ArticlesList articles={articles} />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </ArticleLayout>
      </div>
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