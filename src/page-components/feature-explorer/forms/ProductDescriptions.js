import React from 'react';

import FormLayout from './FormLayout';
import FormGroup from '../../../components/FormGroup';
import DropdownLayout from '../../../components/layouts/Dropdown';
import { Input } from '../../../ui/input';
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout';

const ProductDescriptions = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={
        "Write a unique, creative, and strategic description that's designed to increase sales."
      }
      generate={generate}
      data={{
        language: explorerState.language,
        creativity: explorerState.creativity,
        audience: explorerState.audience,
        productName: explorerState.productName,
        productDescription: explorerState.productDescription,
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
          label={<LabelLayout>Product Name:</LabelLayout>}
          labelFor={'productName'}
        >
          <Input
            value={explorerState.productName}
            variant="dark"
            onChange={(e) => dispatch({ value: e, type: 'setProductName' })}
            id={'productName'}
            placeholder="google, Uber"
            className="rounded"
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

export { ProductDescriptions };
