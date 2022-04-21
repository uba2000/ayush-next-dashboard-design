import Link from 'next/link'
import React, { useState, useReducer, Fragment } from 'react'
import { Transition } from '@headlessui/react'

import Projects from '../../../_mock/projects'
import industries from '../../../_mock/industries'
import { fTags } from '../../../utils/formatTags'
import DashboardLayout from '../../../components/app/DasboardLayout'
import DashboardLanding from '../../../components/app/DashboardLanding'
import ProjectList from '../../../components/app/project/ProjectList'
import SearchInput from '../../../components/SearchInput'
import { DialogLayout } from '../../../components/layouts/Dialog'
import Input from '../../../components/layouts/Input'
import FormGroup from '../../../components/FormGroup'

const initialProjectDetails = {
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
      return { ...state, title: action.value }
    default:
      return state
  }
}

function AllProjects() {

  const [projects, setProjects] = useState(Projects)
  const [projectDialog, setProjectDialog] = useState(false)
  const [newProject, dispatch] = useReducer(reducer, initialProjectDetails)
  const [showPredict, setPredictTitle] = useState(false)
  const [showPredictIndustry, setShowPredictIndustry] = useState(false)

  const predictTitle = (value) => {
    dispatch({ type: 'setTitle', value })
    setPredictTitle(newProject.title.length > 2)
  }

  const predictIndustry = (value) => {
    dispatch({ type: 'setIndustry', value })
    setShowPredictIndustry(newProject.industry.length > 2)
  }

  const openProjectDialog = () => {
    setProjectDialog(true)
  }

  const closeProjectDialog = () => {
    setProjectDialog(false)
  }

  return (
    <DashboardLayout>
      <DialogLayout isOpen={projectDialog} widthRestrict={'max-w-[1299px]'} isSharp={true} closeModal={closeProjectDialog}>
        <div className='w-full text-left py-[30px]'>
          <div className="pb-5 px-14">
            <FormGroup label='Project Title' imp={true} labelFor="project">
              <Input
                id='project'
                value={newProject.title}
                onChange={(e) => predictTitle(e.target.value)}
                placeholder='Your Campaign, Product, or client'
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
                        dispatch({ type: 'setTitle', value: `${newProject.title} Class Notes` });
                        setPredictTitle(false)
                      }}
                    >
                      {newProject.title} <span className='font-bold'>Class Notes</span>
                    </span>
                  </li>
                  <li className='px-[27.18px] py-[10px]'>
                    <span className='cursor-pointer'
                      onClick={() => {
                        dispatch({ type: 'setTitle', value: `${newProject.title} Agency` });
                        setPredictTitle(false)
                      }}
                    >
                      {newProject.title} <span className='font-bold'>Agency</span>
                    </span>
                  </li>
                  <li className='px-[27.18px] py-[10px]'>
                    <span className='cursor-pointer'
                      onClick={() => {
                        dispatch({ type: 'setTitle', value: `${newProject.title} Book Article` });
                        setPredictTitle(false)
                      }}
                    >
                      {newProject.title} <span className='font-bold'>Book Article</span>
                    </span>
                  </li>
                </ul>
              </Transition>
            </FormGroup>

            <FormGroup label='Project Tags' imp={true} labelFor="prize">
              <Input
                id='prize'
                value={newProject.tags.join(', ')}
                onChange={e => dispatch({ type: 'setTags', value: e.target.value })}
                placeholder='graphic design, digital marketing, marketing'
              />
            </FormGroup>

            <FormGroup label='Industry(optional)' className="mb-0" labelFor='indutry'>
              <Input
                id='industry'
                value={newProject.industry}
                onChange={(e) => dispatch({ type: 'setIndustry', value: e.target.value })}
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
                        <span className='cursor-pointer' onClick={() => { setRSelectedIndustry(industry); setShowPredictIndustry(false) }}>
                          <span className='font-bold'>{industry}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </Transition>
            </FormGroup>
          </div>

          <div className='form-group px-14 flex mb-0 justify-between'>
            <div className="space-x-4 flex">
              <button type='button' className='block w-fit btn btn-primary bg-primary text-white'>
                Next
              </button>
            </div>
          </div>
        </div>
      </DialogLayout>
      <DashboardLanding
        landingText='All Projects'
        oneChild={true}
        subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
      >
        <div className="mt-12">
          <div className="flex justify-end mb-[21px]">
            <button type='button' onClick={openProjectDialog} className="block w-fit btn btn-primary bg-primary text-white">
              New Project
            </button>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="">
              <p className="text-left text-wild capitalize font-semibold font-poppins">
                All Projects
              </p>
            </div>
            <div className="flex items-center justify-end">
              <p className="mr-4 text-wild capitalize font-semibold font-poppins">
                Search
              </p>
              <SearchInput />
            </div>
          </div>
          <ProjectList projects={projects} />
        </div>
      </DashboardLanding>
    </DashboardLayout>
  )
}

export default AllProjects