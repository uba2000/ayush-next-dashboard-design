import React from 'react'
import styles from '../../../styles/Account.module.css'
import AccountLayout from '../../../components/app/account/AccountLayout'
import Box from '../../../components/layouts/Box'
import { Table } from '../../../components/layouts/Table'
import LimitsHistoryItems from '../../../page-components/account/limitsHistoryItems'

function limits() {
  return (
    <AccountLayout>
      <div className="space-y-[30px]">
        <div>
          <LimitSectionHeader title={'Plan Details'} />
          <Box type="black">
            <div className="p-[30px]">
              <Box>
                <div className="p-[30px] space-y-[29px]">
                  <div className="grid grid-cols-5">
                    <div className='flex flex-col space-y-1'>
                      <LimitsDetailsLayout title={'Statndard Plan'} titleHead={'Your Plan'} />
                    </div>
                    <div className='flex flex-col space-y-1'>
                      <LimitsDetailsLayout title={'Mar 22, 2022'} titleHead={'Billing Date'} />
                    </div>
                    <div className='flex flex-col space-y-1'>
                      <LimitsDetailsLayout title={'100,000 Credits'} titleHead={'Monthly Limit'} />
                    </div>
                    <div className='flex flex-col space-y-1'>
                      <LimitsDetailsLayout title={'15 of 20'} titleHead={'Total Projects'} />
                    </div>
                    <div className='flex flex-col space-y-1'>
                      <LimitsDetailsLayout title={'25 of 30'} titleHead={'Keyword Lists'} />
                    </div>
                  </div>
                  <div className="space-y-[10px]">
                    <div className="flex justify-between">
                      <div className='flex space-x-1 items-center'>
                        <LimitsDetailsLayout title={'22/03/2022'} titleHead={'Reset Date'} />
                      </div>
                      <div className='flex space-x-1 items-center'>
                        <LimitsDetailsLayout title={'81,984 Of 100,000'} titleHead={'Total Credits'} />
                      </div>
                    </div>
                    <div className="">
                      <div className="w-full rounded-[48px] h-[17px] bg-gray-1000">
                        <div className="w-[81.984%] transition-[width] ease-out duration-200 rounded-[48px] h-[17px] bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </Box>
        </div>
        <div>
          <LimitSectionHeader title={'Account History'} />
          <div>
            <Table>
              <Table.Head>
                <Table.Row className="cursor-default">
                  <Table.TH className='pl-0 cursor-pointer w-[41.5px]'>
                    <div className="flex items-center justify-center" onClick={() => checkAllArticlesHandler(!checkAllArticles)}>
                      {/*  */}
                    </div>
                  </Table.TH>
                  <Table.TH main={true} style={{ width: '50%', minWidth: '397px' }}>
                    <span className="capitalize">
                      Project Titles
                    </span>
                  </Table.TH>
                  <Table.TH style={{ minWidth: '140px' }}>
                    <span className='flex items-center space-x-1'>
                      <span className="capitalize">
                        Credits
                      </span>
                    </span>
                  </Table.TH>
                  <Table.TH style={{ width: '27%', minWidth: '169px' }}>
                    <span className='flex items-center space-x-1'>
                      <span className="capitalize">
                        Tags
                      </span>
                    </span>
                  </Table.TH>
                  <Table.TH style={{ width: '12%', minWidth: '144px' }}>
                    <span className="capitalize">
                      Date
                    </span>
                  </Table.TH>
                </Table.Row>
              </Table.Head>
              <Table.Body className="dark:bg-black bg-white">
                <LimitsHistoryItems
                  title={'Digital Marketing Articles'}
                  credits={'25,145'}
                  tags={['graphics design', 'digital, marketing']}
                  date={'22/03/2022, 5:51 AM '}
                />
              </Table.Body>
            </Table>
            <div className="dark:bg-darkMode-bg bg-white border border-t-0 dark:border-darkMode-border border-ash border-solid">
              <div className="flex justify-between pl-11 pr-10 py-4">
                <span className="font-poppins text-sm align-middle">
                  1-10 of 100 articles
                </span>
                <div className="flex items-center">
                  <button
                    className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash`}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-chevron-left'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <polyline points='15 6 9 12 15 18' />
                    </svg>
                  </button>
                  <p className="text-sm mx-4 font-poppins">
                    1
                  </p>
                  <button
                    className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash`}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-chevron-right'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <polyline points='9 6 15 12 9 18' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  )
}

const LimitsDetailsLayout = ({ title, titleHead }) => {
  return (
    <>
      <span className='font-bold text-sm'>{titleHead}:</span>
      <span className='font-medium -tracking-[0.02em]'>{title}</span>
    </>
  )
}

const LimitSectionHeader = ({ title }) => {
  return (
    <Box type="black" className="border-b-0">
      <div className="py-4 px-8">
        <span className="font-bold text-lg">{title}</span>
      </div>
    </Box>
  )
}

export default limits