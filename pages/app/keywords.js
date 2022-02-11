import React from 'react'
import DashboardLayout from '../../components/DasboardLayout'
import DashboardLanding from '../../components/DashboardLanding'
import FormGroup from '../../components/FormGroup'

function keywords() {
  return (
    <DashboardLayout>
      <DashboardLanding
        landingText='Please A Keyword'
        subLandingText='I am so lorem ipum deloas In working with you Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
      >
        <form action="">
          <FormGroup>
            <input style={{ maxWidth: '560.14px', width: '100%' }} type="text" className='thick-border mx-auto' placeholder='Keywords: seo' />
          </FormGroup>
          <FormGroup>
            <input type="submit" className='btn btn-primary w-fit bg-primary text-white' value='Generate' />
          </FormGroup>
        </form>
      </DashboardLanding>
    </DashboardLayout>
  )
}

export default keywords