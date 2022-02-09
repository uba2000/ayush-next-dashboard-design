import Link from 'next/link'
import React from 'react'

function DashboardFooter() {
  return (
    <footer className='border-t border-t-black text-base py-7 flex justify-center'>
      <div className="font-poppins container" style={{ fontSize: '15px', lineHeight: '35px' }}>
        <div className="grid grid-cols-2">
          <div className="">
            <p className="mb-0">
              &copy; 2022 .ai, All rights reserved.
            </p>
          </div>
          <div className="">
            <ul className='flex justify-end'>
              <li className="inline font-medium px-3">
                <Link href='/'>
                  <a> Privacy Policy </a>
                </Link>
              </li>
              <li className="inline font-medium px-3">
                <Link href='/'>
                  <a> Terms Of Service </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default DashboardFooter