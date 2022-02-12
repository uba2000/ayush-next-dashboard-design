import React from 'react'

function FrameBox({ children }) {
  return (
    <div className="bg-white border border-ash border-solid py-12 px-14">
      {children}
    </div>
  )
}

export default FrameBox