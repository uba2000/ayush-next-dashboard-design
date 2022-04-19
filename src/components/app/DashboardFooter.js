import Link from 'next/link'
import React from 'react'
import { Switch } from '@headlessui/react'

import { useAppContext } from '../../context/state'

function DashboardFooter() {

  const state = useAppContext()

  return (
    <footer className='border-t border-t-black text-base py-7 flex justify-center dark:bg-[#111111] bg-white'>
      <div className="font-poppins container" style={{ fontSize: '15px', lineHeight: '35px' }}>
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="mb-3 md:mb-0">
            <p className="mb-0">
              &copy; 2021 SEO Content.Ai, All Rights Reserved.
            </p>
          </div>
          <div className="">
            <ul className='flex md:justify-end'>
              <li className="inline font-medium md:px-3 pr-3">
                <Link href='/'>
                  <a> Privacy Policy </a>
                </Link>
              </li>
              <li className="inline font-medium px-3">
                <Link href='/'>
                  <a> Terms Of Service </a>
                </Link>
              </li>
              <li className="inline font-medium px-3">
                <Switch
                  checked={!state.isDarkMode}
                  onChange={state.toogleTheme}
                  className={`${!state.isDarkMode ? 'bg-primary' : 'bg-primary-100'}
            relative inline-flex items-center flex-shrink-0 h-[39.04px] w-[82px] p-[10px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${!state.isDarkMode ? 'translate-x-9' : 'translate-x-0'}
              pointer-events-none inline-block h-[23.44px] w-[23.44px] rounded-full bg-white shadow- transform ring-0 transition ease-in-out duration-200`}
                  />
                </Switch>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default DashboardFooter