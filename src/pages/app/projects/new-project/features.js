import React from 'react'
import DashboardLayout from '../../../../components/app/DasboardLayout'
import DashboardLanding from '../../../../components/app/DashboardLanding'
import Feature from '../../../../components/app/Feature'

function features() {
  return (
    <DashboardLayout>
      <DashboardLanding
        landingText='Choose one'
        subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
      />
      <div className="max-w-[744px] mx-auto">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[30px]">
          <div className="">
            <Feature
              link='/app/projects/new-project/keywords?g=a'
              content='Let us do the hard work and you will get the entire article automatically'
            >
              Automated <br /> Article Generation
            </Feature>
          </div>
          <div className="">
            <Feature
              link='/app/projects/new-project/keywords?g=m'
              content='Curate your article just like you want to. Select H2s and make the article yours. '
            >
              Manual <br /> Article Generation
            </Feature>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default features