import React from 'react'
import { useRouter } from 'next/router'

import Input from '../../components/layouts/Input'
import FormGroup from '../../components/FormGroup'
import { fTags } from '../../utils/formatTags'
import FormLayout from './forms/FormLayout'
import DropdownLayout from '../../components/layouts/Dropdown'
import { ExplorerTwoInputLayout, LabelLayout } from './ExplorerLayout'
import {
  ParagraphWriter,
  FacebookPrimaryText,
  FacebookHeadlines,
  GoogleAdsHeadlines,
  GoogleAdsDescription,
  BlogTitles,
  BlogIdeas,
  BlogIntros,
  BlogOutlines,
  VideoTitles,
  VideoDescription,
  QuoraAnswers,
  ParagraphRewriter,
  RewriteKeyword,
  TextSummarizer,
  GrammarRewriter,
  EssayIntros,
  EssayOutlines,
  EcommerceProductDescriptions,
  EcommerceCategoryDescriptions,
  EcommerceProductNames,
  ProductDescriptions,
  ValueProposition,
  FeatureBenefit,
  StartupNameGenerator,
  VideoScriptIntro,
  VideoScriptOutlines,
  VideoScriptSection
} from './forms'
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
    case 'paragraph-rewriter':
      return (
        <ParagraphRewriter
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
    case 'blog-titles':
      return (
        <BlogTitles
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'blog-ideas':
      return (
        <BlogIdeas
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'blog-intros':
      return (
        <BlogIntros
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'blog-outlines':
      return (
        <BlogOutlines
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'video-titles':
      return (
        <VideoTitles
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'video-descriptions':
      return (
        <VideoDescription
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'quora-answers':
      return (
        <QuoraAnswers
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'rewrite-with-keyword':
      return (
        <RewriteKeyword
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'text-summarizer-tl-dr-':
      return (
        <TextSummarizer
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'grammar-rewriter':
      return (
        <GrammarRewriter
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'essay-intros':
      return (
        <EssayIntros
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'essay-outlines':
      return (
        <EssayOutlines
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'ecommerce-product-descriptions':
      return (
        <EcommerceProductDescriptions
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'ecommerce-category-descriptions':
      return (
        <EcommerceCategoryDescriptions
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'ecommerce-product-names':
      return (
        <EcommerceProductNames
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'product-descriptions':
      return (
        <ProductDescriptions
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'value-proposition':
      return (
        <ValueProposition
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'feature-to-benefit':
      return (
        <FeatureBenefit
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'startup-name-generator':
      return (
        <StartupNameGenerator
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'video-script-intros':
      return (
        <VideoScriptIntro
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'video-script-outlines':
      return (
        <VideoScriptOutlines
          explorerState={explorerState}
          dispatch={dispatch}
          generate={generate}
        />
      )
    case 'video-script-section':
      return (
        <VideoScriptSection
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