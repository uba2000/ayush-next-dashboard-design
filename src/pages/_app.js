// import Head from 'next/head'
// import { Provider } from 'next-auth/client'
import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SessionProvider, useSession, signIn } from 'next-auth/react'

import { ProjectsWrapper } from '../context/projects'
import { ThemeWrapper } from '../context/theme'
import { AppWrapper } from '../context/state'
import { ThemeProvider } from 'next-themes'

import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()

  return (
    // <Provider>
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        <AppWrapper>
          <ThemeWrapper>
            <ProjectsWrapper>
              {Component.auth ? (
                // <Auth>
                <Component {...pageProps} />
                // </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </ProjectsWrapper>
          </ThemeWrapper>
        </AppWrapper>
      </ThemeProvider>
    </SessionProvider>
    // </Provider>
  )
}

const Auth = ({ children }) => {
  const { data: session, status } = useSession()
  const isUser = !!session?.user

  useEffect(() => {
    if (status === "loading") return
    if (!isUser) signIn()
  }, [isUser, status])

  if (isUser) {
    return children
  }

  return <></>
}

export default MyApp
