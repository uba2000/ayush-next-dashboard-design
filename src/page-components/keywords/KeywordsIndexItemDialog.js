import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Dots } from '../../ui/icons';
import { DialogLayout } from '../../components/layouts/Dialog';
import FormGroup from '../../components/FormGroup';
import { Input } from '../../ui/input';
import industries from '../../_mock/industries';
import { post, setHeaders, deleteRequest } from '../../utils/http';
import useUser from '../../hooks/useUser';
import { fTags } from '../../utils/formatTags';
import { Button } from '../../ui/button';
import {
  removeKeyword,
  updateAKeyword,
} from '../../features/project/projectSlice';
import FieldErrorText from '../../components/layouts/FieldErrorText';

const KeywordsIndexItemDialog = ({ item }) => {
  const dispatch = useDispatch();

  const { user } = useUser();

  const router = useRouter();
  const { query } = router;

  let [isOpen, setIsOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  let [editLoading, setEditLoading] = useState(false);

  const [keywordListTitle, setKeywordList] = useState(item.title);
  const [kTags, setKTags] = useState(item.tags);
  const [selectedIndustry, setSelectedIndustry] = useState(item.industry);
  const [showPredictIndustry, setShowPredictIndustry] = useState(false);

  const predictIndustry = (value) => {
    setSelectedIndustry(value);
    setShowPredictIndustry(selectedIndustry.length > 2);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeEditModal() {
    setIsEditOpen(false);
  }

  function openEditModal() {
    setIsEditOpen(true);
  }

  const saveKeywordDetail = async (values) => {
    let updateObject = {};

    if (item.title !== values.title) {
      updateObject.title = values.title;
    }
    if (item.tags.join(', ') != values.tags) {
      updateObject.tags = values.tags.split(', ');
    }
    if (item.industry != values.industry) {
      updateObject.industry = values.industry;
    }

    if (
      updateObject.hasOwnProperty('industry') ||
      updateObject.hasOwnProperty('tags') ||
      updateObject.hasOwnProperty('title')
    ) {
      setEditLoading(true);
      try {
        const { response } = await post({
          url: `${process.env.BASE_URL}/api/project/update-keyword-details`,
          headers: setHeaders({ token: user.accessToken }),
          data: { ...updateObject, list_id: item._id },
        });
        if (response) {
          dispatch(
            updateAKeyword({
              keywordList_id: item._id,
              updateObject,
            })
          );
          closeEditModal();
          setEditLoading(false);
        }
      } catch (error) {
        setEditLoading(false);
        console.log(error);
      }
    }
  };

  const deleteKeyword = async () => {
    try {
      setLoading(true);
      const { response } = await deleteRequest({
        url: `${process.env.BASE_URL}/api/project/update-keywords`,
        data: { keywordId: item._id },
        headers: setHeaders({ token: user.accessToken }),
      });
      if (response) {
        dispatch(removeKeyword({ keywordList_id: item._id }));
        setLoading(false);
        closeModal();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const viewList = () => {
    router.push(`/app/projects/${query.projectId}/keyword-list/${item._id}`);
  };

  const initialValues = {
    title: item.title,
    tags: item.tags.join(', '),
    industry: item.industry || '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('keywords list title is required'),
    tags: Yup.string().required('keywords list tag(s) is required'),
  });

  return (
    <>
      {/* delete */}
      <DialogLayout isOpen={isOpen} closeModal={closeModal}>
        <div className="py-24 px-44">
          <div className="space-y-[13px]">
            <DialogLayout.Title as="h3" className="title">
              Are you sure, you want to delete this keyword list?
            </DialogLayout.Title>
            <DialogLayout.SubTitle>
              Deleting is final and cannot be reversed. are you sure you still
              want to proceed?
            </DialogLayout.SubTitle>
          </div>

          <div className="mt-[19px]">
            <Button
              onClick={deleteKeyword}
              state={loading && 'loading'}
              variant="danger"
            >
              Confirm
            </Button>
            <Button onClick={closeModal} variant="reset">
              Cancel
            </Button>
          </div>
        </div>
      </DialogLayout>
      {/* edit */}
      <DialogLayout
        isSharp={true}
        widthRestrict={'max-w-[1299px]'}
        isOpen={isEditOpen}
        closeModal={closeEditModal}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={saveKeywordDetail}
        >
          <Form className="w-full text-left pt-[30px] divide-y-[1px] dark:divide-darkMode-border divide-ash">
            <div className="pb-[30px] px-14">
              <FormGroup
                label="Keyword List Title"
                imp={true}
                labelFor="keyword"
              >
                <Field
                  as={Input}
                  returnEvent={true}
                  variant="dark"
                  id="keyword"
                  name="title"
                  placeholder="Graphic Design keywords"
                />
                <ErrorMessage name="title" component={FieldErrorText} />
              </FormGroup>

              <FormGroup label="Keywords List Tags*" imp={true} labelFor="tags">
                <Field
                  as={Input}
                  returnEvent={true}
                  id="tags"
                  variant="dark"
                  name="tags"
                  placeholder="graphic design, digital marketing, marketing"
                />
                <ErrorMessage name="tags" component={FieldErrorText} />
              </FormGroup>

              <FormGroup
                label="Industry(optional)"
                className="mb-0"
                labelFor="indutry"
              >
                <Field
                  as={Input}
                  returnEvent={true}
                  variant="dark"
                  id="industry"
                  name="industry"
                  placeholder="Industry"
                />
                <ErrorMessage name="industry" component={FieldErrorText} />
                <Transition
                  as={Fragment}
                  show={showPredictIndustry && false}
                  enter="transition ease-out duration-100 overflow-hidden"
                  enterFrom="transform min-h-0"
                  enterTo="transform max-h-[105px] h-auto"
                  leave="transition ease-in"
                  leaveFrom="transform duration-75 max-h-[105px] h-auto"
                  leaveTo="transform min-h-0"
                >
                  <ul className="predict-title max-h-[176px] overflow-y-scroll">
                    {industries.map((industry, index) => {
                      return (
                        <li className="px-[27.18px] py-[10px]" key={index}>
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedIndustry(industry);
                              setShowPredictIndustry(false);
                            }}
                          >
                            <span className="font-bold">{industry}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </Transition>
              </FormGroup>
            </div>

            <div className="form-group px-14 py-4 flex mb-0 justify-between">
              <div className="flex items-center">
                <span className="dark:text-darkMode-subText text-black">
                  Make sure to save the changes
                </span>
              </div>
              <div className="space-x-4 flex">
                <Button onClick={closeEditModal} variant="reset">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  state={editLoading && 'loading'}
                  className="block w-fit"
                >
                  Continue
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
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
                      onClick={viewList}
                      type="button"
                      className={`w-full text-left whitespace-nowrap ${
                        active
                          ? 'bg-primary text-white cursor-pointer'
                          : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'
                      } block px-4 py-2 text-sm`}
                    >
                      View List
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={openEditModal}
                      className={`w-full text-left whitespace-nowrap ${
                        active
                          ? 'bg-primary text-white cursor-pointer'
                          : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'
                      } block px-4 py-2 text-sm`}
                    >
                      Edit List
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
                      Delete List
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

export default KeywordsIndexItemDialog;
