import React from 'react'

import FormLayout from './FormLayout'
import FormGroup from '../../../components/FormGroup'
import DropdownLayout from '../../../components/layouts/Dropdown'
import Input from '../../../components/layouts/Input'
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout'

const MetaDescription = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={'Write SEO-optimized meta description based on a description.'}
      generate={generate}
      data={{
        language: explorerState.language,
        creativity: explorerState.creativity,
        typesOfPage: explorerState.typesOfPage,
        targetedKeywords: explorerState.keywordInput,
        websiteName: explorerState.websiteName,
        websiteDescription: explorerState.textAreaContent
      }}
    >

      <ExplorerTwoInputLayout>
        <FormGroup label={<LabelLayout>Language:</LabelLayout>} labelFor={'languages'}>
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
      <FormGroup label={<LabelLayout>Type of Page:</LabelLayout>} labelFor={'typesOfPage'}>
        <DropdownLayout
          options={explorerState.typesOfPages}
          value={explorerState.typesOfPage}
          onChange={(value) => dispatch({ value, type: 'setTypesOfPage' })}
          id={'typesOfPage'}
        />
      </FormGroup>
      <FormGroup label={<LabelLayout>Website Name:</LabelLayout>} labelFor={'websiteName'}>
        <Input
          value={explorerState.websiteName}
          onChange={(e) => dispatch({ value: e.target.value, type: 'setWebsiteName' })}
          id={'websiteName'}
          placeholder="E.g Google"
          className="rounded"
        />
      </FormGroup>
      <FormGroup label={<LabelLayout>Website Description:</LabelLayout>} labelFor={'subHeading'} className="mb-4">
        <textarea
          value={explorerState.textAreaContent}
          onChange={(e) => dispatch({ value: e.target.value, type: 'setTextAreaContent' })}
          id={'keywords'}
          placeholder='Briefly describe what your website or bussiness is about'
          className='rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black '
        ></textarea>
      </FormGroup>
      <FormGroup label={<LabelLayout>Targeted keyword:</LabelLayout>} labelFor={'keywordInput'}>
        <Input
          value={explorerState.keywordInput}
          onChange={(e) => dispatch({ value: e.target.value, type: 'setKeywordInput' })}
          id={'keywordInput'}
          placeholder="E.g copywriting"
          className="rounded"
        />
      </FormGroup>
    </FormLayout>
  )
}

export { MetaDescription }