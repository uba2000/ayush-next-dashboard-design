import React from 'react'

import { SearchIcon } from '../ui/icons/search-icon'

function SearchInput() {
  return (
    <div className="flex items-center border border-solid border-darkMode-border dark:bg-darkMode-bg h-[43px] bg-white max-w-[293px]">
      <input type="text" className="flex-grow flex-shrink border-none pl-6 py-3 rounded-none dark:bg-darkMode-bg h-[40px] bg-white" placeholder='Search...' />
      <div className="py-3 pr-4 px-[15.5px] dark:bg-darkMode-bg h-[40px] bg-white cursor-pointer">
        <SearchIcon
          className="h-5 w-5 dark:text-white text-black"
        />
      </div>
    </div>
  )
}

export default SearchInput