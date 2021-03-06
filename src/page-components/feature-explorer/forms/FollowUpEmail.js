import React from 'react';

import FormLayout from './FormLayout';
import FormGroup from '../../../components/FormGroup';
import DropdownLayout from '../../../components/layouts/Dropdown';
import { Input } from '../../../ui/input';
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout';

const FollowUpEmail = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={
        'Write an email to engage with your leads in response to an action: free trial, meeting, call,...'
      }
      generate={generate}
      data={{
        language: explorerState.language,
        creativity: explorerState.creativity,
        audience: explorerState.audience,
        voiceTone: explorerState.voiceTone,
        productName: explorerState.productName,
        textAreaContent: explorerState.textAreaContent,
        followUpAfter: explorerState.specialInput1,
      }}
    >
      <ExplorerTwoInputLayout>
        <FormGroup
          label={<LabelLayout>Language:</LabelLayout>}
          labelFor={'languages'}
        >
          <DropdownLayout
            options={explorerState.languages}
            value={explorerState.language}
            onChange={(value) => dispatch({ value, type: 'setLanguage' })}
            id={'languages'}
          />
        </FormGroup>
        <FormGroup
          label={<LabelLayout>Creativity:</LabelLayout>}
          labelFor={'creativity'}
        >
          <DropdownLayout
            options={explorerState.creativities}
            value={explorerState.creativity}
            onChange={(value) => dispatch({ value, type: 'setCreativity' })}
            id={'creativity'}
          />
        </FormGroup>
      </ExplorerTwoInputLayout>
      <ExplorerTwoInputLayout>
        <FormGroup
          label={<LabelLayout>Tone of voice:</LabelLayout>}
          labelFor={'voiceTone'}
        >
          <DropdownLayout
            options={explorerState.voiceTones}
            value={explorerState.voiceTone}
            onChange={(value) => dispatch({ value, type: 'setVoiceTone' })}
            id={'voiceTone'}
          />
        </FormGroup>
        <FormGroup
          label={<LabelLayout>Audience</LabelLayout>}
          labelFor={'audience'}
        >
          <Input
            value={explorerState.audience}
            onChange={(e) => dispatch({ value: e, type: 'setAudience' })}
            variant="dark"
            id={'audience'}
            placeholder="Freelancers, kids"
            className="rounded"
          />
        </FormGroup>
      </ExplorerTwoInputLayout>
      <ExplorerTwoInputLayout>
        <FormGroup
          label={<LabelLayout>Following up after:</LabelLayout>}
          labelFor={'productName'}
        >
          <Input
            value={explorerState.specialInput1}
            onChange={(e) => dispatch({ value: e, type: 'setSpecialInput1' })}
            variant="dark"
            id={'productName'}
            placeholder="free t rial, seminar,"
            className="rounded"
          />
        </FormGroup>
        <FormGroup
          label={<LabelLayout>Product Name:</LabelLayout>}
          labelFor={'productName'}
        >
          <Input
            value={explorerState.productName}
            onChange={(e) => dispatch({ value: e, type: 'setProductName' })}
            variant="dark"
            id={'productName'}
            placeholder="google, Uber"
            className="rounded"
          />
        </FormGroup>
      </ExplorerTwoInputLayout>
      <FormGroup
        label={<LabelLayout>What is your video about:</LabelLayout>}
        labelFor={'subHeading'}
        className="mb-4"
      >
        <textarea
          value={explorerState.textAreaContent}
          onChange={(e) =>
            dispatch({ value: e.target.value, type: 'setTextAreaContent' })
          }
          id={'subHeading'}
          placeholder="Briefly describe what your website or bussiness is about"
          className="rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black "
        ></textarea>
      </FormGroup>
    </FormLayout>
  );
};

export { FollowUpEmail };
