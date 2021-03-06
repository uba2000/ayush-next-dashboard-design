import React from 'react';
import { useRouter } from 'next/router';

import { useExplorerContext } from '../../../context/explorer';
import { Button } from '../../../ui/button';
// import { setHeaders, post } from '../../../utils/http';
// import useUser from '../../../hooks/useUser';

const FormLayout = ({
  isDefault = false,
  children,
  subText,
  data,
  generate,
}) => {
  const { query } = useRouter();
  // const { user } = useUser();

  // const explorerState = useExplorerContext();

  const generateContent = async () => {
    // const featureData = explorerState.getFeatureBySlug(query.slug);
    // const { response, error } = await post({
    //   url: `${process.env.BASE_URL}/api/feature/load-features`,
    //   headers: setHeaders({ token: user.accessToken }),
    //   data: {
    //     ...featureData,
    //     description: subText,
    //   },
    // });
    // if (response) {
    generate({ slug: query.slug, data, subText });
    // }
  };

  return (
    <>
      <div>
        <span className="text-lg dark:text-darkMode-subText text-ash">
          {subText}
        </span>
      </div>
      <div>
        {children}
        {!isDefault && (
          <Button onClick={generateContent} className="w-full">
            Generate
          </Button>
        )}
      </div>
    </>
  );
};

export default FormLayout;
