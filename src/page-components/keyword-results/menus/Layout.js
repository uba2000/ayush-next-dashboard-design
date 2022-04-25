import React, { Fragment } from 'react'
import { Transition, Menu } from '@headlessui/react'


const Layout = ({ children, label, origin, icon }) => {
  return (
    <>
      <Menu as='div' className='inline-block'>
        {({ open }) => (
          <div className='relative'>
            <div>
              <Menu.Button as='div' className={`cursor-pointer border border-solid  ${open ? 'dark:bg-primary bg-primary text-white border-primary' : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border-ash dark:border-darkMode-border'}`}>
                <div className="flex py-2 px-5 items-center">
                  <span>
                    {icon}
                  </span>
                  <span style={{ marginLeft: '7px' }} className='capitalize font-medium text-sm'>{label}</span>
                </div>
              </Menu.Button>
            </div>

            {open && (
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items static className={`z-30 origin-top-${origin ? origin : 'left'} absolute ${origin ? origin : 'left'}-0 mt-2 min-w-[177px] shadow-lg bg-white dark:bg-darkMode-bg dark:text-white text-black border border-solid border-ash dark:border-darkMode-border focus:outline-none`}>
                  {children}
                </Menu.Items>
              </Transition>
            )}
          </div>
        )}
      </Menu>
    </>
  )
}

Layout.Item = Menu.Item

export default Layout