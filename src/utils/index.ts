export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/Warranty-Claim-Tracker';

export function createPageUrl(pageName: string) {
    if (!pageName || pageName === '/') {
        return `${BASE_PATH}`;
    }

    return `${BASE_PATH}/${pageName.replace(/ /g, '-')}`;
}
