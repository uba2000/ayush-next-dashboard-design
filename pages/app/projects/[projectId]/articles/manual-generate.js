import React, { Component } from 'react'
import DashboardLayout from '../../../../../components/app/DasboardLayout'
import GeneratorMainBody from '../../../../../components/app/article/GeneratorMainBody'
import GeneratorOptions from '../../../../../components/app/article/GeneratorOptions'
import OverallScore from '../../../../../components/app/article/OverallScore'

export class ManualGenarate extends Component {

  render() {
    return (
      <DashboardLayout customChildren={true}>
        <div className="lg:container px-4">
          <div className="grid gap-5 md:grid-cols-[30.7692%_auto] grid-cols-1 article-generator-container">
            <div className="md:mb-0 mb-4">
              <GeneratorOptions
                title="Headings"
              />
            </div>
            <div className="generator-container generator-main md:mb-0 mb-4">
              <GeneratorMainBody />
              <GeneratorMainBody />
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }
}

export default ManualGenarate