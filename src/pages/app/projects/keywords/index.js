import React, { useState, useReducer, Fragment, useRef } from 'react'
import { useRouter } from 'next/router'

import DashboardLayout from '../../../../components/app/DasboardLayout'
import DashboardLanding from '../../../../components/app/DashboardLanding'
import FormGroup from '../../../../components/FormGroup'
import Box from '../../../../components/layouts/Box'
import keywords from '../../../../_mock/keywords'
import { DialogLayout } from '../../../../components/layouts/Dialog'
import { Plus, X, XSolid } from '../../../../ui/icons'

const initialKeywords = keywords

const reducer = (state, action) => {
  switch (action.type) {
    case 'removeKeyword':
      let keyword = action.value
      let newKeywords = state.filter((n) => n.id != keyword.id)
      return newKeywords
    default:
      return state
  }
}

function KeywordsPage() {

  const router = useRouter()

  const [projectKeywords, dispatch] = useReducer(reducer, initialKeywords)
  const [errorDialog, setErrorDialog] = useState(false)

  const openErrorDialog = () => {
    setErrorDialog(true)
  }

  const closeErrorDialog = () => {
    setErrorDialog(false)
  }

  const CSVButton = useRef(null)

  const clickCSVImport = () => {
    if (errorDialog) {
      closeErrorDialog()
    }
    CSVButton.current.click()
  }

  const handleCSVImport = (e) => {
    if (e.target.files[0].type !== 'application/csv') {
      CSVButton.current.form.reset()
      openErrorDialog()
    }
  }

  const handleKeywordAnalysis = () => {
    router.push('/app/projects/keywords/results')
  }

  return (
    <DashboardLayout>
      <DialogLayout isOpen={errorDialog} closeModal={closeErrorDialog}>
        <div className="px-[130px] py-20 relative">
          <div className="absolute top-[30px] right-7 cursor-pointer" onClick={closeErrorDialog}>
            <span>
              <X className="w-[21px] h-[21px]" />
            </span>
          </div>
          <div className="space-y-6">
            <div className="mb-[26.85px]">
              <span>
                <XSolid className="w-[55.3px] h-[55.3px] mx-auto text-red" />
              </span>
            </div>
            <div className="space-y-2">
              <DialogLayout.Title className={'capitalize text-xl font-semibold'}>
                Something went wrong
              </DialogLayout.Title>
              <p className="dark:text-darkMode-subText text-ash">
                You have uploaded an invalid file type, please try to upload CVS File, in order to upload keyword list
              </p>
            </div>
            <div className="space-x-4">
              <button onClick={clickCSVImport} className="btn btn-primary">Upload another File</button>
              <button onClick={closeErrorDialog} className="btn btn-reset dark:text-darkMode-subText text-ash">Cancel</button>
            </div>
          </div>
        </div>
      </DialogLayout>
      <DashboardLanding
        oneChild={true}
        landingText='Provide Keywords'
        subLandingShort={true}
        subLandingText='I am so lorem ipum deloas In working with you Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
      >
        <div className='space-y-4'>
          <Box className={`min-h-[532px] mt-[55px] py-6 px-7 rounded-sm`}>
            <div className="flex flex-wrap">
              {projectKeywords.map((k) => (
                <Fragment key={k.id}>
                  <Box type={'black'} className='p-2 w-fit min-w-fit mb-[11px] mr-2'>
                    <div className="flex space-x-[6px]">
                      <span className='font-medium text-sm'>
                        {k.keyword}
                      </span>
                      <span onClick={() => dispatch({ type: 'removeKeyword', value: { id: k.id } })} className='cursor-pointer flex items-center'>
                        <XSolid className="w-[14px] h-[14px]" />
                      </span>
                    </div>
                  </Box>
                </Fragment>
              ))}
              <div className='cursor-pointer mb-[11px] flex items-center'>
                <span>
                  <Plus className="w-[19px] h-[19px] text-primary" />
                </span>
              </div>
            </div>
          </Box>
          <Box className={'py-6 px-[59px]'}>
            <div className="flex justify-between">
              <button className="btn btn-primary bg-black border border-solid border-ash dark:border-darkMode-border">
                Go Back
              </button>
              <div className='space-x-4 flex'>
                <form className='relative'>
                  <button type='button' onClick={clickCSVImport} className="btn btn-reset text-sm dark:text-white text-black">Import CSV</button>
                  <input type="file" accept='.csv' onChange={handleCSVImport} ref={CSVButton} name="keywordCSV" id="keyword-csv" className='absolute w-full h-full hidden left-0 top-0' />
                </form>
                <button onClick={handleKeywordAnalysis} className="btn btn-primary">Start Analysis</button>
              </div>
            </div>
          </Box>
        </div>
      </DashboardLanding>
    </DashboardLayout>
  )
}

export default KeywordsPage