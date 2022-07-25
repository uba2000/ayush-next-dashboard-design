import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import { useAsyncDebounce } from 'react-table';
import { getSession } from 'next-auth/react';

import {
  VolumeFilter,
  IncludeFilter,
  TrafficFilter,
  WordCountFilter,
  DifficultyFilter,
  CPCFilter,
  ExcludeFilter,
  AllInTitleFilter,
  AddToMenu,
  ExportMenu,
} from '../../../../../../../page-components/keyword-results';
import DashboardLayout from '../../../../../../../components/app/DasboardLayout';
import Box from '../../../../../../../components/layouts/Box';
import { SearchIcon, PencilAlt } from '../../../../../../../ui/icons';
import { KEYWORDSLIST_COLUNM } from '../../../../../../../components/layouts/Table/columns';
import TableLayout from '../../../../../../../components/layouts/TableLayout';
import useScaiTable from '../../../../../../../hooks/useScaiTable';
import { setHeaders, get } from '../../../../../../../utils/http';
import GenerateContentDialog from '../../../../../../../page-components/keyword-generate/GenerateContentDialog';
import { Input } from '../../../../../../../ui/input';

const results = ({ keywordQuestions, keywords }) => {
  const router = useRouter();
  const { query } = router;

  const [generateContentDialog, setGenerateContentDialog] = useState(false);
  const [pageKeywords, setPageKeywords] = useState(keywordQuestions);

  const openGenerateContentDialog = () => {
    setGenerateContentDialog(true);
  };

  useEffect(() => {
    if (keywordQuestions.length == 0) {
      router.push('/app/projects/keywords');
    }
  }, []);

  const tableInstance = useScaiTable(
    {
      tableColumns: KEYWORDSLIST_COLUNM,
      tableData: pageKeywords,
      scaiPageSize: 50,
    },
    []
  );

  const [resultSearch, setResultSearch] = useState(
    tableInstance.globalFilter || ''
  );
  const searchOnChange = useAsyncDebounce((value) => {
    tableInstance.setGlobalFilter(value || undefined);
  }, 300);

  return (
    <DashboardLayout metaTitle="Keywords Research">
      {/* Generate Content */}
      <GenerateContentDialog
        listId={query.keywordlistId}
        selectedFlatRows={tableInstance.selectedFlatRows}
        generateContentDialog={generateContentDialog}
        setGenerateContentDialog={() => setGenerateContentDialog(false)}
      />
      <div className="space-y-[26px] w-full">
        <Tab.Group>
          <Tab.List className="grid grid-cols-4 w-full">
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  className={`
                      cursor-pointer py-5 border-r-0 text-center
                      ${
                        selected
                          ? 'dark:bg-primary bg-primary border-primary text-white'
                          : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border'
                      }
                    `}
                >
                  <span className="font-semibold leading-[135%] capitalize">
                    Keywords
                  </span>
                </div>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  className={`
                      cursor-pointer py-5 border-r-0 text-center
                      ${
                        selected
                          ? 'dark:bg-primary bg-primary border-primary text-white'
                          : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border'
                      }
                    `}
                >
                  <span className="font-semibold leading-[135%] capitalize">
                    Top Related Terms
                  </span>
                </div>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  className={`
                      cursor-pointer py-5 border-r-0 text-center
                      ${
                        selected
                          ? 'dark:bg-primary bg-primary border-primary text-white'
                          : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border'
                      }
                    `}
                >
                  <span className="font-semibold leading-[135%] capitalize">
                    Rising Related Terms
                  </span>
                </div>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  className={`
                      cursor-pointer py-5 text-center
                      ${
                        selected
                          ? 'dark:bg-primary bg-primary border-primary text-white'
                          : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border'
                      }
                    `}
                >
                  <span className="font-semibold leading-[135%] capitalize">
                    Search suggestions
                  </span>
                </div>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="space-y-[26px]">
                <div className="relative">
                  <Input
                    value={resultSearch}
                    onChange={(value) => {
                      setResultSearch(value);
                      searchOnChange(value);
                    }}
                    className="h-full py-5 px-[31px] border border-solid border-ash dark:border-darkMode-border"
                  />
                  <div className="absolute right-[32px] bottom-[21px]">
                    <SearchIcon className="h-5 w-5 dark:text-white text-black" />
                  </div>
                </div>
                <Box className={'py-5 px-[31px] hidden'}>
                  <div className="flex justify-between">
                    <div className="">
                      <span className="text-sm font-medium capitalize">
                        {keywords.map(
                          (k, index) =>
                            `${k}${index !== keywords.length - 1 ? ', ' : ''}`
                        )}
                      </span>
                    </div>
                    <div>
                      <SearchIcon className="h-5 w-5 dark:text-white text-black" />
                    </div>
                  </div>
                </Box>
                <div className="flex justify-between">
                  <div className="flex flex-grow space-x-2">
                    {tableInstance.headerGroups[0].headers[2].render('Filter')}
                    {tableInstance.headerGroups[0].headers[3].render('Filter')}
                    <WordCountFilter />
                    {tableInstance.headerGroups[0].headers[5].render('Filter')}
                    {tableInstance.headerGroups[0].headers[4].render('Filter')}
                    {tableInstance.headerGroups[0].headers[1].render('Filter', {
                      filterOptions: {
                        items: pageKeywords,
                        setItems: setPageKeywords,
                      },
                    })}
                    <AllInTitleFilter />
                  </div>
                  <div className="flex space-x-2">
                    <AddToMenu
                      rows={tableInstance.selectedFlatRows}
                      currentKeywordListId={query.keywordlistId}
                    />
                    <ExportMenu />
                    <div>
                      <button
                        disabled={!tableInstance.selectedFlatRows.length > 0}
                        onClick={openGenerateContentDialog}
                        className={`cursor-pointer border border-solid ${
                          tableInstance.selectedFlatRows.length > 0
                            ? 'dark:bg-primary bg-primary text-white border-primary'
                            : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border-ash dark:border-darkMode-border'
                        }`}
                      >
                        <div className="flex py-2 px-5 items-center">
                          <span>
                            <PencilAlt className="w-[17px] h-[17px]" />
                          </span>
                          <span
                            style={{ marginLeft: '7px' }}
                            className="capitalize font-medium text-sm"
                          >
                            Generate Content
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-7">
                  <TableLayout
                    itemsName={'keywords'}
                    tableInstance={tableInstance}
                    defaultStyles={{ headerCenter: true }}
                  />
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div></div>
            </Tab.Panel>
            <Tab.Panel>
              <div></div>
            </Tab.Panel>
            <Tab.Panel>
              <div></div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </DashboardLayout>
  );
};

results.auth = true;

export async function getServerSideProps(context) {
  const { query } = context;

  try {
    const session = await getSession(context);

    if (session?.user) {
      const { response, error } = await get({
        url: `${process.env.BASE_URL}/api/project/keywords/${query.keywordlistId}/result`,
        headers: setHeaders({ token: session.user.accessToken }),
      });
      if (response) {
        const ssrProject = JSON.parse(
          JSON.stringify(response.data.data.ssrProject)
        );
        return {
          props: {
            keywordQuestions: ssrProject.list || [],
            keywords: ssrProject.keywords || [],
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

export default results;
