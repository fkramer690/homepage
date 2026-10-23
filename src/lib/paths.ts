// German is the main version at the root, English lives under /en/.
const base = import.meta.env.BASE_URL;

export type Lang = 'en' | 'de';

export const homeHref = (lang: Lang) => (lang === 'de' ? base : `${base}en/`);

// Path of a page below the language root, e.g. localHref('en', 'speaking/').
export const localHref = (lang: Lang, path: string) => `${homeHref(lang)}${path}`;
