import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';

import { Dots } from '../../ui/icons';
import { DialogLayout } from '../../components/layouts/Dialog';
import FormGroup from '../../components/FormGroup';
import { Input } from '../../ui/input';
import { fTags } from '../../utils/formatTags';
import industries from '../../_mock/industries';
import { useRouter } from 'next/router';
import { deleteRequest, post, setHeaders } from '../../utils/http';
import useUser from '../../hooks/useUser';
import { Button } from '../../ui/button';
import {
  removeProject,
  updateAProject,
} from '../../features/project/projectSlice';

const ProjectsIndexItemDialog = ({ item }) => {
  const router = useRouter();
  const { user } = useUser();

  const dispatch = useDispatch();

  let [isOpen, setIsOpen] = useState(false);
  let [editIsOpen, setEditIsOpen] = useState(false);
  let [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeEditModal() {
    setEditIsOpen(false);
  }

  function openEditModal() {
    setEditIsOpen(true);
  }

  const [rProjectTitle, setRProjectTitle] = useState(item.title);
  const [showPredict, setPredictTitle] = useState(false);
  const [pTags, setPTags] = useState(item.tags);
  const [rSelectedIndustry, setRSelectedIndustry] = useState(
    item.industry ? item.industry : ''
  );
  const [showPredictIndustry, setShowPredictIndustry] = useState(false);

  const predictTitle = (value) => {
    setRProjectTitle(value);
    setPredictTitle(rProjectTitle.length > 2);
  };

  const predictIndustry = (value) => {
    setRSelectedIndustry(value);
    setShowPredictIndustry(rSelectedIndustry.length > 2);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    let updateObject = {};

    if (item.title !== rProjectTitle) {
      updateObject.title = rProjectTitle;
    }
    if (item.tags.join(', ') != pTags.join(', ')) {
      updateObject.tags = pTags;
    }
    if (item.industry != rSelectedIndustry) {
      updateObject.industry = rSelectedIndustry;
    }

    if (
      updateObject.hasOwnProperty('industry') ||
      updateObject.hasOwnProperty('tags') ||
      updateObject.hasOwnProperty('title')
    ) {
      setLoading(true);
      try {
        updateObject.project_id = item._id;
        const { response } = await post({
          url: `${process.env.BASE_URL}/api/project/update-project`,
          data: updateObject,
          headers: setHeaders({ token: user.accessToken }),
        });
        if (response) {
          const { project_id, ...uiChangeObj } = updateObject;
          dispatch(
            updateAProject({ project_id: item._id, updateObject: uiChangeObj })
          );
          setLoading(false);
          closeEditModal();
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const deleteProject = async () => {
    try {
      setLoading(true);
      const { response } = await deleteRequest({
        url: `${process.env.BASE_URL}/api/project/update-project`,
        data: { project_id: item._id },
        headers: setHeaders({ token: user.accessToken }),
      });
      if (response) {
        dispatch(removeProject({ project_id: item._id }));
        setLoading(false);
        closeModal();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const viewHandler = (e) => {
    router.push(`/app/projects/${item._id}?tab=a`);
  };

  return (
    <>
      {/* Delete Dialog */}
      <DialogLayout isOpen={isOpen} closeModal={closeModal}>
        <div className="py-24 px-44">
          <div className="space-y-[13px]">
            <DialogLayout.Title as="h3" className="title">
              Are you sure?
            </DialogLayout.Title>
            <DialogLayout.SubTitle>
              Deleting is final and cannot be reversed. are you sure you still
              want to proceed?
            </DialogLayout.SubTitle>
          </div>

          <div className="mt-[19px] space-x-3">
            <Button
              onClick={deleteProject}
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
      {/* Edit Dialog */}
      <DialogLayout
        isOpen={editIsOpen}
        widthRestrict={'max-w-[1299px]'}
        closeModal={closeEditModal}
        isSharp={true}
      >
        <form
          onSubmit={saveEdit}
          className="w-full text-left pt-[30px] divide-y-[1px] dark:divide-darkMode-border divide-ash"
        >
          <div className="pb-[30px] px-14">
            <FormGroup label="Project Title" imp={true} labelFor="project">
              <Input
                variant="dark"
                id="project"
                value={rProjectTitle}
                onChange={(e) => predictTitle(e)}
                placeholder="Your Campaign, Product, or client"
              />
              <Transition
                as={Fragment}
                show={showPredict}
                enter="transition ease-out duration-100 overflow-hidden"
                enterFrom="transform min-h-0"
                enterTo="transform max-h-[105px] h-auto"
                leave="transition ease-in"
                leaveFrom="transform duration-75 max-h-[105px] h-auto"
                leaveTo="transform min-h-0"
              >
                <ul className="predict-title max-h-[176px] overflow-y-scroll">
                  <li className="px-[27.18px] py-[10px]">
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setRProjectTitle(`${rProjectTitle} Class Notes`);
                        setPredictTitle(false);
                      }}
                    >
                      {rProjectTitle}{' '}
                      <span className="font-bold">Class Notes</span>
                    </span>
                  </li>
                  <li className="px-[27.18px] py-[10px]">
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setRProjectTitle(`${rProjectTitle} Agency`);
                        setPredictTitle(false);
                      }}
                    >
                      {rProjectTitle} <span className="font-bold">Agency</span>
                    </span>
                  </li>
                  <li className="px-[27.18px] py-[10px]">
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setRProjectTitle(`${rProjectTitle} Book Article`);
                        setPredictTitle(false);
                      }}
                    >
                      {rProjectTitle}{' '}
                      <span className="font-bold">Book Article</span>
                    </span>
                  </li>
                </ul>
              </Transition>
            </FormGroup>

            <FormGroup label="Project Tags" imp={true} labelFor="prize">
              <Input
                variant="dark"
                id="prize"
                value={pTags.join(', ')}
                onChange={(e) => setPTags(fTags(e))}
                placeholder="graphic design, digital marketing, marketing"
              />
            </FormGroup>

            <FormGroup
              label="Industry(optional)"
              className="mb-0"
              labelFor="indutry"
            >
              <Input
                variant="dark"
                id="industry"
                value={rSelectedIndustry}
                onChange={(e) => predictIndustry(e)}
                placeholder="Industry"
              />
              <Transition
                as={Fragment}
                show={showPredictIndustry}
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
                            setRSelectedIndustry(industry);
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
              <Button variant="reset" onClick={closeEditModal}>
                Cancel
              </Button>
              <Button type="submit" state={loading && 'loading'}>
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </DialogLayout>
      <Menu as="div" className="">
        <div className="relative">
          <div className="flex">
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
                      type="button"
                      onClick={viewHandler}
                      className={`w-full text-left whitespace-nowrap ${
                        active
                          ? 'bg-primary text-white cursor-pointer'
                          : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'
                      } block px-4 py-2 text-sm`}
                    >
                      View Project
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
                      Edit Project
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={openModal}
                      className={` w-full text-left whitespace-nowrap ${
                        active
                          ? 'bg-primary text-white cursor-pointer'
                          : 'dark:bg-darkMode-bg bg-white text-black dark:text-white'
                      } bg-white hover:bg-buttonGreen hover:text-white block px-4 py-2 text-sm`}
                    >
                      Delete Project
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

export default ProjectsIndexItemDialog;
