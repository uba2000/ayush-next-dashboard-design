import React, { useState, useEffect } from 'react';
import { useAsyncDebounce } from 'react-table';

import { SearchIcon } from '../../../../ui/icons';
import { Input } from '../../../../ui/input';

function SearchTable({ filter, setFilter }) {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 300);

  return (
    <div className="min-w-[190px] flex items-center border border-solid border-darkMode-border dark:bg-darkMode-bg h-[43px] bg-white max-w-[293px]">
      <Input
        value={value || ''}
        onChange={(value) => {
          setValue(value);
          onChange(value);
        }}
        placeholder="Search..."
      />
      <div className="py-3 pr-4 px-[15.5px] dark:bg-darkMode-bg h-[40px] bg-white cursor-pointer">
        <SearchIcon className="h-5 w-5 dark:text-white text-black" />
      </div>
    </div>
  );
}

export default SearchTable;
