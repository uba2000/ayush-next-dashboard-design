import React from 'react'
import tw from "tailwind-styled-components"

const TableData = ({ children, className, main, ...rest }) => {
  return (
    <StyledTableData {...rest} className={`${className} ${main ? 'text-left' : 'w-fit'}`}>{children}</StyledTableData>
  )
}

const StyledTableData = tw.td`
  px-[7.5px]
  py-[6px]
  text-base
  leading-9
  align-middle
  capitalize
  h-[50px]
  font-medium
  first-of-type:pl-[21px]
  last-of-type:pr-[21px]
`;

export { TableData }