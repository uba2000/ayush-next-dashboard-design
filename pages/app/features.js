import React from 'react'
import DashboardLayout from '../../components/DasboardLayout'
import DashboardLanding from '../../components/DashboardLanding'
import Feature from '../../components/Feature'

function features() {
  return (
    <DashboardLayout>
      <div className="flex justify-center">
        <div className="container">
          <DashboardLanding
            landingText='Choose one'
            subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <Feature
                title='Automated  Article Generation'
                content='Let us do the hard work and you will get the entire article automatically'
              />
            </div>
            <div className="">
              <Feature
                title='Manual  Article Generation'
                content='Curate your article just like you want to. Select H2s and make the article yours. '
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default features