import React, { useState, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import FormGroup from '../../../components/FormGroup';
import { Input } from '../../../ui/input';
import { DialogLayout } from '../../../components/layouts/Dialog';
import industries from '../../../_mock/industries';
import { fTags } from '../../../utils/formatTags';
import { post, setHeaders } from '../../../utils/http';
import useUser from '../../../hooks/useUser';
import { Button } from '../../../ui/button';
import FieldErrorText from '../../../components/layouts/FieldErrorText';

const NewKeywordListDialog = ({ isOpen, closeModal, isNew = false }) => {
  const { user } = useUser();

  const router = useRouter();

  const { query } = router;

  const [keywordListTitle, setKeywordList] = useState('');
  const [kTags, setKTags] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [showPredictIndustry, setShowPredictIndustry] = useState(false);
  const [loading, setLoading] = useState(false);

  const predictIndustry = (value) => {
    setSelectedIndustry(value);
    setShowPredictIndustry(selectedIndustry.length > 2);
  };

  const continueKeywordCreation = async (values, submitProps) => {
    try {
      setLoading(true);
      const { response, error } = await post({
        url: `${process.env.BASE_URL}/api/project/add-keywords`,
        headers: setHeaders({ token: user.accessToken }),
        data: {
          title: values.title,
          industry: values.industry,
          tags: values.tags.split(', '),
          project_id: query.projectId,
        },
      });

      if (response) {
        router.push(
          `/app/projects/${query.projectId}/keywords?keywordsId=${response.data.data._id}`
        );
      }
      // setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const initialValues = {
    title: '',
    tags: '',
    industry: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('keywords list title is required'),
    tags: Yup.string().required('keywords list tag(s) is required'),
  });

  return (
    <DialogLayout
      isSharp={true}
      widthRestrict={'max-w-[1299px]'}
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={continueKeywordCreation}
      >
        <Form
          className={`w-full text-left ${
            !isNew ? 'pt-[30px]' : ''
          } divide-y-[1px] dark:divide-darkMode-border divide-ash`}
        >
          {isNew && (
            <div className="py-4 px-14">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <span className="font-bold">
                    Provide Keywords list Details
                  </span>
                </div>
                <div className="flex">
                  <Button variant="reset" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    state={loading && 'loading'}
                    className="block w-fit"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className={`pb-[30px] ${isNew ? 'pt-[30px]' : ''} px-14`}>
            <FormGroup label="Keyword List Title" imp={true} labelFor="keyword">
              <Field
                as={Input}
                returnEvent={true}
                id="keyword"
                variant="dark"
                name="title"
                placeholder="Graphic Design keywords"
              />
              <ErrorMessage name="title" component={FieldErrorText} />
            </FormGroup>

            <FormGroup label="Keywords List Tags" imp={true} labelFor="tags">
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

          {!isNew && (
            <div className="form-group px-14 py-4 flex mb-0 justify-between">
              <div className="flex items-center">
                <span className="dark:text-darkMode-subText text-black">
                  Make sure to save the changes
                </span>
              </div>
              <div className="space-x-4 flex">
                <Button variant="reset" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  state={loading && 'loading'}
                  className="block w-fit"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </DialogLayout>
  );
};

export default NewKeywordListDialog;
