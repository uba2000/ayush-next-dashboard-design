import React from 'react'
import tw from 'tailwind-styled-components'

import Box from '../../../components/layouts/Box'
import { DialogLayout } from '../../../components/layouts/Dialog'
import Slider from '../../../components/layouts/Slider'

const BetweenStyle = tw.div`flex justify-between`

const MoreRankTrackerDialog = ({ isOpen, closeModal }) => {

  const setAddOnsValue = (value) => {
    // setNoOfAddOns(value)
    // setTotalLimit(value + plan)
  }

  return (
    <DialogLayout isOpen={isOpen} closeModal={closeModal} isSharp={true} widthRestrict={'max-w-[755px]'}>
      <Box className="border-none" type={'black'}>
        <div className="px-[27px] py-[10px] text-left">
          <span className="font-medium">
            Supercharge your Rank Tracker to get daily keyword updates
          </span>
        </div>
      </Box>
      <Box className='border-l-0 border-r-0' type={'black'}>
        <div className="p-6 pl-[27px] space-y-[10px]">
          <BetweenStyle>
            <span className="font-medium text-xl">Change my limit to 1,500 keywords</span>
            <span className="font-medium text-xl">$150/mo</span>
          </BetweenStyle>
          <div className="space-y-3">
            <div className="">
              <Slider setSliderValue={setAddOnsValue} />
            </div>
            <div className="text-center">
              <span className="font-medium text-xs">
                Additional taxes may apply depending on your country of residence.
              </span>
            </div>
          </div>
        </div>
      </Box>
      <div className="p-6 pl-[27px] pb-8">
        <div className="text-left space-y-5">
          <p className="font-medium text-xl space-y-2 flex flex-col">
            <span className='font-bold text-xl'>Payment information</span>
            <span>
              What’s next in processing your shiny new Rank Tracker Pro upgrade:
              <br /><br />
              1. You'll get a pro-rated charge today based on the number of days remaining in this billing cycle.
              <br /><br />
              2. Starting from your next billing cycle, your monthly payments will be 150 USD.
            </span>
          </p>
          <div className="space-x-1">
            <button className="btn btn-primary text-white" >
              Pay Now
            </button>
            <button onClick={closeModal} className="ml-3 btn btn-reset dark:text-white text-black">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </DialogLayout>
  )
}

export default MoreRankTrackerDialog