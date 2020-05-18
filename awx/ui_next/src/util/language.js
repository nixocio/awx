export function getLanguage(nav) {
    console.log(nav, 'nav');
    if (nav.languages && nav.languages[0]) {
        console.log(nav.languages[0], 'nav.languages[0]');
        return nav.languages[0];

    }
    if (nav.language) {
        console.log(nav.language, 'nav.language');
        return nav.language;

    }
    console.log(nav.userLanguage, 'nav.userLanguage');
    return nav.userLanguage;
}

export function getLanguageWithoutRegionCode(nav) {
    return getLanguage(nav)
        .toLowerCase()
        .split(/[_-]+/)[0];
}