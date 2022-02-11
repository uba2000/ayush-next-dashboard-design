import React, { Component } from 'react'
import GeneratorOption from './GeneratorOption'

export class GeneratorOptions extends Component {
  render() {
    return (
      <div className="generator-options">
        <div className="mb-3">
          <p className="generator-title mb-0">
            Headings
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
    )
  }
}

export default GeneratorOptions