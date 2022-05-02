import React from 'react'

import FormLayout from './FormLayout'
import FormGroup from '../../../components/FormGroup'
import DropdownLayout from '../../../components/layouts/Dropdown'
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout'

const VideoTitles = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={'Write a compelling YouTube video title to catch people\'s attention.'}
      generate={generate}
      data={{
        language: explorerState.language,
        creativity: explorerState.creativity,
        rewrite: explorerState.textAreaContent
      }}
    >
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
      <FormGroup label={<LabelLayout>What is your video about:</LabelLayout>} labelFor={'subHeading'} className="mb-4">
        <textarea
          value={explorerState.textAreaContent}
          onChange={(e) => dispatch({ value: e.target.value, type: 'setTextAreaContent' })}
          id={'keywords'}
          placeholder='Beriefly describe what your website or bussiness is about'
          className='rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black '
        ></textarea>
      </FormGroup>
    </FormLayout>
  )
}

export { VideoTitles }