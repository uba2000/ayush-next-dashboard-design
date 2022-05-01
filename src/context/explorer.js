import React, { createContext, useContext, useReducer } from 'react'

export const ExplorerContext = createContext();

const searchEngines = ['google', 'bing']
const searchEnginesTypes = ['organic search']
const locations = ['united kingdom']
const languages = ['english']
const devices = ['desktop', 'tablet', 'mobile phone']
const oss = ['windows', 'macos', 'linux']
const depths = ['01']
const creativities = ['regular', 'intermediate']

const initialState = {
  searchEngine: searchEngines[0],
  searchEngineType: searchEnginesTypes[0],
  searchEngineParameters: '',
  blogArticleTitle: '',
  articleSubHeading: '',
  keywords: [],
  location: locations[0],
  language: languages[0],
  device: devices[0],
  os: oss[0],
  depth: depths[0],
  creativity: creativities[0],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setSearchEngine':
      return { searchEngine: action.value, ...state }
    case 'setSearchEngineType':
      return { searchEngineType: action.value, ...state }
    case 'setLocation':
      return { location: action.value, ...state }
    case 'setLanguage':
      return { language: action.value, ...state }
    case 'setDevices':
      return { device: action.value, ...state }
    case 'setOs':
      return { os: action.value, ...state }
    case 'setDepth':
      return { depth: action.value, ...state }
    case 'setSearchEngineParameters':
      return { searchEngineParameters: action.value, ...state }
    case 'setBlogArticleTitle':
      return { blogArticleTitle: action.value, ...state }
    case 'setArticleSubHeading':
      return { articleSubHeading: action.value, ...state }
    case 'setKeywords':
      return { keywords: action.value, ...state }
    case 'setCreativity':
      return { creativity: action.value, ...state }
    default:
      return state
  }
}

export function ExplorerWrapper({ children }) {

  const [explorerState, dispatch] = useReducer(reducer, initialState)

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
    },
    dispatch,
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