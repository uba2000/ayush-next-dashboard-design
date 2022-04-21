import React from 'react'

const Box = ({ children, className, type, ...rest }) => {
  return (
    <div {...rest} className={`${type ? type == 'black' ? 'dark:bg-black' : '' : 'dark:bg-darkMode-bg'} bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border ${className}`}>
      {children}
    </div>
  )
}

export default Box