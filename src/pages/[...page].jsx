import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { pagesConfig } from '@/pages.config';
import PageNotFound from '@/lib/PageNotFound';

export default function DynamicPage() {
  const router = useRouter();
  const { Pages, mainPage } = pagesConfig;
  const mainPageKey = mainPage ?? Object.keys(Pages)[0];

  const pageKey = useMemo(() => {
    if (!router.isReady) return null;

    const rawPathname = router.asPath || '/';
    const normalizedPathname = rawPathname || '/';

    if (normalizedPathname === '/' || normalizedPathname === '') {
      return mainPageKey;
    }

    const pathSegment = normalizedPathname.replace(/^\//, '').split('/')[0]; // Get first segment of the path
    // Check that Pages is defined and is an object before trying to find the key
    if (!Pages || typeof Pages !== 'object') {
      console.warn('Pages configuration is missing or invalid.');
      return null;
    }
    // Check that the path segment matches a page key (case-insensitive)
    const matchedKey = Object.keys(Pages).find(
      key => key.toLowerCase() === pathSegment.toLowerCase()
    );

    return matchedKey || null;
  }, [router.isReady, router.asPath, Pages, mainPageKey]);

  if (!router.isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!pageKey) {
    return <PageNotFound />;
  }

  const Page = Pages[pageKey];

  if (!Page) {
    return <PageNotFound />;
  }

  return <Page />;
}
