import Link from 'next/link'
import React from 'react'

import { Logo } from '../../ui/icons/logo'
import AccountBadge from './AccountBadge'

const headerStyle = {
  minHeight: '108.02px',
  // boxShadow: '0px 2px 24px -3px rgba(0, 0, 0, 0.1)',
}

function DashboardNav() {
  return (
    <header id="header" style={headerStyle} className='font-poppins flex items-center bg-transparent z-10'>
      <div className="container mx-auto">
        <div className="flex justify-between">
          <Link href='/app/dashboard'>
            <a className=" flex space-x-[11px] items-center whitespace-nowrap">
              <span>
                <Logo />
              </span>
              <span className='tracking-tighter md:text-brand text-[30.4024px] font-medium font-poppins text-black dark:text-white'>
                SEO Content .Ai
              </span>
            </a>
          </Link>

          <div className="md:flex hidden justify-end items-center">
            <ul>
              <li className='inline py-2 px-6'>
                <Link href='/app/projects'>
                  <a className='font-medium text-base'>
                    Projects
                  </a>
                </Link>
              </li>
              <li className='inline py-2 px-6'>
                <Link href='/app/projects/features'>
                  <a className='font-medium text-base'>
                    Features
                  </a>
                </Link>
              </li>
              <li className='inline py-2 pl-6'>
                <AccountBadge />
              </li>
            </ul>
          </div>

          <div className="md:hidden flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardNav