import { createContext, useContext, useState, useEffect } from 'react'

import returnKeywordList from '../_mock/keywordList';
import returnKeywords from '../_mock/keywords';
import articles from '../_mock/articles';

export const ProjectsContext = createContext();

export function ProjectsWrapper({ children }) {

  const [keywords, setKeywords] = useState(returnKeywords.keywords)
  const [keywordList, setKeywordList] = useState(returnKeywordList.keywordList)
  const [projectArticles, setProjectArticles] = useState(articles)

  let sharedState = {
    keywords,
    setKeywords,
    keywordList,
    setKeywordList,
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