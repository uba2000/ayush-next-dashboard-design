import { createContext, useContext, useState, useEffect } from 'react'

export const AppContext = createContext();

export function AppWrapper({ children }) {

  const [isShowNewProject, setIsShowNewProject] = useState(false)
  const [newProjectData, setNewProjectData] = useState(null)

  let sharedState = {
    layout: {
      showNewProject: isShowNewProject,
      setShowNewProject: setIsShowNewProject,
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