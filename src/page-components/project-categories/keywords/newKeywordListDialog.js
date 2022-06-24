import React, { useState, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

import FormGroup from '../../../components/FormGroup';
import Input from '../../../components/layouts/Input';
import { DialogLayout } from '../../../components/layouts/Dialog';
import industries from '../../../_mock/industries';
import { fTags } from '../../../utils/formatTags';
import { post, setHeaders } from '../../../utils/http';
import useUser from '../../../hooks/useUser';
import { Button } from '../../../ui/button';

const NewKeywordListDialog = ({ isOpen, closeModal }) => {
  const { user } = useUser();

  const router = useRouter();

  const { query } = router;

  const [keywordListTitle, setKeywordList] = useState('');
  const [kTags, setKTags] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [showPredictIndustry, setShowPredictIndustry] = useState(false);

  const predictIndustry = (value) => {
    setSelectedIndustry(value);
    setShowPredictIndustry(selectedIndustry.length > 2);
  };

  const continueKeywordCreation = async () => {
    try {
      const { response, error } = await post({
        url: `${process.env.BASE_URL}/api/project/add-keywords`,
        headers: setHeaders({ token: user.accessToken }),
        data: {
          title: keywordListTitle,
          industry: selectedIndustry,
          tags: kTags,
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

  return (
    <DialogLayout
      isSharp={true}
      widthRestrict={'max-w-[1299px]'}
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <div className="w-full text-left pt-[30px] divide-y-[1px] dark:divide-darkMode-border divide-ash">
        <div className="pb-[30px] px-14">
          <FormGroup label="Keyword List Title" imp={true} labelFor="keyword">
            <Input
              id="keyword"
              value={keywordListTitle}
              onChange={(e) => setKeywordList(e.target.value)}
              placeholder="Graphic Design keywords"
            />
          </FormGroup>

          <FormGroup label="Keywords List Tags*" imp={true} labelFor="tags">
            <Input
              id="tags"
              value={kTags.join(', ')}
              onChange={(e) => setKTags(fTags(e.target.value))}
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
              value={selectedIndustry}
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
            <Button variant="reset" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              onClick={continueKeywordCreation}
              className="block w-fit"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </DialogLayout>
  );
};

export default NewKeywordListDialog;
