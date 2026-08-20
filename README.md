# AgenStudio — Site officiel

Site vitrine bilingue (FR/EN) construit selon le [Playbook AgenStudio](./AgenStudio_Playbook_Site_Web.docx.pdf).

## Stack

- **Astro 7** + **TypeScript strict** (pages statiques, JS envoyé uniquement aux îlots)
- **React 18** en îlots (`client:idle` / `client:visible` / `client:load`) — menu, filtres, formulaire. Pas de Reveal React par carte.
- **Tailwind CSS 3** (tokens Canvas / Ink / Teal / Magenta / Bordeaux / Coral / Gold — via CSS variables)
- **Reveal CSS** (respect de `prefers-reduced-motion`)
- **MDX / Content Collections** typés pour les projets
- **Cloudflare Pages** (hébergement + Pages Functions)
- **Resend** + **Turnstile** + **Zod** pour le formulaire de contact

## Démarrer

```bash
npm install
cp .env.example .env
npm run dev
```

Puis ouvrez [http://localhost:4321](http://localhost:4321). La racine redirige vers `/fr`.

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur Astro local (HMR) |
| `npm run build` | Build production (statique + Pages Functions) |
| `npm run preview` | Preview du build |
| `npm run check` | Astro check + TypeScript |
| `npm run lint` | ESLint sur `.ts`, `.tsx`, `.astro` |
| `npm run format` | Prettier sur toute la source |

## Variables d'environnement

Copier `.env.example` vers `.env` et remplir :

| Variable | Rôle |
|---|---|
| `SITE_URL` | URL canonique (utilisée pour hreflang, OG, sitemap) |
| `PUBLIC_TURNSTILE_SITE_KEY` | Site key Turnstile (visible côté client) |
| `TURNSTILE_SECRET_KEY` | Secret Turnstile — **serveur uniquement** |
| `RESEND_API_KEY` | Clé API Resend |
| `CONTACT_TO_EMAIL` | Destinataire des demandes |
| `CONTACT_FROM_EMAIL` | Expéditeur (domaine vérifié Resend) |

Sur Cloudflare Pages, les configurer via **Settings → Environment variables**.

**KV `RATE_LIMIT` est obligatoire en production** (rate limit IP + rejeu `Idempotency-Key`). Sans ce binding : NO-GO go-live. Le limiteur est *soft* (get-then-put, volume studio). Local : le POST fonctionne sans KV, sans persistance d’idempotence.

## Structure

```
agenstudio/
├─ astro.config.mjs           # config Astro + intégrations
├─ tailwind.config.js         # tokens design system
├─ functions/api/contact.ts   # endpoint Cloudflare Pages (Zod + Turnstile + Resend)
├─ public/                    # assets statiques, robots.txt, _headers, _redirects
├─ src/
│  ├─ content/projects/       # études de cas typées (Content Collections)
│  ├─ components/
│  │  ├─ layout/              # Header (Astro) + MobileMenu (React island) + Footer
│  │  ├─ sections/            # sections partagées FR/EN + îlots interactifs
│  │  └─ ui/                  # Button, Card, Container, Section, Tag, Reveal
│  ├─ layouts/BaseLayout.astro  # <head> SEO + skip link + shell
│  ├─ lib/                    # i18n, routes, seo, contact-schema, cn
│  ├─ pages/
│  │  ├─ fr/                  # /fr, /fr/expertises, /fr/projets, ...
│  │  ├─ en/                  # /en, /en/expertise, /en/projects, ...
│  │  └─ 404.astro
│  └─ styles/global.css
```

## Contenu

- Textes bilingues : [src/lib/i18n.ts](src/lib/i18n.ts)
- Projets : fichiers JSON dans [src/content/projects/](src/content/projects/) validés par `src/content/config.ts`
- Ajouter un projet = créer `src/content/projects/<slug>.json` conforme au schéma Zod

## Sécurité du formulaire

1. Un seul schéma Zod (`.strict()`) : [`src/lib/contact-schema.ts`](src/lib/contact-schema.ts), importé par le formulaire **et** la Pages Function.
2. Honeypot hors écran (`hp_confirm`, pas `website`) : champ rempli → **200** silencieux, pas d’e-mail. Jamais `max(0)` ni `display:none`.
3. Turnstile validé par appel serveur à `siteverify`. Sans site key locale : le client n’envoie pas de token vide.
4. Rate limit par IP via KV `RATE_LIMIT` (**obligatoire en prod**, 5 req / 15 min, limiteur soft).
5. Env incomplète → **503** `misconfigured`. Resend en échec → **502**. Validation → **422** `{ code, errors[] }`. JSON illisible → **400**.
6. Header `Idempotency-Key` (UUID au premier envoi) ; rejeu 200 si la clé existe déjà en KV. Retry client uniquement sur 502 / réseau.
7. Envoi via Resend avec `reply_to = payload.email`. Aucune IP dans l’e-mail.
8. Aucun secret exposé côté client (préfixes `PUBLIC_` uniquement pour la site key).

## Déploiement Cloudflare Pages

1. Connecter le dépôt à Cloudflare Pages.
2. Framework preset : **Astro**.
3. Build command : `npm run build`
4. Build output : `dist`
5. Root : `/`
6. Renseigner toutes les variables d'environnement listées ci-dessus.
7. Créer un namespace KV et lier `RATE_LIMIT` (**obligatoire en production**).
8. Ajouter le domaine + HTTPS + redirection www / non-www.

## Playbook

Chaque phase de livraison (00 → 14) est décrite dans le PDF racine. Le site n'est « fini » que quand la matrice de recette (Playbook §9) est verte.
