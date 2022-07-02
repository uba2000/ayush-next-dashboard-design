import React, { useState } from 'react';

const useTableSearchFilter = ({ column, searchType = 'include' }) => {
  const {
    filterValue = '',
    preFilteredRows = [],
    setFilter = () => {},
  } = column;

  const count = preFilteredRows.length;

  const [value, setValue] = useState(filterValue);

  const onChange = (e) => {
    if (!e || e == '') setFilter(value);
    setValue(e);
  };

  const applyChange = (e) => {
    e && e.preventDefault();
    setFilter(value);
  };

  return { value, count, onChange, applyChange };
};

export default useTableSearchFilter;
