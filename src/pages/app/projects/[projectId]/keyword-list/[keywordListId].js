import React from 'react'

import DashboardLayout from '../../../../../components/app/DasboardLayout'
import KeywordSection from '../../../../../page-components/keyword-results/sections/keywords/KeywordsSection'
import ArticleLayout from '../../../../../page-components/project-categories/ArticleLayout'

const KeywordListView = () => {
  return (
    <DashboardLayout>
      <div className="-mt-11 w-full">
        <ArticleLayout crumbs={[{ link: '/app/projects/123', txt: 'Keywords' }, { link: '', txt: '<Keyword List Name>' }]}>
          <div className='mt-8'>
            <div className="flex justify-end mb-8 -mt-[69px]">
              <button className="block w-fit btn btn-primary bg-primary text-white font-poppins">
                New Keyword List
              </button>
            </div>
          </div>
          <div>
            <KeywordSection />
          </div>
        </ArticleLayout>
      </div>
    </DashboardLayout>
  )
}

export default KeywordListView