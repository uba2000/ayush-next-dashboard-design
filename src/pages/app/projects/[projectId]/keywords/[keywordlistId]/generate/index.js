import React, { Fragment, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
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
import { post, setHeaders } from '../../../../../../../utils/http';
import useUser from '../../../../../../../hooks/useUser';
import Box from '../../../../../../../components/layouts/Box';
import ScrollbarsLayout from '../../../../../../../components/layouts/Scrollbars';
import { EditorContainer } from '../../../../../../../components/layouts/EditorContainer';
import articleContent from '../../../../../../../_mock/article-content';
import { Button } from '../../../../../../../ui/button';
import {
  setErrorDetails,
  setShowErrorDialog,
} from '../../../../../../../features/error/errorSlice';
import ArticleEditor from '../../../../../../../page-components/project-categories/articles/ArticleEditor';

let canTriggerComplete = true;

const Index = () => {
  const dispatchStore = useDispatch();
  const router = useRouter();
  const { query } = router;
  const { user } = useUser();

  const dispatch = useDispatch();

  const [showGenerate, setShowGenerate] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const [completeCount, setCompleteCount] = useState(0);

  const [stopSaving, setStopSaving] = useState(false);

  const articlesDetailsGenerate = useSelector((state) =>
    generateArticlesContent(state.project.articlesDetailsGenerate)
  );

  const [allContents, setAllContents] = useState(articlesDetailsGenerate);
  const [isCompleteDialog, setIsCompleteDialog] = useState(false);

  const triggerComplete = async (status, article = null) => {
    if (canTriggerComplete) {
      if (status == 'c') {
        const thisContentArticleIndex = allContents.findIndex(
          (n) => n.id == article.id
        );
        let thisContentArticle = allContents;
        thisContentArticle[thisContentArticleIndex] = article;
        setAllContents(thisContentArticle);
        const { response } = await post({
          url: `${process.env.BASE_URL}/api/project/article`,
          headers: setHeaders({ token: user.accessToken }),
          data: {
            title: article.title,
            tags: article.tags || [],
            article_content: articleContent,
            project_id: query.projectId,
            keywordlist_id: query.keywordlistId,
            articleWordCount: article.words,
          },
          error: (response) => {
            if (response.data.error.details) {
              dispatchStore(
                setErrorDetails(response.data.error.details || undefined)
              );
            }
            setIsCompleteDialog(false);
            setStopSaving(true);
            canTriggerComplete = false;
            dispatchStore(setShowErrorDialog(true));
          },
        });
        if (response) {
          setCompleteCount(++completeCount);
          if (completeCount == allContents.length) {
            setIsCompleteDialog(true);
          }
          // TODO: save articles here...
          return response.data.data;
        }
        return false;
      }
      return true;
    }
    return false;
  };

  const closeGenerationCompleteDialog = () => {
    setIsCompleteDialog(false);
  };

  const viewAllProjects = () => {
    router.push(`/app/projects/${query.projectId}`);
  };

  const startNewProject = () => {
    dispatch(setShowNewProject(true));
    router.push(`/app/projects`);
  };

  const [previewData, setPreviewData] = useState(null);
  const [editData, setEditData] = useState(null);

  const previewArticle = (state, payload = null) => {
    switch (state) {
      case 'p': // p: preview
        setPreviewData(payload);
        setShowGenerate(false);
        break;
      case 'hp': // hp: hide preview
        setShowGenerate(true);
        setPreviewData(payload);
        break;
      default:
        break;
    }
  };

  const [loadingArticleEdit, setLoadingArticleEdit] = useState(false);

  const editArticle = async (state, payload = null) => {
    switch (state) {
      case 'e': // p: preview
        setEditData(payload);
        setShowEdit(true);
        break;
      case 'he': // hp: hide preview
        // save edited content...
        setLoadingArticleEdit(true);
        console.log('he', editData);
        try {
          const { response } = await post({
            url: `${process.env.BASE_URL}/api/project/article/update-article`,
            headers: setHeaders({ token: user.accessToken }),
            data: {
              newContent: editData.article_content,
              word_count: editData.words,
              article_id: editData._id,
            },
            // show error
          });
          if (response) {
            const contentIndex = allContents.findIndex(
              (n) => n.id == editData.id
            );
            let a = allContents;
            a[contentIndex].article_content = editData.article_content;
            setAllContents(a);
            setEditData(payload);
            setShowEdit(false);
          }
          setLoadingArticleEdit(false);
        } catch (error) {
          console.log(error);
          setLoadingArticleEdit(false);
        }
        break;
      case 'close':
        setShowEdit(false);
        break;
      default:
        break;
    }
  };

  const countWords = (data) => {
    let wordsCount = 0;
    forEach(data.blocks, (value) => {
      let line = value.text;
      wordsCount = wordsCount + line.split(' ').length;
    });
    setEditData({
      ...editData,
      words: wordsCount,
    });
    console.log('count', editData);
  };

  const handleEditorContent = (content) => {
    setEditData({
      ...editData,
      article_content: content,
    });
    console.log('edit', editData);
  };

  useEffect(() => {
    if (!articlesDetailsGenerate) {
      router.push('/app/projects');
    }
    canTriggerComplete = true;
  }, []);

  if (!articlesDetailsGenerate) {
    return <></>;
  }

  return (
    <DashboardLayout metaTitle="Generate Articles">
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
              <Button onClick={startNewProject}>Start Another Project</Button>
              <Button
                variant="reset"
                onClick={viewAllProjects}
                className="dark:text-darkMode-subText text-ash"
              >
                View All Articles
              </Button>
            </div>
          </div>
        </div>
      </DialogLayout>
      <div
        className={`${showGenerate && !showEdit ? 'block' : 'hidden'} w-full`}
      >
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
                {allContents.map((content, index) => (
                  <Fragment key={content.id}>
                    <GenerateListItem
                      content={content}
                      triggerComplete={triggerComplete}
                      index={index}
                      showEdit={(article) => editArticle('e', article)}
                      showPreview={(article) => previewArticle('p', article)}
                    />
                  </Fragment>
                ))}
              </Table.Body>
            </Table>
          </div>
          <div className="dark:bg-darkMode-bg border-t-0 bg-white border dark:border-darkMode-border border-ash border-solid">
            <div className="flex justify-between pl-11 pr-10 py-4">
              <span className="font-poppins text-sm align-middle">
                1-1 of {allContents.length} projects
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
      </div>
      <div className={`${showEdit ? 'block' : 'hidden'} w-full`}>
        {showEdit && (
          <div className="w-full">
            <Box>
              <div className="py-[19px] px-[50px]">
                <div className="flex space-x-[50px]">
                  <div className="">
                    <PreviewArticleHeadLayout
                      title={'ID'}
                      subTitle={editData ? editData.id : ''}
                    />
                  </div>
                  <div className="flex-grow">
                    <PreviewArticleHeadLayout
                      title={'Title'}
                      subTitle={editData ? editData.title : ''}
                    />
                  </div>
                  <div className="flex items-center cursor-pointer">
                    <Button
                      variant="reset"
                      className="btn btn-reset"
                      onClick={() => editArticle('close')}
                    >
                      Reset
                    </Button>
                    <Button
                      state={loadingArticleEdit && 'loading'}
                      onClick={() => editArticle('he')}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Box>
            <Box type={'black'} className="border-t-0">
              <div className="pb-[25px] w-full">
                <ScrollbarsLayout h="650px">
                  <div className="pr-0">
                    <EditorContainer>
                      <ArticleEditor
                        content={editData ? editData.article_content : ''}
                        countWords={countWords}
                        handleContent={handleEditorContent}
                      />
                    </EditorContainer>
                  </div>
                </ScrollbarsLayout>
              </div>
            </Box>
          </div>
        )}
      </div>
      <div className={`${!showGenerate ? 'block' : 'hidden'} w-full`}>
        {!showGenerate && (
          <div className="w-full">
            <Box>
              <div className="py-[19px] px-[50px]">
                <div className="flex space-x-[50px]">
                  <div className="">
                    <PreviewArticleHeadLayout
                      title={'ID'}
                      subTitle={previewData.id || ''}
                    />
                  </div>
                  <div className="flex-grow">
                    <PreviewArticleHeadLayout
                      title={'Title'}
                      subTitle={previewData.title || ''}
                    />
                  </div>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => previewArticle('hp')}
                  >
                    <X className="text-red w-[25px] h-[25px]" />
                  </div>
                </div>
              </div>
            </Box>
            <Box type={'black'} className="border-t-0">
              <div className="py-[25px] w-full pl-[50px] pr-4">
                <ScrollbarsLayout h="650px">
                  <div className="pr-12">
                    <EditorContainer>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(JSON.parse(articleContent)),
                        }}
                      ></div>
                    </EditorContainer>
                  </div>
                </ScrollbarsLayout>
              </div>
            </Box>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const PreviewArticleHeadLayout = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col space-y-2">
      <span className="font-bold text-base leading-[27px]">{title}</span>
      <span className="font-medium text-base leading-[27px]">{subTitle}</span>
    </div>
  );
};

Index.auth = true;

// export async function getServerSideProps(context) {
//   const { query } = context;
//   try {
//     const session = await getSession(context);

//     if (session?.user) {
//       return {
//         props: {},
//       };
//     }
//   } catch (error) {
//     console.log(error);
//     return {
//       redirect: {
//         destination: '/signin',
//         permanent: false,
//       },
//     };
//   }
// }

export default Index;
