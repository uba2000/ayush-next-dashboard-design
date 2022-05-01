import React from 'react'

import { DialogLayout } from '../../../components/layouts/Dialog'

const SwitchPlanDialog = ({ isOpen, closeModal }) => {
  return (
    <DialogLayout isOpen={isOpen} widthRestrict={'max-w-[818px]'} closeModal={closeModal}>
      <div className="text-left">
        <div className="py-4 px-[42px] border-b dark:border-darkMode-border border-ash">
          <span className='text-xl font-semibold'>
            Switch subscription plan
          </span>
        </div>
        <div className="py-6 px-[42px] space-y-5">
          <div className="">
            <p className="font-medium text-xl flex flex-col space-y-8">
              <span>
                To switch your subscription plan, complete these two simple steps:
              </span>
              <ul>
                <li className='list-decimal py-1'>
                  <span>
                    Contact our support team via online chat and request to cancel your current subscription. You'll get a refund for the days remaining in your billing cycle.
                  </span>
                </li>
                <li className='list-decimal py-1'>
                  <span>
                    Subscribe to a new plan using the link provided by our support team. You'll need to re-enter your payment details.
                  </span>
                </li>
              </ul>
              <span>
                Both steps should not take longer than 10 minutes of your time.
              </span>
            </p>
          </div>
          <div className="space-x-1">
            <button className="btn btn-primary text-white" >
              Proceed Switching
            </button>
            <button onClick={closeModal} className="ml-3 btn btn-reset dark:text-darkMode-subText text-ash">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </DialogLayout>
  )
}

export default SwitchPlanDialog