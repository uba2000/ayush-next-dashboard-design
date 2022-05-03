import React, { createContext, useContext, useReducer } from 'react'

import features from '../_mock/features';

export const ExplorerContext = createContext();

const searchEngines = ['google', 'bing']
const searchEnginesTypes = ['organic search']
const locations = ['united kingdom']
const languages = ['english']
const devices = ['desktop', 'tablet', 'mobile phone']
const oss = ['windows', 'macos', 'linux']
const depths = ['01']
const creativities = ['regular', 'professional']
const voiceTones = ['regular', 'intermediate']
const typesOfPages = ['landing page', 'sign up page']

const initialState = {
  searchEngine: searchEngines[0],
  searchEngineType: searchEnginesTypes[0],
  searchEngineParameters: '',
  typesOfPage: typesOfPages[0],
  blogArticleTitle: '',
  articleSubHeading: '',
  audience: '',
  productName: '',
  businessName: '',
  productDescription: '',
  businessDescription: '',
  textAreaContent: '',
  keywordInput: '',
  categoryName: '',
  sectionTitle: '',
  seedWords: '',
  specialInput1: '',
  websiteName: '',
  websiteUrl: '',
  keywords: [],
  location: locations[0],
  language: languages[0],
  device: devices[0],
  os: oss[0],
  depth: depths[0],
  creativity: creativities[0],
  voiceTone: voiceTones[0]
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setWebsiteName':
      return { ...state, websiteName: action.value }
    case 'setTypesOfPage':
      return { ...state, typesOfPage: action.value }
    case 'setWebsiteUrl':
      return { ...state, websiteUrl: action.value }
    case 'setSearchEngine':
      return { ...state, searchEngine: action.value }
    case 'setSearchEngineType':
      return { ...state, searchEngineType: action.value }
    case 'setLocation':
      return { ...state, location: action.value }
    case 'setLanguage':
      return { ...state, language: action.value }
    case 'setDevices':
      return { ...state, device: action.value }
    case 'setOs':
      return { ...state, os: action.value }
    case 'setDepth':
      return { ...state, depth: action.value }
    case 'setSearchEngineParameters':
      return { ...state, searchEngineParameters: action.value }
    case 'setBlogArticleTitle':
      return { ...state, blogArticleTitle: action.value }
    case 'setArticleSubHeading':
      return { ...state, articleSubHeading: action.value }
    case 'setKeywords':
      return { ...state, keywords: action.value }
    case 'setCreativity':
      return { ...state, creativity: action.value }
    case 'setVoiceTone':
      return { ...state, voiceTone: action.value }
    case 'setAudience':
      return { ...state, audience: action.value }
    case 'setProductName':
      return { ...state, productName: action.value }
    case 'setProductDescription':
      return { ...state, productDescription: action.value }
    case 'setBusinessName':
      return { ...state, businessName: action.value }
    case 'setBusinessDescription':
      return { ...state, businessDescription: action.value }
    case 'setTextAreaContent':
      return { ...state, textAreaContent: action.value }
    case 'setKeywordInput':
      return { ...state, keywordInput: action.value }
    case 'setCategoryName':
      return { ...state, categoryName: action.value }
    case 'setSeedWords':
      return { ...state, seedWords: action.value }
    case 'setSectionTitle':
      return { ...state, sectionTitle: action.value }
    case 'setSpecialInput1':
      return { ...state, specialInput1: action.value }
    default:
      return state
  }
}

export function ExplorerWrapper({ children }) {

  const [explorerState, dispatch] = useReducer(reducer, initialState)

  const generate = ({ slug, data }) => {
    console.log(`${slug}:`, data);
  }

  const getFeatureBySlug = (slug) => {
    return features.filter((feature) => feature.slug == slug)[0]
  }

  let sharedState = {
    explorerState: {
      ...explorerState,
      searchEngines,
      searchEnginesTypes,
      locations,
      languages,
      devices,
      oss,
      depths,
      creativities,
      voiceTones,
      typesOfPages,
    },
    dispatch,
    generate,
    getFeatureBySlug,
  }

  return (
    <ExplorerContext.Provider value={sharedState}>
      {children}
    </ExplorerContext.Provider>
  );
}

export function useExplorerContext() {
  return useContext(ExplorerContext);
}