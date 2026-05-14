export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function createPageUrl(pageName: string) {
    const normalizedBasePath = BASE_PATH === '/' ? '' : BASE_PATH;

    if (!pageName || pageName === '/') {
        return normalizedBasePath || '/';
    }

    return `${normalizedBasePath}/${pageName.replace(/ /g, '-')}`;
}
