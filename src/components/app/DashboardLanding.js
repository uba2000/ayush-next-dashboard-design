import React from 'react'

function DashboardLanding({ landingText, subLandingText, children, oneChild, ...rest }) {
  return (
    <section className={`w-full  ${!oneChild ? 'mb-[120px]' : ''}`} {...rest}>
      <div className="text-center">
        <div className="mb-4">
          <h2 className='md:text-landing text-[42px] font-bold font-poppins capitalize'>
            {landingText}
          </h2>
        </div>
        <div className="mx-auto max-w-[1144px]">
          <p className="mb-0 md:text-subLanding text-[13px] leading-[19px] text-ash dark:text-[#888888] font-poppins">
            {subLandingText}
          </p>
        </div>
        {children}
      </div>
    </section>
  )
}

export default DashboardLanding