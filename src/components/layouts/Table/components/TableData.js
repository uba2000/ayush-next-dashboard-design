import React from 'react'
import tw from "tailwind-styled-components"

const StyledTableData = tw.td`
  px-[7.5px]
  py-[6px]
  pr-5
  text-base
  leading-9
  align-middle
  capitalize
  h-[50px]
  font-medium
  first-of-type:pl-[21px]
  first-of-type:pr-[7.5px]
  last-of-type:pr-[21px]
`;

export const TableData = React.forwardRef(
  ({ children, main, className, ...rest }, ref) => (
    <StyledTableData ref={ref} {...rest} className={`${className} ${main ? 'text-left' : 'w-fit'}`}>{children}</StyledTableData>
  )
)

TableData.displayName = 'TableData';