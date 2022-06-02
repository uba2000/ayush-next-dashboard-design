import React from 'react'
import tw from "tailwind-styled-components"

const StyledTableBody = tw.tbody`
  
`;

export const TableBody = React.forwardRef(
  ({ children, ...rest }, ref) => (
    <StyledTableBody ref={ref} {...rest}>{children}</StyledTableBody>
  )
)

TableBody.displayName = 'TableBody';