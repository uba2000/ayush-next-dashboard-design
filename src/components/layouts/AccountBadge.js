import React, { Fragment, useState } from 'react'
import { Transition, Menu, Dialog } from '@headlessui/react'
import Link from 'next/link'

import { useAppContext } from '../../context/state'
import Box from '../layouts/Box'

const AccountBadge = () => {

  const state = useAppContext()

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <Menu as='div' className='inline-block'>
        <div className='relative'>
          <div>
            <Menu.Button as='div' className='cursor-pointer inline-flex py-4 px-5 rounded-lg space-x-[11px] dark:bg-black bg-white dark:text-white text-black'>
              <span className='font-medium text-[15px] tracking-tight'>
                Carl R. Berry
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='w-fit z-30 origin-top-right border border-solid rounded-b-[10px] border-darkMode-border absolute right-0 mt-2 shadow-lg dark:bg-[#000000] dark:text-white text-black bg-white ring-1 ring-[#000000] ring-opacity-5 focus:outline-none'>
              <div className='divide-y-[1.27354px] divide-darkMode-border'>
                <Menu.Item>
                  <div className="flex flex-col px-6 pt-5 pb-4 space-y-1">
                    <span className='whitespace-nowrap font-medium text-[17px] tracking-tight dark:text-white text-black'>
                      Carl R. Berry’s Worksplace
                    </span>
                    <span className="text-[13px] dark:text-darkMode-subText tracking-tight font-medium text-ash">
                      Standard Plan, 1 Member
                    </span>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className="">
                    <Link href='/app/account'>
                      <a className='flex flex-col px-6 pt-5 pb-4 space-y-1'>
                        <span className="text-[13px] dark:text-darkMode-subText tracking-tight font-medium text-ash">
                          Account Settings
                        </span>
                      </a>
                    </Link>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className="cursor-pointer px-6 pt-5 pb-4 space-y-1" onClick={openModal}>
                    <span className="flex justify-between text-[13px] dark:text-darkMode-subText tracking-tight font-medium text-ash">
                      <span>Appearance</span>
                      <span className='capitalize dark:text-white text-black'>
                        {!state.isDarkMode ? 'Dark' : 'Light'} Mode
                      </span>
                    </span>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className="flex flex-col px-6 pt-5 pb-4 space-y-1 cursor-pointer">
                    <span className="text-[13px] dark:text-darkMode-subText tracking-tight font-medium text-ash">
                      Sign Out
                    </span>
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </div>
      </Menu>

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
                    <div className=' px-[65px] pb-[50px] space-y-7'>
                      <Dialog.Title
                        as="h3"
                        className="title text-left mb-[38px]"
                      >
                        <span>Appearance</span>
                      </Dialog.Title>
                      <div className='space-y-[28px]'>
                        <div className="space-x-6 text-left">
                          <span></span>
                          <span className='capitalize font-medium text-[22px] dark:text-white text-black'>
                            Light Mode
                          </span>
                        </div>
                        <div className="space-x-6 text-left">
                          <span></span>
                          <span className='capitalize font-medium text-[22px] dark:text-white text-black'>
                            Dark Mode
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className=" px-[65px] py-[18px] text-left">
                      <button className="btn btn-primary bg-primary text-white">
                        Confirm
                      </button>
                      <button onClick={closeModal} className="ml-3 btn btn-reset dark:text-white">
                        Cancel
                      </button>
                    </div>
                  </div>
                </Box>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default AccountBadge