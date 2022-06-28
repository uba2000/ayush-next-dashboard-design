import React from 'react';

import FormLayout from './FormLayout';
import FormGroup from '../../../components/FormGroup';
import DropdownLayout from '../../../components/layouts/Dropdown';
import { Input } from '../../../ui/input';
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout';

const GoogleAdsDescription = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={
        'Write a Google Ads description that makes your ad stand out and generates leads.'
      }
      generate={generate}
      data={{
        language: explorerState.language,
        creativity: explorerState.creativity,
        voiceTone: explorerState.voiceTone,
        audience: explorerState.audience,
        productName: explorerState.productName,
        productDescription: explorerState.productDescription,
      }}
    >
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
      <ExplorerTwoInputLayout>
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
      </ExplorerTwoInputLayout>
      <ExplorerTwoInputLayout>
        <FormGroup
          label={<LabelLayout>Audience</LabelLayout>}
          labelFor={'audience'}
        >
          <Input
            value={explorerState.audience}
            variant="dark"
            onChange={(e) => dispatch({ value: e, type: 'setAudience' })}
            id={'audience'}
            placeholder="Freelancers, kids"
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
            id={'productName'}
            variant="dark"
            placeholder="google, Uber"
            className="rounded"
          />
        </FormGroup>
      </ExplorerTwoInputLayout>
      <FormGroup
        label={<LabelLayout>Product Description:</LabelLayout>}
        labelFor={'subHeading'}
        className="mb-4"
      >
        <textarea
          value={explorerState.productDescription}
          onChange={(e) =>
            dispatch({ value: e.target.value, type: 'setProductDescription' })
          }
          id={'keywords'}
          placeholder="Briefly describe what your website or bussiness is about"
          className="rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black "
        ></textarea>
      </FormGroup>
    </FormLayout>
  );
};

export { GoogleAdsDescription };
