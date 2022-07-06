import React, { useState } from 'react';
import { getSession } from 'next-auth/react';

import AccountLayout from '../../../components/app/account/AccountLayout';
import Box from '../../../components/layouts/Box';
import { File, LinkIcon } from '../../../ui/icons';
import { get, setHeaders } from '../../../utils/http';
import TableLayout from '../../../components/layouts/TableLayout';
import useScaiTable from '../../../hooks/useScaiTable';
import { ACCOUNT_HISTORY_COLUNM } from '../../../components/layouts/Table/columns';
import { orderBy, sortBy } from 'lodash';
import { fNumberWithCommas } from '../../../utils/formatNumber';

function limits({ accountPlan, accountHistory }) {
  const [months] = useState([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]);

  const tableInstance = useScaiTable(
    {
      tableColumns: ACCOUNT_HISTORY_COLUNM,
      tableData: accountHistory,
    },
    [],
    false,
    () => [
      {
        id: 'file',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <LinkIcon {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => <File {...row.getToggleRowSelectedProps()} />,
        width: '41.5px',
        maxWidth: '41.5px',
        minWidth: '41.5px',
      },
    ]
  );

  return (
    <AccountLayout metaTitle="Limit &amp; Usage">
      <div className="space-y-[30px]">
        <div>
          <LimitSectionHeader title={'Plan Details'} />
          <Box type="black">
            <div className="p-[30px]">
              <Box>
                <div className="p-[30px] space-y-[29px]">
                  <div className="grid grid-cols-5">
                    <div className="flex flex-col space-y-1">
                      <LimitsDetailsLayout
                        title={
                          <span className="capitalize">
                            {accountPlan
                              ? accountPlan.account_plan.plan
                                  .split('-')
                                  .join(' ')
                              : '---'}
                          </span>
                        }
                        titleHead={'Your Plan'}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <LimitsDetailsLayout
                        title={`
                          ${
                            accountPlan
                              ? `
                            ${
                              months[
                                new Date(
                                  accountPlan.next_billing_date
                                ).getMonth()
                              ]
                            } ${new Date(
                                  accountPlan.next_billing_date
                                ).getDate()}, ${new Date(
                                  accountPlan.next_billing_date
                                ).getFullYear()}
                              `
                              : '---'
                          }`}
                        titleHead={'Billing Date'}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <LimitsDetailsLayout
                        title={`${
                          accountPlan
                            ? `${fNumberWithCommas(
                                accountPlan.account_plan.period_limit
                              )} Credits`
                            : '---'
                        }`}
                        titleHead={`${
                          accountPlan
                            ? `${
                                accountPlan.period_type == 'M'
                                  ? 'Monthly'
                                  : 'Yearly'
                              } Limit`
                            : 'Period Limit'
                        }`}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <LimitsDetailsLayout
                        title={`${
                          accountPlan
                            ? `${accountPlan.plan_projects.length || 0} of ${
                                accountPlan.account_plan.total_projects
                              }`
                            : '---'
                        }`}
                        titleHead={'Total Projects'}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <LimitsDetailsLayout
                        title={`${
                          accountPlan
                            ? `${accountPlan.plan_keywords.length || 0} of ${
                                accountPlan.account_plan.keyword_list_limit
                              }`
                            : '---'
                        }`}
                        titleHead={'Keyword Lists'}
                      />
                    </div>
                  </div>
                  <div className="space-y-[10px]">
                    <div className="flex justify-between">
                      <div className="flex space-x-1 items-center">
                        <LimitsDetailsLayout
                          title={`
                          ${
                            accountPlan
                              ? `
                            ${new Date(
                              accountPlan.next_billing_date
                            ).getDate()}/${new Date(
                                  accountPlan.next_billing_date
                                ).getMonth()}/${new Date(
                                  accountPlan.next_billing_date
                                ).getFullYear()}
                              `
                              : '---'
                          }`}
                          titleHead={'Reset Date'}
                        />
                      </div>
                      <div className="flex space-x-1 items-center">
                        <LimitsDetailsLayout
                          title={`${
                            accountPlan
                              ? `${fNumberWithCommas(
                                  accountPlan.period_credit
                                )} Of ${fNumberWithCommas(
                                  accountPlan.account_plan.period_limit
                                )}`
                              : '---'
                          }`}
                          titleHead={'Total Credits'}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="w-full rounded-[48px] h-[17px] bg-gray-1000">
                        <div
                          style={{
                            width: `${
                              accountPlan
                                ? (accountPlan.period_credit /
                                    accountPlan.account_plan.period_limit) *
                                  100
                                : '0'
                            }%`,
                          }}
                          className="transition-[width] ease-out duration-200 rounded-[48px] h-[17px] bg-primary"
                        ></div>
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
            <TableLayout tableInstance={tableInstance} />
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}

const LimitsDetailsLayout = ({ title, titleHead }) => {
  return (
    <>
      <span className="font-bold text-sm">{titleHead}:</span>
      <span className="font-medium -tracking-[0.02em]">{title}</span>
    </>
  );
};

const LimitSectionHeader = ({ title }) => {
  return (
    <Box type="black" className="border-b-0">
      <div className="py-4 px-8">
        <span className="font-bold text-lg">{title}</span>
      </div>
    </Box>
  );
};

limits.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    if (session?.user) {
      let details = {};
      const { response, error } = await get({
        url: `${process.env.BASE_URL}/api/account/get-account-details`,
        headers: setHeaders({ token: session.user.accessToken }),
      });

      if (response.status) {
        details = response.data.data;

        return {
          props: {
            accountPlan: details.user.current_plan || null,
            accountHistory: orderBy(
              details.history.projects || [],
              ['created_at'],
              ['desc']
            ),
          },
        };
      }
    }

    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
}

export default limits;
