import React from 'react'

import FormLayout from './FormLayout'
import FormGroup from '../../../components/FormGroup'
import DropdownLayout from '../../../components/layouts/Dropdown'
import Input from '../../../components/layouts/Input'
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout'

const StartupNameGenerator = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={'Write a compelling line about what your product is and why your prospects need it.'}
      generate={generate}
      data={{
        creativity: explorerState.creativity,
        seedWords: explorerState.seedWords,
        productDescription: explorerState.productDescription
      }}
    >
      <ExplorerTwoInputLayout>
        <FormGroup label={<LabelLayout>Creativity:</LabelLayout>} labelFor={'creativity'}>
          <DropdownLayout
            options={explorerState.creativities}
            value={explorerState.creativity}
            onChange={(value) => dispatch({ value, type: 'setCreativity' })}
            id={'creativity'}
          />
        </FormGroup>
        <FormGroup label={<LabelLayout>Seed Words:</LabelLayout>} labelFor={'seedwords'}>
          <Input
            value={explorerState.seedWords}
            onChange={(e) => dispatch({ value: e.target.value, type: 'setSeedWords' })}
            id={'seedwords'}
            placeholder="e.g fit, flow, app"
            className="rounded"
          />
        </FormGroup>
      </ExplorerTwoInputLayout>
      <FormGroup label={<LabelLayout>Product Description:</LabelLayout>} labelFor={'subHeading'} className="mb-4">
        <textarea
          value={explorerState.productDescription}
          onChange={(e) => dispatch({ value: e.target.value, type: 'setProductDescription' })}
          id={'keywords'}
          placeholder='Briefly describe what your website or bussiness is about'
          className='rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black '
        ></textarea>
      </FormGroup>
    </FormLayout>
  )
}

export { StartupNameGenerator }