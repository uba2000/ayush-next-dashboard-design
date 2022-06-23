import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

import Box from '../../../components/layouts/Box';
import { DialogLayout } from '../../../components/layouts/Dialog';
import Slider from '../../../components/layouts/Slider';
import useUser from '../../../hooks/useUser';
import { fCurrency } from '../../../utils/formatNumber';

const BetweenStyle = tw.div`flex justify-between`;

const MoreProjectsDialog = ({ isOpen, closeModal }) => {
  const { user } = useUser();

  const [noOfAddOns, setNoOfAddOns] = useState(1);
  const [standardPlan, setStandardPlan] = useState(
    user.currentPlan.account_plan.total_projects
  );
  const [price, setPrice] = useState(noOfAddOns * 10);

  const [totalLimit, setTotalLimit] = useState(noOfAddOns + standardPlan);

  const setAddOnsValue = (value) => {
    setPrice(value * 10);
    setNoOfAddOns(value);
    setTotalLimit(value + standardPlan);
  };
  return (
    <DialogLayout
      isOpen={isOpen}
      closeModal={closeModal}
      isSharp={true}
      widthRestrict={'max-w-[699px]'}
    >
      <SectionsContainers className="py-[18px]">
        <BetweenStyle>
          <span className="font-medium text-base">Projects</span>
          <span className="text-primary font-bold text-sm">
            Add-on price: {fCurrency(price)}/month
          </span>
        </BetweenStyle>
      </SectionsContainers>
      <Box className="border-l-0 border-r-0" type={'black'}>
        <SectionsContainers className="py-[30px] space-y-3">
          <div className="space-y-[10px]">
            <div className="space-y-2">
              <BetweenStyle>
                <span className="font-medium text-xl">
                  Included in{' '}
                  {user.currentPlan
                    ? user.currentPlan.account_plan.plan.split('-').join(' ')
                    : ''}
                </span>
                <span className="font-medium text-xl">{standardPlan}</span>
              </BetweenStyle>
              <BetweenStyle>
                <span className="font-medium text-xl">Add-on</span>
                <span className="font-medium text-xl">0{noOfAddOns}</span>
              </BetweenStyle>
            </div>
            <div className="">
              <Slider
                setSliderValue={setAddOnsValue}
                defaultValue={noOfAddOns}
              />
            </div>
          </div>
          <div className="">
            <BetweenStyle>
              <span className="font-medium text-xl">Total Limit</span>
              <span className="font-medium text-xl">{totalLimit}</span>
            </BetweenStyle>
          </div>
        </SectionsContainers>
      </Box>
      <SectionsContainers className={'py-[34px]'}>
        <div className="text-left space-y-3">
          {noOfAddOns > 0 && (
            <p className="font-medium text-xl space-y-2 flex flex-col">
              <span>What’s next</span>
              <span>
                Today, you’ll get a pro-rated charge for the days remaining in
                this billing cycle. Starting from your next billing cycle, your
                account will be charged the full cost of your subscription.
              </span>
            </p>
          )}

          <div className="space-x-1">
            <button className="btn btn-primary text-white">Pay Now</button>
            <button
              onClick={closeModal}
              className="ml-3 btn btn-reset dark:text-white text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      </SectionsContainers>
    </DialogLayout>
  );
};

const SectionsContainers = ({ children, className, ...rest }) => {
  return (
    <div className={`px-[46px] ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default MoreProjectsDialog;
