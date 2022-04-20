import React from 'react'
import tw from "tailwind-styled-components"

const TableHeadData = ({ children, main, className, ...rest }) => {
  return (
    <StyledTableData {...rest} className={`${className} ${main ? 'w-5/6' : ''}`}>{children}</StyledTableData>
  )
}

const StyledTableData = tw.th`
  px-[7.5px]
  py-[6px]
  text-base
  leading-9
  align-middle
  capitalize
  font-semibold
`;

export { TableHeadData }