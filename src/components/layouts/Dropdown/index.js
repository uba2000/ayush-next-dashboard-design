import React, { useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const DropdownLayout = ({ children, value, onChange, options, ...rest }) => {

  const [displayValue, setDisplayValue] = useState(value)

  const change = (val) => {
    setDisplayValue(val)
    onChange(val)
  }

  return (
    <Listbox as='div' {...rest} value={value} onChange={change}>
      {({ open }) => (
        <>
          <div className="relative">
            <span className="inline-block w-full">
              <Listbox.Button className='rounded w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-6 py-[10px] h-[43px] bg-white dark:bg-black ' style={{ paddingTop: '8.5px', paddingBottom: '8.5px' }}>
                <span className='block truncate capitalize text-left'>{displayValue}</span>
                <span className='absolute right-4 top-[12px]'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </Listbox.Button>
            </span>
            <Transition
              show={open}
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options static className='absolute z-10 w-full dark:bg-black bg-white dark:text-white text-black border border-t-0 border-solid border-ash dark:border-darkMode-border'>
                {options.map((option, index) => (
                  <Listbox.Option key={index} value={option}>
                    {({ selected, active }) => (
                      <div className={`capitalize cursor-pointer select-none relative py-2 pl-6 pr-4 transition ease-in duration-100  ${active ? 'text-white bg-primary' : 'dark:text-white text-black'}`}>
                        <span className={`${selected ? 'font-bold' : 'font-normal'}`}>{option}</span>
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
  )
}

export default DropdownLayout