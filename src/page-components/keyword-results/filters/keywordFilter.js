import React from 'react';
import { ExcludeFilter } from './excludeFilter';
import { IncludeFilter } from './includeFilter';

const KeywordFilter = ({
  column,
  filterOptions = { items: [], setItems: () => {} },
}) => {
  return (
    <div className="space-x-2 inline-block">
      <IncludeFilter column={column} options={filterOptions} />
      <ExcludeFilter column={column} options={filterOptions} />
    </div>
  );
};

export { KeywordFilter };
