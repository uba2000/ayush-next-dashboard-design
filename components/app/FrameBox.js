import React from 'react'

function FrameBox({ children }) {
  return (
    <div className="bg-white border border-ash border-solid py-12 md:px-14 px-7 flex">
      {children}
    </div>
  )
}

export default FrameBox