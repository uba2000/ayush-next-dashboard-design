// import Head from 'next/head'
// import { Provider } from 'next-auth/client'

import { ProjectsWrapper } from '../context/projects'
import { ThemeWrapper } from '../context/theme'
import { AppWrapper } from '../context/state'
import { ThemeProvider } from 'next-themes'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    // <Provider>
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <AppWrapper>
        <ThemeWrapper>
          <ProjectsWrapper>
            <Component {...pageProps} />
          </ProjectsWrapper>
        </ThemeWrapper>
      </AppWrapper>
    </ThemeProvider>
    // </Provider>
  )
}

export default MyApp
