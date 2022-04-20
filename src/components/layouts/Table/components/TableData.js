import React from 'react'
import tw from "tailwind-styled-components"

const TableData = ({ children, ...rest }) => {
  return (
    <StyledTableData {...rest}>{children}</StyledTableData>
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
`;

export { TableData }