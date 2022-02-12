import React, { Fragment, useState } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import Link from 'next/link'

function ArticleListItem(props) {
  const { title, tags, date, checked } = props.item

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
      <td>
        <div className="flex items-center justify-center">
          <input type="checkbox" className="h-5 w-5 rounded" value={checked} />
        </div>
      </td>
      <td className='main'>
        <span>
          {title}
        </span>
      </td>
      <td className='tag'>
        <span>
          {tags.join(', ')}
        </span>
      </td>
      <td className='days'>
        <span>
          {date}
        </span>
      </td>
      <Menu as='td' className='relative inline-block'>
        <div>
          <Menu.Button className='inline-flex justify-center'>
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
          <Menu.Items className='z-30 origin-top-right absolute right-0 mt-2 w-32  shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
            <div className='py-1'>
              <Menu.Item>
                <Link href='/app/articles/edit/123'>
                  <a
                    className='whitespace-nowrap bg-white hover:bg-buttonGreen hover:text-white block px-4 py-2 text-sm'
                  >
                    Edit Article
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href='#' onClick={() => setOpen(true)}
                    className='whitespace-nowrap bg-white hover:bg-buttonGreen hover:text-white block px-4 py-2 text-sm'
                  >
                    Delete Article
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </tr>
  )
}

export default ArticleListItem