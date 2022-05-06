// import Head from 'next/head'
// import { Provider } from 'next-auth/client'
import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { ProjectsWrapper } from '../context/projects'
import { ThemeWrapper } from '../context/theme'
import { AppWrapper } from '../context/state'
import { ThemeProvider } from 'next-themes'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    router.events.on("routeChangeComplete", async () => {
      const { data } = await axios.get('/api/user')
      if (!data.user) {
        if (router.pathname.includes('/app')) {
          router.push('/signin')
        }
      }
    })
  }, [router.events])

  useEffect(async () => {
    const { data } = await axios.get('/api/user')
    if (!data.user) {
      if (router.pathname.includes('/app')) {
        router.push('/signin')
      }
    }
  }, [])

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
