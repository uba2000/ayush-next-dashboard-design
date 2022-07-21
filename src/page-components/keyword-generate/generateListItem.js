import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import draftToHtml from 'draftjs-to-html';

import { Tick, Processing, Waiting, ChevDown, Mini, X } from '../../ui/icons';
import { Table } from '../../components/layouts/Table';
import { EditorContainer } from '../../components/layouts/EditorContainer';
import articleContent from '../../_mock/article-content';
import { Button } from '../../ui/button';
import { useAppContext } from '../../context/state';

let xArticleContent = '';
let amDone = false;

const GenerateListItem = ({
  content,
  triggerComplete,
  index,
  showPreview,
  showEdit,
}) => {
  const router = useRouter();
  const { query } = router;

  const layoutState = useAppContext();

  const [openSmallPreview, setOpenSmallPreview] = useState(false);
  const [processStatus, setProcessStatus] = useState(content.status);
  const [articleId, setArticleId] = useState(null);
  const [thisArticleContent, setThisArticleContent] = useState(
    content.article_content
  );
  xArticleContent = thisArticleContent;

  const showSmallPreview = () => {
    setOpenSmallPreview(!openSmallPreview);
  };

  useEffect(async () => {
    if (!amDone) {
      if (processStatus == 'c') {
        const isComplete = await triggerComplete('c', {
          ...content,
          article_content: articleContent,
        });
        if (isComplete) {
          setThisArticleContent(articleContent);
          setArticleId(isComplete._id);
          amDone = true;
        } else {
          setProcessStatus('f');
        }
      } else if (processStatus == 'w') {
        setTimeout(async () => {
          const canContinue = await triggerComplete('c', null);
          if (canContinue) {
            setProcessStatus('p');
            setTimeout(async () => {
              const isComplete = await triggerComplete('c', {
                ...content,
                article_content: articleContent,
              });
              if (isComplete) {
                setThisArticleContent(articleContent);
                setProcessStatus('c');
                setArticleId(isComplete._id);
                amDone = true;
              } else {
                setProcessStatus('f');
              }
            }, 2000 + index * 1000);
          } else {
            setProcessStatus('f');
          }
        }, 3000 + index * 1000);
      } else if (processStatus == 'p') {
        setTimeout(async () => {
          const isComplete = await triggerComplete('c', {
            ...content,
            article_content: articleContent,
          });
          if (isComplete) {
            setThisArticleContent(articleContent);
            setProcessStatus('c');
            setArticleId(isComplete._id);
            amDone = true;
          } else {
            setProcessStatus('f');
          }
        }, 2000 + index * 1000);
      }
    }
    return () => {
      amDone = false;
    };
  }, []);

  return (
    <>
      <Table.Row className="cursor-default">
        <Table.Data>
          <span>{content.id}</span>
        </Table.Data>
        <Table.Data>
          <span>{content.title}</span>
        </Table.Data>
        <Table.Data>
          <span>{content.words}</span>
        </Table.Data>
        <Table.Data>
          <div>
            <TableStatus processStatus={processStatus} />
          </div>
        </Table.Data>
        <Table.Data>
          <div className={'flex items-center'}>
            <button
              disabled={processStatus !== 'c'}
              className="cursor-pointer"
              onClick={showSmallPreview}
            >
              {!openSmallPreview ? (
                <ChevDown className="w-5 h-5 dark:text-darkMode-border text-ash duration-200 ease-out hover:translate-y-[2px]" />
              ) : (
                <Mini className="w-5 h-5 dark:text-darkMode-border text-ash" />
              )}
            </button>
          </div>
        </Table.Data>
      </Table.Row>
      {openSmallPreview && (
        <Table.Row className="table-row cursor-default relative overflow-hidden pt-[25px] pb-[30px] h-[315px] w-full border-b dark:border-b-darkMode-border border-b-ash border-b-solid">
          <div className="table-cell pt-[25px]"></div>
          <div className="table-cell line-clamp-10 pt-[25px] pr-3">
            <EditorContainer>
              <div
                dangerouslySetInnerHTML={{
                  __html: draftToHtml(JSON.parse(thisArticleContent)),
                }}
              ></div>
            </EditorContainer>
          </div>
          <div className="table-cell relative z-10 pt-[25px]">
            <Button onClick={() => showPreview(content)}>Preview</Button>
          </div>
          <div className="table-cell relative z-10 pt-[25px]">
            <Button
              onClick={() =>
                showEdit({
                  ...content,
                  article_content: thisArticleContent,
                  _id: articleId,
                })
              }
              variant="reset"
            >
              Edit Article
            </Button>
          </div>
          <div
            className="absolute table-cell bg-gradient-to-t dark:from-[#000000f2] from-[#fffffff2] to-transparent"
            style={backDropStyles}
          ></div>
        </Table.Row>
      )}
    </>
  );
};

const backDropStyles = {
  // background:
  //   'linear-gradient(0deg, rgba(0, 0, 0, 0.95) 20.05%, rgba(0, 0, 0, 0) 75.6%)',
  width: '100%',
  height: '100%',
  left: '2px',
  top: '0px',
};

const TableStatus = ({ processStatus }) => {
  const dim = {
    className: 'w-4 h-4',
  };

  const statusText = () => {
    switch (processStatus) {
      case 'c':
        return 'Completed';
      case 'p':
        return 'Processing';
      case 'w':
        return 'Waiting';
      case 'f':
        return 'Failed';

      default:
        return '';
    }
  };

  return (
    <>
      <div className="flex space-x-2 items-center">
        {processStatus == 'c' ? (
          <span>
            <Tick {...dim} />
          </span>
        ) : processStatus == 'p' ? (
          <span>
            <Processing {...dim} />
          </span>
        ) : processStatus == 'w' ? (
          <span>
            <svg
              {...dim}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="16"
                height="16"
                rx="8"
                className="dark:fill-black fill-white"
              />
              <path
                d="M8 15.0029C4.13401 15.0029 1 11.8689 1 8.00293C1 4.13694 4.13401 1.00293 8 1.00293C11.866 1.00293 15 4.13694 15 8.00293C15 11.8689 11.866 15.0029 8 15.0029Z"
                className="dark:stroke-white stroke-black"
                strokeWidth="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 11L7.60933 9.3102C7.8594 9.04771 7.99992 8.69167 8 8.3204V4"
                className="dark:stroke-white stroke-black"
                strokeWidth="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        ) : (
          processStatus == 'f' && (
            <span>
              <X className={`${dim.className} text-red`} />
            </span>
          )
        )}
        <span className="capitalize">{statusText()}</span>
      </div>
    </>
  );
};

export default GenerateListItem;
