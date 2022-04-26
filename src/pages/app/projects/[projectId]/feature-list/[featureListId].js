import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'

import DashboardLayout from '../../../../../components/app/DasboardLayout'
import ArticleLayout from '../../../../../page-components/project-categories/ArticleLayout'
import SearchInput from '../../../../../components/SearchInput'
import { useProjectsContext } from '../../../../../context/projects'
import AFeatureListBox from '../../../../../page-components/project-categories/features/AFeatureListBox'

const FeatureListView = () => {

  const router = useRouter()

  const { query } = router

  const state = useProjectsContext()

  const [thisFeatureList] = useState(state.getAFeatureList(query.featureListId))

  const deleteAContent = (featureListContentId) => {
    state.deleteAFeatureListContent({ featureId: query.featureListId, featureListContentId })
  }

  return (
    <DashboardLayout>
      <ArticleLayout crumbs={[{ link: `/app/projects/${query.projectId}`, txt: 'Features' }, { link: '', txt: '<Feature List Name>' }]}>
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold">
                Tool: Paragraph Writer
              </span>
            </div>
            <div>
              <SearchInput />
            </div>
          </div>
          <div className='space-y-5'>
            {thisFeatureList.featureContent.map(fc => (
              <Fragment key={fc.id}>
                <AFeatureListBox
                  data={{ ...fc }}
                  deleteAContent={() => deleteAContent(fc.id)}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </ArticleLayout>
    </DashboardLayout>
  )
}

export default FeatureListView