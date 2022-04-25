import { createContext, useContext, useState, useEffect } from 'react'

import returnKeywordList from '../_mock/keywordList';
import returnKeywords from '../_mock/keywords';
import articles from '../_mock/articles';
import features from '../_mock/features';
import featureList from '../_mock/featuresList';

export const ProjectsContext = createContext();

export function ProjectsWrapper({ children }) {

  // Keywords State
  const [keywords, setKeywords] = useState(returnKeywords.keywords)
  const [keywordList, setKeywordList] = useState(returnKeywordList.keywordList)

  // Features State
  const [projectFeatures, setProjectFeatures] = useState(features)
  const [projectFeatureList, setProjectFeatureList] = useState(featureList)

  // Articles State
  const [projectArticles, setProjectArticles] = useState(articles)

  let sharedState = {
    keywords,
    setKeywords,
    keywordList,
    setKeywordList,

    projectFeatures,
    setProjectFeatures,
    projectFeatureList,
    setProjectFeatureList,

    articles: projectArticles,
    setArticles: setProjectArticles,
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