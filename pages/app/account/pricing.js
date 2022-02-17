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
    <DashboardLayout>
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
            <div className="flex items-center">
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
                <p className="text-[19.53px]">Yearly</p>
              </div>
              <div className="">
                <button className="btn btn-primary rounded-[9.523px]">-20%  Discount</button>
              </div>
            </div>
          </div>
          {!enabled ? (
            <div className='grid md:grid-cols-[172px_172px_200px] mt-5  gap-[30px] ml-auto'>
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
          ) : (<div className='grid md:grid-cols-[172px_172px_200px] mt-5  gap-[30px] ml-auto'>
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
            <table className="new vary mt-[30px]">
              <thead>
                <th style={{ width: '60%' }}></th>
                <th style={{ width: '13.33%' }}></th>
                <th style={{ width: '13.33%' }}></th>
                <th style={{ width: '13.33%' }}></th>
              </thead>
              <tbody>
                <tr>
                  <td>AI-Writing</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>AI-Rewriting</td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>AI-Simplifying</td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>AI-Expanding</td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Headline Relevance</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Sentiment Analysis</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Emotional Suggestions</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Topic Suggestions</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Sources SUggestion</td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-[48px]">
            <h4 className="text-primary text-[18px] leading-base font-bold">
              Proofreading Features
            </h4>
            <table className="new vary mt-[30px]">
              <thead>
                <th style={{ width: '60%' }}></th>
                <th style={{ width: '13.33%' }}></th>
                <th style={{ width: '13.33%' }}></th>
                <th style={{ width: '13.33%' }}></th>
              </thead>
              <tbody>
                <tr>
                  <td>Minimalist Interface</td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Spelling & Grammar</td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Word Character Count</td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Shortcuts</td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Dark Theme</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Import URL</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>WordPress Integration</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Prioritize Task</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Competitive Adverb Analysis</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Dyslexia &amp; Colorblind modes</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="">
            <h4 className="text-primary text-[18px] leading-base font-bold">
              SEO Features
            </h4>
            <table className="new vary">
              <thead>
                <th style={{ width: '60%' }}></th>
                <th style={{ width: '13.33%' }}></th>
                <th style={{ width: '13.33%' }}></th>
                <th style={{ width: '13.33%' }}></th>
              </thead>
              <tbody>
                <tr>
                  <td>Meta Optimization</td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Competitive Semantic AI</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Keywords Score</td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Opportunities Detection</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Use of Subheadings</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Use od Subheadings</td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                  <td><RoundTickActive /></td>
                </tr>
                <tr>
                  <td>Unique Hyperlinks</td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickInactive /></td>
                  <td><RoundTickActive /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default pricing