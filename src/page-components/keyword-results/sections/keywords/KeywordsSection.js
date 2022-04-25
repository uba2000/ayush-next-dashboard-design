import React, { Fragment, useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/router'
import { Transition } from '@headlessui/react'

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
} from '../..'
import Box from '../../../../components/layouts/Box'
import { SearchIcon, PencilAlt } from '../../../../ui/icons'
import { DialogLayout } from '../../../../components/layouts/Dialog'
import FormGroup from '../../../../components/FormGroup'
import Input from '../../../../components/layouts/Input'
import industries from '../../../../_mock/industries'
import { Table } from '../../../../components/layouts/Table'
import CheckBox from '../../../../components/layouts/CheckBox'
import returnKeywords from '../../../../_mock/keywords'
import KeywordItem from '../../keywordItem'

const initialKeywordListDetails = {
  title: '',
  tags: [],
  industry: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setTitle':
      return { ...state, title: action.value }
    case 'setTags':
      let arrTags = fTags(action.value)
      return { ...state, tags: arrTags }
    case 'setIndustry':
      return { ...state, industry: action.value }
    default:
      return state
  }
}

const KeywordResultsSection = () => {

  const router = useRouter()

  const [openNewKeywordList, setOpenNewKeywordList] = useState(false)

  const [showPredict, setPredictTitle] = useState(false)
  const [keywords, setKeywords] = useState(returnKeywords.keywords)
  const [showPredictIndustry, setShowPredictIndustry] = useState(false)

  const [canGenerateContent, setCanGenerateContent] = useState(false)
  const [isAllKeywordsChecked, setIsAllKeywordsChecked] = useState(false)
  const [generateContentDialog, setGenerateContentDialog] = useState(false)

  const [noArticles, setNoArticles] = useState(237)
  const [noQuestionPerArticles, setNoQuestionPerArticles] = useState(15)
  const [includeInternalLinking, setIncludeInternalLinking] = useState(false)

  const [articleTags, setArticleTags] = useState([])

  const [newKeywordList, dispatch] = useReducer(reducer, initialKeywordListDetails)

  const predictTitle = (value) => {
    dispatch({ type: 'setTitle', value })
    setPredictTitle(newKeywordList.title.length > 2)
  }

  const openGenerateContentDialog = () => {
    setGenerateContentDialog(true)
  }

  const checkToGenerateContent = () => {
    let isToGenerate = keywords.find((k) => k.checked)
    setCanGenerateContent(!!isToGenerate)
  }

  const generateContent = () => {
    router.push('/app/projects/keywords/generate')
  }

  const predictIndustry = (value) => {
    dispatch({ type: 'setIndustry', value })
    setShowPredictIndustry(newKeywordList.industry.length > 2)
  }

  const openKeywordDialog = () => {
    setOpenNewKeywordList(true)
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
    <>
      {/* New Keyword List */}
      <DialogLayout isSharp={true} widthRestrict={'max-w-[1300px]'} isOpen={openNewKeywordList} closeModal={() => setOpenNewKeywordList(false)}>
        <div className="border-b dark:border-b-darkMode-border border-b-ash py-6 px-14">
          <div className="flex justify-between">
            <div className='flex items-center'>
              <span className='font-bold'>Provide Keywords list Details</span>
            </div>
            <div>
              <button className="btn btn-reset text-black dark:text-white">
                Cancel
              </button>
              <button className="btn btn-primary">
                Create List
              </button>
            </div>
          </div>
        </div>
        <div className='w-full text-left pt-[30px] pb-10'>
          <div className="px-14">
            <FormGroup label='Keywords List Title' imp={true} labelFor="project">
              <Input
                id='project'
                value={newKeywordList.title}
                onChange={(e) => predictTitle(e.target.value)}
                placeholder='Graphic Design keywords'
              />
              <Transition
                as={Fragment}
                show={showPredict}
                enter='transition ease-out duration-100 overflow-hidden'
                enterFrom='transform min-h-0'
                enterTo='transform max-h-[105px] h-auto'
                leave='transition ease-in'
                leaveFrom='transform duration-75 max-h-[105px] h-auto'
                leaveTo='transform min-h-0'
              >
                <ul className='predict-title max-h-[176px] overflow-y-scroll'>
                  <li className='px-[27.18px] py-[10px]'>
                    <span className='cursor-pointer'
                      onClick={() => {
                        dispatch({ type: 'setTitle', value: `${newKeywordList.title} Class Notes` });
                        setPredictTitle(false)
                      }}
                    >
                      {newKeywordList.title} <span className='font-bold'>Class Notes</span>
                    </span>
                  </li>
                  <li className='px-[27.18px] py-[10px]'>
                    <span className='cursor-pointer'
                      onClick={() => {
                        dispatch({ type: 'setTitle', value: `${newKeywordList.title} Agency` });
                        setPredictTitle(false)
                      }}
                    >
                      {newKeywordList.title} <span className='font-bold'>Agency</span>
                    </span>
                  </li>
                  <li className='px-[27.18px] py-[10px]'>
                    <span className='cursor-pointer'
                      onClick={() => {
                        dispatch({ type: 'setTitle', value: `${newKeywordList.title} Book Article` });
                        setPredictTitle(false)
                      }}
                    >
                      {newKeywordList.title} <span className='font-bold'>Book Article</span>
                    </span>
                  </li>
                </ul>
              </Transition>
            </FormGroup>

            <FormGroup label='Keywords List Tags' imp={true} labelFor="prize">
              <Input
                id='prize'
                value={newKeywordList.tags.join(', ')}
                onChange={e => dispatch({ type: 'setTags', value: e.target.value })}
                placeholder='graphic design, digital marketing, marketing'
              />
            </FormGroup>

            <FormGroup label='Industry (optional)' className="mb-0" labelFor='indutry'>
              <Input
                id='industry'
                value={newKeywordList.industry}
                onChange={(e) => predictIndustry(e.target.value)}
                placeholder='Industry'
              />
              <Transition
                as={Fragment}
                show={showPredictIndustry}
                enter='transition ease-out duration-100 overflow-hidden'
                enterFrom='transform min-h-0'
                enterTo='transform max-h-[105px] h-auto'
                leave='transition ease-in'
                leaveFrom='transform duration-75 max-h-[105px] h-auto'
                leaveTo='transform min-h-0'
              >
                <ul className='predict-title max-h-[176px] overflow-y-scroll'>
                  {industries.map((industry, index) => {
                    return (
                      <li className='px-[27.18px] py-[10px]' key={index}>
                        <span className='cursor-pointer' onClick={() => { dispatch({ type: 'setIndustry', value: industry }); setShowPredictIndustry(false) }}>
                          <span className='font-bold'>{industry}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </Transition>
            </FormGroup>
          </div>
        </div>
      </DialogLayout>
      {/* Generate Content */}
      <DialogLayout isSharp={true} widthRestrict={'max-w-[776px]'} isOpen={generateContentDialog} closeModal={() => setGenerateContentDialog(false)}>
        <div className="text-left py-[30px] px-[50px] space-y-8">
          <div className="space-y-5">
            <DialogLayout.Title>
              Generate Content
            </DialogLayout.Title>
            <div className="">
              <div className="flex space-x-[13px]">
                <div className="">
                  <Box type={'black'}>
                    <Input
                      value={noArticles}
                      onChange={(e) => setNoArticles(e.target.value)}
                      className="py-1 px-2 text-[18px] font-medium w-[62px] text-center"
                    />
                  </Box>
                </div>
                <div className="">
                  <div className="flex flex-col space-y-1">
                    <span className='text-[18px] font-medium'>How many articles?</span>
                    <span className='dark:text-darkMode-subText text-sm tracking-[0.1px] text-ash'>
                      *Estimated  Total Word Count: 1,250,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex space-x-[13px]">
                <div className="">
                  <Box type={'black'}>
                    <Input
                      value={noQuestionPerArticles}
                      onChange={(e) => setNoQuestionPerArticles(e.target.value)}
                      className="py-1 px-2 text-[18px] font-medium w-[62px] text-center"
                    />
                  </Box>
                </div>
                <div className="">
                  <div className="flex flex-col space-y-1">
                    <span className='text-[18px] font-medium'>How many questions per article?</span>
                    <span className='dark:text-darkMode-subText text-sm tracking-[0.1px] text-ash'>
                      *Estimated  Total Word Count: 1,250,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="grid grid-cols-[62px_auto] gap-x-[13px] cursor-pointer" onClick={() => setIncludeInternalLinking(!includeInternalLinking)}>
                <div>
                  <div className="flex justify-center">
                    <CheckBox checked={includeInternalLinking} />
                  </div>
                </div>
                <div className="">
                  <div className="flex flex-col space-y-1">
                    <span className='text-[18px] font-medium'>Include internal linking</span>
                    <span className='dark:text-darkMode-subText text-sm tracking-[0.1px] text-ash'>
                      Note: Internal linking can help increase ranking and crawl budget
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-[10px]">
              <div className="">
                <span className='font-medium text-[18px] tracking-[-0.01em]'>
                  Article Tags
                </span>
              </div>
              <div className="">
                <Input
                  value={articleTags.join(', ')}
                  onChange={(e) => setArticleTags(e.target.value.split(', '))}
                  placeholder="Graphic Design, Marketing"
                  className="max-w-[547px]"
                />
              </div>
              <div className="">
                <span className="text-ash dark:text-darkMode-subText text-sm">
                  Note: Adding tags your article helps you arrange your file
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-[35px]">
            <div className="space-x-[11px] flex">
              <button className="btn btn-primary" onClick={generateContent}>
                Generate
              </button>
              <button className="btn btn-outline" onClick={() => setGenerateContentDialog(false)}>Cancel</button>
            </div>
            <div className="flex items-center">
              <span className='font-normal text-sm dark:text-darkMode-subText text-ash'>99,993 / 100k monthly credits left</span>
            </div>
          </div>
        </div>
      </DialogLayout>
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
            setOpenNewKeywordList={openKeywordDialog}
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
    </>
  )
}

export { KeywordResultsSection }