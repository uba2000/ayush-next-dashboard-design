import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import { getSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';

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
import { DialogLayout } from '../../../../../../../components/layouts/Dialog';
import Input from '../../../../../../../components/layouts/Input';
import { Table } from '../../../../../../../components/layouts/Table';
import CheckBox from '../../../../../../../components/layouts/CheckBox';
import KeywordItem from '../../../../../../../page-components/keyword-results/keywordItem';
import { useProjectsContext } from '../../../../../../../context/projects';
import { KEYWORDSLIST_COLUNM } from '../../../../../../../components/layouts/Table/columns';
import TableLayout from '../../../../../../../components/layouts/TableLayout';
import useScaiTable from '../../../../../../../hooks/useScaiTable';
import { setArticlesDetailsGenerate } from '../../../../../../../features/project/projectSlice';
import { setHeaders, get } from '../../../../../../../utils/http';

const results = ({ keywordQuestions, keywords }) => {
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();

  const projectState = useProjectsContext();

  const { setKeywords, setKeywordQuestions } = projectState;

  const [canGenerateContent, setCanGenerateContent] = useState(false);
  const [isAllKeywordsChecked, setIsAllKeywordsChecked] = useState(false);
  const [generateContentDialog, setGenerateContentDialog] = useState(false);

  const [noArticles, setNoArticles] = useState(237);
  const [noQuestionPerArticles, setNoQuestionPerArticles] = useState(15);
  const [includeInternalLinking, setIncludeInternalLinking] = useState(false);

  const [articleTags, setArticleTags] = useState([]);

  const openGenerateContentDialog = () => {
    setGenerateContentDialog(true);
  };

  const generateContent = () => {
    dispatch(
      setArticlesDetailsGenerate({
        noOfArticles: noArticles,
        noOfQuestionPerArticles: noQuestionPerArticles,
        includeInternalLinking: includeInternalLinking,
        articleTags: articleTags,
        keywordQuestions: tableInstance.selectedFlatRows.map((d) => {
          return {
            ...d.original,
          };
        }),
      })
    );

    router.push(
      `/app/projects/${query.projectId}/keywords/${query.keywordlistId}/generate`
    );
  };

  useEffect(() => {
    if (keywordQuestions.length == 0) {
      router.push('/app/projects/keywords');
    }
  }, []);

  const tableInstance = useScaiTable(
    {
      tableColumns: KEYWORDSLIST_COLUNM,
      tableData: keywordQuestions,
    },
    []
  );

  return (
    <DashboardLayout>
      {/* Generate Content */}
      <DialogLayout
        isSharp={true}
        widthRestrict={'max-w-[776px]'}
        isOpen={generateContentDialog}
        closeModal={() => setGenerateContentDialog(false)}
      >
        <div className="text-left py-[30px] px-[50px] space-y-8">
          <div className="space-y-5">
            <DialogLayout.Title>Generate Content</DialogLayout.Title>
            <div className="">
              <div className="flex space-x-[13px]">
                <div className="">
                  <Box type={'black'}>
                    <Input
                      value={noArticles}
                      onChange={(e) => setNoArticles(e.target.value)}
                      className="py-1 px-2 text-[18px] font-medium w-[62px] text-center"
                    />
                  </Box>
                </div>
                <div className="">
                  <div className="flex flex-col space-y-1">
                    <span className="text-[18px] font-medium">
                      How many articles?
                    </span>
                    <span className="dark:text-darkMode-subText text-sm tracking-[0.1px] text-ash">
                      *Estimated Total Word Count: 1,250,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex space-x-[13px]">
                <div className="">
                  <Box type={'black'}>
                    <Input
                      value={noQuestionPerArticles}
                      onChange={(e) => setNoQuestionPerArticles(e.target.value)}
                      className="py-1 px-2 text-[18px] font-medium w-[62px] text-center"
                    />
                  </Box>
                </div>
                <div className="">
                  <div className="flex flex-col space-y-1">
                    <span className="text-[18px] font-medium">
                      How many questions per article?
                    </span>
                    <span className="dark:text-darkMode-subText text-sm tracking-[0.1px] text-ash">
                      *Estimated Total Word Count: 1,250,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div
                className="grid grid-cols-[62px_auto] gap-x-[13px] cursor-pointer"
                onClick={() =>
                  setIncludeInternalLinking(!includeInternalLinking)
                }
              >
                <div>
                  <div className="flex justify-center">
                    <CheckBox checked={includeInternalLinking} />
                  </div>
                </div>
                <div className="">
                  <div className="flex flex-col space-y-1">
                    <span className="text-[18px] font-medium">
                      Include internal linking
                    </span>
                    <span className="dark:text-darkMode-subText text-sm tracking-[0.1px] text-ash">
                      Note: Internal linking can help increase ranking and crawl
                      budget
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-[10px]">
              <div className="">
                <span className="font-medium text-[18px] tracking-[-0.01em]">
                  Article Tags
                </span>
              </div>
              <div className="">
                <Input
                  value={articleTags.join(', ')}
                  onChange={(e) => setArticleTags(e.target.value.split(', '))}
                  placeholder="Graphic Design, Marketing"
                  className="max-w-[547px]"
                />
              </div>
              <div className="">
                <span className="text-ash dark:text-darkMode-subText text-sm">
                  Note: Adding tags your article helps you arrange your file
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-[35px]">
            <div className="space-x-[11px] flex">
              <button className="btn btn-primary" onClick={generateContent}>
                Generate
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setGenerateContentDialog(false)}
              >
                Cancel
              </button>
            </div>
            <div className="flex items-center">
              <span className="font-normal text-sm dark:text-darkMode-subText text-ash">
                99,993 / 100k monthly credits left
              </span>
            </div>
          </div>
        </div>
      </DialogLayout>
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
                <Box className={'py-5 px-[31px]'}>
                  <div className="flex justify-between">
                    <div>
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
                    <VolumeFilter />
                    <TrafficFilter />
                    <WordCountFilter />
                    <DifficultyFilter />
                    <CPCFilter />
                    <IncludeFilter />
                    <ExcludeFilter />
                    <AllInTitleFilter />
                  </div>
                  <div className="flex space-x-2">
                    <AddToMenu
                    // setOpenNewKeywordList={openKeywordDialog}
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
                  <TableLayout tableInstance={tableInstance} />
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
        const ssrProject = JSON.parse(JSON.stringify(response.data.data));
        return {
          props: {
            keywordQuestions: ssrProject.list || [],
            keywords: ssrProject.tags || [],
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
