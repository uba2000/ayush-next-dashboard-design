import React, { Fragment, useState, useMemo } from 'react';
import { Tab } from '@headlessui/react';
import { forEach } from 'lodash';

import Layout from '../Layout';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import useTableSearchFilter from '../../../hooks/useTableSearchFilter';

const IncludeFilter = ({ column = {}, options }) => {
  const { items, setItems } = options;
  const reserveItems = useMemo(() => items, []);

  const [anyWordValue, setAnyWordValue] = useState([]);
  const [allWordValue, setAllWordValue] = useState([]);

  const [tabIndex, setTabIndex] = useState(0);

  const updateTabIndex = (index) => {
    setTabIndex(index);
  };

  const effectApplyChange = (e) => {
    e.preventDefault();

    if (tabIndex == 1) {
      if (anyWordValue.length > 0) {
        let returnItems = reserveItems;
        forEach(anyWordValue, (value, index) => {
          returnItems = returnItems.filter((item) =>
            item.question.toLowerCase().includes(value.toLowerCase())
          );
        });
        setItems(returnItems);
      }
    } else if (tabIndex == 0) {
      if (allWordValue.length > 0) {
        let returnItems = reserveItems;
        forEach(allWordValue, (value, index) => {
          returnItems = returnItems.filter(
            (item) => item.question.toLowerCase() === value.toLowerCase()
          );
        });
        setItems(returnItems);
      }
    }
  };

  return (
    <Layout label={'Inlude'}>
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
            <Tab.Panels style={{ marginTop: '5px' }}>
              <Tab.Panel>
                <div>
                  <Input
                    value={allWordValue.join(',')}
                    onChange={(e) => {
                      if (e === '') {
                        setItems(reserveItems);
                        setAllWordValue([]);
                      } else setAllWordValue(e.split(','));
                    }}
                    variant="dark-small"
                    placeholder="Type A keywords"
                    className="w-full h-[21px] text-xs px-2"
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <Input
                    value={anyWordValue.join(',')}
                    onChange={(e) => {
                      if (e === '') {
                        setItems(reserveItems);
                        setAnyWordValue([]);
                      } else setAnyWordValue(e.split(','));
                    }}
                    variant="dark-small"
                    placeholder="Type A keywords"
                    className="w-full h-[21px] text-xs px-2"
                  />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          {tabIndex == 1 && (
            <div className="" style={{ marginTop: '5px' }}>
              <p className="dark:text-darkMode-subText text-ash font-medium text-sm">
                Separate multiple words by commas.
              </p>
            </div>
          )}
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
