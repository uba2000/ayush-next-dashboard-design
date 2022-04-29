import React from 'react'
import tw from "tailwind-styled-components"

const TableRow = ({ children, ...rest }) => {
  return (
    <StyledTableRow {...rest}>{children}</StyledTableRow>
  )
}

const StyledTableRow = tw.tr`
  border-b 
  border-solid
  border-b-ash 
  dark:border-b-darkMode-border
`;

export { TableRow }