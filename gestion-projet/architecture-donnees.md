# Architecture données — AgenStudio

> **Date :** 19 août 2026  
> **Stade :** site vitrine, Gate G3/G4  
> **Règle :** ne pas introduire de base de données tant qu’il n’existe pas de **job de requête** sur les leads.

## 1. Verdict

AgenStudio n’a **pas** de BDD. C’est volontaire et correct.

Le produit n’authentifie personne, n’affiche pas de données personnelles, et ne trie pas un pipeline. Les « données » sont du **contenu versionné** (Git) et un **brief e-mail** (Resend). Une base SQL ici serait un back-office déguisé — hors playbook, hors AGENTS.md, hors besoin visiteur.

## 2. Stores réels

| Store | Données | Durée de vie | Propriétaire |
|---|---|---|---|
| Git — `src/content/projects/*.json` | Études de cas | Permanente | `/agen-contenu` |
| Git — `src/content/ui/` (Phase A) | Copy pages FR/EN | Permanente | `/agen-contenu` |
| Git — `src/lib/i18n.ts` | Chrome UI (nav, a11y, codes form) | Permanente | `/agen-contenu` |
| Resend → inbox studio | Nom, e-mail, org, brief, délai, langue | Politique rétention **à valider** (avocat) | `/agen-backend` + `/agen-rssi` |
| Cloudflare KV `RATE_LIMIT` | Compteur par IP | 15 minutes | `/agen-backend` |
| Turnstile | Token anti-bot | Transaction | `/agen-rssi` |

Aucun cookie de session. Aucun profil. Aucun identifiant persistant visiteur.

## 3. Flux lead (unique transaction)

```
Visiteur
  → ContactForm (îlot, contrat Zod)
  → POST /api/contact (Pages Function)
       1. parse JSON
       2. Zod (honeypot accepté)
       3. si website rempli → 200 silencieux
       4. env complète sinon 503
       5. KV rate limit
       6. Turnstile siteverify
       7. Resend (reply_to = e-mail visiteur, HTML échappé, **sans IP**)
       8. 200 { ok: true }
```

Système d’enregistrement du lead = **la boîte mail**. Si Resend échoue, le lead est perdu — acceptable à volume studio **si** le fail est visible (502/503 + filet e-mail direct). Inacceptable en silence.

## 4. Quand (ne pas) ajouter une base

**Ne pas ajouter** Postgres / Supabase / Firebase / D1 métier / Auth si la raison est :

- « un vrai backend »
- un futur CRM
- stocker les briefs « au cas où »
- un dashboard interne

**Envisager un store durable** seulement si **tous** ces points sont vrais :

1. Le volume de briefs dépasse ce qu’une humaine peut traiter dans inbox.
2. On a un job explicite : relance, statut, recherche, stats.
3. Politique de rétention + base légale + DPA sont écrits.
4. G4 est verte.
5. Ce n’est pas un admin custom : webhook CRM (HubSpot, etc.) ou journal d’accusé minimal.

**Journal d’accusé (évolution licite, pas maintenant) :**

- Table ou KV : `id`, `created_at`, `email_hash`, `status` (`queued` | `sent` | `failed`).
- **Pas** le brief en clair.
- Écrit **après** succès Resend, ou outbox avant envoi si la perte d’un lead devient P0 business.

## 5. Contrat applicatif

Fichier unique : `src/lib/contact-schema.ts` (`.strict()`, `safeParse`).

Enveloppe et HTTP : `.cursor/skills/agen-backend/references/contrat-api.md`  
Sources industrie : `gestion-projet/references-industrie.md`

Interdit : schema Zod inline dans `functions/api/contact.ts` ; validation ad hoc dans `ContactForm.tsx` ; `website.max(0)` ; honeypot nommé `website` (autofill).

Si Pages Functions ne peut pas importer `src/` : déplacer vers `shared/contact-schema.ts`. Une copie n’est pas une solution.

KV rate limit = **soft** (non atomique). Binding obligatoire en prod. Durable Object par IP seulement si abus.

## 6. Contenu = couche portable (pas un goulot TypeScript)

Le schema (`src/content.config.ts`) est le **contrat**, comme Zod contact. Les pages ne connaissent que `getCollection` / `getEntry`.

**Interdit de figer le copy dans `i18n.ts` pour « plus tard un CMS ».** Ça force une migration. Détail : `gestion-projet/strategie-contenu-cms.md`.

| Phase | Quoi | Quand |
|---|---|---|
| A | JSON Content Layer : projets **et** copy de pages. `i18n.ts` = chrome seulement | Sprint 1.5 |
| B | Keystatic **local** sur les mêmes fichiers (`@keystatic/astro`, guide officiel Astro) | Sprint 2.8, après G2 |
| C | Changer le **loader** (Sanity/Payload) si rédac / multi-canal | Après G4, job réel |

Règles :

- `metrics[]` vides ou sourcées / « À valider ».
- `type` honnête : `client` | `internal` | `rd` | `concept`.
- Bilingue **dans le même fichier** `{ fr, en }` — Keystatic n’a pas d’i18n natif (Thinkmill #1080).
- Pas de Sanity/Strapi/auth prod pour éditer. Pas d’admin public avant G4.
- Un éditeur Git **n’est pas** une BDD leads. G-010 inchangé pour les briefs.

## 7. Skills

| Sujet | Skill |
|---|---|
| Job visiteur, formulaire | `/agen-produit` |
| Schema contenu, JSON, Keystatic | `/agen-contenu` |
| Function, KV, env | `/agen-backend` |
| Îlots, UI, build, brancher Keystatic | `/agen-dev` |
| RGPD, processeurs, G4 | `/agen-rssi` |
