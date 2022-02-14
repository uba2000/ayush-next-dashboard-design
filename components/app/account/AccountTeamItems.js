import React, { useState, Fragment } from 'react'
import { Listbox, Transition, Dialog } from '@headlessui/react'

const roles = ['owner', 'admin', 'editor']

function AccountTeamItems() {
  const [selectedRole, setSelectedRole] = useState(roles[1])
  const [open, setOpen] = useState(false)
  return (
    <tr>
      <Transition.Root as={Fragment} show={open}>
        <Dialog className='z-50 fixed' onClose={setOpen} as='div'>
          <div className="flex justify-center items-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className=' fixed transition-opacity' />

            </Transition.Child>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className="modal-container">
                <div>
                  <Dialog.Title
                    as='h3'
                    className='title'
                  >
                    Are you sure?
                  </Dialog.Title>
                  <div className="subtitle">
                    <span>Deleting is final and cannot be reversed. are you sure you still want to proceed?</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="btn btn-primary bg-primary text-white">
                    Confirm
                  </button>
                  <button onClick={() => setOpen(false)} className="ml-3 btn btn-reset">
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <td>Michael Mitc</td>
      <td>commichael.mitc@example.com</td>
      <td>
        <div className="mr-7">
          <Listbox as='div' value={selectedRole} onChange={setSelectedRole}>
            {({ open }) => (
              <>
                <div className="relative">
                  <span className="inline-block w-full">
                    <Listbox.Button className='text-center bg-gray-1000 border border-solid border-gray-800 py-2 pl-8 pr-9' style={{ minWidth: '112px' }}>
                      <span className='block truncate capitalize text-left'>{selectedRole}</span>
                      <span className='absolute right-3 top-2'>
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
                    <Listbox.Options static className='absolute w-full border bg-white border-gray-800'>
                      {roles.map((role) => (
                        <Listbox.Option key={role} value={role} onClick={() => setOpen(true)}>
                          {({ selected, active }) => (
                            <div className={`capitalize cursor-pointer select-none relative py-2 px-9 transition ease-in duration-600  ${active ? 'text-black bg-gray-1000' : 'text-black'}`}>
                              <span className={`${selected ? 'font-normal' : 'font-normal'}`}>{role}</span>
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
      </td>
    </tr>
  )
}

export default AccountTeamItems