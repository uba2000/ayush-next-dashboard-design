import React from 'react';

import {
  LimitExceed,
  NoPlanExist,
  PlanExpired,
  NoPaymentMethod,
  Default,
} from './Dialogs';
import { DialogLayout } from '..';
import errorTypes from '../../../../_mock/errorTypes';

const ErrorDialog = ({
  errorDetails = { type: '' },
  isOpen = false,
  closeModal = () => {},
}) => {
  const renderDialog = () => {
    switch (errorDetails.type) {
      case errorTypes.LIMIT_EXCEED:
        return <LimitExceed closeModal={closeModal} />;
        break;
      case errorTypes.NO_PLAN:
        return <NoPlanExist closeModal={closeModal} />;
        break;
      case errorTypes.PLAN_EXPIRED:
        return <PlanExpired closeModal={closeModal} />;
        break;
      case errorTypes.NO_PAYMENT_METHOD:
        return <NoPaymentMethod closeModal={closeModal} />;
        break;

      default:
        <Default closeModal={closeModal} />;
        break;
    }
  };

  return (
    <DialogLayout isOpen={isOpen} closeModal={closeModal}>
      {renderDialog()}
    </DialogLayout>
  );
};

export default ErrorDialog;
