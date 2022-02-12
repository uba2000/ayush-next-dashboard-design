import Link from 'next/link'
import React from 'react'
import DashboardLayout from '../../../../components/app/DasboardLayout'
import DashboardLanding from '../../../../components/app/DashboardLanding'
import FormGroup from '../../../../components/FormGroup'
import FrameBox from '../../../../components/app/FrameBox'

function ProvideArticle() {
  return (
    <DashboardLayout>
      <DashboardLanding
        landingText='Provide Article Title'
        subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
      />

      {/* Create Project */}
      <FrameBox>
        <form action="">
          <FormGroup label='Article Title' imp={true} labelFor="aTitle">
            <input id='aTitle' type='text' placeholder='How to start digital marketing' />
          </FormGroup>

          <FormGroup label='Tags' imp={true} labelFor="tags">
            <input id='tags' type='text' placeholder='digital marketing, marketing' />
          </FormGroup>

          <div className="">
            <Link href='/app/projects/new-project/features'>
              <a className="block w-fit btn btn-primary bg-primary text-white font-poppins">
                Start Project
              </a>
            </Link>
          </div>
        </form>
      </FrameBox>
    </DashboardLayout>
  )
}

export default ProvideArticle