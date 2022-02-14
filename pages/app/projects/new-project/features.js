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

      <div className="grid grid-cols-2 gap-[30px]">
        <div className="">
          <Feature
            link='/app/projects/new-project/keywords'
            title='Automated  Article Generation'
            content='Let us do the hard work and you will get the entire article automatically'
          />
        </div>
        <div className="">
          <Feature
            link='/app/projects/new-project/keywords'
            title='Manual  Article Generation'
            content='Curate your article just like you want to. Select H2s and make the article yours. '
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default features