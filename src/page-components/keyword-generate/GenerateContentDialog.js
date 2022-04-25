import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { DialogLayout } from '../../components/layouts/Dialog'
import Input from '../../components/layouts/Input'
import Box from '../../components/layouts/Box'
import CheckBox from '../../components/layouts/CheckBox'

const GenerateContentDialog = ({ generateContentDialog, setGenerateContentDialog }) => {

  const router = useRouter()

  const [noArticles, setNoArticles] = useState(237)
  const [articleTags, setArticleTags] = useState([])
  const [noQuestionPerArticles, setNoQuestionPerArticles] = useState(15)
  const [includeInternalLinking, setIncludeInternalLinking] = useState(false)

  const generateContent = () => {
    router.push('/app/projects/keywords/generate')
  }

  return (
    <>
      {/* Generate Content */}
      <DialogLayout isSharp={true} widthRestrict={'max-w-[776px]'} isOpen={generateContentDialog} closeModal={setGenerateContentDialog}>
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
    </>
  )
}

export default GenerateContentDialog