import React, { useState } from 'react'
import { Switch } from '@headlessui/react'

import { RoundTickActive } from '../../../ui/icons/round-tick-active'
import { RoundTickInactive } from '../../../ui/icons/round-tick-inactive'
import styles from '../../../styles/Account.module.css'
import DashboardLayout from '../../../components/app/DasboardLayout'
import DashboardLanding from '../../../components/app/DashboardLanding'
import { Table } from '../../../components/layouts/Table'
import { fNumber } from '../../../utils/formatNumber'
import SwitchPlanDialog from '../../../page-components/account/pricing/switchPlanDialog'

function pricing() {

  const [enabled, setEnabled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const PlanLayout = ({ title, amount }) => {
    return (
      <div className="">
        <p className="text-4 leading-[22px] font-bold mb-[10px]">{title}</p>
        <div className="flex mb-5">
          <div className='text-[22px] leading-[33px]'>$</div>
          <div>
            <div className="font-poppins">
              <span className='text-[56px] leading-[57px]'>{amount}</span>
              <span className='text-[22px] leading-[33px]'>.99/mo</span>
            </div>
          </div>
        </div>
        <div>
          <button onClick={openModal} className='w-full btn btn-primary font-normal'>Switch Plan</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SwitchPlanDialog isOpen={isOpen} closeModal={closeModal}>

      </SwitchPlanDialog>
      <DashboardLayout customChildren={true}>
        <div className="container">
          <DashboardLanding
            subLandingShort={true}
            landingText='Plans &amp; pricing'
            subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean' />

          <div className="">
            <div className="grid grid-cols-1 xl:gap-2 gap-5 xl:grid-cols-2 mb-[97px]">
              <div>
                <div className='mb-2'>
                  <h2 className={styles.pricingTItle}>Monthly Price</h2>
                </div>
                <div className="mb-5">
                  <p className={styles.pricingSubTitle}>Additional taxes may apply depending on your country.</p>
                </div>
                <div className="flex items-center min-h-[45px]">
                  <div className="mr-5">
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={`${enabled ? 'bg-primary-300' : 'bg-primary-100'}
              relative inline-flex items-center flex-shrink-0 h-[39.04px] w-[82px] p-[10px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                pointer-events-none inline-block h-[23.44px] w-[23.44px] rounded-full bg-primary shadow-lg transform ring-0 transition ease-in-out duration-200`}
                      />
                    </Switch>
                  </div>
                  <div className="mr-5">
                    <p className="text-[19.53px]">{enabled ? 'Yearly' : 'Monthly'}</p>
                  </div>
                  {enabled && <div className="">
                    <button className="btn btn-primary rounded-none">-20%  Discount</button>
                  </div>}
                </div>
              </div>
              {!enabled ? (
                <div className='grid md:grid-cols-3 grid-cols-2 mt-5 gap-[30px] ml-auto'>
                  <PlanLayout title={'Starter Plan'} amount={fNumber(24)} />
                  <PlanLayout title={'Standard Plan'} amount={fNumber(74)} />
                  <PlanLayout title={'Premium Plan'} amount={fNumber(149)} />
                </div>
              ) : (<div className='grid md:grid-cols-3 grid-cols-2 mt-5 gap-[30px] ml-auto'>
                <PlanLayout title={'Starter Plan'} amount={fNumber(299)} />
                <PlanLayout title={'Standard Plan'} amount={fNumber(899)} />
                <PlanLayout title={'Premium Plan'} amount={fNumber(1799)} />
              </div>)}
            </div>
            <div className="">
              <div className="mb-[48px]">
                <h4 className="text-primary text-[18px] leading-base font-bold">
                  AI-Writing Assistant Features
                </h4>
                <Table className="new vary mt-[30px] pricing-table">
                  <Table.Head className="hidden">
                    <Table.Row>
                      <Table.TH main={true} className="min-w-[916.81px]"></Table.TH>
                      <Table.TH></Table.TH>
                      <Table.TH></Table.TH>
                      <Table.TH></Table.TH>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    <Table.Row>
                      <Table.Data className={`pr-[35.5px] ${!enabled ? 'w-[895.81px]' : 'w-[820.81px]'}`}>AI-Writing</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">AI-Rewriting</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">AI-Simplifying</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">AI-Expanding</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Headline Relevance</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Sentiment Analysis</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Emotional Suggestions</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Topic Suggestions</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Sources SUggestion</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
              <div className="mb-[48px]">
                <h4 className="text-primary text-[18px] leading-base font-bold">
                  Proofreading Features
                </h4>
                <Table className="new vary mt-[30px] pricing-table">
                  <Table.Head className="hidden">
                    <Table.Row>
                      <Table.TH main={true} className="min-w-[916.81px]"></Table.TH>
                      <Table.TH></Table.TH>
                      <Table.TH></Table.TH>
                      <Table.TH></Table.TH>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    <Table.Row>
                      <Table.Data className={`pr-[35.5px] ${!enabled ? 'w-[895.81px]' : 'w-[820.81px]'}`}>Minimalist Interface</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Spelling & Grammar</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Word Character Count</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Shortcuts</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Dark Theme</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Import URL</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">WordPress Integration</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Prioritize Task</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Competitive Adverb Analysis</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Dyslexia &amp; Colorblind modes</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
              <div className="">
                <h4 className="text-primary text-[18px] leading-base font-bold">
                  SEO Features
                </h4>
                <Table className="new vary pricing-table">
                  <Table.Head className="hidden">
                    <Table.Row>
                      <Table.TH main={true} className="min-w-[916.81px]"></Table.TH>
                      <Table.TH className={'p-0'}></Table.TH>
                      <Table.TH className={'p-0'}></Table.TH>
                      <Table.TH className={'p-0'}></Table.TH>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    <Table.Row>
                      <Table.Data className={`pr-[35.5px] ${!enabled ? 'w-[895.81px]' : 'w-[820.81px]'}`}>Meta Optimization</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Competitive Semantic AI</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Keywords Score</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Opportunities Detection</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Use of Subheadings</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Use od Subheadings</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Data className="pr-[35.5px]">Unique Hyperlinks</Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickInactive className="mx-auto" /></Table.Data>
                      <Table.Data className="pr-[35.5px]"><RoundTickActive className="text-primary mx-auto" /></Table.Data>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}



export default pricing