import React from 'react'
import DashboardLayout from '../../components/DasboardLayout'
import DashboardLanding from '../../components/DashboardLanding'
import FormGroup from '../../components/FormGroup'
import FrameBox from '../../components/FrameBox'

function ProvideArticle() {
  return (
    <DashboardLayout>
      <div className="flex justify-center">
        <div className="container">
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
                <button className="btn btn-primary bg-primary text-white font-poppins">
                  Start Project
                </button>
              </div>
            </form>
          </FrameBox>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProvideArticle