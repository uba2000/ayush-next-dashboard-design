import React from 'react'

import Layout from './Layout'
import { SearchIcon } from '../../../ui/icons/search-icon'
import CheckBox from '../../../components/layouts/CheckBox'

const AddToMenu = ({ setOpenNewKeywordList }) => {
  return (
    <>
      <Layout
        label={'Add to'}
        origin={'right'}
        type='menu'
        icon={<Icon />}
      >
        <div className='divide-x-2 dark:divide-darkMode-border divide-ash' style={{ width: '197px' }}>
          <div>
            <div className="flex items-center border-b border-solid dark:border-darkMode-border border-ash border-l-0 border-t-0 border-r-0 dark:bg-darkMode-bg h-[43px] bg-white max-w-[293px]">
              <input type="text" style={{ paddingLeft: '12px' }} className="flex-grow flex-shrink border-0 py-3 text-xs rounded-none dark:bg-darkMode-bg h-[40px] bg-white" placeholder='Search...' />
              <div className="py-3 pr-4 px-[15.5px] dark:bg-darkMode-bg h-[40px] bg-white cursor-pointer">
                <SearchIcon
                  className="h-3 w-3 dark:text-white text-black"
                />
              </div>
            </div>
          </div>
          <div className='border-b border-solid dark:border-darkMode-border border-ash'>
            <ul>
              <li className='p-2 flex items-center cursor-pointer space-x-2'>
                <span>
                  <CheckBox checked={false} />
                </span>
                <span className='text-sm'>
                  Keyword List
                </span>
              </li>
              <li className='p-2 flex items-center cursor-pointer space-x-2'>
                <span>
                  <CheckBox checked={false} />
                </span>
                <span className='text-sm'>
                  Keyword List
                </span>
              </li>
            </ul>
          </div>
          <Layout.Item>
            <div>
              <button onClick={setOpenNewKeywordList} className="btn btn-reset py-[6px] px-0 text-center w-full text-sm dark:text-white text-black">
                Create new Keyword list
              </button>
            </div>
          </Layout.Item>
        </div>
      </Layout>
    </>
  )
}

const Icon = () => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.6492 -6.10352e-05H5.04922C4.16682 -6.10352e-05 3.44922 0.717537 3.44922 1.59994V11.1999C3.44922 12.0823 4.16682 12.7999 5.04922 12.7999H14.6492C15.5316 12.7999 16.2492 12.0823 16.2492 11.1999V1.59994C16.2492 0.717537 15.5316 -6.10352e-05 14.6492 -6.10352e-05ZM5.04922 11.1999V1.59994H14.6492L14.6508 11.1999H5.04922Z" fill="white" />
      <path d="M1.85 4.80013H0.25V14.4001C0.25 15.2825 0.967598 16.0001 1.85 16.0001H11.45V14.4001H1.85V4.80013ZM10.65 3.20013H9.04998V5.60013H6.64999V7.20013H9.04998V9.60012H10.65V7.20013H13.05V5.60013H10.65V3.20013Z" fill="white" />
    </svg>
  )
}

export { AddToMenu }