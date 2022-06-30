import Link from 'next/link';
import React, { useState, Fragment, useEffect } from 'react';
import { Menu, Tab, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

import { useProjectsContext } from '../../../../context/projects';
import ArticleLayout from '../../../../page-components/project-categories/ArticleLayout';
import DashboardLayout from '../../../../components/app/DasboardLayout';
import NewKeywordListButton from '../../../../page-components/keyword-generate/NewKeywordListButton';
import { ChevDown, SearchIcon, Settings } from '../../../../ui/icons';
import filters from '../../../../_mock/filters';
import FeatureListItem from '../../../../page-components/project-categories/features/FeatureListItem';
import { Table } from '../../../../components/layouts/Table';
import useScaiTable from '../../../../hooks/useScaiTable';
import {
  ARTICLES_COLUNM,
  KEYWORDS_COLUNM,
} from '../../../../components/layouts/Table/columns';
import TableLayout from '../../../../components/layouts/TableLayout';
import ArticleIndexItemDialog from '../../../../page-components/articles/ArticleIndexItemDialog';
import KeywordsIndexItemDialog from '../../../../page-components/keywords/KeywordsIndexItemDialog';
import SearchTable from '../../../../components/layouts/Table/components/SearchTable';
import { get, setHeaders } from '../../../../utils/http';
import { Input } from '../../../../ui/input';
import { wrapper } from '../../../../store/store';
import { setProjectPageData } from '../../../../features/project/projectSlice';

const tabs = [
  { tab: 'Articles', q: 'a' },
  { tab: 'Keywords', q: 'k' },
  { tab: 'Features', q: 'f' },
];

function Index({ ssrQuery }) {
  const state = useProjectsContext();

  const { articles, keywordList, project } = useSelector(
    (state) => state.project.projectPage
  );

  const router = useRouter();
  const { query } = router;

  const { projectFeatureList } = state;

  const [tabIndex, setTabIndex] = useState(0);

  const updateTabIndex = (index) => {
    setTabIndex(index);
    router.push({
      pathname: `/app/projects/${query.projectId}`,
      query: { tab: tabs[index].q },
    });
  };

  const checkWhichTab = () => {
    let cQuery = query || ssrQuery;
    if (cQuery.tab) {
      let queryTabIndex = tabs.findIndex((t) => t.q == cQuery.tab);
      if (queryTabIndex != -1) {
        setTabIndex(queryTabIndex);
      } else {
        setTabIndex(0);
      }
    } else {
      router.push({
        pathname: `/app/projects/${cQuery.projectId}`,
        query: { tab: tabs[0].q },
      });
    }
  };

  useEffect(() => {
    checkWhichTab();
  }, []);

  // Filter / Search Functionality
  const [stateFeature] = useState(projectFeatureList);

  // Beginning Search / Filter Functionality

  // Search query
  const [q, setQ] = useState('');

  const [searchParam] = useState(['feature']);
  const [filterParam, setFilterParam] = useState('all');

  const searchFor = (itemsSearchFor) => {
    return itemsSearchFor.filter((item) => {
      if (item.type == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == 'all') {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  };

  // Beginning of Filter
  const [stateFilter, setStateFilter] = useState(filters);

  // Filter query
  const [f, setF] = useState('all');

  const [topFilters, setTopFilters] = useState(stateFilter.slice(0, 7));
  const [moreFilters, setMoreFilters] = useState(stateFilter.slice(7));

  const selectFilter = () => {
    let a = stateFilter;
    let b = [];
    for (let i = 0; i < stateFilter.length; i++) {
      if (a[i].slug == filterParam) {
        a[i].selected = true;
      } else {
        a[i].selected = false;
      }
      b.push(a[i]);
    }
    setStateFilter(b);
    setTopFilters(b.slice(0, 7));
    setMoreFilters(b.slice(7));
  };

  const updateSelectedState = (filter, index) => {
    setF(filter.slug);
    setFilterParam(filter.slug);
    selectFilter();
  };

  const selectFromMore = (indexOfMore, filter) => {
    stateFilter.splice(indexOfMore + 7, 1);
    stateFilter.splice(6, 0, moreFilters[indexOfMore]);
    updateSelectedState(filter, indexOfMore);
  };

  const doubleClickArtcleHandler = (e, row) => {
    if (e.detail == 2) {
      router.push(
        `/app/projects/${query.projectId}/articles/edit/${row.original._id}`
      );
    }
  };

  const doubleClickKeywordHandler = (e, row) => {
    if (e.detail == 2) {
      router.push(
        `/app/projects/${query.projectId}/keyword-list/${row.original._id}`
      );
    }
  };

  const articleTableInstance = useScaiTable(
    {
      tableData: articles,
      tableColumns: ARTICLES_COLUNM,
    },
    [
      {
        Header: (
          <Settings className="mx-auto h-[18px] w-[18px] dark:text-white text-black" />
        ),
        Cell: ({ row }) => {
          return <ArticleIndexItemDialog item={row.original} />;
        },
      },
    ]
  );

  const keywordsTableInstance = useScaiTable(
    {
      tableData: keywordList,
      tableColumns: KEYWORDS_COLUNM,
    },
    [
      {
        Header: (
          <Settings className="mx-auto h-[18px] w-[18px] dark:text-white text-black" />
        ),
        Cell: ({ row }) => {
          return <KeywordsIndexItemDialog item={row.original} />;
        },
      },
    ]
  );

  return (
    <DashboardLayout metaTitle={`${project.title}`}>
      <ArticleLayout crumbs={[{ link: '', txt: tabs[tabIndex].tab }]}>
        <div className="mt-[57px] relative">
          <div className="absolute right-0 -top-[61px] flex justify-end mb-8">
            {tabIndex == 0 ? (
              <Link href={`/app/projects/${query.projectId}/keywords`}>
                <a className="block w-fit btn btn-primary bg-primary text-white font-poppins">
                  Write New Article
                </a>
              </Link>
            ) : (
              tabIndex == 1 && <NewKeywordListButton />
            )}
          </div>
          <Tab.Group
            selectedIndex={tabIndex}
            onChange={(index) => updateTabIndex(index)}
          >
            <div className="space-y-5">
              <Tab.List className="flex justify-between items-center">
                <div className="flex space-x-[10px]">
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <div>
                        <TabLayout selected={selected} children={'Articles'} />
                      </div>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <div>
                        <TabLayout selected={selected} children={'Keywords'} />
                      </div>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <div>
                        <TabLayout selected={selected} children={'Features'} />
                      </div>
                    )}
                  </Tab>
                </div>
                {tabIndex == 0 && (
                  <div className="flex items-center justify-end">
                    <SearchTable
                      filter={articleTableInstance.globalFilter}
                      setFilter={articleTableInstance.setGlobalFilter}
                    />
                  </div>
                )}
                {tabIndex == 1 && (
                  <div className="flex items-center justify-end">
                    <SearchTable
                      filter={keywordsTableInstance.globalFilter}
                      setFilter={keywordsTableInstance.setGlobalFilter}
                    />
                  </div>
                )}
                {tabIndex == 2 && (
                  <Link href={`/app/projects/features`}>
                    <a className="block w-fit btn h-[45px] btn-primary bg-primary text-white font-poppins">
                      View All Features
                    </a>
                  </Link>
                )}
              </Tab.List>
              {tabIndex == 2 && (
                <div className="flex w-full">
                  <div className="flex md:flex-row flex-col w-full md:space-x-10 space-x-0 space-y-5 md:space-y-0">
                    <div className="flex-grow">
                      <div className="md:flex hidden space-x-1">
                        {topFilters.map((filter, index) => {
                          return (
                            <Fragment key={filter.id}>
                              <div
                                onClick={() =>
                                  updateSelectedState(filter, index)
                                }
                                className={`${
                                  filter.slug == filterParam
                                    ? 'bg-primary text-white'
                                    : 'border border-solid border-[#414141] dark:bg-[#000000] bg-white dark:text-white text-black'
                                } cursor-pointer py-[10px] px-5 font-semibold capitalize text-center text-sm leading-5`}
                              >
                                <span className="whitespace-nowrap">
                                  {filter.name}
                                </span>
                              </div>
                            </Fragment>
                          );
                        })}

                        <Menu as="div" className="inline-block">
                          <div className="relative">
                            <div>
                              <Menu.Button className="flex items-center space-x-[5px] bg-white dark:text-white text-black dark:bg-[#000000] py-[10px] px-5 font-semibold capitalize text-center text-sm leading-5 border border-solid border-[#414141]">
                                <span>More</span>
                                <span>
                                  <ChevDown className="h-2 w-2 dark:text-white text-black" />
                                </span>
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="z-30 origin-top-left absolute left-0 mt-2 w-fit shadow-lg dark:bg-[#000000] dark:text-white text-black bg-white ring-1 ring-[#000000] ring-opacity-5 focus:outline-none">
                                {moreFilters.map((filter, index) => (
                                  <Fragment key={filter.id}>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div
                                          onClick={() =>
                                            selectFromMore(index, filter)
                                          }
                                          className={`py-[10px] px-5 capitalize font-semibold ${
                                            active
                                              ? 'bg-primary text-white cursor-pointer'
                                              : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'
                                          }`}
                                        >
                                          <span className="whitespace-nowrap">
                                            {filter.name}
                                          </span>
                                        </div>
                                      )}
                                    </Menu.Item>
                                  </Fragment>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </div>
                        </Menu>
                      </div>
                      <div className="md:hidden flex">
                        <Menu as="div" className="inline-block">
                          <div className="relative">
                            <div>
                              <Menu.Button className="flex items-center space-x-[5px] bg-white dark:text-white text-black dark:bg-[#000000] py-[10px] px-5 font-semibold capitalize text-center text-sm leading-5 border border-solid border-[#414141]">
                                <span>Filters</span>
                                <span>
                                  <ChevDown className="h-2 w-2 dark:text-white text-black" />
                                </span>
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="z-30 origin-top-left absolute left-0 mt-2 w-fit shadow-lg dark:bg-[#000000] dark:text-white text-black bg-white ring-1 ring-[#000000] ring-opacity-5 focus:outline-none">
                                {stateFilter.map((filter) => (
                                  <Fragment key={filter.id}>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div
                                          className={`py-[10px] px-5 capitalize font-semibold ${
                                            active
                                              ? 'bg-primary text-white cursor-pointer'
                                              : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'
                                          }`}
                                        >
                                          <span>{filter.name}</span>
                                        </div>
                                      )}
                                    </Menu.Item>
                                  </Fragment>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </div>
                        </Menu>
                      </div>
                    </div>
                    <div className="">
                      <div className="min-w-[190px] flex items-center border border-solid border-darkMode-border dark:bg-darkMode-bg h-[43px] bg-white max-w-[293px]">
                        <Input
                          value={q}
                          onChange={(e) => setQ(e)}
                          placeholder="Search..."
                        />
                        <div className="py-3 pr-4 px-[15.5px] dark:bg-darkMode-bg h-[40px] bg-white cursor-pointer">
                          <SearchIcon className="h-5 w-5 dark:text-white text-black" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <div className="mt-7">
                  <TableLayout
                    tableInstance={articleTableInstance}
                    rowToClick={true}
                    rowClick={doubleClickArtcleHandler}
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="mt-7">
                  <TableLayout
                    tableInstance={keywordsTableInstance}
                    rowToClick={true}
                    rowClick={doubleClickKeywordHandler}
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  {/* <FeaturesList features={searchFor(stateFeature)} /> */}
                  <div className="mt-8">
                    <Table>
                      <Table.Head>
                        <Table.Row className="cursor-default">
                          <Table.TH className="pl-0 cursor-pointer w-[41.5px]"></Table.TH>
                          <Table.TH
                            main={true}
                            style={{ width: '50%', minWidth: '397px' }}
                          >
                            <span className="capitalize">All Features</span>
                          </Table.TH>
                          <Table.TH style={{ width: '27%', minWidth: '169px' }}>
                            <span className="flex items-center space-x-1">
                              <span className="capitalize">User</span>
                            </span>
                          </Table.TH>
                          <Table.TH style={{ width: '12%', minWidth: '144px' }}>
                            <span className="capitalize">Date</span>
                          </Table.TH>
                          <Table.TH style={{ minWidth: '50px' }}>
                            <Settings className="mx-auto h-[18px] w-[18px] dark:text-white text-black" />
                          </Table.TH>
                        </Table.Row>
                      </Table.Head>
                      <Table.Body>
                        {searchFor(stateFeature).map((item) => {
                          return <FeatureListItem item={item} key={item.id} />;
                        })}
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </ArticleLayout>
    </DashboardLayout>
  );
}

const TabLayout = ({ selected, children }) => {
  return (
    <div
      className={`
        cursor-pointer py-[13px] px-[39px] text-center
        ${
          selected
            ? 'dark:bg-primary bg-primary border-primary border border-solid text-white'
            : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border border-solid border-ash dark:border-darkMode-border'
        }
      `}
    >
      <span className="text-sm leading-4 text-center font-medium">
        {children}
      </span>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const { query } = context;

      const session = await getSession(context);

      if (session?.user) {
        const { response, error } = await get({
          url: `${process.env.BASE_URL}/api/project/${query.projectId}`,
          headers: setHeaders({ token: session.user.accessToken }),
        });
        if (response) {
          store.dispatch(
            setProjectPageData(JSON.parse(JSON.stringify(response.data.data)))
          );
          return {
            props: {
              ssrQuery: query,
              feaures: [],
              ...JSON.parse(JSON.stringify(response.data.data)),
            },
          };
        }
      }
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }
  }
);

Index.auth = true;
export default Index;
