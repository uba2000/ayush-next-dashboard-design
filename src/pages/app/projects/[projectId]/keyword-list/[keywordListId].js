import React, { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'

import {
  VolumeFilter,
  IncludeFilter,
  TrafficFilter,
  WordCountFilter,
  DifficultyFilter,
  CPCFilter,
  ExcludeFilter,
  AllInTitleFilter,
  AddToMenu,
  ExportMenu
} from '../../../../../page-components/keyword-results'
import KeywordItem from '../../../../../page-components/keyword-results/keywordItem'
import { Table } from '../../../../../components/layouts/Table'
import { useProjectsContext } from '../../../../../context/projects'
import DashboardLayout from '../../../../../components/app/DasboardLayout'
import { PencilAlt } from '../../../../../ui/icons'
import CheckBox from '../../../../../components/layouts/CheckBox'
import ArticleLayout from '../../../../../page-components/project-categories/ArticleLayout'
import NewKeywordListButton from '../../../../../page-components/keyword-generate/NewKeywordListButton'
import GenerateContentDialog from '../../../../../page-components/keyword-generate/GenerateContentDialog'
import useScaiTable from '../../../../../hooks/useScaiTable'
import { KEYWORDSLIST_COLUNM } from '../../../../../components/layouts/Table/columns'
import TableLayout from '../../../../../components/layouts/TableLayout'

const KeywordListView = () => {

  const router = useRouter()

  const { query } = router

  const projectState = useProjectsContext()

  const { keywords, setKeywords } = projectState

  const [canGenerateContent, setCanGenerateContent] = useState(false)
  const [isAllKeywordsChecked, setIsAllKeywordsChecked] = useState(false)
  const [generateContentDialog, setGenerateContentDialog] = useState(false)

  const openGenerateContentDialog = () => {
    setGenerateContentDialog(true)
  }

  const checkToGenerateContent = () => {
    let isToGenerate = keywords.find((k) => k.checked)
    setCanGenerateContent(!!isToGenerate)
  }

  const checkAllKeywords = () => {
    setIsAllKeywordsChecked(!isAllKeywordsChecked)
    setCanGenerateContent(!isAllKeywordsChecked)
    let a = keywords;
    let b = [];
    for (let i = 0; i < keywords.length; i++) {
      a[i].checked = !isAllKeywordsChecked;
      b.push(a[i]);
    }
    setKeywords(b)
  }

  const handleKeywordCheck = ({ index, value }) => {
    let a = keywords
    a[index].checked = value
    setKeywords(a)
    checkToGenerateContent()
  }

  useEffect(() => {
    setIsAllKeywordsChecked(false)
    setCanGenerateContent(false)
    let a = keywords;
    let b = [];
    for (let i = 0; i < keywords.length; i++) {
      a[i].checked = false;
      b.push(a[i]);
    }
    setKeywords(b)
  }, [])

  const tableInstance = useScaiTable({
    tableColumns: KEYWORDSLIST_COLUNM,
    tableData: keywords
  }, [])

  return (
    <DashboardLayout>
      {/* Generate Content */}
      <GenerateContentDialog generateContentDialog={generateContentDialog} setGenerateContentDialog={() => setGenerateContentDialog(false)} />
      <ArticleLayout crumbs={[{ link: `/app/projects/${query.projectId}`, txt: 'Keywords' }, { link: '', txt: 'Keyword List Title Here' }]}>
        <div className='mt-8'>
          <div className="flex justify-end mb-8 -mt-[69px]">
            <NewKeywordListButton />
          </div>
        </div>
        <div className="space-y-[26px]">
          <div className='flex justify-between'>
            <div className="flex flex-grow space-x-2">
              <VolumeFilter />
              <TrafficFilter />
              <WordCountFilter />
              <DifficultyFilter />
              <CPCFilter />
              <IncludeFilter />
              <ExcludeFilter />
              <AllInTitleFilter />
            </div>
            <div className="flex space-x-2">
              <AddToMenu
              />
              <ExportMenu />
              <div>
                <button disabled={!tableInstance.selectedFlatRows.length > 0} onClick={openGenerateContentDialog} className={`cursor-pointer border border-solid ${tableInstance.selectedFlatRows.length > 0 ? 'dark:bg-primary bg-primary text-white border-primary' : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border-ash dark:border-darkMode-border'}`}>
                  <div className="flex py-2 px-5 items-center">
                    <span>
                      <PencilAlt className="w-[17px] h-[17px]" />
                    </span>
                    <span style={{ marginLeft: '7px' }} className='capitalize font-medium text-sm'>Generate Content</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div>
            {/*  */}
            <TableLayout
              tableInstance={tableInstance}
            />
          </div>
        </div>
      </ArticleLayout>
    </DashboardLayout>
  )
}
KeywordListView.auth = true
export default KeywordListView