import type { Language } from './i18n';

type RouteKey =
  | 'home'
  | 'expertises'
  | 'projects'
  | 'studio'
  | 'contact'
  | 'privacy'
  | 'legal';

const ROUTES: Record<RouteKey, Record<Language, string>> = {
  home: { fr: '/fr', en: '/en' },
  expertises: { fr: '/fr/expertises', en: '/en/expertise' },
  projects: { fr: '/fr/projets', en: '/en/projects' },
  studio: { fr: '/fr/studio', en: '/en/studio' },
  contact: { fr: '/fr/contact', en: '/en/contact' },
  privacy: { fr: '/fr/confidentialite', en: '/en/privacy' },
  legal: { fr: '/fr/mentions-legales', en: '/en/legal' },
};

export function route(key: RouteKey, lang: Language): string {
  return ROUTES[key][lang];
}

export function projectPath(slug: string, lang: Language): string {
  return lang === 'fr' ? `/fr/projets/${slug}` : `/en/projects/${slug}`;
}

export function alternateLang(current: Language): Language {
  return current === 'fr' ? 'en' : 'fr';
}

export function equivalentPath(pathname: string, target: Language): string {
  const clean = pathname.replace(/\/$/, '');

  const map: [RegExp, (m: RegExpMatchArray) => string][] = [
    [/^\/(fr|en)$/, () => route('home', target)],
    [/^\/(fr\/expertises|en\/expertise)$/, () => route('expertises', target)],
    [/^\/(fr\/projets|en\/projects)$/, () => route('projects', target)],
    [
      /^\/(fr\/projets|en\/projects)\/([^/]+)$/,
      (m) => projectPath(m[2], target),
    ],
    [/^\/(fr|en)\/studio$/, () => route('studio', target)],
    [/^\/(fr|en)\/contact$/, () => route('contact', target)],
    [
      /^\/(fr\/confidentialite|en\/privacy)$/,
      () => route('privacy', target),
    ],
    [
      /^\/(fr\/mentions-legales|en\/legal)$/,
      () => route('legal', target),
    ],
  ];

  for (const [pattern, resolve] of map) {
    const m = clean.match(pattern);
    if (m) return resolve(m);
  }
  return route('home', target);
}

export const NAV_ITEMS = [
  { key: 'home' as const },
  { key: 'expertises' as const },
  { key: 'projects' as const },
  { key: 'studio' as const },
  { key: 'contact' as const },
];
