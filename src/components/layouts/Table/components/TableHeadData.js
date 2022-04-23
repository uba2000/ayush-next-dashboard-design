import React from 'react'
import tw from "tailwind-styled-components"

const TableHeadData = ({ children, main, className, ...rest }) => {
  return (
    <StyledTableData {...rest} className={`${className} ${main ? 'w-4/6 text-left' : 'w-fit'}`}>{children}</StyledTableData>
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
  first-of-type:pl-[21px]
  last-of-type:pr-[21px]
`;

export { TableHeadData }