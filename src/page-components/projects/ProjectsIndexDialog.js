import React, { useState, useReducer, Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import FormGroup from '../../components/FormGroup';
import { DialogLayout } from '../../components/layouts/Dialog';
import { Input } from '../../ui/input';
import industries from '../../_mock/industries';
import { useAppContext } from '../../context/state';
import useUser from '../../hooks/useUser';
import { fTags } from '../../utils/formatTags';
import { Button } from '../../ui/button';
import { post, setHeaders } from '../../utils/http';
import {
  setErrorDetails,
  setShowErrorDialog,
} from '../../features/error/errorSlice';
import FieldErrorText from '../../components/layouts/FieldErrorText';

const initialProjectDetails = {
  title: '',
  tags: '',
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

  const dispatchStore = useDispatch();

  const { user } = useUser();

  const contextState = useAppContext();

  const [showPredict, setPredictTitle] = useState(false);
  const [showPredictIndustry, setShowPredictIndustry] = useState(false);

  const [loading, setLoading] = useState(false);

  const [newProject, dispatch] = useReducer(reducer, initialProjectDetails);

  const predictTitle = (value) => {
    dispatch({ type: 'setTitle', value });
    setPredictTitle(newProject.title.length > 2);
  };

  const predictIndustry = (value) => {
    dispatch({ type: 'setIndustry', value });
    setShowPredictIndustry(newProject.industry.length > 2);
  };

  const continueProjectCreation = async (values, submitProps) => {
    try {
      setLoading(true);
      const { response, error } = await post({
        url: `${process.env.BASE_URL}/api/project`,
        data: {
          title: values.title,
          tags: values.tags.split(', '),
          industry: values.industry,
        },
        headers: setHeaders({ token: user.accessToken }),
        error: (response) => {
          closeProjectDialog();
          setLoading(false);
          dispatchStore(setShowErrorDialog(true));
          dispatchStore(
            setErrorDetails(response.data.error.details || undefined)
          );
        },
      });
      if (response) {
        // submitProps.resetForm();
        submitProps.setSubmitting(false);
        contextState.project.setNewProjectData(response.data.data);
        router.push(`/app/projects/${response.data.data._id}/keywords`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('project title is required'),
    tags: Yup.string().required('project tag(s) is required'),
  });

  return (
    <DialogLayout
      isOpen={projectDialog}
      widthRestrict={'max-w-[1299px]'}
      isSharp={true}
      closeModal={closeProjectDialog}
    >
      <Formik
        initialValues={initialProjectDetails}
        validationSchema={validationSchema}
        onSubmit={continueProjectCreation}
      >
        <Form className="w-full text-left py-[30px] md:px-14 px-5">
          <div className="pb-5">
            <FormGroup label="Project Title" imp={true} labelFor="title">
              <Field
                as={Input}
                returnEvent={true}
                variant="dark"
                id="title"
                name="title"
                placeholder="Your Campaign, Product, or client"
                autoComplete="off"
              />
              <ErrorMessage name="title" component={FieldErrorText} />
              <Transition
                as={Fragment}
                show={showPredict && false}
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
                      {newProject.title}{' '}
                      <span className="font-bold">Agency</span>
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

            <FormGroup label="Project Tags" imp={true} labelFor="tags">
              <Field
                as={Input}
                returnEvent={true}
                variant="dark"
                id="tags"
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
                id="industry"
                variant="dark"
                name="industry"
                placeholder="Industry"
                autoComplete="off"
              />
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
              <Button state={loading && 'loading'} type="submit">
                Next
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </DialogLayout>
  );
};

export default ProjectsIndexDialog;
