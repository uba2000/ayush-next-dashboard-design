import React from 'react'
import tw from "tailwind-styled-components"

const StyledTableRow = tw.tr`
  border-b 
  border-solid
  border-b-ash 
  dark:border-b-darkMode-border
`;

export const TableRow = React.forwardRef(
  ({ children, ...rest }, ref) => (
    <StyledTableRow {...rest} ref={ref}>{children}</StyledTableRow>
  )
)

TableRow.displayName = 'TableRow';
