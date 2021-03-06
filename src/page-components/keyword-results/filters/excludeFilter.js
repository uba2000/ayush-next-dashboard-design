import React, { Fragment, useMemo, useState, useRef } from 'react';
import { Tab } from '@headlessui/react';

import Layout from '../Layout';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { forEach } from 'lodash';
import { splitToArray } from '../../../utils/formatTags';

const ExcludeFilter = ({ options }) => {
  const [anyWordValue, setAnyWordValue] = useState('');

  const { items, setItems } = options;
  const reserveItems = useMemo(() => items, []);

  const layout = useRef();

  const setInactive = () => {
    setItems(reserveItems);
    setAnyWordValue('');
  };

  const effectApplyChange = (e) => {
    e.preventDefault();

    const filterFrom = splitToArray(anyWordValue);
    if (filterFrom.length > 0) {
      layout.current.setToActive(`Exclude: Any of ${items.length}`);
      let returnItems = [];
      forEach(reserveItems, (value, index) => {
        let check = filterFrom.some((item) =>
          value.question.toLowerCase().includes(item.toLowerCase())
        );
        if (!check) returnItems.push(value);
      });
      setItems(returnItems);
      layout.current.closeBox();
    }
  };
  return (
    <Layout label={'Exclude'} ref={layout} setInactive={setInactive}>
      <form
        onSubmit={effectApplyChange}
        className="divide-y-2 dark:divide-darkMode-border divide-ash"
      >
        <div className="p-[10px] pb-[5px] space-y-[5px]">
          <div>
            <Input
              value={anyWordValue}
              onChange={(e) => {
                if (e === '') {
                  setItems(reserveItems);
                  layout.current.setToInactiveHandler();
                  setAnyWordValue('');
                } else setAnyWordValue(e);
              }}
              variant="dark-small"
              placeholder="Type A keywords"
              className="w-full h-[21px] text-xs px-2"
            />
          </div>
          <div className="" style={{ marginTop: '5px' }}>
            <p className="dark:text-darkMode-subText text-ash font-medium text-sm">
              Separate multiple words by commas.
            </p>
          </div>
        </div>
        <div>
          <Button type="submit" className="w-full py-2">
            Apply
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export { ExcludeFilter };
