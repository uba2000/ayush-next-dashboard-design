import React from 'react'
import { useRouter } from 'next/router'

import DashboardLayout from '../../../../../components/app/DasboardLayout'
import ArticleLayout from '../../../../../page-components/project-categories/ArticleLayout'

const FeatureListView = () => {

  const router = useRouter()

  const { query } = router

  return (
    <DashboardLayout>
      <ArticleLayout crumbs={[{ link: `/app/projects/${query.projectId}`, txt: 'Features' }, { link: '', txt: '<Feature List Name>' }]}>

      </ArticleLayout>
    </DashboardLayout>
  )
}

export default FeatureListView