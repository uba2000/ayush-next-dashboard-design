import React from 'react'

const GeneratorMainSection = ({ children }) => {
  return (
    <div className="generator-box">
      <header className='bg-white generator-box-header-box py-[17.5px] pl-[25px] pr-[20px]'>
        <p className='text-base leading-7 font-poppins capitalize'>
          <span className='font-bold'>Title:{' '}</span>
          What Is E-Commerce SEO?
        </p>
      </header>
      <div className="bg-[#FCFCFC] py-[27.5px] px-[25px]">
        {children}
      </div>
    </div>
  )
}

export default GeneratorMainSection