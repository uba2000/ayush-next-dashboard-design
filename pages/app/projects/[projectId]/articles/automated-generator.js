import React, { Component } from 'react'

import DashboardLayout from '../../../../../components/app/DasboardLayout'
import GeneratorMainBody from '../../../../../components/app/article/GeneratorMainBody'
import GeneratorOptions from '../../../../../components/app/article/GeneratorOptions'
import GeneratorMainSection from '../../../../../components/app/article/GeneratorMainSection'

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
            <div>
              <GeneratorMainSection>
                <GeneratorMainBody />
                <GeneratorMainBody />
                <GeneratorMainBody />
              </GeneratorMainSection>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }
}

export default ManualGenarate