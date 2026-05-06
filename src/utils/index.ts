export function createPageUrl(pageName: string) {
    return '/test' + pageName.replace(/ /g, '-');
}
