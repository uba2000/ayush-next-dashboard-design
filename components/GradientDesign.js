import React from 'react';

function GradientDesign() {
  return (
    <>
      {/* GRADIENT ON SIDES */}
      <div div className="absolute md:-top-96 -top-[96px] right-0 w-1/3 z-0" >
        <img src="/images/left_green.png" alt="Right Gradient" className="absolute right-0 transform rotate-180 z-0" />
      </div>
      <div className="absolute top-32 left-0 w-1/3 z-0">
        <img src="/images/left_green.png" alt="Right Gradient" className="absolute left-0 z-0" />
      </div>
    </>
  );
}

export default GradientDesign;
