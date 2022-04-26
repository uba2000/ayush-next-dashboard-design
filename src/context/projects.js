import { createContext, useContext, useState, useEffect, useReducer } from 'react'

import returnKeywordList from '../_mock/keywordList';
import returnKeywords from '../_mock/keywords';
import articles from '../_mock/articles';
import features from '../_mock/features';
import featureList from '../_mock/featuresList';

export const ProjectsContext = createContext();

const initialState = {
  // Keywords State
  keywords: returnKeywords.keywords,
  keywordList: returnKeywordList.keywordList,
  // Features State
  projectFeatures: features,
  projectFeatureList: featureList,
  // Articles State
  projectArticles: articles
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setKeywords':
      return { keywords: action.value, ...state }
    case 'setKeywordList':
      return { keywordList: action.value, ...state }
    case 'setProjectFeatures':
      return { projectFeatures: action.value, ...state }
    case 'setProjectFeatureList':
      return { projectFeatureList: action.value, ...state }
    case 'setProjectArticles':
      return { projectArticles: action.value, ...state }
  }
}

export function ProjectsWrapper({ children }) {

  const [projectState, dispatch] = useReducer(reducer, initialState)

  const getAFeatureList = (id) => {
    return projectState.projectFeatureList.find((fl) => fl.id == id)
  }

  const deleteAFeatureListContent = ({ featureId, featureListContentId }) => {
    let featureList = projectState.projectFeatureList
    let featureListContentIndex = featureList.findIndex((pl) => pl.id == featureId)
    let newFeatureList = featureList[featureListContentIndex].featureContent.filter(fc => fc.id != featureListContentId)
    dispatch({ type: 'setProjectFeatureList', value: newFeatureList })
  }

  const setState = (action) => {
    dispatch(action)
  }


  let sharedState = {
    keywords: projectState.keywords,
    setKeywords: (value) => setState({ type: 'setKeywords', value }),
    keywordList: projectState.keywordList,
    setKeywordList: (value) => setState({ type: 'setKeywordList', value }),

    projectFeatures: projectState.projectFeatures,
    setProjectFeatures: (value) => setState({ type: 'setProjectFeatures', value }),
    projectFeatureList: projectState.projectFeatureList,
    setProjectFeatureList: (value) => setState({ type: 'setProjectFeatureList', value }),
    getAFeatureList,
    deleteAFeatureListContent,

    articles: projectState.projectArticles,
    setArticles: (value) => setState({ type: 'setProjectArticles', value }),
  }

  return (
    <ProjectsContext.Provider value={sharedState}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjectsContext() {
  return useContext(ProjectsContext);
}