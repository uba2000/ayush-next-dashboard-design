import React, { Fragment, useState } from 'react';
import { Transition, Menu } from '@headlessui/react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';

import { useThemeContext } from '../../context/theme';
import CheckBox from './CheckBox';
import { DialogLayout } from './Dialog';
import { Button } from '../../ui/button';

const AccountBadge = () => {
  const state = useThemeContext();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [newTheme, setNewTheme] = useState(state.themeMode.theme);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const setThemeMode = (mode) => {
    setNewTheme(mode);
  };

  const confirmThemeMode = () => {
    state.themeMode.setTheme(newTheme);
    closeModal();
  };

  return (
    <>
      <Menu as="div" className="inline-block">
        {({ open }) => (
          <div className="relative">
            <div>
              <Menu.Button
                as="div"
                className={`cursor-pointer select-none inline-flex py-4 px-5 space-x-[11px] transition ease-out duration-100 bg-primary text-white`}
              >
                <span className="font-medium text-[15px] tracking-tight">
                  Carl R. Berry
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${
                      open ? 'rotate-180' : ''
                    } transition ease-out duration-50 h-6 w-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
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
              <Menu.Items className="w-fit z-30 origin-top-right border border-solid rounded-b-[10px] border-darkMode-border absolute right-0 mt-2 shadow-lg dark:bg-[#000000] dark:text-white text-black bg-white ring-1 ring-[#000000] ring-opacity-5 focus:outline-none">
                <div className="divide-y-[1.27354px] divide-darkMode-border dark:text-white text-black">
                  <Menu.Item>
                    <div className="flex flex-col px-6 pt-5 pb-4 space-y-1">
                      <span className="whitespace-nowrap font-medium text-[17px] tracking-tight">
                        Carl R. Berry’s Worksplace
                      </span>
                      <span className="text-[13px] tracking-tight font-medium">
                        Standard Plan, 1 Member
                      </span>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="">
                      <Link href="/app/account">
                        <a className="flex flex-col px-6 pt-5 pb-4 space-y-1">
                          <span className="text-[13px] tracking-tight font-medium">
                            Account Settings
                          </span>
                        </a>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      className="cursor-pointer px-6 pt-5 pb-4 space-y-1"
                      onClick={openModal}
                    >
                      <span className="flex justify-between text-[13px] tracking-tight font-medium">
                        <span>Appearance</span>
                        <span className="capitalize hidden dark:text-white text-black">
                          {!state.themeMode.isDarkMode ? 'Dark' : 'Light'} Mode
                        </span>
                      </span>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      onClick={signOut}
                      className="flex flex-col px-6 pt-5 pb-4 space-y-1 cursor-pointer"
                    >
                      <span className="text-[13px] tracking-tight font-medium">
                        Sign Out
                      </span>
                    </div>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>

      <DialogLayout
        isOpen={isOpen}
        widthRestrict={'max-w-[886px]'}
        closeModal={closeModal}
        isSharp={true}
      >
        <div className="pt-12 divide-y-[1px] divide-darkMode-border">
          <div className=" px-[65px] pb-[50px] space-y-7">
            <DialogLayout.Title as="h3" className="title text-left mb-[38px]">
              <span>Appearance</span>
            </DialogLayout.Title>
            <div className="space-y-[28px]">
              <div
                className="cursor-pointer w-fit space-x-6 text-left flex items-center"
                onClick={() => setThemeMode('light')}
              >
                <CheckBox checked={newTheme === 'light'} />
                <span className="capitalize font-medium text-[22px] dark:text-white text-black">
                  Light Mode
                </span>
              </div>
              <div
                className="cursor-pointer w-fit space-x-6 text-left flex items-center"
                onClick={() => setThemeMode('dark')}
              >
                <CheckBox checked={newTheme === 'dark'} />
                <span className="capitalize font-medium text-[22px] dark:text-white text-black">
                  Dark Mode
                </span>
              </div>
            </div>
          </div>

          <div className=" px-[65px] py-[18px] space-x-3 text-left">
            <Button onClick={confirmThemeMode}>Confirm</Button>
            <Button onClick={closeModal} variant="reset">
              Cancel
            </Button>
          </div>
        </div>
      </DialogLayout>
    </>
  );
};

export default AccountBadge;
