import React, { Fragment, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import Link from 'next/link'

import AccountBillingTable from './AccountBillingTable'
import styles from '../../../styles/Account.module.css'

function AccountBillingSubscription() {

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <>
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
                  Are you sure, you want to cancel the subscriptions?
                </Dialog.Title>
                <div className="subtitle">
                  <span>Deleting is final and cannot be reversed. are you sure you still want to proceed?</span>
                </div>

                <div className="mt-4">
                  <button className="btn btn-primary bg-[#FF0000] border-[#FF0000] text-white">
                    Confirm
                  </button>
                  <button onClick={closeModal} className="ml-3 btn btn-reset">
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <div className={styles.accountFrameboxCardSection}>
        <p>
          Active Subscriptions
        </p>
      </div>
      <div className="overflow-x-auto">
        <AccountBillingTable />
      </div>
      <div className="mt-6 px-7 mb-6 grid md:grid-cols-[163px_245px] grid-cols-1 gap-4">
        <Link href='/app/account/pricing'>
          <a>
            <button className='btn btn-primary'>Upgrade Plan</button>
          </a>
        </Link>
        <button className="btn btn-danger" onClick={openModal}>Cancel Subscriptions</button>
      </div>
    </>
  )
}

export default AccountBillingSubscription