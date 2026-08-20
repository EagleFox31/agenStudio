# Stratégie contenu / CMS — AgenStudio

> **Date :** 20 août 2026  
> **Correction :** « Pas de CMS avant 15 cas » créait un **goulot d’auteur** et un **coût de migration**. La couche contenu doit être portable **maintenant**.  
> **Leads ≠ contenu.** Un éditeur Git n’est pas une base leads. G-010 reste pour SQL/Auth sur les briefs.

## 1. Verdict révisé

**Pour une couche contenu CMS-ready. Contre Sanity / Strapi / Payload / auth prod cette semaine.**

Astro 5–7 a formalisé le [Content Layer](https://docs.astro.build/en/guides/content-collections/) : les pages lisent `getCollection` / `getEntry`. Le **loader** (fichiers, Keystatic, Sanity) se change dans `content.config.ts`. Maciek Palmowski : demain tu ne reparcours pas les composants, tu changes le loader ([article](https://maciekpalmowski.dev/blog/content-layer-api-in-astro-how-to-create-a-cms-agnostic-website/)).

Le goulot UX **aujourd’hui** n’est pas l’absence de Studio Sanity. C’est :

1. Le copy pages dans un **module TypeScript** (`i18n.ts`) que seul un dev compile.
2. Des ternaires FR/EN encore dans les sections.
3. Un schéma projets JSON **déjà bon** — mais isolé, donc le reste du site n’a pas le même contrat.

Forcer « ouvre VS Code, édite le TS, rebuild » n’est pas de l’UX auteur. Ce n’est pas non plus de l’UX visiteur : ça ralentit les corrections de H1, de cas, de privacy.

## 2. Ce que dit l’industrie (2026)

| Source | Idée | Pour AgenStudio |
|---|---|---|
| [Astro CMS guides](https://docs.astro.build/en/guides/cms/) | Headless ou Git-based ; Astro = présentation | Pas de CMS qui génère le HTML |
| [Astro + Keystatic](https://docs.astro.build/en/guides/cms/keystatic/) | Intégration officielle. Fichiers dans le repo. Admin `/keystatic` | **Cible Phase B.** Local d’abord (pas d’OAuth prod) |
| [Wildpress / Bitdoze](https://www.bitdoze.com/best-headless-cms-for-astro/) | Git-based aligne Astro. Pages CMS / Keystatic pour simple ; Tina si visual ; CloudCannon si client payant | Studio solo → Keystatic, pas CloudCannon $55/mo |
| [Lucky Media, Keystatic 2026](https://www.luckymedia.dev/insights/keystatic) | Meilleur Git-CMS Astro. i18n first-party **immature**. Pas pour une rédac marketing indépendante | FR+EN **dans le même JSON** `{ fr, en }` — on ne split pas les locales |
| [GitCMS vs Sanity](https://gitcms.dev/blog/git-based-cms-vs-headless-cms/) | Git si pages/docs, équipe Git, agents IA sur les fichiers. Sanity si relationnel + multi-canal | 1 site, 2 langues, cas = Git |
| [FocusReactive, Sanity](https://focusreactive.com/choosing-a-headless-cms/) | Sanity = overkill marketing site ; marketeurs dépendants du dev | Confirme : pas Sanity pour une vitrine |
| [Thinkmill #1080](https://github.com/Thinkmill/keystatic/issues/1080) | Pas d’i18n natif Keystatic | Notre modèle bilingue **par champ** est le bon workaround |

## 3. Trois phases (pas un big-bang)

```
Pages Astro  ──getCollection──►  Zod schema (contrat)
                                      │
                    Phase A (maintenant)     glob JSON/YAML
                    Phase B (éditeur)        + Keystatic local → mêmes fichiers
                    Phase C (si besoin)      loader Sanity/Payload → même schema
```

### Phase A — débloquer l’auteur **sans** admin (Sprint 1.5)

Faire **avant** d’installer un UI. Sinon Keystatic édite un modèle pourri.

| Contenu | Store | Pourquoi |
|---|---|---|
| Études de cas | `src/content/projects/*.json` | **Déjà** Content Layer. Garder `{ fr, en }` dans un fichier |
| Copy de pages (hero, frictions, studio, légal aside) | `src/content/ui/*.json` (singletons ou 1 fichier par page) | Plus de copy durable dans `i18n.ts` |
| Chrome (nav, skip link, boutons, erreurs form **codes**) | `src/lib/i18n.ts` | Court, technique, rarement touché par un non-dev |
| Images cas | `src/content` ou `public/projects/` référencées par le JSON | Schema `image()` plus tard |

Règle : **grossir les JSON, pas `i18n.ts`.** 1.5 du plan ne doit plus dire « tout vers i18n.ts ».

### Phase B — Keystatic local (Sprint 2.8, après G2 formulaire)

- `@keystatic/astro` + `keystatic.config.ts` qui pointe sur **les mêmes** `src/content/projects` et singletons UI.
- `storage.kind: 'local'` → `npm run dev` → `/keystatic`. Commit Git = publish.
- Pas d’admin sur le domaine public (OAuth + server = surface RSSI, recule G4).
- GitHub mode **plus tard** si un associé édite depuis le navigateur, toujours fichiers Git.

### Phase C — API CMS (pas avant G4 + vraie rédac)

Loader custom vers Sanity/Payload **uniquement** si : 2+ rédacteurs non-git, TMS de traduction, ou le même contenu alimente une 2e app. Les pages Astro ne bougent pas.

## 4. Ce qu’on n’installe pas

- Strapi / Payload / Auth + Postgres « mini CMS » — c’est un produit, G-010.
- Decap comme défaut (UI datée, Identity). Sveltia = option si YAML already.
- TinaCloud payant tant que le local Keystatic suffit.
- Admin `/keystatic` en production Cloudflare Pages static sans brief sécurité.

## 5. UX : deux utilisateurs

| Qui | Job | Outil Phase A | Phase B |
|---|---|---|---|
| Visiteur | Brief en 2 min | Inchangé | Inchangé |
| Toi / agent | Corriger un H1, un cas | JSON + Zod, pas TS de 500 lignes | Formulaire Keystatic |
| Associé non-git | Publier un cas | Bloqué — c’est **OK jusqu’à B** | Keystatic local ou GitHub |

Le bottleneck à casser **cette semaine** : copy pages hors TypeScript. L’admin est la semaine d’après le tuyau contact, pas un Sprint 0.

## 6. Skills

`/agen-contenu` possède le schema et les fichiers. `/agen-dev` branche Keystatic sans changer les sections. `/agen-rssi` veto admin public avant G4.
