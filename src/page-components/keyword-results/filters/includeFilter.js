import React, { Fragment, useState, useMemo, useRef } from 'react';
import { Tab } from '@headlessui/react';
import { forEach } from 'lodash';

import Layout from '../Layout';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import useTableSearchFilter from '../../../hooks/useTableSearchFilter';
import { splitToArray } from '../../../utils/formatTags';

const IncludeFilter = ({ column = {}, options }) => {
  const { items, setItems } = options;
  const reserveItems = useMemo(() => items, []);

  const layout = useRef();

  const [inputValue, setInputValue] = useState('');

  const [tabIndex, setTabIndex] = useState(0);

  const updateTabIndex = (index) => {
    setTabIndex(index);
  };

  const setInactive = () => {
    setItems(reserveItems);
    setInputValue('');
  };

  const effectApplyChange = (e) => {
    e.preventDefault();

    if (tabIndex == 1) {
      const filterFrom = splitToArray(inputValue);
      if (filterFrom.length > 0) {
        layout.current.setToActive(`Include: Any of ${items.length}`);
        let returnItems = [];
        forEach(reserveItems, (value, index) => {
          let check = filterFrom.some((item) =>
            value.question.toLowerCase().includes(item.toLowerCase())
          );
          if (check) returnItems.push(value);
        });
        setItems(returnItems);
        layout.current.closeBox();
      }
    } else if (tabIndex == 0) {
      const filterFrom = splitToArray(inputValue);
      if (filterFrom.length > 0) {
        layout.current.setToActive(`Include: All of ${items.length}`);
        let returnItems = reserveItems;
        forEach(filterFrom, (value, index) => {
          returnItems = returnItems.filter(
            (item) => item.question.toLowerCase() === value.toLowerCase()
          );
        });
        setItems(returnItems);
        layout.current.closeBox();
      }
    }
  };

  return (
    <Layout ref={layout} label={'Inlude'} setInactive={setInactive}>
      <form
        onSubmit={effectApplyChange}
        className="divide-y-2 dark:divide-darkMode-border divide-ash"
      >
        <div className="p-[10px] pb-[5px] space-y-[5px]">
          <Tab.Group
            selectedIndex={tabIndex}
            onChange={(index) => updateTabIndex(index)}
          >
            <Tab.List className="grid grid-cols-2">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <div
                    className={`
                      cursor-pointer py-[6px] text-center
                      ${
                        selected
                          ? 'dark:bg-primary bg-primary border-primary text-white'
                          : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border'
                      }
                    `}
                  >
                    <span className="text-xs">All Words</span>
                  </div>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <div
                    className={`
                      cursor-pointer py-[6px] text-center
                      ${
                        selected
                          ? 'dark:bg-primary bg-primary border-primary text-white'
                          : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border'
                      }
                    `}
                  >
                    <span className="text-xs">Any Word</span>
                  </div>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels style={{ marginTop: '5px' }}></Tab.Panels>
          </Tab.Group>
          <div>
            <Input
              value={inputValue}
              onChange={(e) => {
                if (e === '') {
                  setItems(reserveItems);
                  setInputValue('');
                  layout.current.setToInactiveHandler();
                } else setInputValue(e);
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

export { IncludeFilter };
