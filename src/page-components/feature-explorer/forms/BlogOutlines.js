import React from 'react';

import FormLayout from './FormLayout';
import FormGroup from '../../../components/FormGroup';
import DropdownLayout from '../../../components/layouts/Dropdown';
import { Input } from '../../../ui/input';
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout';

const BlogOutlines = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={
        'Write the general idea of your next blog post. Outlining made easier and faster.'
      }
      generate={generate}
      data={{
        language: explorerState.language,
        creativity: explorerState.creativity,
        blogArticleTitle: explorerState.blogArticleTitle,
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
        label={<LabelLayout>Title of your blog article:</LabelLayout>}
        labelFor={'articleTitle'}
      >
        <Input
          value={explorerState.blogArticleTitle}
          onChange={(e) => dispatch({ value: e, type: 'setBlogArticleTitle' })}
          variant="dark"
          id={'articleTitle'}
          placeholder="e.g. 5 ways to boost your sales with copywriting"
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
          placeholder="e.g. a blog article about the best tools to increase your website traffic"
          className="rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black "
        ></textarea>
      </FormGroup>
    </FormLayout>
  );
};

export { BlogOutlines };
