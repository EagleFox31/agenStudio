import type { Language } from './i18n';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  lang: Language;
  ogImage?: string;
  noindex?: boolean;
}

const SITE_NAME = 'AgenStudio';
const DEFAULT_OG = '/brand/og-default.png';

export function buildSeo(seo: PageSeo, siteUrl: string) {
  const fullTitle = seo.title.includes(SITE_NAME)
    ? seo.title
    : `${seo.title} — ${SITE_NAME}`;
  const canonical = new URL(seo.path, siteUrl).toString();
  const alternates = {
    fr: new URL(equivalentPath(seo.path, 'fr'), siteUrl).toString(),
    en: new URL(equivalentPath(seo.path, 'en'), siteUrl).toString(),
  };
  const ogImage = new URL(seo.ogImage ?? DEFAULT_OG, siteUrl).toString();
  return {
    title: fullTitle,
    description: seo.description,
    canonical,
    alternates,
    ogImage,
    noindex: seo.noindex ?? false,
    lang: seo.lang,
  };
}

import { equivalentPath } from './routes';

export function organizationJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: siteUrl,
    description:
      'Studio numérique indépendant basé au Cameroun. Logiciels métier, automatisations, applications web et intégrations.',
    areaServed: ['CM', 'FR', 'CI', 'SN', 'BE', 'CA'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Douala / Yaoundé',
      addressCountry: 'CM',
    },
    email: 'contact@agenstudio.com',
    sameAs: [],
  };
}
