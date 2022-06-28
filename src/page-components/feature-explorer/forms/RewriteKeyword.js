import React from 'react';

import FormLayout from './FormLayout';
import FormGroup from '../../../components/FormGroup';
import DropdownLayout from '../../../components/layouts/Dropdown';
import { Input } from '../../../ui/input';
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout';

const RewriteKeyword = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={
        'Write the general idea of your next blog post. Outlining made easier and faster.'
      }
      generate={generate}
      data={{
        language: explorerState.language,
        creativity: explorerState.creativity,
        keyword: explorerState.keywordInput,
        rewrite: explorerState.textAreaContent,
      }}
    >
      <ExplorerTwoInputLayout>
        <FormGroup
          label={<LabelLayout>Languages:</LabelLayout>}
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
      <FormGroup
        label={<LabelLayout>Keyword:</LabelLayout>}
        labelFor={'keyword'}
      >
        <Input
          value={explorerState.keywordInput}
          onChange={(e) => dispatch({ value: e, type: 'setKeywordInput' })}
          variant="dark"
          id={'keyword'}
          placeholder="News"
          className="rounded"
        />
      </FormGroup>
      <FormGroup
        label={<LabelLayout>What would you like to rewrite?</LabelLayout>}
        labelFor={'subHeading'}
        className="mb-4"
      >
        <textarea
          value={explorerState.textAreaContent}
          onChange={(e) =>
            dispatch({ value: e.target.value, type: 'setTextAreaContent' })
          }
          id={'keywords'}
          placeholder="start ping or paste content here"
          className="rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black "
        ></textarea>
      </FormGroup>
    </FormLayout>
  );
};

export { RewriteKeyword };
