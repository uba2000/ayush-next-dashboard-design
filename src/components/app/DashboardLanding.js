import React from 'react'

function DashboardLanding({ landingText, subLandingText, children, oneChild, subLandingShort, ...rest }) {
  return (
    <section className={`w-full  ${!oneChild ? 'mb-[120px]' : ''}`} {...rest}>
      <div className="text-center">
        <div className="mb-4">
          <h2 className='md:text-landing text-[42px] font-bold font-poppins capitalize'>
            {landingText}
          </h2>
        </div>
        <div className={`${subLandingShort ? 'max-w-[758px]' : 'max-w-[1144px]'} mx-auto`}>
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