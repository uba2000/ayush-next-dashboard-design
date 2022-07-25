import React, { Fragment, useImperativeHandle, useState } from 'react';
import { Transition, Menu } from '@headlessui/react';

import Box from '../../components/layouts/Box';
import { ChevDown } from '../../ui/icons/chev-down';
import { X, XSolid } from '../../ui/icons';

const Layout = React.forwardRef(
  ({ children, label, origin, setInactive }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [activeText, setActiveText] = useState('');

    useImperativeHandle(ref, () => ({
      setToActive(text) {
        setActiveText(text);
        setIsActive(true);
        console.log('Set Active');
      },
    }));

    const setToInactive = () => {
      setIsActive(false);
      setInactive();
      console.log('Set inactive');
    };

    return (
      <>
        <div className="inline-block">
          <div className="relative">
            <div className="max-h-[38px]">
              {!isActive ? (
                <Box
                  className="cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="flex py-2 px-3 items-center space-x-[5px]">
                    <span className="capitalize font-medium text-sm">
                      {label}
                    </span>
                    <span>
                      <ChevDown className="w-2 h-2" />
                    </span>
                  </div>
                </Box>
              ) : (
                <Box
                  type="none"
                  className="max-w-[200px] cursor-pointer bg-primary border-primary"
                  onClick={() => setToInactive()}
                >
                  <div className="flex px-3 space-x-3">
                    <span className="line-clamp-1 py-2 flex-grow font-medium text-sm">
                      {activeText}
                    </span>
                    <span className="justify-center flex items-center">
                      <XSolid className={'w-4 h-4'} />
                    </span>
                  </div>
                </Box>
              )}
            </div>
            <Transition
              as={Fragment}
              show={isOpen}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="fixed z-40 top-0 bottom-0 right-0 left-0"
                ></div>
                <div
                  className={`z-40 origin-top-${
                    origin ? origin : 'left'
                  } absolute ${
                    origin ? origin : 'left'
                  }-0 mt-2 min-w-[200px] shadow-lg bg-white dark:bg-darkMode-bg dark:text-white text-black border border-solid border-ash dark:border-darkMode-border focus:outline-none`}
                >
                  {children}
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>
    );
  }
);

Layout.Item = Menu.Item;

export default Layout;
