import React from 'react'
import DashboardLayout from '../../components/DasboardLayout'
import DashboardLanding from '../../components/DashboardLanding'
import FormGroup from '../../components/FormGroup'
import FrameBox from '../../components/FrameBox'

function NewProject() {
  return (
    <DashboardLayout>
      <div className="flex justify-center">
        <div className="container">
          <DashboardLanding
            landingText='Project Details '
            subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
          />

          {/* Create Project */}
          <FrameBox>
            <form action="">
              <FormGroup label='Project Title' imp={true} labelFor="project">
                <input id='project' type='text' placeholder='Your Campaign, Product, or client' />
              </FormGroup>

              <FormGroup label='Prize Tags' imp={true} labelFor="prize">
                <input id='prize' type='text' placeholder='graphic design, digital marketing, marketing' />
              </FormGroup>

              <FormGroup label='Industry(optional)' labelFor="indutry">
                <div className="input-with-icon">
                  <input id='indutry' type='text' placeholder='Your Campaign, Product, or client' />
                  <div class="icon">
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.77213 12.8421C9.37373 13.4067 8.53642 13.4067 8.13802 12.8421L0.541296 2.07656C0.0738534 1.41413 0.547604 0.5 1.35835 0.5L16.5518 0.500002C17.3626 0.500002 17.8363 1.41413 17.3689 2.07656L9.77213 12.8421Z" fill="black" />
                    </svg>
                  </div>
                </div>
              </FormGroup>
            </form>
          </FrameBox>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default NewProject