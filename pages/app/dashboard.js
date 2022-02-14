import Link from 'next/link'
import React from 'react'
import DashboardLayout from '../../components/app/DasboardLayout'
import DashboardLanding from '../../components/app/DashboardLanding'
import FrameBox from '../../components/app/FrameBox'

function Dashboard() {
  return (
    <DashboardLayout>
      {/* Landing Section */}
      <DashboardLanding
        landingText='Welcome In SEO Content.Ai'
        subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean' />

      {/*  Generate Box*/}
      <FrameBox>
        <div style={{ height: '586px' }} className="flex items-center mx-auto">
          <div className="text-center md:px-[182.5px] px-0 py-[201px]">
            <h3 className="section-title md:text-[42px] text-[32px] mb-3">
              Start generating content
            </h3>
            <p className="section-caption md:text-[18px] text-[13px] md:leading-[21px] leading-[17px] mb-3">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Eget lobortis
              nisi sollicitudin amet Duis amet ipsum.
            </p>
            <div className="">
              <Link href='/app/projects/new-project'>
                <a className="block w-fit mx-auto btn btn-primary bg-primary text-white font-poppins">
                  Get Started
                </a>
              </Link>
            </div>
          </div>
        </div>
      </FrameBox>
    </DashboardLayout>
  )
}

export default Dashboard