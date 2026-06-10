import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { pagesConfig } from '@/pages.config';
import PageNotFound from '@/lib/PageNotFound';

import { auth } from "@/lib/auth"
// import { upgradeToPendingSegment } from 'next/dist/client/components/segment-cache/cache';
// import { GetServerSideProps } from "next"

export const getServerSideProps = async ({ req, res }) => {
  const session = await auth.api.getSession({
    headers: new Headers(req.headers),
  })

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } }
  }
  
  // return { props: { user: JSON.parse(JSON.stringify(session.user)) } }
  return {
    props: {
      user: {
        ...session.user,
        // Ensure dates are serialized properly
        createdAt: session.user.createdAt instanceof Date ? session.user.createdAt.toISOString() : (session.user.createdAt ?? null),
        updatedAt: session.user.updatedAt instanceof Date ? session.user.updatedAt.toISOString() : (session.user.updatedAt ?? null),
        role: session.user.role ?? null,
        banned: session.user.banned ?? null,
        banReason: session.user.banReason ?? null,
        banExpires: session.user.banExpires instanceof Date ? session.user.banExpires.toISOString() : (session.user.banExpires ?? null),
        first_name: session.user.firstName ?? session.user.first_name ?? null,
        last_name: session.user.lastName ?? session.user.last_name ?? null,
        custom_role: session.user.customRole ?? session.user.custom_role ?? null,
        default_site: session.user.defaultSite ?? session.user.default_site ?? null,
        defaultBrands: session.user.defaultBrands ?? [],
      }
    }
  }
}

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
