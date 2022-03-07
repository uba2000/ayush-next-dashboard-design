import React from 'react'

const GeneratorMainSection = ({ children }) => {
  return (
    <div className="border border-solid border-[#dcd8e7]">
      <header className='bg-white border-b border-b-[#dcd8e7] py-[17.5px] pl-[25px] pr-[20px]'>
        <p className='text-base leading-7 font-poppins capitalize'>
          <span className='font-bold'>Title:{' '}</span>
          What Is E-Commerce SEO?
        </p>
      </header>
      {children}
    </div>
  )
}

export default GeneratorMainSection