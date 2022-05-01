import React from 'react'
import { useRouter } from 'next/router'

import Input from '../../components/layouts/Input'
import FormGroup from '../../components/FormGroup'
import { fTags } from '../../utils/formatTags'
import FormLayout from './forms/FormLayout'
import DropdownLayout from '../../components/layouts/Dropdown'
import { ExplorerTwoInputLayout, LabelLayout } from './ExplorerLayout'
import { ParagraphWriter, FacebookPrimaryText, FacebookHeadlines, GoogleAdsHeadlines, GoogleAdsDescription } from './forms'
import { useExplorerContext } from '../../context/explorer'


const ExplorerForms = ({ slug }) => {

  const {
    explorerState, dispatch, generate
  } = useExplorerContext()

  switch (slug) {
    case 'paragraph-writer':
      return (
        <ParagraphWriter
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'facebook-primary-text':
      return (
        <FacebookPrimaryText
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'facebook-headlines':
      return (
        <FacebookHeadlines
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'google-ads-headlines':
      return (
        <GoogleAdsHeadlines
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'google-ads-description':
      return (
        <GoogleAdsDescription
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )

    default:
      return (
        <>
          <FormLayout
            isDefault={true}
            subText={'I am so lorem ipum deloas In deloas with deloaorem ipsum doloamet'}
          >
            <ExplorerTwoInputLayout>
              <FormGroup label={<LabelLayout>Search Engine:</LabelLayout>} labelFor={'searchEngine'}>
                <DropdownLayout
                  options={explorerState.searchEngines}
                  value={explorerState.searchEngine}
                  onChange={(value) => { dispatch({ value, type: 'setSearchEngine' }); console.log(value); }}
                  id={'searchEngine'}
                />
              </FormGroup>
              <FormGroup label={<LabelLayout>Search Engine Type:</LabelLayout>} labelFor={'searchEngineType'}>
                <DropdownLayout
                  options={explorerState.searchEnginesTypes}
                  value={explorerState.searchEngineType}
                  onChange={(value) => dispatch({ value, type: 'setSearchEngineType' })}
                  id={'searchEngineType'}
                />
              </FormGroup>
            </ExplorerTwoInputLayout>
            <FormGroup label={<LabelLayout>Location:</LabelLayout>} labelFor={'location'}>
              <DropdownLayout
                options={explorerState.locations}
                value={explorerState.location}
                onChange={(value) => dispatch({ value, type: 'setLocation' })}
                id={'location'}
              />
            </FormGroup>
            <ExplorerTwoInputLayout>
              <FormGroup label={<LabelLayout>Languages:</LabelLayout>} labelFor={'languages'}>
                <DropdownLayout
                  options={explorerState.languages}
                  value={explorerState.language}
                  onChange={(value) => dispatch({ value, type: 'setLanguage' })}
                  id={'languages'}
                />
              </FormGroup>
              <FormGroup label={<LabelLayout>Device:</LabelLayout>} labelFor={'devices'}>
                <DropdownLayout
                  options={explorerState.devices}
                  value={explorerState.device}
                  onChange={(value) => dispatch({ value, type: 'setDevices' })}
                  id={'devices'}
                />
              </FormGroup>
            </ExplorerTwoInputLayout>
            <ExplorerTwoInputLayout>
              <FormGroup label={<LabelLayout>OS:</LabelLayout>} labelFor={'os'}>
                <DropdownLayout
                  options={explorerState.oss}
                  value={explorerState.os}
                  onChange={(value) => dispatch({ value, type: 'setOs' })}
                  id={'os'}
                />
              </FormGroup>
              <FormGroup label={<LabelLayout>Depth:</LabelLayout>} labelFor={'depths'}>
                <DropdownLayout
                  options={explorerState.depths}
                  value={explorerState.depth}
                  onChange={(value) => dispatch({ value, type: 'setDepth' })}
                  id={'depths'}
                />
              </FormGroup>
            </ExplorerTwoInputLayout>
            <FormGroup label={<LabelLayout>Search engine parameters:</LabelLayout>} labelFor={'searchEngineParameters'}>
              <Input
                value={explorerState.searchEngineParameters}
                onChange={(e) => dispatch({ value: e.target.value, type: 'setSearchEngineParameters' })}
                id={'searchEngineParameters'}
                placeholder="example: &tbs=qdr:h"
                className="rounded"
              />
            </FormGroup>
            <FormGroup label={<LabelLayout>Keywords:</LabelLayout>} labelFor={'keywords'} className="mb-4">
              <textarea
                value={explorerState.keywords.join(', ')}
                onChange={(e) => dispatch({ value: fTags(e.target.value), type: 'setKeywords' })}
                id={'keywords'}
                placeholder='E.g Weather Forecast'
                className='rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black '
              ></textarea>
            </FormGroup>
            <button className="btn btn-primary w-full font-medium text-base">
              Run SERP Explorer
            </button>
          </FormLayout>
        </>
      )
  }
}

export default ExplorerForms