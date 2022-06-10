import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Tick, Processing, Waiting, ChevDown, Mini } from '../../ui/icons';
import { Table } from '../../components/layouts/Table';
import EditorContainer from '../../components/layouts/EditorContainer';
import articleContent from '../../_mock/article-content';

const GenerateListItem = ({ content, triggerComplete, index, showPreview }) => {
  const router = useRouter();
  const { query } = router;

  const [openSmallPreview, setOpenSmallPreview] = useState(false);
  const [processStatus, setProcessStatus] = useState(content.status);

  const showSmallPreview = () => {
    setOpenSmallPreview(!openSmallPreview);
  };

  // const showPreview = () => {
  //   router.push(
  //     `/app/projects/${query.projectId}/keywords/${query.keywordlistId}/generate/${content.id}`
  //   );
  // };

  useEffect(() => {
    if (processStatus == 'c') {
      triggerComplete('c', {
        ...content,
        article_content: articleContent,
      });
    } else if (processStatus == 'w') {
      setTimeout(() => {
        setProcessStatus('p');
        setTimeout(() => {
          setProcessStatus('c');
          triggerComplete('c', { ...content, article_content: articleContent });
        }, 2000 + index * 1000);
      }, 3000 + index * 1000);
    } else if (processStatus == 'p') {
      setTimeout(() => {
        setProcessStatus('c');
        triggerComplete('c', { ...content, article_content: articleContent });
      }, 2000 + index * 1000);
    }
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
              <h1>How do you make money from scalping?</h1>
              <p>
                It is very common for people to want to make a quick buck and
                get a lot of experience in the process. However, scalping is
                usually not something you can make money on simply because you
                are competing against professionals who have years of
                experience. If you want to make money from scalping, you have to
                be willing to put the time into it and invest in the required
                equipment. Scalping is the practice of buying and selling
                securities in the hope of profiting from short-term price
                movements. The practice can be very lucrative, but also risky
                due to the large amounts of capital required. Buying a stock at
                a low price with the intention of reselling it at a profit can
                result in a high loss if the stock drops in value before you
                sell it. Scalping is a market-based practice where traders buy
                and sell assets at an agreed-upon price with the intent of
                profiting from short-term price movements. The practice is
                widely considered unethical because it exploits market
                inefficiency and the emotional responses of participants. There
                are a few ways to make money from scalping tickets. One way is
                to buy cheap tickets in bulk and then sell them for a profit at
                the last minute when it is too late for the public to buy them.
                Tickets purchased this way are known as "pre-purchased. ". Two
                other ways of making money from scalping are by buying the
                tickets and reselling them at face value and buying a "coupon"
                that entitles you to buy tickets at a discounted price. Scalping
                is a type of trading that involves buying and selling precious
                metals, stocks, or other merchandise at a high price. It is
                popular because it can make you money in the short term since
                investment sites only charge fees based on how often an investor
                buys and sells. If you want to make money scalping, you need to
                follow these simple steps:.
              </p>
            </EditorContainer>
          </div>
          <div className="table-cell relative z-10 pt-[25px]">
            <button
              className="btn btn-primary"
              onClick={() => showPreview(content)}
            >
              Preview
            </button>
          </div>
          <div className="table-cell relative z-10 pt-[25px]">
            <button className="btn btn-reset dark:text-white text-black">
              Edit Article
            </button>
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
        ) : (
          processStatus == 'w' && (
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
          )
        )}
        <span className="capitalize">{statusText()}</span>
      </div>
    </>
  );
};

export default GenerateListItem;
