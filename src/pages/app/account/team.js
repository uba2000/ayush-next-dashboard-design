import React, { Fragment, useEffect, useState } from 'react';
import { Transition, Dialog, Tab } from '@headlessui/react';

import styles from '../../../styles/Account.module.css';
import AccountLayout from '../../../components/app/account/AccountLayout';
import AccountTeamTable from '../../../components/app/account/AccountTeamTable';
import Box from '../../../components/layouts/Box';
import { DialogLayout } from '../../../components/layouts/Dialog';
import { Input } from '../../../ui/input';
import useUser from '../../../hooks/useUser';
import { Button } from '../../../ui/button';

function Team() {
  const { user } = useUser();

  const [inviteEmail, setInviteEmail] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [targetTeamBTN, setTargetTeamBTN] = useState('---');

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [tabIndex, setTabIndex] = useState(0);

  const updateTabIndex = (index) => {
    setTabIndex(index);
  };

  return (
    <AccountLayout metaTitle="Team Members">
      <Box type={'black'} className={styles.accountFramebox}>
        <h3 className={styles.accountFrameboxTitle}>Invite Team</h3>
        <p className={styles.accountFrameboxContent}>
          Invite others to join your workspace. There will be an additional
          charge of $30 month for each number that exceeds the user seats
          available on your plan
        </p>
        <Button onClick={openModal}>Invite Team</Button>
      </Box>
      <div className="">
        <Tab.Group
          selectedIndex={tabIndex}
          onChange={(index) => updateTabIndex(index)}
        >
          <Tab.List>
            <div className="accountFrameboxNav">
              <Tab as={Fragment}>
                <Box
                  type={`${tabIndex == 0 ? 'black' : ''}`}
                  className={`accountFrameboxNavItem border-b-0 ${
                    tabIndex == 0 && 'accountFrameboxNavItemActive'
                  }`}
                >
                  Confirmed
                </Box>
              </Tab>
              <Tab as={Fragment}>
                <Box
                  type={`${tabIndex == 1 ? 'black' : ''}`}
                  className={`accountFrameboxNavItem border-b-0 border-l-0 ${
                    tabIndex == 1 && 'accountFrameboxNavItemActive'
                  }`}
                >
                  Pending
                </Box>
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="w-full h-auto min-h-[62.45px]">
                <AccountTeamTable
                  targetTeamBTN={targetTeamBTN}
                  isOpen={isOpen}
                  closeModal={closeModal}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <Box className="flex items-center justify-center w-full min-h-[295px]">
                <div className="text-center py-9">
                  <span className="capitalize font-bold text-3xl">
                    There is no <br />
                    pending account
                  </span>
                </div>
              </Box>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </AccountLayout>
  );
}

Team.auth = true;

export default Team;
