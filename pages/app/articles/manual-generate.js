import React, { Component } from 'react'
import DashboardLayout from '../../../components/app/DasboardLayout'
import GeneratorMainBody from '../../../components/app/article/GeneratorMainBody'
import GeneratorOptions from '../../../components/app/article/GeneratorOptions'
import OverallScore from '../../../components/app/article/OverallScore'

export class ManualGenarate extends Component {

  render() {
    return (
      <DashboardLayout customChildren={true}>
        <div className="md:container">
          <div className="grid article-generator-container">
            <GeneratorOptions
              title="Headings"
            />
            <div className="generator-container generator-main">
              <GeneratorMainBody />
              <GeneratorMainBody />
            </div>
            <OverallScore />
          </div>
        </div>
      </DashboardLayout>
    )
  }
}

export default ManualGenarate