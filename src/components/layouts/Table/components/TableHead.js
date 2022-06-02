import React from 'react'
import tw from "tailwind-styled-components"

const StyledTableHead = tw.thead`
  dark:bg-darkMode-bg
`;

export const TableHead = React.forwardRef(
  ({ children, ...rest }, ref) => (
    <StyledTableHead ref={ref} {...rest}>{children}</StyledTableHead>
  )
)

TableHead.displayName = 'TableHead';