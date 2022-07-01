// *DEPRCATED*
import React from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../../../../../components/app/DasboardLayout';
import Box from '../../../../../../../components/layouts/Box';
import { X } from '../../../../../../../ui/icons';
import ScrollbarsLayout from '../../../../../../../components/layouts/Scrollbars';
import { EditorContainer } from '../../../../../../../components/layouts/EditorContainer';

const PreviewArticle = () => {
  const router = useRouter();

  const { query } = router;
  return (
    <DashboardLayout>
      <div className="w-full">
        <Box>
          <div className="py-[19px] px-[50px]">
            <div className="flex space-x-[50px]">
              <div className="">
                <PreviewArticleHeadLayout
                  title={'ID'}
                  subTitle={query.generateItemId}
                />
              </div>
              <div className="flex-grow">
                <PreviewArticleHeadLayout
                  title={'Title'}
                  subTitle={
                    'What is the most important factor in an SEO campaign?'
                  }
                />
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => router.back()}
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
                    It is very common for people to want to make a quick buck
                    and get a lot of experience in the process. However,
                    scalping is usually not something you can make money on
                    simply because you are competing against professionals who
                    have years of experience. If you want to make money from
                    scalping, you have to be willing to put the time into it and
                    invest in the required equipment. Scalping is the practice
                    of buying and selling securities in the hope of profiting
                    from short-term price movements. The practice can be very
                    lucrative, but also risky due to the large amounts of
                    capital required. Buying a stock at a low price with the
                    intention of reselling it at a profit can result in a high
                    loss if the stock drops in value before you sell it.
                    Scalping is a market-based practice where traders buy and
                    sell assets at an agreed-upon price with the intent of
                    profiting from short-term price movements. The practice is
                    widely considered unethical because it exploits market
                    inefficiency and the emotional responses of participants.
                    There are a few ways to make money from scalping tickets.
                    One way is to buy cheap tickets in bulk and then sell them
                    for a profit at the last minute when it is too late for the
                    public to buy them. Tickets purchased this way are known as
                    "pre-purchased. ". Two other ways of making money from
                    scalping are by buying the tickets and reselling them at
                    face value and buying a "coupon" that entitles you to buy
                    tickets at a discounted price. Scalping is a type of trading
                    that involves buying and selling precious metals, stocks, or
                    other merchandise at a high price. It is popular because it
                    can make you money in the short term since investment sites
                    only charge fees based on how often an investor buys and
                    sells. If you want to make money scalping, you need to
                    follow these simple steps:.
                  </p>
                  <h1>Which strategy is best for scalping?</h1>
                  <p>
                    Scalping is a trading strategy that relies on the movement
                    of price in order to make profits. Traders will try to
                    predict and profit from price deviations before they happen
                    by waiting for an opportunity to buy low and sell high.
                    Scalping is one of the most popular trading strategies on
                    the Forex market because it is easy to execute and allows
                    traders to make thousands of trades per day. Trailing stop
                    is a great strategy for scalping because it's not as heavily
                    dependent on the market going your way. It also has the
                    potential to have a larger profit margin. Momentum seeks to
                    be constantly trading, which can be expensive and can leave
                    you very vulnerable when the trend changes. In contrast,
                    trailing stop is only activated once per session or when the
                    market opens. There are two strategies for scalpers: buying
                    and selling. The best strategy for scalping is to buy and
                    hold unless you are very confident about what you're doing.
                    Buying and selling takes a lot of time which will greatly
                    reduce your profits. There are two strategies for scalping:
                    exit strategy and hold strategy. The exit strategy involves
                    betting on a trade immediately after the market opens and
                    close position before the open of the next trading day. The
                    hold strategy involves holding onto a position through
                    multiple days in order to profit from a price drop or
                    increase in volatility. Scalping is a strategy of buying and
                    selling securities that are not currently traded on the
                    market. The scalper will buy the stock well in advance of
                    the trade date and sell it at or near its purchase price. In
                    this way, they hope to capture the difference in price
                    between when they bought the stock and when they sell it.
                    Scalping refers to the attempt to buy and sell shares of
                    stock for fewer than normal market price.
                  </p>
                  <h1>How much can you make scalping futures?</h1>
                  <p>
                    In order to answer this question, it's important to remember
                    that the scalping strategy is not a get-rich-quick scheme.
                    It's a long-term investment designed to give you consistent
                    profits over time. There are many ways to make money
                    investing in the futures market; however, only the
                    experienced traders will make any returns on their
                    investment. In the book, The Billion Dollar Scam, author
                    Michael Lewis discusses how some investors found trading in
                    the futures markets so lucrative that they made as much as
                    $1 million per day. If you're someone who has made it their
                    goal to make a full-time living off of trading futures, then
                    you may have been wondering how much cash could be made.
                    Here's your answer: 1,508% per year if you trade the front
                    month futures contract on gold making 5% profit, and 738%
                    per year for the April contract for a 10% profit. Scalping
                    futures is a difficult strategy to master, and it takes
                    time. But if you are willing to put in the effort, you could
                    make an incredible amount of money on an hourly basis. A
                    lot, actually!. In the time it takes to read this article,
                    you could have made $1. The truth is, scalping futures is
                    far more profitable than selling them. You can generate
                    profits as high as $1000 per day. It's common to see traders
                    make over a million dollars in a month, and you don't need
                    any experience to start scalping.
                  </p>
                </EditorContainer>
              </div>
            </ScrollbarsLayout>
          </div>
        </Box>
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
PreviewArticle.auth = true;

export default PreviewArticle;
