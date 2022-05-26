import React, { Fragment } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Table } from '../../../components/layouts/Table'
import { Dots, LinkIcon } from '../../../ui/icons'

function FeatureListItem(props) {
  let { id, feature, user, date, slug } = props.item

  const router = useRouter()

  const { query } = router

  const doubleClickHandler = (e) => {
    if (e.detail == 2) {
      viewList()
    }
  }

  const viewList = () => {
    router.push(`/app/projects/${query.projectId}/feature-list/${id}`)
  }

  // useEffect( () => { check(!articleChecked) })

  return (
    <Table.Row onClick={doubleClickHandler} className='cursor-pointer'>
      <Table.Data className='w-[41.5px]'>
        <div className="flex items-center justify-left cursor-pointer">
          {/* <LinkIcon /> */}
          <img src={`/svg/features/${slug}.svg`} alt="" />
        </div>
      </Table.Data>
      <Table.Data className='main'>
        <span>
          {feature}
        </span>
      </Table.Data>
      <Table.Data className='days'>
        <span className='line-clamp-1'>
          {user}
        </span>
      </Table.Data>
      <Table.Data className='days'>
        <span>
          {date}
        </span>
      </Table.Data>
      <Menu as={Table.Data} className="pr-[21px]">
        <div className='relative'>
          <div>
            <Menu.Button className='inline-flex mx-auto justify-center'>
              <span>
                <Dots />
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
            <Menu.Items className='z-30 origin-top-right absolute right-0 mt-2 w-52 shadow-lg dark:bg-[#000000] dark:text-white text-black bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
              <div className=''>
                <Menu.Item>
                  {({ active }) => (
                    <button onClick={viewList} type='button' className={`w-full text-left whitespace-nowrap ${active ? 'bg-primary text-white cursor-pointer' : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'} block px-4 py-2 text-sm`}>
                      View Features List
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

export default FeatureListItem