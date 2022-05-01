import React from 'react'

const FormLayout = ({ children, subText }) => {
  return (
    <>
      <div>
        <span className='text-lg dark:text-darkMode-subText text-ash'>
          {subText}
        </span>
      </div>
      <div>
        {children}
      </div>
    </>
  )
}

export default FormLayout