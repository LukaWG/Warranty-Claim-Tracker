import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { pagesConfig } from '@/pages.config';
import PageNotFound from '@/lib/PageNotFound';

export default function DynamicPage() {
  const router = useRouter();
  const { pages, mainPage } = pagesConfig;
  const mainPageKey = mainPage ?? Object.keys(pages)[0];

  const pageKey = useMemo(() => {
    if (!router.isReady) return null;

    const rawPathname = router.asPath || '/';
    const normalizedPathname = rawPathname.replace(/^\/Warranty-Claim-Tracker/, '') || '/';

    if (normalizedPathname === '/' || normalizedPathname === '') {
      return mainPageKey;
    }

    const pathSegment = normalizedPathname.replace(/^\//, '').split('/')[0]; // Get first segment of the path
    // Check that pages is defined and is an object before trying to find the key
    if (!pages || typeof pages !== 'object') {
      console.warn('Pages configuration is missing or invalid.');
      return null;
    }
    // Check that the path segment matches a page key (case-insensitive)
    const matchedKey = Object.keys(pages).find(
      key => key.toLowerCase() === pathSegment.toLowerCase()
    );

    return matchedKey || null;
  }, [router.isReady, router.asPath, pages, mainPageKey]);

  if (!router.isReady || !pageKey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  const Page = pages[pageKey];

  if (!Page) {
    return <PageNotFound />;
  }

  return <Page />;
}
