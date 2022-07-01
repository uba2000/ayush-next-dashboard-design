import React from 'react';
import { ExcludeFilter } from './excludeFilter';
import { IncludeFilter } from './includeFilter';

const KeywordFilter = ({ column }) => {
  return (
    <div className="space-x-2 inline-block">
      <IncludeFilter column={column} />
      <ExcludeFilter column={column} />
    </div>
  );
};

export { KeywordFilter };
