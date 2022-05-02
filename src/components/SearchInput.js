import React, { useState, useEffect } from 'react'

import { SearchIcon } from '../ui/icons/search-icon'

function SearchInput({ searchBy = ['name'], searchThrough = [], setItemsAfterSearch }) {

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState(searchThrough)

  // Search query
  const [q, setQ] = useState('')

  const [searchParam] = useState(searchBy)

  const searchFor = (itemsSearchFor) => {
    return itemsSearchFor.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        )
      })
    })
  }

  const clickSearchHandler = () => {
    if (q == '') {
      setItemsAfterSearch(items)
    } else {
      setItemsAfterSearch(searchFor(items))
    }
  }

  return (
    <div className="min-w-[190px] flex items-center border border-solid border-darkMode-border dark:bg-darkMode-bg h-[43px] bg-white max-w-[293px]">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="flex-grow flex-shrink border-none pl-6 py-3 rounded-none dark:bg-darkMode-bg h-[40px] bg-white"
        placeholder='Search...'
      />
      <div
        onClick={clickSearchHandler}
        className="py-3 pr-4 px-[15.5px] dark:bg-darkMode-bg h-[40px] bg-white cursor-pointer"
      >
        <SearchIcon
          className="h-5 w-5 dark:text-white text-black"
        />
      </div>
    </div>
  )
}

export default SearchInput