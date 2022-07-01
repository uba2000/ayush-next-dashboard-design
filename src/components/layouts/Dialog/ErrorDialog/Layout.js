import React from 'react';

import { DialogLayout } from '..';
import { X, XSolid } from '../../../../ui/icons';

const Layout = ({
  errorName = 'Something went wrong',
  errorMessage = 'Unknown Error.',
  closeModal,
  children,
}) => {
  return (
    <div className="md:px-[130px] px-4 py-20 relative">
      <div
        className="absolute top-[30px] right-7 cursor-pointer"
        onClick={closeModal}
      >
        <span>
          <X className="w-[21px] h-[21px]" />
        </span>
      </div>
      <div className="space-y-6">
        <div className="mb-[26.85px]">
          <span>
            <XSolid className="w-[55.3px] h-[55.3px] mx-auto text-red" />
          </span>
        </div>
        <div className="space-y-2">
          <DialogLayout.Title className={'capitalize text-xl font-semibold'}>
            {errorName}
          </DialogLayout.Title>
          <p className="dark:text-darkMode-subText text-ash">{errorMessage}</p>
        </div>
        <div className="space-x-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
