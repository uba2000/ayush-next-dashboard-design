import React, { Fragment, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { forEach } from 'lodash';

import { Table } from '../../../../../../../components/layouts/Table';
import DashboardLayout from '../../../../../../../components/app/DasboardLayout';
import contents, {
  generateArticlesContent,
} from '../../../../../../../_mock/generateContent';
import GenerateListItem from '../../../../../../../page-components/keyword-generate/generateListItem';
import { DialogLayout } from '../../../../../../../components/layouts/Dialog';
import { X, RoundTickActive } from '../../../../../../../ui/icons';
import { setShowNewProject } from '../../../../../../../features/layout/layoutSlice';

const Index = () => {
  const router = useRouter();
  const { query } = router;

  const dispatch = useDispatch();

  const [contentGenerationComplete, setContentGenerationComplete] = useState(
    checkAllContentIsComplete
  );
  const [completeCount, setCompleteCount] = useState(0);

  const articlesDetailsGenerate = useSelector(
    (state) => state.project.articlesDetailsGenerate
  );
  const [allContents] = useState(
    generateArticlesContent(articlesDetailsGenerate)
  );
  const [isCompleteDialog, setIsCompleteDialog] = useState(false);

  const checkAllContentIsComplete = () => {
    // return contents.every(c => c.status == 'completed')
    return true;
  };

  const processArticlesContent = () => {
    return allContents;
  };

  const triggerComplete = (status, articleDetails = null) => {
    if (status == 'c') {
      setCompleteCount(++completeCount);
      // TODO: save articles on complete...
    }
    if (completeCount == allContents.length) {
      setIsCompleteDialog(true);
    }
  };

  const closeGenerationCompleteDialog = () => {
    setContentGenerationComplete(false);
  };

  const viewAllProjects = () => {
    router.push(`/app/projects/${query.projectsId}`);
  };

  const startNewProject = () => {
    dispatch(setShowNewProject(true));
    router.push(`/app/projects`);
  };

  return (
    <DashboardLayout>
      <DialogLayout
        isOpen={isCompleteDialog}
        closeModal={closeGenerationCompleteDialog}
      >
        <div className="px-[130px] py-20 relative">
          <div
            className="absolute top-[30px] right-7 cursor-pointer"
            onClick={closeGenerationCompleteDialog}
          >
            <span>
              <X className="w-[21px] h-[21px]" />
            </span>
          </div>
          <div className="space-y-6">
            <div className="mb-[26.85px]">
              <span>
                <RoundTickActive className="w-12 h-12 mx-auto text-primary" />
              </span>
            </div>
            <div className="space-y-2">
              <DialogLayout.Title
                className={'capitalize text-xl font-semibold'}
              >
                Content generated Successfully!
              </DialogLayout.Title>
              <p className="dark:text-darkMode-subText text-ash">
                Et leo, enim in non sed quis sed. Auctor natoque auctor risus
                amet quis mauris. Interdum et nisi, pellentesque id lectus.
              </p>
            </div>
            <div className="space-x-4">
              <button onClick={startNewProject} className="btn btn-primary">
                Start Another Project
              </button>
              <button
                onClick={viewAllProjects}
                className="btn btn-reset dark:text-darkMode-subText text-ash"
              >
                View All Articles
              </button>
            </div>
          </div>
        </div>
      </DialogLayout>
      <div className="w-full">
        <div>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.TH>
                  <span>ID</span>
                </Table.TH>
                <Table.TH main={true}>
                  <span>Title</span>
                </Table.TH>
                <Table.TH>
                  <span>Words</span>
                </Table.TH>
                <Table.TH>
                  <span>Status</span>
                </Table.TH>
                <Table.TH>
                  <span></span>
                </Table.TH>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {articlesDetailsGenerate &&
                processArticlesContent().map((content, index) => (
                  <Fragment key={content.id}>
                    <GenerateListItem
                      content={content}
                      triggerComplete={triggerComplete}
                      index={index}
                    />
                  </Fragment>
                ))}
            </Table.Body>
          </Table>
        </div>
        <div className="dark:bg-darkMode-bg border-t-0 bg-white border dark:border-darkMode-border border-ash border-solid">
          <div className="flex justify-between pl-11 pr-10 py-4">
            <span className="font-poppins text-sm align-middle">
              1-20 of 1000 projects
            </span>
            <div className="flex items-center">
              <button
                className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash`}
                // disabled={page == 1}
                // onClick={() => setPage(page - 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <p className="text-sm mx-4 font-poppins">{/* {page} */}1</p>
              <button
                className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash`}
                // disabled={page == Math.ceil(projects.length / 10)}
                // onClick={() => setPage(page + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-right"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

Index.auth = true;

export async function getServerSideProps(context) {
  const { query } = context;
  try {
    const session = await getSession(context);

    if (session?.user) {
      return {
        props: {},
      };
    }
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

export default Index;
