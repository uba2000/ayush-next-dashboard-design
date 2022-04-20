import React from "react";
import tw from "tailwind-styled-components";
import { TableBody, TableHead, TableRow, TableData, TableHeadData } from "./components";

function Table({ children }) {

  return (
    <StyledTable>{children}</StyledTable>
  );
}

const StyledTable = tw.table`
  border-collapse
  dark:border-darkMode-border 
  border-ash 
  border-solid 
  border 
  border-b-0
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