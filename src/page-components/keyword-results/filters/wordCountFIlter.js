import React from 'react';

import Layout from '../Layout';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';

const WordCountFilter = () => {
  return (
    <Layout label={'Word Count'}>
      <div
        className="divide-y-2 dark:divide-darkMode-border divide-ash"
        style={{ width: '177px' }}
      >
        <div className="p-[10px] flex">
          <Input
            variant="dark-small"
            placeholder="Min"
            className="w-[78px] h-[21px] text-xs px-2"
          />
          <Input
            variant="dark-small"
            placeholder="Max"
            className="w-[78px] h-[21px] text-xs px-2"
          />
        </div>
        <div>
          <Button className="w-full py-2">Apply</Button>
        </div>
      </div>
    </Layout>
  );
};

export { WordCountFilter };
