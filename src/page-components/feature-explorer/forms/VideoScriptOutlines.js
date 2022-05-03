import React from 'react'

import FormLayout from './FormLayout'
import FormGroup from '../../../components/FormGroup'
import DropdownLayout from '../../../components/layouts/Dropdown'
import Input from '../../../components/layouts/Input'
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout'

const VideoScriptOutlines = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={'Write an outline before diving into the full script to break your video into sections.'}
      generate={generate}
      data={{
        language: explorerState.language,
        creativity: explorerState.creativity,
        audience: explorerState.audience,
        voiceTone: explorerState.voiceTone,
        textAreaContent: explorerState.textAreaContent
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
      <ExplorerTwoInputLayout>
        <FormGroup label={<LabelLayout>Tone of voice:</LabelLayout>} labelFor={'voiceTone'}>
          <DropdownLayout
            options={explorerState.voiceTones}
            value={explorerState.voiceTone}
            onChange={(value) => dispatch({ value, type: 'setVoiceTone' })}
            id={'voiceTone'}
          />
        </FormGroup>
        <FormGroup label={<LabelLayout>Audience</LabelLayout>} labelFor={'audience'}>
          <Input
            value={explorerState.audience}
            onChange={(e) => dispatch({ value: e.target.value, type: 'setAudience' })}
            id={'audience'}
            placeholder="Freelancers, kids"
            className="rounded"
          />
        </FormGroup>
      </ExplorerTwoInputLayout>
      <FormGroup label={<LabelLayout>What is your video about:</LabelLayout>} labelFor={'subHeading'} className="mb-4">
        <textarea
          value={explorerState.textAreaContent}
          onChange={(e) => dispatch({ value: e.target.value, type: 'setTextAreaContent' })}
          id={'subHeading'}
          placeholder='Briefly describe what your website or bussiness is about'
          className='rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black '
        ></textarea>
      </FormGroup>
    </FormLayout>
  )
}

export { VideoScriptOutlines }