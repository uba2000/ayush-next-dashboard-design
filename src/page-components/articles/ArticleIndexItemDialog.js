import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

import { Dots } from '../../ui/icons';
import { useAppContext } from '../../context/state';
import { DialogLayout } from '../../components/layouts/Dialog';

const ArticleIndexItemDialog = ({ item }) => {
  const router = useRouter();

  const { query } = router;

  const state = useAppContext();

  let [isOpen, setIsOpen] = useState(false);
  const [articleEditLink] = useState(
    `/app/projects/${query.projectId}/articles/edit/${item._id}`
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const goToArticle = (type) => {
    switch (type) {
      case 'edit':
        state.layout.setToEditArticle(true);
        break;
      case 'view':
        state.layout.setToEditArticle(false);
        break;
      default:
        state.layout.setToEditArticle(false);
    }
    router.push(articleEditLink);
  };

  return (
    <>
      <DialogLayout isOpen={isOpen} closeModal={closeModal}>
        <div className="py-24 px-44">
          <div className="space-y-[13px]">
            <DialogLayout.Title as="h3" className="title">
              Are you sure, you want to delete this articles?
            </DialogLayout.Title>
            <DialogLayout.SubTitle>
              Deleting is final and cannot be reversed. are you sure you still
              want to proceed?
            </DialogLayout.SubTitle>
          </div>

          <div className="mt-[19px]">
            <button className="btn btn-primary bg-[#FF1212] border-[#FF1212] text-white">
              Confirm
            </button>
            <button
              onClick={closeModal}
              className="ml-3 btn btn-reset dark:text-white text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogLayout>
      <Menu as="div" className="">
        <div className="relative">
          <div>
            <Menu.Button className="inline-flex mx-auto justify-center">
              <span>
                <Dots />
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
            <Menu.Items className="z-30 origin-top-right absolute right-0 mt-2 w-52 shadow-lg dark:bg-[#000000] dark:text-white text-black bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
              <div className="">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => goToArticle('view')}
                      type="button"
                      className={`w-full text-left whitespace-nowrap ${
                        active
                          ? 'bg-primary text-white cursor-pointer'
                          : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'
                      } block px-4 py-2 text-sm`}
                    >
                      View Article
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => goToArticle('edit')}
                      type="button"
                      className={`w-full text-left whitespace-nowrap ${
                        active
                          ? 'bg-primary text-white cursor-pointer'
                          : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'
                      } block px-4 py-2 text-sm`}
                    >
                      Edit Article
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={openModal}
                      className={`text-left w-full whitespace-nowrap ${
                        active
                          ? 'bg-primary text-white cursor-pointer'
                          : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'
                      } bg-white hover:bg-buttonGreen hover:text-white block px-4 py-2 text-sm`}
                    >
                      Delete Article
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
    </>
  );
};

export default ArticleIndexItemDialog;
