import React from 'react';

import Layout from '../Layout';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import useTableRangeFilter from '../../../hooks/useTableRangeFilter';

const TrafficFilter = ({ column = {} }) => {
  const {
    min,
    max,
    minValue,
    maxValue,
    onChangeMin,
    onChangeMax,
    applyChange,
  } = useTableRangeFilter({ column });

  return (
    <Layout label={'Traffic'}>
      <form
        onSubmit={applyChange}
        className="divide-y-2 dark:divide-darkMode-border divide-ash"
      >
        <div className="p-[10px] flex">
          <Input
            variant="dark-small"
            type="number"
            name="min"
            value={minValue || ''}
            onChange={(e) => onChangeMin(e)}
            placeholder={`Min`}
            className="w-[78px] h-[21px] text-xs px-2"
          />
          <Input
            variant="dark-small"
            type="number"
            name="max"
            value={maxValue || ''}
            onChange={(e) => onChangeMax(e)}
            placeholder={`Max`}
            className="w-[78px] h-[21px] text-xs px-2"
          />
        </div>
        <div>
          <Button type="submit" className="w-full py-2">
            Apply
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export { TrafficFilter };
