import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
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
} from '../../../../../page-components/keyword-results';
import DashboardLayout from '../../../../../components/app/DasboardLayout';
import { PencilAlt } from '../../../../../ui/icons';

import ArticleLayout from '../../../../../page-components/project-categories/ArticleLayout';
import NewKeywordListButton from '../../../../../page-components/keyword-generate/NewKeywordListButton';
import GenerateContentDialog from '../../../../../page-components/keyword-generate/GenerateContentDialog';
import useScaiTable from '../../../../../hooks/useScaiTable';
import { KEYWORDSLIST_COLUNM } from '../../../../../components/layouts/Table/columns';
import TableLayout from '../../../../../components/layouts/TableLayout';
import { setHeaders, get } from '../../../../../utils/http';

const KeywordListView = ({ keywords, keywordList, project }) => {
  const router = useRouter();
  const { query } = router;

  const [generateContentDialog, setGenerateContentDialog] = useState(false);

  const [pageKeywords, setPageKeywords] = useState(keywords);

  const openGenerateContentDialog = () => {
    setGenerateContentDialog(true);
  };

  const tableInstance = useScaiTable(
    {
      tableColumns: KEYWORDSLIST_COLUNM,
      tableData: pageKeywords,
    },
    []
  );

  return (
    <DashboardLayout metaTitle={keywordList.title}>
      {/* Generate Content */}
      <GenerateContentDialog
        listId={query.keywordListId}
        selectedFlatRows={tableInstance.selectedFlatRows}
        generateContentDialog={generateContentDialog}
        setGenerateContentDialog={() => setGenerateContentDialog(false)}
      />
      <ArticleLayout
        crumbs={[
          {
            link: `/app/projects/${query.projectId}`,
            txt: project.title,
          },
          { link: `/app/projects/${query.projectId}?tab=k`, txt: 'Keywords' },
          { link: '', txt: keywordList.title },
        ]}
      >
        <div className="mt-8">
          <div className="flex justify-end mb-8 -mt-[69px]">
            <NewKeywordListButton />
          </div>
        </div>
        <div className="space-y-[26px]">
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
              <AddToMenu />
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
            {/*  */}
            <TableLayout
              itemsName={'keywords'}
              defaultStyles={{ headerCenter: true }}
              tableInstance={tableInstance}
            />
          </div>
        </div>
      </ArticleLayout>
    </DashboardLayout>
  );
};
KeywordListView.auth = true;

export async function getServerSideProps(context) {
  const { query } = context;
  try {
    const session = await getSession(context);

    if (session?.user) {
      const { response, error } = await get({
        url: `${process.env.BASE_URL}/api/project/keywords/${query.keywordListId}/result`,
        headers: setHeaders({ token: session.user.accessToken }),
      });
      if (response) {
        const ssrKeywordList = JSON.parse(
          JSON.stringify(response.data.data.ssrProject)
        );
        const keywords = ssrKeywordList.list;
        return {
          props: {
            keywords: keywords,
            keywordList: ssrKeywordList,
            project: JSON.parse(JSON.stringify(response.data.data.project)),
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
export default KeywordListView;
