import React from 'react';

import FormLayout from './FormLayout';
import FormGroup from '../../../components/FormGroup';
import DropdownLayout from '../../../components/layouts/Dropdown';
import { Input } from '../../../ui/input';
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout';

const EcommerceCategoryDescriptions = ({
  explorerState,
  dispatch,
  generate,
}) => {
  return (
    <FormLayout
      subText={'Generate SEO-optimized descriptions for your store categories.'}
      generate={generate}
      data={{
        language: explorerState.language,
        creativity: explorerState.creativity,
        businessName: explorerState.businessName,
        audience: explorerState.audience,
        categoryName: explorerState.categoryName,
        keywordInput: explorerState.keywordInput,
        businessDescription: explorerState.businessDescription,
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
          label={<LabelLayout>Business Name:</LabelLayout>}
          labelFor={'productName'}
        >
          <Input
            value={explorerState.businessName}
            onChange={(e) => dispatch({ value: e, type: 'setBusinessName' })}
            id={'productName'}
            variant="dark"
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
            id={'audience'}
            placeholder="Freelancers, kids"
            variant="dark"
            className="rounded"
          />
        </FormGroup>
      </ExplorerTwoInputLayout>
      <FormGroup
        label={<LabelLayout>Business Description:</LabelLayout>}
        labelFor={'subHeading'}
        className="mb-4"
      >
        <textarea
          value={explorerState.businessDescription}
          onChange={(e) =>
            dispatch({ value: e.target.value, type: 'setBusinessDescription' })
          }
          id={'keywords'}
          placeholder="Briefly describe what your website or bussiness is about"
          className="rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black "
        ></textarea>
      </FormGroup>
      <ExplorerTwoInputLayout>
        <FormGroup
          label={<LabelLayout>Category Name:</LabelLayout>}
          labelFor={'categoryName'}
        >
          <Input
            value={explorerState.categoryName}
            onChange={(e) => dispatch({ value: e, type: 'setCategoryName' })}
            id={'categoryName'}
            placeholder="Shoes,clothing"
            variant="dark"
            className="rounded"
          />
        </FormGroup>
        <FormGroup
          label={<LabelLayout>Keyword:</LabelLayout>}
          labelFor={'keywordInput'}
        >
          <Input
            value={explorerState.keywordInput}
            onChange={(e) => dispatch({ value: e, type: 'setKeywordInput' })}
            id={'keywordInput'}
            placeholder="kid shoes"
            variant="dark"
            className="rounded"
          />
        </FormGroup>
      </ExplorerTwoInputLayout>
    </FormLayout>
  );
};

export { EcommerceCategoryDescriptions };
