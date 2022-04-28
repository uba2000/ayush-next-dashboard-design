import React from 'react'
import { DialogLayout } from '../../../components/layouts/Dialog'

const CancelSubscriptionDialog = ({ isOpen, closeModal }) => {
  return (
    <DialogLayout isOpen={isOpen} closeModal={closeModal}>
      <div className="py-24 px-44">
        <div className="space-y-[13px]">
          <DialogLayout.Title
            as="h3"
            className="title"
          >
            Are you sure, you want to cancel the subscriptions?
          </DialogLayout.Title>
          <DialogLayout.SubTitle>
            Deleting is final and cannot be reversed. are you sure you still want to proceed?
          </DialogLayout.SubTitle>
        </div>

        <div className="mt-[19px]">
          <button className="btn btn-primary bg-[#FF1212] border-[#FF1212] text-white" >
            Confirm
          </button>
          <button onClick={closeModal} className="ml-3 btn btn-reset dark:text-white text-black">
            Cancel
          </button>
        </div>
      </div>
    </DialogLayout>
  )
}

export default CancelSubscriptionDialog