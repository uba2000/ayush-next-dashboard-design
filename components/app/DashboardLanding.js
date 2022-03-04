import React from 'react'

function DashboardLanding({ landingText, subLandingText, children, oneChild }) {
  return (
    <section className={`${!oneChild ? 'mb-[120px]' : ''}`}>
      <div className="text-center">
        <div className="mb-4">
          <h2 className='md:text-landing text-[42px] font-bold font-poppins capitalize'>
            {landingText}
          </h2>
        </div>
        <div className="mx-auto" style={{ maxWidth: '737px' }}>
          <p className="mb-0 md:text-subLanding text-[13px] leading-[19px] text-ash font-poppins">
            {subLandingText}
          </p>
        </div>
        {children}
      </div>
    </section>
  )
}

export default DashboardLanding