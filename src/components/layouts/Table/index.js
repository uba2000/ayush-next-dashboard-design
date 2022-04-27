import React from "react";
import tw from "tailwind-styled-components";
import { TableBody, TableHead, TableRow, TableData, TableHeadData } from "./components";

function Table({ children, ...rest }) {

  return (
    <StyledTable {...rest}>{children}</StyledTable>
  );
}

const StyledTable = tw.table`
  border-collapse
  dark:border-darkMode-border 
  border-ash 
  border-solid 
  border-t border-l border-r
  w-full
  leading-[120%]
  text-left
  tracking-[0.005em]
`;

Table.Body = TableBody;
Table.Head = TableHead;
Table.Row = TableRow;
Table.Data = TableData;
Table.TH = TableHeadData;

export { Table };