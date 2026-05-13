import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';
import { base44 } from '@/api/base44Client';
import { pagesConfig } from '@/pages.config';

export default function NavigationTracker() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { Pages, mainPage } = pagesConfig;
    const mainPageKey = mainPage ?? Object.keys(Pages)[0];

    // Post navigation changes to parent window
    useEffect(() => {
        window.parent?.postMessage({
            type: 'app_changed_url',
            url: window.location.href,
        }, '*');
    }, [router.asPath]);

    // Log user activity when navigating to a page
    useEffect(() => {
        const rawPathname = router.asPath || '/';
        const normalizedPathname = rawPathname.replace(/^\/Warranty-Claim-Tracker/, '') || '/';
        let pageName;

        if (normalizedPathname === '/' || normalizedPathname === '') {
            pageName = mainPageKey;
        } else {
            const pathSegment = normalizedPathname.replace(/^\//, '').split('/')[0];
            const pageKeys = Object.keys(Pages);
            const matchedKey = pageKeys.find(
                key => key.toLowerCase() === pathSegment.toLowerCase()
            );
            pageName = matchedKey || null;
        }

        if (isAuthenticated && pageName) {
            base44.appLogs.logUserInApp(pageName).catch(() => {
                // Silently fail - logging shouldn't break the app
            });
        }
    }, [router.asPath, isAuthenticated, Pages, mainPageKey]);

    return null;
}