import React from 'react'

function DashboardLanding({ landingText, subLandingText, children }) {
  return (
    <section className='' style={{ marginBottom: '120px' }}>
      <div className="text-center">
        <div className="mb-4">
          <h2 className='text-landing font-bold font-poppins capitalize'>
            {landingText}
          </h2>
        </div>
        <div className="mx-auto" style={{ maxWidth: '737px' }}>
          <p className="mb-0 text-subLanding text-ash font-poppins">
            {subLandingText}
          </p>
        </div>
        {children}
      </div>
    </section>
  )
}

export default DashboardLanding