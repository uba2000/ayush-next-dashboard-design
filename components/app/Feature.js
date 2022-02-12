import Link from 'next/link'
import React from 'react'

function Feature({ title, content, link }) {
  return (
    <div
      className="bg-white rounded-2xl"
      style={{ boxShadow: '0px 2px 24px -3px rgba(0, 0, 0, 0.1)', padding: '67.04px 30px' }}>
      <div className="mb-2">
        <h5 style={{ fontSize: '24.9009px', lineHeight: '29px', letterSpacing: '-0.025em' }} className="font-bold capitalize font-poppins">
          {title}
        </h5>
      </div>
      <div className="mb-2 pb-1">
        <p className="mb-0 font-poppins" style={{ fontSize: '15.7647px', lineHeight: '24px', color: '#4d4d4d' }}>
          {content}
        </p>
      </div>
      <div className="">
        {/* store state goto /keywords */}
        <Link href={link}>
          <a className="btn btn-primary bg-primary text-white font-poppins">
            Generate
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Feature