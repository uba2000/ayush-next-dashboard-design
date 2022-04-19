import React from 'react'

function SearchInput() {
  return (
    <div className="flex border border-solid border-[#DCD8E7] bg-[#dcdfe580] max-w-[293px]">
      <input type="text" className="flex-grow flex-shrink input-search border-none rounded-none" placeholder='Search...' />
      <div className="border-l-[#DCD8E7] border-l border-solid py-3 px-[15.5px] bg-white cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}

export default SearchInput