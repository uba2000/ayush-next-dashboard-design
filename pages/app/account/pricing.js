import React, { useState } from 'react'
import { Switch } from '@headlessui/react'

import { RoundTickActive } from '../../../ui/icons/round-tick-active'
import { RoundTickInactive } from '../../../ui/icons/round-tick-inactive'
import styles from '../../../styles/Account.module.css'
import DashboardLayout from '../../../components/app/DasboardLayout'
import DashboardLanding from '../../../components/app/DashboardLanding'

function pricing() {
  const [enabled, setEnabled] = useState(false)
  return (
    <DashboardLayout customChildren={true}>
      <div className="container">
        <DashboardLanding
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
                  <button className="btn btn-primary rounded-[9.523px]">-20%  Discount</button>
                </div>}
              </div>
            </div>
            {!enabled ? (
              <div className='grid md:grid-cols-[172px_172px_200px] grid-cols-2 mt-5 gap-[30px] ml-auto'>
                <div className="">
                  <p className="text-4 leading-[22px] font-bold mb-[10px]">Starter Plan</p>
                  <div className="flex mb-5">
                    <div className='text-[22px] leading-[33px]'>$</div>
                    <div>
                      <div className="font-helvetica">
                        <span className='text-[56px] leading-[57px]'>24</span>
                        <span className='text-[22px] leading-[33px]'>.99/mo</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className='btn btn-deactive w-full text-base leading-5 bg-[#F4F4F4]'>Subscribe</button>
                  </div>
                </div>
                <div className="">
                  <p className="text-4 leading-[22px] font-bold mb-[10px]">Standard Plan</p>
                  <div className="flex mb-5">
                    <div className='text-[22px] leading-[33px]'>$</div>
                    <div>
                      <div className="font-helvetica">
                        <span className='text-[56px] leading-[57px]'>74</span>
                        <span className='text-[22px] leading-[33px]'>.99/mo</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className='btn btn-primary w-full rounded-[3px] text-base leading-5 font-bold'>Current Plan</button>
                  </div>
                </div>
                <div className="">
                  <p className="text-4 leading-[22px] font-bold mb-[10px]">Premium Plan</p>
                  <div className="flex mb-5">
                    <div className='text-[22px] leading-[33px]'>$</div>
                    <div>
                      <div className="font-helvetica">
                        <span className='text-[56px] leading-[57px]'>149</span>
                        <span className='text-[22px] leading-[33px]'>.99/mo</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className='btn btn-deactive w-full text-base leading-5  bg-[#F4F4F4]'>Subscribe</button>
                  </div>
                </div>
              </div>
            ) : (<div className='grid md:grid-cols-[172px_172px_200px] grid-cols-2 mt-5 gap-[30px] ml-auto'>
              <div className="">
                <p className="text-4 leading-[22px] font-bold mb-[10px]">Starter Plan</p>
                <div className="flex mb-5">
                  <div className='text-[22px] leading-[33px]'>$</div>
                  <div>
                    <div className="font-helvetica">
                      <span className='text-[56px] leading-[57px]'>299</span>
                      <span className='text-[22px] leading-[33px]'>.88/yr</span>
                    </div>
                  </div>
                </div>
                <div>
                  <button className='btn btn-deactive w-full text-base leading-5 bg-[#F4F4F4]'>Subscribe</button>
                </div>
              </div>
              <div className="">
                <p className="text-4 leading-[22px] font-bold mb-[10px]">Standard Plan</p>
                <div className="flex mb-5">
                  <div className='text-[22px] leading-[33px]'>$</div>
                  <div>
                    <div className="font-helvetica">
                      <span className='text-[56px] leading-[57px]'>899</span>
                      <span className='text-[22px] leading-[33px]'>.88/yr</span>
                    </div>
                  </div>
                </div>
                <div>
                  <button className='btn btn-primary w-full rounded-[3px] text-base leading-5 font-bold'>Current Plan</button>
                </div>
              </div>
              <div className="">
                <p className="text-4 leading-[22px] font-bold mb-[10px]">Premium Plan</p>
                <div className="flex mb-5">
                  <div className='text-[22px] leading-[33px]'>$</div>
                  <div>
                    <div className="font-helvetica">
                      <span className='text-[56px] leading-[57px]'>1,799</span>
                      <span className='text-[22px] leading-[33px]'>.99/yr</span>
                    </div>
                  </div>
                </div>
                <div>
                  <button className='btn btn-deactive w-full text-base leading-5 bg-[#F4F4F4]'>Subscribe</button>
                </div>
              </div>
            </div>)}
          </div>
          <div className="">
            <div className="mb-[48px]">
              <h4 className="text-primary text-[18px] leading-base font-bold">
                AI-Writing Assistant Features
              </h4>
              <table className="new vary mt-[30px] pricing-table">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pr-[35.5px]">AI-Writing</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">AI-Rewriting</td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">AI-Simplifying</td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">AI-Expanding</td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Headline Relevance</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Sentiment Analysis</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Emotional Suggestions</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Topic Suggestions</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Sources SUggestion</td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-[48px]">
              <h4 className="text-primary text-[18px] leading-base font-bold">
                Proofreading Features
              </h4>
              <table className="new vary mt-[30px] pricing-table">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pr-[35.5px]">Minimalist Interface</td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Spelling & Grammar</td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Word Character Count</td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Shortcuts</td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Dark Theme</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Import URL</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">WordPress Integration</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Prioritize Task</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Competitive Adverb Analysis</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Dyslexia &amp; Colorblind modes</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="">
              <h4 className="text-primary text-[18px] leading-base font-bold">
                SEO Features
              </h4>
              <table className="new vary pricing-table">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pr-[35.5px]">Meta Optimization</td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Competitive Semantic AI</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Keywords Score</td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Opportunities Detection</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Use of Subheadings</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Use od Subheadings</td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                  <tr>
                    <td className="pr-[35.5px]">Unique Hyperlinks</td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickInactive /></td>
                    <td className="pr-[35.5px]"><RoundTickActive /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default pricing