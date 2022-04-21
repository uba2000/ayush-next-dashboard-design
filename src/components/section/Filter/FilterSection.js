import React, { useState, Fragment } from 'react'
import { Transition, Menu } from '@headlessui/react'

import Filters from '../../../_mock/filters'
import FilterBox from './FilterBox';
import { ChevDown } from '../../../ui/icons/chev-down';

const FilterSection = () => {

  const [stateFilter, setStateFilter] = useState(Filters)

  return (
    <div className='flex space-x-1'>
      {stateFilter.slice(0, 7).map((filter) => {
        return <FilterBox
          filter={filter}
          key={filter.id}
        />
      })}
      <Menu as='div' className='inline-block'>
        <div className='relative'>
          <div>
            <Menu.Button className='flex items-center space-x-[5px] bg-white dark:text-white text-black dark:bg-[#000000] py-[10px] px-5 font-semibold capitalize text-center text-sm leading-5 border border-solid border-[#414141]'>
              <span>
                More
              </span>
              <span>
                <ChevDown
                  className="h-2 w-2 dark:text-white text-black"
                />
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
            <Menu.Items className='z-30 origin-top-left absolute left-0 mt-2 w-fit shadow-lg dark:bg-[#000000] dark:text-white text-black bg-white ring-1 ring-[#000000] ring-opacity-5 focus:outline-none'>
              {stateFilter.slice(7).map((filter) => (
                <Fragment key={filter.id}>
                  <Menu.Item>
                    {({ active }) => (
                      <div className={`py-[10px] px-5 capitalize font-semibold ${active ? 'bg-primary text-white cursor-pointer' : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'}`}>
                        <span>
                          {filter.name}
                        </span>
                      </div>
                    )}
                  </Menu.Item>
                </Fragment>
              ))}
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
    </div>
  )
}

export default FilterSection