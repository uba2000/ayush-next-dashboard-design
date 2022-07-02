import React, { useMemo, useState } from 'react';

const useTableRangeFilter = ({ column, valueType = 'int' }) => {
  const {
    filterValue = [],
    preFilteredRows = [],
    setFilter = () => {},
    id = '',
  } = column;

  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  const [minValue, setMinValue] = useState(filterValue[0] || '');
  const [maxValue, setMaxValue] = useState(filterValue[1] || '');

  const parseValue = (value) => {
    switch (valueType) {
      case 'int':
        return parseInt(value, 10);
        break;
      case 'float':
        return parseFloat(value);
        break;

      default:
        return parseInt(value, 10);
        break;
    }
  };

  const onChangeMin = (e) => {
    const val = e;
    setMinValue((old = []) => [val ? parseValue(val) : undefined, old[1]][0]);
    if (!val || val == '') setFilter([minValue, maxValue]);
  };

  const onChangeMax = (e) => {
    const val = e;
    setMaxValue((old = []) => [old[0], val ? parseValue(val) : undefined][1]);
    if (!val || val == '') setFilter([minValue, maxValue]);
  };

  const applyChange = (e) => {
    e.preventDefault();
    setFilter([minValue, maxValue]);
  };

  return {
    min,
    max,
    minValue,
    maxValue,
    onChangeMin,
    onChangeMax,
    applyChange,
  };
};

export default useTableRangeFilter;
