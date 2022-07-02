import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';

import Layout from '../Layout';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';

const ExcludeFilter = () => {
  return (
    <Layout label={'Exclude'}>
      <div className="divide-y-2 dark:divide-darkMode-border divide-ash">
        <div className="p-[10px] pb-[5px] space-y-[5px]">
          <div>
            <Input
              variant="dark-small"
              placeholder="Type A keywords"
              className="w-full h-[21px] text-xs px-2"
            />
          </div>
          <div className="" style={{ marginTop: '5px' }}>
            <p className="dark:text-darkMode-subText text-ash font-medium text-sm">
              Separate multiple words by commas.
            </p>
          </div>
        </div>
        <div>
          <Button className="w-full py-2">Apply</Button>
        </div>
      </div>
    </Layout>
  );
};

export { ExcludeFilter };
