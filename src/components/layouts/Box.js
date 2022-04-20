import React from 'react'

const Box = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={`border border-solid border-[#414141] dark:bg-[#111111] bg-white dark:text-white text-black ${className}`}>
      {children}
    </div>
  )
}

export default Box