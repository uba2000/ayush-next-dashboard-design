import React, { Component } from 'react'
import Refresh from '../../Refresh'
import GeneratorOption from './GeneratorOption'

export class GeneratorOptions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      load: false
    }
  }
  render() {
    const { title } = this.props
    return (
      <div className='flex flex-col'>
        <div className="generator-options generator-container">
          <div className="mb-3">
            <p className="generator-title mb-0">
              {title}
            </p>
          </div>
          <div className="">
            <GeneratorOption
              title='What is SEO and how it works?'
            />
            <GeneratorOption
              title='What is SEO in simple terms?'
            />
            <GeneratorOption
              title='What is SEO and how it works?'
            />
            <GeneratorOption
              title='What does SEO mean in digital marketing?'
            />
            <GeneratorOption
              title='What does SEO mean in digital marketing?'
            />
            <GeneratorOption
              title='What is SEO and how it works?'
            />
            <GeneratorOption
              title='What is SEO in simple terms?'
            />
            <GeneratorOption
              title='What is SEO and how it works?'
            />
            <GeneratorOption
              title='What does SEO mean in digital marketing?'
            />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Refresh />
          <div className="">
            <button className="btn btn-dark text-xs" style={{ padding: '6px 31px' }}>
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default GeneratorOptions