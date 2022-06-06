import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SessionProvider, useSession, signIn } from 'next-auth/react';

import { Progress } from '../components/layouts/progress';
import { ProjectsWrapper } from '../context/projects';
import { ThemeWrapper } from '../context/theme';
import { AppWrapper } from '../context/state';
import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <Progress isAnimating={isAnimating} />
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="dark"
        >
          <AppWrapper>
            <ThemeWrapper>
              <ProjectsWrapper>
                {Component.auth ? (
                  <Auth>
                    <Component {...pageProps} />
                  </Auth>
                ) : (
                  <Component {...pageProps} />
                )}
              </ProjectsWrapper>
            </ThemeWrapper>
          </AppWrapper>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

const Auth = ({ children }) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === 'loading') return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  return <></>;
};

export default MyApp;
