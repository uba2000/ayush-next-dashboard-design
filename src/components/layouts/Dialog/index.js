import React, { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'

import Box from '../Box'

const DialogLayout = ({ children, isOpen, closeModal }) => {

  return (
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
            <div className="inline-block modal-container border-none p-0 my-8 overflow-hidden align-middle transition-all transform">
              <Box>
                <div className="pt-12 divide-y-[1px] divide-darkMode-border">
                  {children}
                </div>
              </Box>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

DialogLayout.Title = Dialog.Title

export { DialogLayout }