import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { Menu, Transition, Dialog } from '@headlessui/react'
import Link from 'next/link'

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

  function doubleClickHandler(e) {
    if (e.detail == 2) {
      router.push('/app/projects/123/articles')
    }
  }

  return (
    <tr onClick={doubleClickHandler} className='cursor-pointer'>
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
                  <button className="btn btn-primary bg-primary text-white">
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
      <td className='pl-0'>
        <div className="flex items-center justify-left cursor-pointer" onClick={() => setProjectChecked(!projectChecked)}>
          {!projectChecked ? (
            <div className='h-5 w-5 rounded border border-solid border-[#767676]'></div>
          ) : (
            <div className="pop-in-animation">
              <svg width="20" height="20" className='tick-svg' viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.49988 0.833984C5.51075 0.833984 3.6031 1.58026 2.19658 2.90864C0.790054 4.23703 -0.00012207 6.0387 -0.00012207 7.91732V22.084C-0.00012207 23.9626 0.790054 25.7643 2.19658 27.0927C3.6031 28.421 5.51075 29.1673 7.49988 29.1673H22.4999C24.489 29.1673 26.3967 28.421 27.8032 27.0927C29.2097 25.7643 29.9999 23.9626 29.9999 22.084V7.91732C29.9999 6.0387 29.2097 4.23703 27.8032 2.90864C26.3967 1.58026 24.489 0.833984 22.4999 0.833984H7.49988ZM20.5949 13.1363C20.7296 13.0005 20.8347 12.841 20.9042 12.6668C20.9736 12.4926 21.0061 12.3073 20.9997 12.1212C20.9932 11.9352 20.9481 11.7522 20.8668 11.5827C20.7855 11.4132 20.6697 11.2604 20.5259 11.1332C20.3821 11.0059 20.2132 10.9066 20.0287 10.8411C19.8443 10.7755 19.648 10.7448 19.4511 10.7509C19.2541 10.7569 19.0604 10.7995 18.8809 10.8763C18.7014 10.9531 18.5396 11.0625 18.4049 11.1983L13.7804 15.8592L11.4959 13.9424C11.1966 13.7074 10.8123 13.5915 10.4241 13.6191C10.036 13.6468 9.67445 13.8159 9.41586 14.0906C9.15727 14.3654 9.02189 14.7243 9.03831 15.0916C9.05474 15.4589 9.22168 15.8057 9.50388 16.0589L12.8789 18.8922C13.1709 19.1372 13.5526 19.265 13.9428 19.2483C14.333 19.2316 14.701 19.0719 14.9684 18.803L20.5934 13.1363H20.5949Z" fill="#00A141" />
              </svg>
            </div>
          )}
        </div>
      </td>
      <td className='main'>
        <span>
          {title}
        </span>
      </td>
      <td className='days'>
        <span>
          {tags.join(', ')}
        </span>
      </td>
      <td className='days'>
        <span>
          {date}
        </span>
      </td>
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
            <Menu.Items className='z-30 origin-top-right absolute right-0 mt-2 w-32  shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
              <div className='py-1'>
                <Menu.Item>
                  <Link href='/app/projects/edit/123'>
                    <a
                      className='whitespace-nowrap bg-white hover:bg-buttonGreen hover:text-white block px-4 py-2 text-sm'
                    >
                      Edit Project
                    </a>
                  </Link>
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
    </tr>
  )
}

export default ProjectListItem