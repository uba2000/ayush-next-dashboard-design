import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';

import Box from '../../components/layouts/Box';
import ExplorerForms from './ExplorerForms';
import { useExplorerContext } from '../../context/explorer';
import { GenerateBoxLayout } from './GenerateBoxLayout';
import useUser from '../../hooks/useUser';
import { AddToMenu } from '../keyword-results/menus/addToMenu';

const ExplorerLayout = () => {
  const { user } = useUser();

  const { query } = useRouter();
  const explorerState = useExplorerContext();

  const [featureDetails, setFeatureDetails] = useState(
    explorerState.getFeatureBySlug(query.slug)
  );

  const [isGenerated, setIsGenerated] = useState(false);

  const generateByFeature = ({ slug, data }) => {
    console.log(`${slug}:`, data);
    setIsGenerated(!isGenerated);
  };

  const addToFavourite = ({ index, content, type }) => {
    switch (type) {
      case 'add':
        break;
      case 'remove':
        break;

      default:
        console.log(type);
        break;
    }
    console.log({
      content,
      type,
      slug: query.slug,
      user: { email: user.email },
    });
  };

  useEffect(() => {}, []);

  const generatedContent = [
    `Content marketing is about creating valuable content
    for your audience to consume. Sometimes, it can be
    difficult knowing how to start or what types of
    content to publish. To help make content marketing
    easier, use these steps: - Determine your target
    market - Create a plan - Post regularly and
    consistently - Stay consistent with the brand's voice`,
    `Blogging is tremendously time-consuming and difficult.
    Agitate: Link Building Blogs gives you a community of
    bloggers helping you make money blogging, while the community
    shares their expertise with one another.Solution:
    Get better at blogging with Link Building Blogs!`,
    `Critic Makers`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Aliquet egestas id sed pellentesque consequat lectus dignissim
    ut hac. Lectus at sit urna, aenean in vitae non bibendum.
    Metus malesuada amet cursus eget lacus.`,
  ];

  return (
    <div className="grid grid-cols-[436px_auto] gap-[33px] w-full">
      <Box>
        <div className="text-left divide-y-[1px] dark:divide-darkMode-border divide-ash">
          <div className="py-[14px] px-5">
            <span className="font-semibold capitalize">{`${
              featureDetails ? featureDetails.name : 'SERP Explorer'
            }`}</span>
          </div>
          <div className="p-5 space-y-6">
            <ExplorerForms slug={query.slug} generate={generateByFeature} />
          </div>
        </div>
      </Box>
      <div className="flex flex-col">
        <div className="h-full">
          <div className="h-full flex flex-col text-left">
            <Box className="py-[14px] px-[35px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Feature Results</span>
                <AddToMenu />
              </div>
            </Box>
            {!isGenerated ? (
              <>
                <Box
                  className="flex-grow min-h-[792px] flex justify-center items-center border-t-0"
                  type="black"
                >
                  <div className="container">
                    <div className="">
                      <h2 className="font-bold text-[30px] leading-[61px] text-center tracking-tight capitalize">
                        {`${
                          featureDetails ? featureDetails.name : 'SERP Explorer'
                        }`}
                      </h2>
                      <p className="text-center max-w-[612px] mx-auto">
                        <span className="font-medium">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Convallis dictum scelerisque duis nisl lorem.
                          Nullam tortor pretium placerat est id adipiscing.
                        </span>
                      </p>
                    </div>
                  </div>
                </Box>
              </>
            ) : (
              <>
                <div className=" mt-[10px] space-y-[10px] flex-grow min-h-[792px]">
                  {generatedContent.map((content, index) => (
                    <Fragment key={index}>
                      <GenerateBoxLayout
                        addToFavourite={addToFavourite}
                        content={content}
                        index={index + 1}
                      />
                    </Fragment>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LabelLayout = ({ children }) => {
  return (
    <span className="font-semibold text-[15px] leading-[22px]">{children}</span>
  );
};

export const ExplorerTwoInputLayout = ({ children }) => {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
};

export default ExplorerLayout;
