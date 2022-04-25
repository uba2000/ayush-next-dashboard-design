import { createContext, useContext, useState, useEffect } from 'react'

import returnKeywords from '../_mock/keywords';

export const ProjectsContext = createContext();

export function ProjectsWrapper({ children }) {

  const [keywords, setKeywords] = useState(returnKeywords.keywords)

  let sharedState = {
    keywords,
    setKeywords,
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