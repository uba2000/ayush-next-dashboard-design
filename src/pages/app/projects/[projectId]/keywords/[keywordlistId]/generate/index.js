import React, { Fragment, useEffect, useState } from 'react';
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
import { post, setHeaders } from '../../../../../../../utils/http';
import useUser from '../../../../../../../hooks/useUser';
import Box from '../../../../../../../components/layouts/Box';
import ScrollbarsLayout from '../../../../../../../components/layouts/Scrollbars';
import EditorContainer from '../../../../../../../components/layouts/EditorContainer';

const Index = () => {
  const router = useRouter();
  const { query } = router;
  const { user } = useUser();

  const dispatch = useDispatch();

  const [showGenerate, setShowGenerate] = useState(true);

  const [completeCount, setCompleteCount] = useState(0);

  const articlesDetailsGenerate = useSelector(
    (state) => state.project.articlesDetailsGenerate
  );

  const [allContents] = useState(
    generateArticlesContent(articlesDetailsGenerate)
  );
  const [isCompleteDialog, setIsCompleteDialog] = useState(false);

  const processArticlesContent = () => {
    return allContents;
  };

  const triggerComplete = async (status, article = null) => {
    if (status == 'c') {
      setCompleteCount(++completeCount);
      console.log(article);
      await post({
        url: `${process.env.BASE_URL}/api/project/article`,
        headers: setHeaders({ token: user.accessToken }),
        data: {
          title: article.title,
          tags: article.tags || [],
          article_content: '',
          project_id: query.projectId,
          keywordlist_id: query.keywordlistId,
        },
      });
    }
    if (completeCount == allContents.length) {
      setIsCompleteDialog(true);
    }
  };

  const closeGenerationCompleteDialog = () => {
    setIsCompleteDialog(false);
  };

  const viewAllProjects = () => {
    router.push(`/app/projects/${query.projectsId}`);
  };

  const startNewProject = () => {
    dispatch(setShowNewProject(true));
    router.push(`/app/projects`);
  };

  const [previewData, setPreviewData] = useState(null);

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

  useEffect(() => {
    if (!articlesDetailsGenerate) {
      router.push('/app/projects');
    }
  }, []);

  if (!articlesDetailsGenerate) {
    return <></>;
  }

  return (
    <DashboardLayout>
      <div className={`${showGenerate ? 'block' : 'hidden'} w-full`}>
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
                      <h1>How do you make money from scalping?</h1>
                      <p>
                        It is very common for people to want to make a quick
                        buck and get a lot of experience in the process.
                        However, scalping is usually not something you can make
                        money on simply because you are competing against
                        professionals who have years of experience. If you want
                        to make money from scalping, you have to be willing to
                        put the time into it and invest in the required
                        equipment. Scalping is the practice of buying and
                        selling securities in the hope of profiting from
                        short-term price movements. The practice can be very
                        lucrative, but also risky due to the large amounts of
                        capital required. Buying a stock at a low price with the
                        intention of reselling it at a profit can result in a
                        high loss if the stock drops in value before you sell
                        it. Scalping is a market-based practice where traders
                        buy and sell assets at an agreed-upon price with the
                        intent of profiting from short-term price movements. The
                        practice is widely considered unethical because it
                        exploits market inefficiency and the emotional responses
                        of participants. There are a few ways to make money from
                        scalping tickets. One way is to buy cheap tickets in
                        bulk and then sell them for a profit at the last minute
                        when it is too late for the public to buy them. Tickets
                        purchased this way are known as "pre-purchased. ". Two
                        other ways of making money from scalping are by buying
                        the tickets and reselling them at face value and buying
                        a "coupon" that entitles you to buy tickets at a
                        discounted price. Scalping is a type of trading that
                        involves buying and selling precious metals, stocks, or
                        other merchandise at a high price. It is popular because
                        it can make you money in the short term since investment
                        sites only charge fees based on how often an investor
                        buys and sells. If you want to make money scalping, you
                        need to follow these simple steps:.
                      </p>
                      <h1>Which strategy is best for scalping?</h1>
                      <p>
                        Scalping is a trading strategy that relies on the
                        movement of price in order to make profits. Traders will
                        try to predict and profit from price deviations before
                        they happen by waiting for an opportunity to buy low and
                        sell high. Scalping is one of the most popular trading
                        strategies on the Forex market because it is easy to
                        execute and allows traders to make thousands of trades
                        per day. Trailing stop is a great strategy for scalping
                        because it's not as heavily dependent on the market
                        going your way. It also has the potential to have a
                        larger profit margin. Momentum seeks to be constantly
                        trading, which can be expensive and can leave you very
                        vulnerable when the trend changes. In contrast, trailing
                        stop is only activated once per session or when the
                        market opens. There are two strategies for scalpers:
                        buying and selling. The best strategy for scalping is to
                        buy and hold unless you are very confident about what
                        you're doing. Buying and selling takes a lot of time
                        which will greatly reduce your profits. There are two
                        strategies for scalping: exit strategy and hold
                        strategy. The exit strategy involves betting on a trade
                        immediately after the market opens and close position
                        before the open of the next trading day. The hold
                        strategy involves holding onto a position through
                        multiple days in order to profit from a price drop or
                        increase in volatility. Scalping is a strategy of buying
                        and selling securities that are not currently traded on
                        the market. The scalper will buy the stock well in
                        advance of the trade date and sell it at or near its
                        purchase price. In this way, they hope to capture the
                        difference in price between when they bought the stock
                        and when they sell it. Scalping refers to the attempt to
                        buy and sell shares of stock for fewer than normal
                        market price.
                      </p>
                      <h1>How much can you make scalping futures?</h1>
                      <p>
                        In order to answer this question, it's important to
                        remember that the scalping strategy is not a
                        get-rich-quick scheme. It's a long-term investment
                        designed to give you consistent profits over time. There
                        are many ways to make money investing in the futures
                        market; however, only the experienced traders will make
                        any returns on their investment. In the book, The
                        Billion Dollar Scam, author Michael Lewis discusses how
                        some investors found trading in the futures markets so
                        lucrative that they made as much as $1 million per day.
                        If you're someone who has made it their goal to make a
                        full-time living off of trading futures, then you may
                        have been wondering how much cash could be made. Here's
                        your answer: 1,508% per year if you trade the front
                        month futures contract on gold making 5% profit, and
                        738% per year for the April contract for a 10% profit.
                        Scalping futures is a difficult strategy to master, and
                        it takes time. But if you are willing to put in the
                        effort, you could make an incredible amount of money on
                        an hourly basis. A lot, actually!. In the time it takes
                        to read this article, you could have made $1. The truth
                        is, scalping futures is far more profitable than selling
                        them. You can generate profits as high as $1000 per day.
                        It's common to see traders make over a million dollars
                        in a month, and you don't need any experience to start
                        scalping.
                      </p>
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
