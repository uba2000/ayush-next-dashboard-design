import React, { useState, Fragment } from 'react';
import { Listbox, Transition, Dialog, Menu } from '@headlessui/react';
import Link from 'next/link';

import { Table } from '../../layouts/Table';
import Box from '../../layouts/Box';
import { Button } from '../../../ui/button';

const roles = ['owner', 'admin', 'editor'];

function AccountTeamItems({ member }) {
  const { email, role, full_name } = member;
  const [selectedRole, setSelectedRole] = useState(role);
  const [open, setOpen] = useState(false);

  return (
    <Table.Row>
      <Transition.Root as={Fragment} show={open}>
        <Dialog className="z-50 fixed" onClose={setOpen} as="div">
          <div className="flex justify-center items-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className=" fixed transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="modal-container">
                <div>
                  <Dialog.Title as="h3" className="title">
                    Are you sure?
                  </Dialog.Title>
                  <div className="subtitle">
                    <span>
                      Deleting is final and cannot be reversed. are you sure you
                      still want to proceed?
                    </span>
                  </div>
                </div>
                <div className="flex justify-center space-x-3">
                  <Button>Confirm</Button>
                  <Button onClick={() => setOpen(false)} variant="reset">
                    Cancel
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Table.Data>
        <span className="line-clamp-1">{full_name}</span>
      </Table.Data>
      <Table.Data>
        <span className="lowercase">{email}</span>
      </Table.Data>
      <Table.Data className="relative">
        <div className="mr-7">
          <Listbox as={'div'} value={selectedRole} onChange={setSelectedRole}>
            {({ open }) => (
              <>
                <div className="relative max-w-[146px]">
                  <span className="inline-block w-full">
                    <Listbox.Button
                      as={Box}
                      className="cursor-pointer text-center max-w-[146px] w-full py-2 px-6 min-w-[112px] leading-7"
                    >
                      <span className="text-center block truncate capitalize">
                        {selectedRole}
                      </span>
                      <span className="absolute right-4 top-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </Listbox.Button>
                  </span>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      as={Box}
                      static
                      className="absolute w-full border bg-white border-gray-800"
                    >
                      {roles.map((role) => (
                        <Listbox.Option
                          key={role}
                          value={role}
                          onClick={() => setOpen(true)}
                        >
                          {({ selected, active }) => (
                            <div
                              className={`capitalize cursor-pointer select-none relative py-2 px-9 transition ease-in duration-600 text-center  ${
                                active
                                  ? 'text-white bg-primary'
                                  : 'dark:text-white text-black'
                              }`}
                            >
                              <span
                                className={`${
                                  selected ? 'font-normal' : 'font-normal'
                                }`}
                              >
                                {role}
                              </span>
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <Menu
          as="div"
          className="inline-block absolute top-[18px] right-[33px]"
        >
          <div className="relative">
            <div>
              <Menu.Button className="inline-flex justify-center text-[#DCD8E7]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as={Box}
                className="z-30 origin-top-right absolute right-0 mt-2 w-32  shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              >
                <div className="">
                  <Menu.Item as={'div'} className="border-0">
                    <Link href="/app/account/team">
                      <a className="whitespace-nowrap hover:bg-primary hover:text-white block px-4 py-2 text-sm border-0">
                        Edit Access
                      </a>
                    </Link>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </Menu>
      </Table.Data>
    </Table.Row>
  );
}

export default AccountTeamItems;
