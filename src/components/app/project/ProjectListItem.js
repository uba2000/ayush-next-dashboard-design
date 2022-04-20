import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { Menu, Transition, Dialog } from '@headlessui/react'
import Link from 'next/link'

import CheckBox from '../../layouts/CheckBox'
import { Table } from '../../layouts/Table'

function ProjectListItem(props) {
  const { title, tags, date, checked } = props.item

  const [projectChecked, setProjectChecked] = useState(checked)

  const router = useRouter()

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const doubleClickHandler = (e) => {
    if (e.detail == 2) {
      router.push('/app/projects/123/articles')
    }
  }

  const check = (va) => {
    setProjectChecked(va);
    checked = va;
    props.handleTick(props.projectIndex, va)
  }

  return (
    <Table.Row onClick={doubleClickHandler}>
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
              <div className="inline-block modal-container rounded-2xl my-8 overflow-hidden text-center align-middle transition-all transform bg-white">
                <Dialog.Title
                  as="h3"
                  className="title"
                >
                  Are you sure?
                </Dialog.Title>
                <div className="subtitle">
                  <span>Deleting is final and cannot be reversed. are you sure you still want to proceed?</span>
                </div>

                <div className="mt-4">
                  <button className="btn btn-primary bg-[#FF1212] border-[#FF1212] text-white">
                    Confirm
                  </button>
                  <button onClick={closeModal} className="ml-3 btn btn-reset">
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Table.Data className='w-[41.5px] pl-[21px]'>
        <div className="flex items-center justify-left cursor-pointer" onClick={() => check(!checked)}>
          <CheckBox checked={checked} />
        </div>
      </Table.Data>
      <Table.Data className='main'>
        <span>
          {title}
        </span>
      </Table.Data>
      <Table.Data className='text-sm'>
        <span className='line-clamp-1'>
          {tags.join(', ')}
        </span>
      </Table.Data>
      <Table.Data className='days text-sm'>
        <span>
          {date}
        </span>
      </Table.Data>
      <Menu as='td'>
        <div className='relative'>
          <div className='flex'>
            <Menu.Button className='inline-flex mx-auto justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-dots'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#2c3e50'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <circle cx='5' cy='12' r='1' />
                <circle cx='12' cy='12' r='1' />
                <circle cx='19' cy='12' r='1' />
              </svg>
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
            <Menu.Items className='z-30 origin-top-right absolute right-0 mt-2 w-32 shadow-lg dark:bg-[#000000] dark:text-white text-black bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
              <div className='py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <Link href='/app/projects/edit/123'>
                      <a
                        className={`whitespace-nowrap ${active ? 'bg-buttonGreen text-white cursor-pointer' : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'} block px-4 py-2 text-sm`}
                      >
                        Edit Project
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={openModal}
                      className="whitespace-nowrap bg-white hover:bg-buttonGreen hover:text-white block px-4 py-2 text-sm"
                    >
                      Delete Project
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
    </Table.Row>
  )
}

export default ProjectListItem