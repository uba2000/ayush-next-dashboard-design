import { createContext, useContext, useState, useEffect } from 'react'

export const AppContext = createContext();

export function AppWrapper({ children }) {

  const [toEditArticle, setToEditArticle] = useState(false)
  const [newProjectData, setNewProjectData] = useState(null)
  const [isShowNewProject, setIsShowNewProject] = useState(false)
  const [isShowEditArticle, setIsShowEditArticle] = useState(false)

  let sharedState = {
    layout: {
      showNewProject: isShowNewProject,
      setShowNewProject: setIsShowNewProject,

      showEditArticle: isShowEditArticle,
      setShowEditArticle: setIsShowEditArticle,

      toEditArticle,
      setToEditArticle: (value) => setToEditArticle(value),
    },
    project: {
      newProjectData,
      setNewProjectData
    }
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}