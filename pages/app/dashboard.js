import React from 'react'
import DashboardLayout from '../../components/DasboardLayout'
import DashboardLanding from '../../components/DashboardLanding'
import FrameBox from '../../components/FrameBox'

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="container">
        {/* Landing Section */}
        <DashboardLanding
          landingText='Welcome In SEO Content.Ai'
          subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean' />

        {/*  Generate Box*/}
        <FrameBox>
          <div style={{ height: '586px' }} className="flex items-center">
            <div className="text-center">
              <h3 className="section-title mb-3">
                Start generating content
              </h3>
              <p className="section-caption mb-3">
                Lorem ipsum dolor sit amet consectetur adipiscing elit Eget lobortis
                nisi sollicitudin amet Duis amet ipsum.
              </p>
              <div className="">
                <button className="btn btn-primary bg-primary text-white font-poppins">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </FrameBox>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard