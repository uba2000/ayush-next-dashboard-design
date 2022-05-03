import React, { useState } from 'react'

const FilterBox = ({ filter, select, index }) => {

  const [selected, setSelected] = useState(filter.selected)

  const updateSelectedState = () => {
    setSelected = true
    filter.selected = true
    select(filter.slug, index)
  }

  return (
    <div
      onClick={() => updateSelectedState()}
      className={`${filter.selected ? 'bg-primary text-white' : 'border border-solid border-[#414141] dark:bg-[#000000] bg-white dark:text-white text-black'} cursor-pointer py-[10px] px-5 font-semibold capitalize text-center text-sm leading-5`}
    >
      <span className='whitespace-nowrap'>
        {filter.name}
      </span>
    </div>
  )
}

export default FilterBox