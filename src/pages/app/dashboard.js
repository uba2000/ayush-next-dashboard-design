import Link from 'next/link'
import React from 'react'
import DashboardLayout from '../../components/app/DasboardLayout'
import DashboardLanding from '../../components/app/DashboardLanding'
import FrameBox from '../../components/app/FrameBox'
import GradientDesign from '../../components/GradientDesign'

function Dashboard() {
  return (
    <DashboardLayout>
      {/* Landing Section */}
      <DashboardLanding
        landingText='Hey, what will you create today?'
        subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aeneanI am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consec' />

      <GradientDesign />
    </DashboardLayout>
  )
}

export default Dashboard