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

  return (
    <DashboardLayout>
      {/* Generate Content */}
      <GenerateContentDialog generateContentDialog={generateContentDialog} setGenerateContentDialog={() => setGenerateContentDialog(false)} />
      <div className="-mt-11 w-full">
        <ArticleLayout crumbs={[{ link: `/app/projects/${query.projectId}`, txt: 'Keywords' }, { link: '', txt: '<Keyword List Name>' }]}>
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
                  <button disabled={!canGenerateContent} onClick={openGenerateContentDialog} className={`cursor-pointer border border-solid ${canGenerateContent ? 'dark:bg-primary bg-primary text-white border-primary' : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border-ash dark:border-darkMode-border'}`}>
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
              <div>
                <Table>
                  <Table.Head>
                    <Table.Row className="text-center cursor-default">
                      <Table.TH className='cursor-pointer w-[41.5px]'>
                        <div className="flex items-center justify-center" onClick={checkAllKeywords}>
                          <CheckBox checked={isAllKeywordsChecked} />
                        </div>
                      </Table.TH>
                      <Table.TH className={'w-3/6 text-left'}>
                        <span className="capitalize">
                          Keywords
                        </span>
                      </Table.TH>
                      <Table.TH>
                        <span className="capitalize">
                          Volume
                        </span>
                      </Table.TH>
                      <Table.TH>
                        <span className="capitalize">
                          Traffic
                        </span>
                      </Table.TH>
                      <Table.TH>
                        <span className="capitalize">
                          CPC
                        </span>
                      </Table.TH>
                      <Table.TH>
                        <span className="capitalize">
                          Difficulty
                        </span>
                      </Table.TH>
                      <Table.TH>
                        <span className="capitalize">
                          Trending
                        </span>
                      </Table.TH>
                      <Table.TH>
                        <span className="capitalize">
                          AIT
                        </span>
                      </Table.TH>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body className="dark:bg-darkMode-bg bg-white text-center">
                    {keywords.map((k, index) => (
                      <Fragment key={k.id}>
                        <KeywordItem k={k} index={index} handleCheck={handleKeywordCheck} />
                      </Fragment>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <div className="dark:bg-darkMode-bg border-t-0 bg-white border dark:border-darkMode-border border-ash border-solid">
                <div className="flex justify-between pl-11 pr-10 py-4">
                  <span className="font-poppins text-sm align-middle">
                    1-20 of 1000 projects
                  </span>
                  <div className="flex items-center">
                    <button
                      className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash`}
                    // disabled={page == 1}
                    // onClick={() => setPage(page - 1)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-chevron-left'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <polyline points='15 6 9 12 15 18' />
                      </svg>
                    </button>
                    <p className="text-sm mx-4 font-poppins">
                      {/* {page} */}1
                    </p>
                    <button
                      className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash`}
                    // disabled={page == Math.ceil(projects.length / 10)}
                    // onClick={() => setPage(page + 1)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-chevron-right'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <polyline points='9 6 15 12 9 18' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ArticleLayout>
      </div>
    </DashboardLayout>
  )
}

export default KeywordListView