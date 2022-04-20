import React from 'react'
import tw from "tailwind-styled-components"

const TableHead = ({ children, ...rest }) => {
  return (
    <StyledTableHead {...rest}>{children}</StyledTableHead>
  )
}

const StyledTableHead = tw.thead`
  dark:bg-darkMode-bg
`;

export { TableHead }