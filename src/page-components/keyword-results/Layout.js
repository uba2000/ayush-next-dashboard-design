import React, { Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';

import Box from '../../components/layouts/Box';
import { ChevDown } from '../../ui/icons/chev-down';

const Layout = ({ children, label, origin }) => {
  return (
    <>
      <Menu as="div" className="inline-block">
        {({ open }) => (
          <div className="relative">
            <div>
              <Menu.Button as={Box} className="cursor-pointer">
                <div className="flex py-2 px-3 items-center space-x-[5px]">
                  <span className="capitalize font-medium text-sm">
                    {label}
                  </span>
                  <span>
                    <ChevDown className="w-2 h-2" />
                  </span>
                </div>
              </Menu.Button>
            </div>

            {open && (
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
                  static
                  className={`z-30 origin-top-${
                    origin ? origin : 'left'
                  } absolute ${
                    origin ? origin : 'left'
                  }-0 mt-2 min-w-[200px] shadow-lg bg-white dark:bg-darkMode-bg dark:text-white text-black border border-solid border-ash dark:border-darkMode-border focus:outline-none`}
                >
                  {children}
                </Menu.Items>
              </Transition>
            )}
          </div>
        )}
      </Menu>
    </>
  );
};

Layout.Item = Menu.Item;

export default Layout;
