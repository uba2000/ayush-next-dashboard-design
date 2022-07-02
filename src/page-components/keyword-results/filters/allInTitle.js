import React from 'react';

import Layout from '../Layout';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';

const AllInTitleFilter = ({ column = {} }) => {
  const { filterValue, setFilter } = column;

  return (
    <Layout label={'All In Title'} origin={'right'}>
      <div className="divide-y-2 dark:divide-darkMode-border divide-ash">
        <div className="p-[10px] flex">
          <Input
            placeholder="Min"
            variant="dark-small"
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

export { AllInTitleFilter };
