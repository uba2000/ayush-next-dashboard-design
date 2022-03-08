import React, { Component } from 'react'

import { Wordpress, Docs } from '../../../../ui/icons'
import Refresh from '../../../Refresh'
import AutomatedGeneratorOption from './AutomatedGeneratorOption'

export class AutomatedGeneratorOptions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      load: false
    }
  }
  render() {
    const { title } = this.props
    return (
      <div className='flex flex-col md:sticky md:top-6'>
        <div className="mb-[15px] generator-options generator-container">
          <header className="generator-options-header">
            <p className="generator-title mb-0">
              {title}
            </p>
          </header>
          <div className="">
            <AutomatedGeneratorOption
              title='What is SEO and how it works?'
            />
            <AutomatedGeneratorOption
              title='What is SEO in simple terms?'
            />
            <AutomatedGeneratorOption
              title='What is SEO and how it works?'
            />
            <AutomatedGeneratorOption
              title='What does SEO mean in digital marketing?'
            />
          </div>
          <div className="flex justify-between mt-4 py-[22.5px] px-[19px]">
            <div className="">
              <button className="flex items-center btn btn-primary bg-primary text-white font-poppins pb-[6px] pt-2 px-3">
                <Refresh isWhite={true} className="w-[22px] h-[15px]" />
                <span className='ml-1'>Refresh</span>
              </button>
            </div>
            <div className="">
              <button className="btn btn-dark text-xs pb-[6px] pt-2 px-3">
                Next Batch
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[10px]">
          <button className='justify-center items-center cursor-pointer flex bg-white border border-[#DCD8E7] border-solid btn py-2'>
            <span className='mr-[9px]'>
              <Wordpress />
            </span>
            <span className='text-[12px] leading-[120%] font-bold font-poppins'>
              Publish to Wordpress
            </span>
          </button>
          <button className='justify-center items-center cursor-pointer flex bg-white border border-[#DCD8E7] border-solid btn py-2'>
            <span className='mr-[9px]'>
              <Docs />
            </span>
            <span className='text-[12px] leading-[120%] font-bold font-poppins'>
              Download Article
            </span>
          </button>
        </div>
      </div>
    )
  }
}

export default AutomatedGeneratorOptions