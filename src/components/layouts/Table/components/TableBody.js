import React from 'react'
import tw from "tailwind-styled-components"

const TableBody = ({ children, ...rest }) => {
  return (
    <StyledTableBody {...rest}>{children}</StyledTableBody>
  )
}

const StyledTableBody = tw.tbody`
  
`;

export { TableBody }