import { createContext, useContext, useState, useEffect } from 'react'
import { useTheme } from 'next-themes';

export const AppContext = createContext();

export function AppWrapper({ children }) {

  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { theme, setTheme } = useTheme()

  const toogleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  let sharedState = {
    theme,
    isDarkMode,
    setTheme,
    toogleTheme,
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setIsDarkMode(theme !== 'dark')
  }, [theme])

  if (!mounted) return null

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}