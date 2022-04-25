import React from 'react'
import { useRouter } from 'next/router'

import DashboardLayout from '../../../../../components/app/DasboardLayout'
import ArticleLayout from '../../../../../page-components/project-categories/ArticleLayout'

const FeatureListView = () => {

  const router = useRouter()

  const { query } = router

  return (
    <DashboardLayout>
      <div className="-mt-11 w-full">
        <ArticleLayout crumbs={[{ link: `/app/projects/${query.projectId}`, txt: 'Features' }, { link: '', txt: '<Feature List Name>' }]}>

        </ArticleLayout>
      </div>
    </DashboardLayout>
  )
}

export default FeatureListView