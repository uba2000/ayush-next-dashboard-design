import React, { useState, Fragment, useRef } from 'react'
import { useRouter } from 'next/router'

import DashboardLayout from '../../../../components/app/DasboardLayout'
import DashboardLanding from '../../../../components/app/DashboardLanding'
import FormGroup from '../../../../components/FormGroup'
import Box from '../../../../components/layouts/Box'
import keywords from '../../../../_mock/keywords'
import { DialogLayout } from '../../../../components/layouts/Dialog'

function KeywordsPage() {

  const router = useRouter()

  const [projectKeywords, setProjectKeywords] = useState(keywords)
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
              {/* TODO: add close-icon */}
            </span>
          </div>
          <div className="space-y-6">
            <div className="mb-[26.85px]">
              <span>
                {/* TODO: add error representation icon */}
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
                      <span className='cursor-pointer'></span>
                    </div>
                  </Box>
                </Fragment>
              ))}
              <div className='cursor-pointer'>
                <span>
                  {/* TODO: add add-keyword-icon */}
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