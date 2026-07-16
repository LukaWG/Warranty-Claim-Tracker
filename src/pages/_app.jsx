import '@/index.css';
import '@/App.css';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import VisualEditAgent from '@/lib/VisualEditAgent';
import NavigationTracker from '@/lib/NavigationTracker';
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
        <NavigationTracker />
        {Content}
        <Toaster />
        <VisualEditAgent />
      </QueryClientProvider>
  );
}

export default MyApp;
