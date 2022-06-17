import React, { Fragment, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import Link from 'next/link';
import styledComponents from 'styled-components';

import AccountBillingTable from './AccountBillingTable';
import Box from '../../layouts/Box';
import { DialogLayout } from '../../layouts/Dialog';
import CancelSubscriptionDialog from '../../../page-components/account/billing/cancelSubscriptionDialog';
import MoreProjectsDialog from '../../../page-components/account/billing/moreProjectsDialog';
import MoreCrawlCreditsDialog from '../../../page-components/account/billing/moreCrawlCreditsDialog';
import MoreRankTrackerDialog from '../../../page-components/account/billing/moreRankTrackerDialog';
import { Button } from '../../../ui/button';

const SubscriptionListStyle = styledComponents.li`
  color: #7A7A7A;
  padding: 8px 0;
  &:first-child {
    padding-top: 0px;
  }
  &::before {
    content: '+';
  }
  span {
    padding-left: 8px;
    cursor: pointer;
  }
`;

function AccountBillingSubscription() {
  // Cancel Subscription Dialog
  let [isOpen, setIsOpen] = useState(false);
  let [moreProjectIsOpen, setMoreProjectIsOpen] = useState(false);
  let [moreRankTrackerIsOpen, setMoreRankTrackerIsOpen] = useState(false);
  let [moreCrawlCreditsIsOpen, setMoreCrawlCreditsIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <CancelSubscriptionDialog isOpen={isOpen} closeModal={closeModal} />
      <MoreProjectsDialog
        isOpen={moreProjectIsOpen}
        closeModal={() => setMoreProjectIsOpen(false)}
      />
      <MoreRankTrackerDialog
        isOpen={moreRankTrackerIsOpen}
        closeModal={() => setMoreRankTrackerIsOpen(false)}
      />
      <MoreCrawlCreditsDialog
        isOpen={moreCrawlCreditsIsOpen}
        closeModal={() => setMoreCrawlCreditsIsOpen(false)}
      />
      <Box type="black" className="border-b-0">
        <div className="py-5 px-[30px]">
          <span className="font-semibold text-sm">Active Subscriptions</span>
        </div>
      </Box>
      <div className="">
        <AccountBillingTable />
      </div>
      <Box type={'black'} className="border-t-0">
        <div className="px-[30px] pb-[32px] space-y-4">
          <div>
            <ul className="text-base">
              <SubscriptionListStyle>
                <Link href={'/app/account/team'}>
                  <a>
                    <span className="">Add more user seats</span>
                  </a>
                </Link>
              </SubscriptionListStyle>
              <SubscriptionListStyle>
                <span className="" onClick={() => setMoreProjectIsOpen(true)}>
                  Add more projects
                </span>
              </SubscriptionListStyle>
              <SubscriptionListStyle>
                <span
                  className=""
                  onClick={() => setMoreCrawlCreditsIsOpen(true)}
                >
                  Add more site audit crawl Credits
                </span>
              </SubscriptionListStyle>
              <SubscriptionListStyle>
                <span
                  className=""
                  onClick={() => setMoreRankTrackerIsOpen(true)}
                >
                  Add Rank Tracker Pro
                </span>
              </SubscriptionListStyle>
            </ul>
          </div>
          <div className="flex space-x-[22px] items-center">
            <Link href="/app/account/pricing">
              <a>
                <Button>Upgrade Plan</Button>
              </a>
            </Link>
            <Button variant="danger" onClick={openModal}>
              Cancel Subscriptions
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
}

export default AccountBillingSubscription;
