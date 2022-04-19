import React from 'react'

const FilterBox = ({ filter }) => {
  return (
    <div
      className={`${filter.selected ? 'bg-primary text-white' : 'border border-solid border-[#414141] dark:bg-[#111111] bg-white dark:text-white text-black'} cursor-pointer py-[10px] px-5 font-semibold capitalize text-center text-sm leading-5`}
    >
      <span>
        {filter.name}
      </span>
    </div>
  )
}

export default FilterBox