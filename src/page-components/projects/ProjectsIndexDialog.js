import React, { useState, useReducer, Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import axios from 'axios';

import FormGroup from '../../components/FormGroup';
import { DialogLayout } from '../../components/layouts/Dialog';
import Input from '../../components/layouts/Input';
import industries from '../../_mock/industries';
import { useAppContext } from '../../context/state';
import useUser from '../../hooks/useUser';
import { fTags } from '../../utils/formatTags';

const initialProjectDetails = {
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

const ProjectsIndexDialog = ({ projectDialog, closeProjectDialog }) => {
  const router = useRouter();

  const { user } = useUser();

  const contextState = useAppContext();

  const [showPredict, setPredictTitle] = useState(false);
  const [showPredictIndustry, setShowPredictIndustry] = useState(false);

  const [newProject, dispatch] = useReducer(reducer, initialProjectDetails);

  const predictTitle = (value) => {
    dispatch({ type: 'setTitle', value });
    setPredictTitle(newProject.title.length > 2);
  };

  const predictIndustry = (value) => {
    dispatch({ type: 'setIndustry', value });
    setShowPredictIndustry(newProject.industry.length > 2);
  };

  const continueProjectCreation = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.BASE_URL}/api/project`,
        {
          title: newProject.title,
          tags: newProject.tags,
          industry: newProject.industry,
        },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      if (data.success) {
        contextState.project.setNewProjectData(data.data);
        router.push(`/app/projects/${data.data._id}/keywords`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogLayout
      isOpen={projectDialog}
      widthRestrict={'max-w-[1299px]'}
      isSharp={true}
      closeModal={closeProjectDialog}
    >
      <div className="w-full text-left py-[30px] md:px-14 px-5">
        <div className="pb-5">
          <FormGroup label="Project Title" imp={true} labelFor="project">
            <Input
              id="project"
              value={newProject.title}
              onChange={(e) => predictTitle(e.target.value)}
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
                      dispatch({
                        type: 'setTitle',
                        value: `${newProject.title} Class Notes`,
                      });
                      setPredictTitle(false);
                    }}
                  >
                    {newProject.title}{' '}
                    <span className="font-bold">Class Notes</span>
                  </span>
                </li>
                <li className="px-[27.18px] py-[10px]">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: 'setTitle',
                        value: `${newProject.title} Agency`,
                      });
                      setPredictTitle(false);
                    }}
                  >
                    {newProject.title} <span className="font-bold">Agency</span>
                  </span>
                </li>
                <li className="px-[27.18px] py-[10px]">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: 'setTitle',
                        value: `${newProject.title} Book Article`,
                      });
                      setPredictTitle(false);
                    }}
                  >
                    {newProject.title}{' '}
                    <span className="font-bold">Book Article</span>
                  </span>
                </li>
              </ul>
            </Transition>
          </FormGroup>

          <FormGroup label="Project Tags" imp={true} labelFor="prize">
            <Input
              id="prize"
              value={newProject.tags.join(', ')}
              onChange={(e) =>
                dispatch({ type: 'setTags', value: e.target.value })
              }
              placeholder="graphic design, digital marketing, marketing"
            />
          </FormGroup>

          <FormGroup
            label="Industry(optional)"
            className="mb-0"
            labelFor="indutry"
          >
            <Input
              id="industry"
              value={newProject.industry}
              onChange={(e) => predictIndustry(e.target.value)}
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
                          dispatch({ type: 'setIndustry', value: industry });
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

        <div className="form-group flex mb-0 justify-between">
          <div className="space-x-4 flex">
            <button
              type="button"
              onClick={continueProjectCreation}
              className="block w-fit btn btn-primary bg-primary text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DialogLayout>
  );
};

export default ProjectsIndexDialog;
