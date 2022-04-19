import React from 'react'

const box = ({ children }) => {
  return (
    <div className="border border-solid border-[#414141] dark:bg-[#111111] bg-white dark:text-white text-black">
      {children}
    </div>
  )
}

export default box