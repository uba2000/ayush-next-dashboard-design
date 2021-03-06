import React, { Component } from 'react'

import { Wordpress, Docs } from '../../../ui/icons'
import Refresh from '../../Refresh'
import GeneratorOption from './GeneratorOption'

export class GeneratorOptions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      load: false,
      backActive: false,
    }
  }
  render() {
    const { title } = this.props
    return (
      <div className='flex flex-col md:sticky md:top-6'>
        <div className="mb-[15px] generator-options generator-container">
          <header className="generator-options-header">
            <p className="generator-title mb-0 flex justify-between">
              <span>{title}</span>
              <span>1/5</span>
            </p>
          </header>
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
          </div>
          <div className="flex justify-between mt-4 py-[22.5px] px-[19px]">
            <div className="">
              <button className={`btn btn-dark text-xs py-[6px] px-[22px] ${!this.state.backActive ? 'bg-[#DCD8E7] border-[#DCD8E7] cursor-not-allowed' : 'bg-black'}`}>
                Back
              </button>
            </div>
            <div className="flex items-center">
              <Refresh isPrimary={true} className="w-[26px] h-[18px]" />
            </div>
            <div className="">
              <button className="btn btn-dark text-xs py-[6px] px-[22px]">
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[10px]">
          <button className='justify-center items-center cursor-pointer flex bg-white border border-[#DCD8E7] border-solid btn py-2'>
            <span className='mr-[9px]'>
              <Wordpress />
            </span>
            <span className='text-[12px] leading-[120%] font-semibold font-poppins'>
              Publish to Wordpress
            </span>
          </button>
          <button className='justify-center items-center cursor-pointer flex bg-white border border-[#DCD8E7] border-solid btn py-2'>
            <span className='mr-[9px]'>
              <Docs />
            </span>
            <span className='text-[12px] leading-[120%] font-semibold font-poppins'>
              Download Article
            </span>
          </button>
        </div>
      </div>
    )
  }
}

export default GeneratorOptions