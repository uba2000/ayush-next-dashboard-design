import React, { useState, useReducer, Fragment } from 'react';
import { Transition } from '@headlessui/react';

import Layout from './Layout';
import { SearchIcon } from '../../../ui/icons/search-icon';
import CheckBox from '../../../components/layouts/CheckBox';
import { DialogLayout } from '../../../components/layouts/Dialog';
import { Input } from '../../../ui/input';
import FormGroup from '../../../components/FormGroup';
import industries from '../../../_mock/industries';
import { Button } from '../../../ui/button';
import useUser from '../../../hooks/useUser';
import { post, setHeaders, get } from '../../../utils/http';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NewKeywordListDialog from '../../project-categories/keywords/newKeywordListDialog';
import ScrollbarsLayout from '../../../components/layouts/Scrollbars';

const initialKeywordListDetails = {
  title: '',
  tags: [],
  industry: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setTitle':
      return { ...state, title: action.value };
    case 'setTags':
      let arrTags = fTags(action.value);
      return { ...state, tags: arrTags };
    case 'setIndustry':
      return { ...state, industry: action.value };
    default:
      return state;
  }
};

const AddToMenu = ({}) => {
  const { user } = useUser();

  const router = useRouter();
  const { query } = router;

  const [openNewKeywordList, setOpenNewKeywordList] = useState(false);

  const [showPredict, setPredictTitle] = useState(false);
  // const [keywords, setKeywords] = useState(projectState.keywords)
  const [showPredictIndustry, setShowPredictIndustry] = useState(false);
  const [keywordList, setKeywordList] = useState([]);
  const [loadingKeywordList, setLoadingKeywordList] = useState(true);
  const [keywordList1, setKeywordList1] = useState(false);
  const [keywordList2, setKeywordList2] = useState(false);

  const [checkedKeywordList, setCheckedKeywordList] = useState([]);

  const [newKeywordList, dispatch] = useReducer(
    reducer,
    initialKeywordListDetails
  );

  const predictIndustry = (value) => {
    dispatch({ type: 'setIndustry', value });
    setShowPredictIndustry(newKeywordList.industry.length > 2);
  };

  const openKeywordDialog = () => {
    setOpenNewKeywordList(true);
  };

  const predictTitle = (value) => {
    dispatch({ type: 'setTitle', value });
    setPredictTitle(newKeywordList.title.length > 2);
  };

  const continueKeywordCreation = async () => {
    try {
      const { response, error } = await post({
        url: `${process.env.BASE_URL}/api/project/add-keywords`,
        headers: setHeaders({ token: user.accessToken }),
        data: {
          title: newKeywordList.title,
          industry: newKeywordList.industry,
          tags: newKeywordList.tags,
          project_id: query.projectId,
        },
      });

      if (response) {
        router.push(
          `/app/projects/${query.projectId}/keywords?keywordsId=${response.data.data._id}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleToChecked = ({ item, type }) => {
    switch (type) {
      case 'add':
        setCheckedKeywordList([...checkedKeywordList, item]);
        break;
      case 'remove':
        setCheckedKeywordList(
          checkedKeywordList.filter((it) => it._id != item._id)
        );
        break;

      default:
        break;
    }
  };

  useEffect(async () => {
    try {
      const { response, error } = await get({
        url: `${process.env.BASE_URL}/api/project/${query.projectId}`,
        headers: setHeaders({ token: user.accessToken }),
      });
      if (response) {
        let list = response.data.data.keywordList.map((i) => {
          return {
            ...i,
            checked: false,
          };
        });
        setKeywordList(list);
      }
      setLoadingKeywordList(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [q, setQ] = useState('');

  const [searchParam] = useState(['title']);

  const searchFor = (itemsSearchFor) => {
    return itemsSearchFor.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };

  return (
    <>
      {/* New Keyword List */}
      <NewKeywordListDialog
        isNew={true}
        isOpen={openNewKeywordList}
        closeModal={() => setOpenNewKeywordList(false)}
      />
      <Layout label={'Add to'} origin={'right'} type="menu" icon={<Icon />}>
        <div
          className="divide-y-2 dark:divide-darkMode-border divide-ash"
          style={{ width: '197px' }}
        >
          <div>
            <div className="flex items-center border-b-0 border-solid dark:border-darkMode-border border-ash border-l-0 border-t-0 border-r-0 dark:bg-darkMode-bg h-[43px] bg-white max-w-[293px]">
              <input
                type="text"
                value={q}
                variant="dark"
                onChange={(e) => {
                  setQ(e.target.value);
                }}
                style={{ paddingLeft: '12px' }}
                className="flex-grow flex-shrink border-0 py-3 text-xs rounded-none dark:bg-darkMode-bg h-[40px] bg-white"
                placeholder="Search..."
              />
              <div className="py-3 pr-4 px-[15.5px] dark:bg-darkMode-bg h-[40px] bg-white cursor-pointer">
                <SearchIcon className="h-3 w-3 dark:text-white text-black" />
              </div>
            </div>
          </div>
          <div className="border-b border-t-0 border-solid dark:border-darkMode-border border-ash">
            <ScrollbarsLayout h="199.85px">
              <ul className="max-h-[199.85px]">
                {searchFor(keywordList).map((item) => (
                  <Fragment key={item._id}>
                    <ListItem item={item} toggleToChecked={toggleToChecked} />
                  </Fragment>
                ))}
              </ul>
            </ScrollbarsLayout>
          </div>
          <Layout.Item>
            <div>
              <Button
                className="py-[6px] px-0 w-full text-sm"
                onClick={openKeywordDialog}
                variant="reset"
              >
                Create new Keyword list
              </Button>
            </div>
          </Layout.Item>
        </div>
      </Layout>
    </>
  );
};

const Icon = () => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6492 -6.10352e-05H5.04922C4.16682 -6.10352e-05 3.44922 0.717537 3.44922 1.59994V11.1999C3.44922 12.0823 4.16682 12.7999 5.04922 12.7999H14.6492C15.5316 12.7999 16.2492 12.0823 16.2492 11.1999V1.59994C16.2492 0.717537 15.5316 -6.10352e-05 14.6492 -6.10352e-05ZM5.04922 11.1999V1.59994H14.6492L14.6508 11.1999H5.04922Z"
        fill="currentColor"
      />
      <path
        d="M1.85 4.80013H0.25V14.4001C0.25 15.2825 0.967598 16.0001 1.85 16.0001H11.45V14.4001H1.85V4.80013ZM10.65 3.20013H9.04998V5.60013H6.64999V7.20013H9.04998V9.60012H10.65V7.20013H13.05V5.60013H10.65V3.20013Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ListItem = ({ item, toggleToChecked }) => {
  const [checked, setChecked] = useState(item.checked);
  const checkList = () => {
    setChecked(!checked);
    toggleToChecked({ item, type: !checked ? 'add' : 'remove' });
  };

  return (
    <li
      onClick={() => checkList()}
      className="p-2 flex items-center cursor-pointer space-x-2"
    >
      <span className="h-6">
        <CheckBox checked={checked} />
      </span>
      <span className="text-sm select-none line-clamp-1">{item.title}</span>
    </li>
  );
};

export { AddToMenu };
