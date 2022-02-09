import React from 'react'
import Link from 'next/link';

function AuthNav() {
  return (
    <div className="relative flex w-full text-white px-12 md:px-2 py-10 justify-between items-center z-10">
      <Link href="/">
        <a>
          <div className="font-bold text-2xl md:text-3xl font-poppins">
            SEO CONTENT .AI
          </div>
        </a>
      </Link>
      <div className="hidden text md:text-xl font-poppins md:flex">
        <Link href="/signin">
          <a className="text-white border border-white rounded-md py-3 px-7 cursor-pointer text-bold">
            <span className='text-bold'>Sign In</span>
          </a>
        </Link>
      </div>

    </div>
  )
}

export default AuthNav