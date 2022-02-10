import React from 'react'
import DashboardLayout from '../../components/DasboardLayout'
import DashboardLanding from '../../components/DashboardLanding'
import KeywordSelect from '../../components/KeywordSelect'

function SelectKeywords() {
  return (
    <DashboardLayout>
      <div className="flex justify-center">
        <div className="container">
          <DashboardLanding
            landingText='h1 selection'
            subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
          >
            <div className="mt-12">
              <KeywordSelect title="What is SEO and how it works?" />
            </div>
          </DashboardLanding>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SelectKeywords