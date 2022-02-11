import React, { Component } from 'react'
import DashboardLayout from '../../../components/DasboardLayout'
import GeneratorOption from '../../../components/GeneratorOption'
import GeneratorOptions from '../../../components/GeneratorOptions'

export class ManualGenarate extends Component {
  render() {
    return (
      <DashboardLayout customChildren={true}>
        <div className="md:container">
          <div className="grid article-generator-container">
            <GeneratorOptions />
            <div className=""></div>
            <div className=""></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }
}

export default ManualGenarate