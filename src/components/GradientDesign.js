import React from 'react';

function GradientDesign({ isTopView }) {
  isTopView = !!isTopView
  return (
    <>
      {/* GRADIENT ON SIDES */}
      <div div className={`absolute  right-0 w-1/3 z-0 ${isTopView ? 'md:-top-96 -top-[96px]' : 'top-96'}`} >
        <img src="/images/left_green.png" className="absolute right-0 transform rotate-180 z-0" />
      </div>
      <div className={`absolute  left-0 w-1/3 z-0 ${isTopView ? 'top-32' : 'top-[1202px]'}`}>
        <img src="/images/left_green.png" className="absolute left-0 z-0" />
      </div>
      <div div className={`absolute top-[560px] md:top-[1882px] right-0 w-1/3 z-0`}>
        <img src="/images/left_green.png" className="absolute right-0 transform rotate-180 z-0" />
      </div>
    </>
  );
}

export default GradientDesign;
