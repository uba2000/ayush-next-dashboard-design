import Link from 'next/link'
import React from 'react'

function Feature({ title, content, link, children }) {
  return (
    <div
      className="bg-white rounded-2xl max-h-[292px]"
      style={{ boxShadow: '0px 2px 24px -3px rgba(0, 0, 0, 0.1)', padding: '67.04px 30px' }}>
      <div className="mb-2">
        <h5 style={{ letterSpacing: '-0.025em' }} className="leading-[29px] text-[24.9009px] font-bold capitalize font-poppins">
          {children}
        </h5>
      </div>
      <div className="mb-2 pb-1">
        <p className="mb-0 font-poppins text-[15.7647px] leading-[24px] text-[#4d4d4d]" style={{ letterSpacing: '-0.025em' }}>
          {content}
        </p>
      </div>
      <div className="mt-[11.04px]">
        {/* store state goto /keywords */}
        <Link href={link}>
          <a className="block max-w-[143px] btn btn-primary bg-primary text-white font-poppins text-[12px] py-[3.9583px] px-[42.0571px]">
            Generate
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Feature