import React, { useState, useReducer, Fragment } from 'react'
import { Transition } from '@headlessui/react'

import Layout from './Layout'
import { SearchIcon } from '../../../ui/icons/search-icon'
import CheckBox from '../../../components/layouts/CheckBox'
import { DialogLayout } from '../../../components/layouts/Dialog'
import Input from '../../../components/layouts/Input'
import FormGroup from '../../../components/FormGroup'
import industries from '../../../_mock/industries'

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

const AddToMenu = ({ }) => {

  const [openNewKeywordList, setOpenNewKeywordList] = useState(false)

  const [showPredict, setPredictTitle] = useState(false)
  // const [keywords, setKeywords] = useState(projectState.keywords)
  const [showPredictIndustry, setShowPredictIndustry] = useState(false)
  const [keywordList1, setKeywordList1] = useState(false)
  const [keywordList2, setKeywordList2] = useState(false)

  const [newKeywordList, dispatch] = useReducer(reducer, initialKeywordListDetails)

  const predictIndustry = (value) => {
    dispatch({ type: 'setIndustry', value })
    setShowPredictIndustry(newKeywordList.industry.length > 2)
  }

  const openKeywordDialog = () => {
    setOpenNewKeywordList(true)
  }

  const predictTitle = (value) => {
    dispatch({ type: 'setTitle', value })
    setPredictTitle(newKeywordList.title.length > 2)
  }

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
      <Layout
        label={'Add to'}
        origin={'right'}
        type='menu'
        icon={<Icon />}
      >
        <div className='divide-y-2 dark:divide-darkMode-border divide-ash' style={{ width: '197px' }}>
          <div>
            <div className="flex items-center border-b border-solid dark:border-darkMode-border border-ash border-l-0 border-t-0 border-r-0 dark:bg-darkMode-bg h-[43px] bg-white max-w-[293px]">
              <input type="text" style={{ paddingLeft: '12px' }} className="flex-grow flex-shrink border-0 py-3 text-xs rounded-none dark:bg-darkMode-bg h-[40px] bg-white" placeholder='Search...' />
              <div className="py-3 pr-4 px-[15.5px] dark:bg-darkMode-bg h-[40px] bg-white cursor-pointer">
                <SearchIcon
                  className="h-3 w-3 dark:text-white text-black"
                />
              </div>
            </div>
          </div>
          <div className='border-b border-solid dark:border-darkMode-border border-ash'>
            <ul>
              <li
                onClick={() => setKeywordList1(!keywordList1)}
                className='p-2 flex items-center cursor-pointer space-x-2'
              >
                <span className='h-6'>
                  <CheckBox checked={keywordList1} />
                </span>
                <span className='text-sm select-none'>
                  Keyword List
                </span>
              </li>
              <li
                onClick={() => setKeywordList2(!keywordList2)}
                className='p-2 flex items-center cursor-pointer space-x-2'
              >
                <span className='h-6'>
                  <CheckBox checked={keywordList2} />
                </span>
                <span className='text-sm select-none'>
                  Keyword List
                </span>
              </li>
            </ul>
          </div>
          <Layout.Item>
            <div>
              <button onClick={openKeywordDialog} className="btn btn-reset py-[6px] px-0 text-center w-full text-sm dark:text-white text-black">
                Create new Keyword list
              </button>
            </div>
          </Layout.Item>
        </div>
      </Layout>
    </>
  )
}

const Icon = () => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.6492 -6.10352e-05H5.04922C4.16682 -6.10352e-05 3.44922 0.717537 3.44922 1.59994V11.1999C3.44922 12.0823 4.16682 12.7999 5.04922 12.7999H14.6492C15.5316 12.7999 16.2492 12.0823 16.2492 11.1999V1.59994C16.2492 0.717537 15.5316 -6.10352e-05 14.6492 -6.10352e-05ZM5.04922 11.1999V1.59994H14.6492L14.6508 11.1999H5.04922Z" fill="white" />
      <path d="M1.85 4.80013H0.25V14.4001C0.25 15.2825 0.967598 16.0001 1.85 16.0001H11.45V14.4001H1.85V4.80013ZM10.65 3.20013H9.04998V5.60013H6.64999V7.20013H9.04998V9.60012H10.65V7.20013H13.05V5.60013H10.65V3.20013Z" fill="white" />
    </svg>
  )
}

export { AddToMenu }