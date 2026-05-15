import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createPageUrl } from '@/utils';
import { pagesConfig } from '@/pages.config';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const mainPageKey = pagesConfig.mainPage ?? 'ClaimForm';
      router.replace(createPageUrl(mainPageKey));
    }
  }, [router.isReady, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
    </div>
  );
}
