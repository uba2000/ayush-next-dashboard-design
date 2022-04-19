import React from 'react'
import Link from 'next/link';

function AuthNav() {
  return (
    <div className="relative flex w-full text-white md:px-2 py-10 justify-between items-center z-10">
      <Link href="/">
        <a>
          <div className="font-bold text-2xl md:text-3xl font-poppins">
            SEO CONTENT .AI
          </div>
        </a>
      </Link>
      <div className="text md:text-xl font-poppins flex">
        <Link href="/signin">
          <a className="text-white h-[40.94px] flex items-center px-[29.49px] py-0 border border-white rounded-md cursor-pointer text-bold">
            <span className='text-[13.1067px]'>Sign In</span>
          </a>
        </Link>
      </div>

    </div>
  )
}

export default AuthNav