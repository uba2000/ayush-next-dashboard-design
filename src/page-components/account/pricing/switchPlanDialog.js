import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DialogLayout } from '../../../components/layouts/Dialog';
import { post, setHeaders } from '../../../utils/http';
import useUser from '../../../hooks/useUser';
import { Button } from '../../../ui/button';
import {
  setErrorDetails,
  setShowErrorDialog,
} from '../../../features/error/errorSlice';

const SwitchPlanDialog = ({ isOpen, closeModal, plan, period }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const switchPlan = async () => {
    setLoading(true);
    const { response, error } = await post({
      url: `${process.env.BASE_URL}/api/account/request-plan-switch`,
      headers: setHeaders({ token: user.accessToken }),
      data: { ...plan, period },
      error: (response) => {
        if (response.status == 422) {
          dispatch(setErrorDetails(response.data.error.details || undefined));
        }
        setLoading(false);
        dispatch(setShowErrorDialog(true));
      },
    });

    if (response.status) {
      router.push('/app/account/limits');
    } else {
      setLoading(false);
    }
  };

  return (
    <DialogLayout
      isOpen={isOpen}
      widthRestrict={'max-w-[818px]'}
      closeModal={closeModal}
    >
      <div className="text-left">
        <div className="py-4 px-[42px] border-b dark:border-darkMode-border border-ash">
          <span className="text-xl font-semibold">
            Switch subscription plan
          </span>
        </div>
        <div className="py-6 px-[42px] space-y-5">
          <div className="">
            <p className="font-medium text-xl flex flex-col space-y-8">
              <span>
                To switch your subscription plan, complete these two simple
                steps:
              </span>
              <ul>
                <li className="list-decimal py-1">
                  <span>
                    Contact our support team via online chat and request to
                    cancel your current subscription. You'll get a refund for
                    the days remaining in your billing cycle.
                  </span>
                </li>
                <li className="list-decimal py-1">
                  <span>
                    Subscribe to a new plan using the link provided by our
                    support team. You'll need to re-enter your payment details.
                  </span>
                </li>
              </ul>
              <span>
                Both steps should not take longer than 10 minutes of your time.
              </span>
            </p>
          </div>
          <div className="space-x-1">
            <Button state={loading && 'loading'} onClick={switchPlan}>
              Proceed Switching
            </Button>
            <Button
              variant="reset"
              className="dark:text-darkMode-subText text-ash"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </DialogLayout>
  );
};

export default SwitchPlanDialog;
