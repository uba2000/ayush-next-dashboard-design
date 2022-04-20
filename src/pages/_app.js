// import Head from 'next/head'
import { ThemeWrapper } from '../context/theme'
import { AppWrapper } from '../context/state'
import { ThemeProvider } from 'next-themes'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <AppWrapper>
        <ThemeWrapper>
          <Component {...pageProps} />
        </ThemeWrapper>
      </AppWrapper>
    </ThemeProvider>
  )
}

export default MyApp
