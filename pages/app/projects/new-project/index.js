import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import DashboardLayout from '../../../../components/app/DasboardLayout'
import DashboardLanding from '../../../../components/app/DashboardLanding'
import FormGroup from '../../../../components/FormGroup'
import FrameBox from '../../../../components/app/FrameBox'
import styles from '../../../../styles/Account.module.css'

const industries = ['Industry 1', 'Industry 2', 'Industry 3', 'Industry 4']

function NewProject() {

  const btnStyle = {
    width: 'fit-content'
  }
  const [projectTitle, setProjectTitle] = useState('')
  const [showPredict, setPredictTitle] = useState(false)
  const [selectedIndustry, setSelectedIndustry] = useState(industries[1])

  const predictTitle = (value) => {
    setProjectTitle(value);
    if (projectTitle.length > 2) setPredictTitle(true);
    else setPredictTitle(false);
  }

  return (
    <DashboardLayout>
      <DashboardLanding
        landingText='Project Details '
        subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
      />

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
              <ul className='predict-title'>
                <li className='px-[27.18px] py-[10px]'>
                  <span>
                    {projectTitle} <span className='font-bold'>Class Notes</span>
                  </span>
                </li>
                <li className='px-[27.18px] py-[10px]'>
                  <span>
                    {projectTitle} <span className='font-bold'>Agency</span>
                  </span>
                </li>
                <li className='px-[27.18px] py-[10px]'>
                  <span>
                    {projectTitle} <span className='font-bold'>Book Article</span>
                  </span>
                </li>
              </ul>
            </Transition>
          </FormGroup>

          <FormGroup label='Prize Tags' imp={true} labelFor="prize">
            <input id='prize' type='text' placeholder='graphic design, digital marketing, marketing' />
          </FormGroup>

          <FormGroup label='Industry(optional)' labelFor='indutry'>
            <Listbox as='div' id='indutry' value={selectedIndustry} onChange={setSelectedIndustry}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <span className="inline-block w-full">
                      <Listbox.Button className={styles.formGroupInput}>
                        <span className='block truncate capitalize text-left'>{selectedIndustry}</span>
                        <span className='absolute right-4 top-4'>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg> */}
                          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.77213 12.8421C9.37373 13.4067 8.53642 13.4067 8.13802 12.8421L0.541296 2.07656C0.0738534 1.41413 0.547604 0.5 1.35835 0.5L16.5518 0.500002C17.3626 0.500002 17.8363 1.41413 17.3689 2.07656L9.77213 12.8421Z" fill="black" />
                          </svg>
                        </span>
                      </Listbox.Button>
                    </span>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter='ease-out duration-300'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='transition ease-in duration-200'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options static className='absolute w-full border bg-white border-gray-800'>
                        {industries.map((industry) => (
                          <Listbox.Option key={industry} value={industry}>
                            {({ selected, active }) => (
                              <div className={`capitalize cursor-pointer select-none relative py-2 pl-10 pr-4 transition ease-in duration-200  ${active ? 'text-white bg-primary' : 'text-black'}`}>
                                <span className={`${selected ? 'font-bold' : 'font-normal'}`}>{industry}</span>
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </FormGroup>

          <div className='form-group' style={{ marginBottom: '0px' }}>
            <Link href='/app/projects/new-project/provide-article'>
              <a className="block w-fit btn btn-primary bg-primary text-white font-poppins">
                Continue
              </a>
            </Link>
          </div>
        </form>
      </FrameBox>
    </DashboardLayout>
  )
}

export default NewProject