import '@/index.css';
import '@/App.css';
import { useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { Toaster } from '@/components/ui/toaster';
import { pagesConfig } from '@/pages.config';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { Pages, mainPage, Layout } = pagesConfig;
  const mainPageKey = mainPage ?? Object.keys(Pages)[0];

  const currentPageName = useMemo(() => {
    const rawPathname = router.asPath || '/';
    const normalizedPathname = rawPathname || '/';
    if (normalizedPathname === '/' || normalizedPathname === '') {
      return mainPageKey;
    }

    const pathSegment = normalizedPathname.replace(/^\//, '').split('/')[0];
    const matchedKey = Object.keys(Pages).find(
      key => key.toLowerCase() === pathSegment.toLowerCase(),
    );
    return matchedKey || pathSegment;
  }, [router.asPath, Pages, mainPageKey]);

  const Content = Layout ? (
    <Layout currentPageName={currentPageName}>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );

  return (
    // <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Head>
          <title>Warranty Repair Tracker</title>
          <link rel="icon" href="/favicon.ico" sizes="any" media="(prefers-color-scheme: light)" />
          <link rel="icon" href="/favicon-teal.ico" sizes="any" media="(prefers-color-scheme: dark)" />
        </Head>
        {Content}
        <Toaster />
      </QueryClientProvider>
  );
}

export default MyApp;
