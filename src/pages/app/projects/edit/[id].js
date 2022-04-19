import React, { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'

import DashboardLayout from '../../../../components/app/DasboardLayout'
// import DashboardLanding from '../../components/app/DashboardLanding'
import FormGroup from '../../../../components/FormGroup'
import FrameBox from '../../../../components/app/FrameBox'

const industries = ['Finance', 'Production', 'Technology', 'Economics', 'Agriculture']

function EditProject() {

  const [projectTitle, setProjectTitle] = useState('Graphic Design Articles')
  const [showPredict, setPredictTitle] = useState(false)
  const [tags, setTags] = useState('graphic design, digital marketing, marketing');
  const [selectedIndustry, setSelectedIndustry] = useState('Finance')
  const [showPredictIndustry, setShowPredictIndustry] = useState(false)

  const predictTitle = (value) => {
    setProjectTitle(value);
    setPredictTitle(projectTitle.length > 2)
  }

  const predictIndustry = (value) => {
    setSelectedIndustry(value)
    setShowPredictIndustry(selectedIndustry.length > 2)
  }

  return (
    <DashboardLayout>
      {/* Create Project */}
      <FrameBox>
        <form action="" className='w-full'>
          <FormGroup label='Project Title' imp={true} labelFor="project">
            <input id='project' type='text' value={projectTitle} onChange={(e) => predictTitle(e.target.value)} placeholder='Your Campaign, Product, or client' />
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
                  <span className='cursor-pointer' onClick={() => { setProjectTitle(`${projectTitle} Class Notes`); setPredictTitle(false) }}>
                    {projectTitle} <span className='font-bold'>Class Notes</span>
                  </span>
                </li>
                <li className='px-[27.18px] py-[10px]'>
                  <span className='cursor-pointer' onClick={() => { setProjectTitle(`${projectTitle} Agency`); setPredictTitle(false) }}>
                    {projectTitle} <span className='font-bold'>Agency</span>
                  </span>
                </li>
                <li className='px-[27.18px] py-[10px]'>
                  <span className='cursor-pointer' onClick={() => { setProjectTitle(`${projectTitle} Book Article`); setPredictTitle(false) }}>
                    {projectTitle} <span className='font-bold'>Book Article</span>
                  </span>
                </li>
              </ul>
            </Transition>
          </FormGroup>

          <FormGroup label='Prize Tags' imp={true} labelFor="prize">
            <input id='prize' type='text' value={tags} onChange={(e) => setTags(e.target.value)} placeholder='graphic design, digital marketing, marketing' />
          </FormGroup>

          <FormGroup label='Industry(optional)' labelFor='indutry'>
            <input id='industry' type="text" value={selectedIndustry} onChange={(e) => predictIndustry(e.target.value)} placeholder='Industry' />
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
                      <span className='cursor-pointer' onClick={() => { setSelectedIndustry(industry); setShowPredictIndustry(false) }}>
                        <span className='font-bold'>{industry}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Transition>
          </FormGroup>

          <div className="flex items-center">
            <div className='form-group' style={{ marginBottom: '0px' }}>
              <input type="submit" className="w-fit btn btn-primary bg-primary text-white" value='Continue' />
            </div>

            <div className="ml-2">
              <button className="btn btn-reset">Reset</button>
            </div>
          </div>
        </form>
      </FrameBox>
    </DashboardLayout>
  )
}

export default EditProject