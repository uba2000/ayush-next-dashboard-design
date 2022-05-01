import React from 'react'

import FormLayout from './FormLayout'
import FormGroup from '../../../components/FormGroup'
import DropdownLayout from '../../../components/layouts/Dropdown'
import Input from '../../../components/layouts/Input'
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout'

const ParagraphWriter = ({ explorerState, dispatch }) => {
  return (
    <FormLayout subText={'Write original and human-like paragraphs based on your blog subheading (h2, h3, h4,...).'}>
      <ExplorerTwoInputLayout>
        <FormGroup label={<LabelLayout>Languages:</LabelLayout>} labelFor={'languages'}>
          <DropdownLayout
            options={explorerState.languages}
            value={explorerState.language}
            onChange={(value) => dispatch({ value, type: 'setLanguage' })}
            id={'languages'}
          />
        </FormGroup>
        <FormGroup label={<LabelLayout>Creativity:</LabelLayout>} labelFor={'creativity'}>
          <DropdownLayout
            options={explorerState.creativities}
            value={explorerState.creativity}
            onChange={(value) => dispatch({ value, type: 'setCreativity' })}
            id={'creativity'}
          />
        </FormGroup>
      </ExplorerTwoInputLayout>
      <FormGroup label={<LabelLayout>Title of your blog article:</LabelLayout>} labelFor={'articleTitle'}>
        <Input
          value={explorerState.blogArticleTitle}
          onChange={(e) => dispatch({ value: e.target.value, type: 'setBlogArticleTitle' })}
          id={'articleTitle'}
          placeholder="e.g. 5 ways to boost your sales with copywriting"
          className="rounded"
        />
      </FormGroup>
      <FormGroup label={<LabelLayout>Subheading / Bullet Point:</LabelLayout>} labelFor={'subHeading'} className="mb-4">
        <textarea
          value={explorerState.articleSubHeading}
          onChange={(e) => dispatch({ value: e.target.value, type: 'setArticleSubHeading' })}
          id={'keywords'}
          placeholder='e.g. boost conversions by writing the best content'
          className='rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black '
        ></textarea>
      </FormGroup>
      <button className="btn btn-primary w-full font-medium text-base">
        Generate
      </button>
    </FormLayout>
  )
}

export { ParagraphWriter }