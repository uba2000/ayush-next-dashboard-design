import React from 'react'

function FrameBox({ children }) {
  return (
    <div className="bg-white dark:bg-darkMode-black border border-ash border-solid py-12 md:px-14 px-7 flex w-full">
      {children}
    </div>
  )
}

export default FrameBox