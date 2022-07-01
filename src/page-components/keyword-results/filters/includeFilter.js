import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';

import Layout from '../Layout';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import useTableSearchFilter from '../../../hooks/useTableSearchFilter';

const IncludeFilter = ({ column = {} }) => {
  const { value, onChange, applyChange } = useTableSearchFilter({
    column,
  });

  return (
    <Layout label={'Inlude'}>
      <form
        onSubmit={applyChange}
        className="divide-y-2 dark:divide-darkMode-border divide-ash"
        style={{ width: '177px' }}
      >
        <div className="p-[10px] pb-[5px] space-y-[5px]">
          <Tab.Group>
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
                    value={value}
                    onChange={(e) => {
                      onChange(e || undefined);
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
                    variant="dark-small"
                    placeholder="Type A keywords"
                    className="w-full h-[21px] text-xs px-2"
                  />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <div className="" style={{ marginTop: '5px' }}>
            <p className="dark:text-darkMode-subText text-ash font-medium text-xs">
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
