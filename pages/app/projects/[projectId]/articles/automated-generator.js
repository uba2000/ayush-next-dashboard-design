import React, { Component } from 'react'

import DashboardLayout from '../../../../../components/app/DasboardLayout'
import GeneratorOptions from '../../../../../components/app/article/GeneratorOptions'
import OverallScore from '../../../../../components/app/article/OverallScore'
import GeneratorMain from '../../../../../components/app/article/AutomatedGenerator/GeneratorMain'

export class ManualGenarate extends Component {

  render() {
    return (
      <DashboardLayout customChildren={true}>
        <div className="lg:container px-4">
          <div className="grid article-generator-container md:grid-cols-[22.7%_auto_14.9%] grid-cols-1">
            <div className="md:mb-0 mb-4">
              <GeneratorOptions
                title="Generated Articles"
              />
            </div>
            <div className="generator-container md:mb-0 mb-4">
              <GeneratorMain />
              <GeneratorMain />
            </div>
            <OverallScore />
          </div>
        </div>
      </DashboardLayout>
    )
  }
}

export default ManualGenarate