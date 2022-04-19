// import Head from 'next/head'
import { AppWrapper } from '../context/state'
import { ThemeProvider } from 'next-themes'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </ThemeProvider>
  )
}

export default MyApp
