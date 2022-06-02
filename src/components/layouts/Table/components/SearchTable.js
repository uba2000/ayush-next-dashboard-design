import React, { useState, useEffect } from 'react'
import { useAsyncDebounce } from 'react-table'

import { SearchIcon } from '../../../../ui/icons'

function SearchTable({ filter, setFilter }) {

  const [value, setValue] = useState(filter)

  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 300)

  return (
    <div className="min-w-[190px] flex items-center border border-solid border-darkMode-border dark:bg-darkMode-bg h-[43px] bg-white max-w-[293px]">
      <input
        type="text"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        className="flex-grow placeholder:text-darkMode-subText flex-shrink border-none pl-6 py-3 rounded-none dark:bg-darkMode-bg h-[40px] bg-white"
        placeholder='Search...'
      />
      <div
        className="py-3 pr-4 px-[15.5px] dark:bg-darkMode-bg h-[40px] bg-white cursor-pointer"
      >
        <SearchIcon
          className="h-5 w-5 dark:text-white text-black"
        />
      </div>
    </div>
  )
}

export default SearchTable