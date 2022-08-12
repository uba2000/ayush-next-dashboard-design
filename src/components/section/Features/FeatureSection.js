import React, { Fragment } from 'react';

import FeatureBox from './FeatureBox';

const FeatureSection = ({ features }) => {
  return (
    <div className="min-h-[600px]">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-5">
        {features.map((feature) => {
          return (
            <Fragment key={feature._id}>
              <FeatureBox feature={feature} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureSection;
