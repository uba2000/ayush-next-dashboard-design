import { createContext, useContext, useState, useEffect } from 'react'
import { useTheme } from 'next-themes';

export const AppContext = createContext();

export function AppWrapper({ children }) {

  // Dark Mode Config
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { theme, setTheme } = useTheme()

  const toogleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setIsDarkMode(theme !== 'dark')
  }, [theme])

  let sharedState = {
    themeMode: {
      theme,
      isDarkMode,
      setTheme,
      toogleTheme,
    }
  }

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