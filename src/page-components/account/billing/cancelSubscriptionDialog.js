import React from 'react';
import { DialogLayout } from '../../../components/layouts/Dialog';
import { Button } from '../../../ui/button';

const CancelSubscriptionDialog = ({ isOpen, closeModal }) => {
  return (
    <DialogLayout isOpen={isOpen} closeModal={closeModal}>
      <div className="py-24 px-44">
        <div className="space-y-[13px]">
          <DialogLayout.Title as="h3" className="title">
            Are you sure, you want to cancel the subscriptions?
          </DialogLayout.Title>
          <DialogLayout.SubTitle>
            Deleting is final and cannot be reversed. are you sure you still
            want to proceed?
          </DialogLayout.SubTitle>
        </div>

        <div className="mt-[19px] space-x-3">
          <Button variant="danger">Confirm</Button>
          <Button variant="reset" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </div>
    </DialogLayout>
  );
};

export default CancelSubscriptionDialog;
