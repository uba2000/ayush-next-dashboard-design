import React, { Fragment, useState } from 'react'
import { Transition, Dialog, Tab } from '@headlessui/react'

import styles from '../../../styles/Account.module.css'
import AccountLayout from '../../../components/app/account/AccountLayout'
import AccountTeamTable from '../../../components/app/account/AccountTeamTable'
import Box from '../../../components/layouts/Box'


function Team() {

  const [confirmNav, setConfirmNav] = useState(true)
  const [pendingNav, setPendingNav] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')

  function toggleNav(nav) {
    setConfirmNav(false)
    setPendingNav(false)
    if (nav == 'c') {
      setConfirmNav(true)
    } else if (nav == 'p') {
      setPendingNav(true)
    }
  }

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const [tabIndex, setTabIndex] = useState(0)

  const updateTabIndex = (index) => {
    setTabIndex(index)
  }

  return (
    <AccountLayout>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 overlay" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block modal-container rounded-2xl my-8 overflow-hidden text-center align-middle transition-all transform bg-white">
                <Dialog.Title
                  as="h3"
                  className="title"
                >
                  Are you sure, you want to add this person in your account?
                </Dialog.Title>
                <div className="subtitle">
                  <div className="form-group mb-6">
                    <input type="text" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder='example@gmail.com' className={styles.formGroupInput} />
                  </div>
                </div>

                <div className="mt-4">
                  <button className="btn btn-primary bg-primary text-white py-[13px] h-[46px] px-[56.38px]">
                    Confirm
                  </button>
                  <button onClick={closeModal} className="ml-3 btn btn-reset py-[13px] h-[46px] px-[56.38px]">
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Box type={'black'} className={styles.accountFramebox}>
        <h3 className={styles.accountFrameboxTitle}>
          Invite Team
        </h3>
        <p className={styles.accountFrameboxContent}>
          Invite others to join your workspace. There will be an additional charge of $30 month for each number that exceeds the user seats available on your plan
        </p>
        <button className='btn btn-primary' onClick={openModal}>Invite Team</button>
      </Box>
      <div className="">
        <Tab.Group selectedIndex={tabIndex} onChange={(index) => updateTabIndex(index)}>
          <Tab.List>
            <div className='accountFrameboxNav'>
              <Tab as={Fragment}>
                <Box type={`${tabIndex == 0 ? 'black' : ''}`} onClick={() => toggleNav('c')} className={`accountFrameboxNavItem border-b-0 ${tabIndex == 0 && 'accountFrameboxNavItemActive'}`}>
                  Confirmed
                </Box>
              </Tab>
              <Tab as={Fragment}>
                <Box type={`${tabIndex == 1 ? 'black' : ''}`} onClick={() => toggleNav('p')} className={`accountFrameboxNavItem border-b-0 border-l-0 ${tabIndex == 1 && 'accountFrameboxNavItemActive'}`}>
                  Pending
                </Box>
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className='w-full h-auto min-h-[62.45px]'>
                <AccountTeamTable />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <Box className='flex items-center justify-center w-full min-h-[295px]'><div className='text-center py-9'>
                <span className="capitalize font-bold text-3xl">There is no <br />pending account</span>
              </div></Box>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </AccountLayout>
  )
}

export default Team