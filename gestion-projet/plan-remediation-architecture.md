# Plan de remédiation architecture — AgenStudio

> **Date :** 20 août 2026 (rév. 8 — **suivi ✓ / par qui**)  
> **Origine :** revue front · craft Linear/Stripe · **Obys / Studio Thomas / Figma Trend 4** (WebGL = annexe)  
> **Phase Playbook :** 01 + 08 + 10–14 · **Gates :** G1 git/CI · **G2 contact** · G3 contenu · G4 go-live  
> **Séquencement, PERT, missions GitOps / RSSI / Front / Backend / Contenu :** `gestion-projet/plan-unifie.md`  
> **Règle :** ne pas migrer vers Next. Pas d’Argo. Pas de BDD. **Pas de WebGL sur `/fr` `/en`.** Immersion = typo, champ de couleur, cadrage.

Ce fichier = **checklists numérotées** (G.1, 0.1…2.8). L’ordre et le chemin critique vivent dans le plan unifié. En cas de conflit de calendrier, le PERT gagne.

Exécuter **dans l’ordre des sprints**. Un sprint n’est pas « fini » tant que sa checklist QA n’est pas verte.

### Légende suivi

| Symbole | Signification |
|---|---|
| `[x]` | Terminé — critère « Done quand » vert |
| `[~]` | Partiel — livré mais DoD pas vert (note en commentaire) |
| `[ ]` | À faire |
| `[—]` | Bloqué — action **Humain** ou **Avocat** requise |

**Par qui :** **DP** (plan) · **Git** · **Back** · **Dev** · **Contenu** · **RSSI** · **DA** · **UI** · **Produit** · **QA** · **Humain** · **Avocat**

Cocher `[x]` **uniquement** après recette QA ou validation du owner (A). Mettre à jour **Par qui** + **Date** à chaque livraison.

Skills : `/agen-git` · `/agen-produit` · `/agen-backend` · `/agen-contenu` · `/agen-dev` · `/agen-da` · `/agen-ui-ux` · `/agen-rssi` · `/agen-qa` · `/agen-retrospective`

**Données :** ne pas ajouter de BDD. Voir `gestion-projet/architecture-donnees.md`.  
**Git :** GitOps-lite vitrine. Voir `.cursor/skills/agen-git/references/sante-git.md` · G-012.

### Doctrine craft (flagships 2026)

AgenStudio = **clarté Stripe + punch graphique Obys / Studio Thomas + copy éditorial** (H1 = artwork). Pas Linear dark. Pas Awwwards WebGL. Pas un hero plat « léger ». Pas du beige « sur mesure ».

| Copier | Refuser |
|---|---|
| H1 métier `clamp(2.5rem, 8vw, 6rem)` `leading-[0.9]` = artwork **et** Big Idea (swap test) | « Think sharp » comme seul H1 · « logiciels métier sur mesure… » |
| 1 champ de couleur ≥ 40 % d’un viewport · teal 1× | Badge 8 px · tags rainbow · glass |
| 1 objet graphique : géométrie ou capture **croppée** | Tabs Flux/Interface/Vision · terminal 99,98 % |
| Silence → coup → silence · 2–3 wow · Reveal CSS | 5 îlots Reveal · 3 Cards clones · Lenis |
| Scroll natif · titre HTML = LCP | Scroll-jack · canvas WebGL = LCP |
| 3–5 cas · 1 image mur · CTA fin de cas | 20 thumbs · lightbox · faux témoignage |
| 1 îlot above-fold ~30–40 KB gz | Three.js chemin critique (~140 KB) |
| WOFF2 self-host, preload display | fonts.googleapis.com |

Percutant = **échelle + champ + cadrage**. Voir `gestion-projet/references-immersif.md`. WebGL = autre brief, `/experience` après G4.

Les 5–7 % ThunderClap = SaaS B2B. **Pas un KPI AgenStudio.**

---

## État au 20 août 2026

| Couche | Statut | Par qui | Commentaire |
|---|---|---|---|
| Plan unifié + PERT + RACI | `[x]` | **DP** · 20/08 | `plan-unifie.md` rév. A9/A10 |
| Skills + mémoire + GitOps-lite | `[~]` | **DP** · 20/08 | Working tree · pas dans Git (G.1) |
| `.gitignore` (`.dev.vars`, secrets) | `[x]` | **Git** + **RSSI** · 20/08 | À figer via G.1 |
| `agents.md` = Astro | `[x]` | **Dev** · 19/08 | |
| Commit / push (G.1) | `[x]` | **Git** · 20/08 | Demande user explicite · SHA dans ce commit |
| Sprint 0 code | **~95 %** | voir § Sprint 0 | **G2** ✅ · **A9·A10** ✅ · CR-A ouverte |
| Sprint 1–2 code | **B1 B2** | **Dev** | Reveal CSS · hero HTML · B3 suivant |
| CI GitHub (2.5) | `[ ]` | — | Ticket G1, pas prérequis J1 |

**Synthèse Cycle B :** **B1 B2** ✅ · B3–B4 `[ ]` · G.1 `[—]`

**Maintenant :** **B3** hero graphique LCP (DA A, Dev R) · **B8** Contenu en parallèle · B5 possible · G.1 si demandé.

---

## Sprint G — Santé Git (P0 process) · 30 min

Sans ça, skills et plan vivent seulement sur le disque local.

| ✓ | # | Action | Owner (A) | Par qui | Date | Fichiers | Done quand |
|---|---|---|---|---|---|---|---|
| `[x]` | G.1 | Commit + push du working tree (mémoire, gitignore, ce plan) | **Git** | **Git** (demande user 20/08) | 20/08 | `gestion-projet/` · code Sprint 0 | SHA sur `origin/main` · **0** `Co-authored-by` |
| `[x]` | G.2 | `.dev.vars` + secrets hors Git · G-012 | **Git** | **Git** + **RSSI** | 20/08 | `.gitignore` · `sante-git.md` | Secrets hors repo (à figer via G.1) |
| `[x]` | G.3 | Recette commit PowerShell (`git commit -F -`) | **Git** | **Git** | 20/08 | `/agen-git` | Doc commit PowerShell OK |

Ne pas installer Argo / Flux / Kargo.

---

## Sprint 0 — Crédibilité (P0) · ~2–3 jours

Bloquant board / premier partage public. Pas de refactor large.

| ✓ | # | Action | Owner (A) | Par qui | Date | Fichiers | Done quand |
|---|---|---|---|---|---|---|---|
| `[x]` | 0.1 | Métriques JSON → **« À valider »** | **Contenu** | **Dev** + **Contenu** | 20/08 | `src/content/projects/*.json` | 0 KPI inventé visible |
| `[x]` | 0.2 | Purger KPI fictifs du hero (mockups) | **Contenu** | **Dev** + **DA** | 20/08 | `SystemVisual.tsx`, `HeroVisual.tsx` | Mockup sans chiffre fictif |
| `[x]` | 0.3 | Créer `public/brand/og-default.png` | **Dev** | **Dev** + **DA** | 20/08 | `public/brand/og-default.png` | **1200×630** canvas/teal, 0 KPI inventé |
| `[x]` | 0.4 | Un Zod partagé form + API | **Back** | **Back** · **Dev** (form) | 20/08 | `contact-schema.ts`, `ContactForm.tsx`, `contact.ts` | Un schema `.strict()`, honeypot 200 si `hp_confirm` rempli |
| `[x]` | 0.5 | Honeypot vivant (pas `max(0)` avant if) | **RSSI** | **Back** | 20/08 | `contact.ts`, `contact-schema.ts`, `ContactForm.tsx` | Bot honeypot → 200 · humain → mail · `hp_confirm` hors écran |
| `[x]` | 0.6 | Turnstile local : message clair | **Produit** | **Back** (C) · **Dev** | 20/08 | `ContactForm.tsx` | Sans site key = `missingTurnstile`, pas POST token vide |
| `[x]` | 0.7 | Mentions / privacy + sous-traitants | **RSSI** | **Dev** + **Contenu** | 20/08 | `LegalSections.astro`, `PrivacySections.astro` | Brouillon honnête CF/Resend/Turnstile · « À valider » avocat |
| `[x]` | 0.8 | Formulaire conversation + copy aside | **Contenu** | **Dev** + **Contenu** | 20/08 | `ContactSections.astro`, `ContactForm.tsx`, `i18n.ts`, `Footer.astro` | 0 SLA 24 h · 0 « jamais de tiers » · erreurs GOV.UK · 44×44 |
| `[x]` | 0.9 | API : PII, 503, Idempotency, enveloppe | **RSSI** | **Back** | 20/08 | `contact.ts`, `ContactForm.tsx`, README | 0 IP mail · 503 env · enveloppe · header Idempotency-Key · KV prod obligatoire |
| `[x]` | 0.10 | **H1 artwork** — 16 drafts · swap · clamp 8vw | **Contenu** | **Contenu** | 20/08 | `i18n.ts`, `HomeSections.astro` | H1 lock Douala · kicker ≠ H1 · 0 paraphrase · `copy-editorial.md` §12 |
| `[x]` | 0.11 | **Pass copy accueil** hors hero | **Contenu** | **Contenu** | 20/08 | `i18n.ts` | 3 lames · méthode terrain · CTA « Envoyer un brief » · EN seconds originaux |

**QA Sprint 0 :** `/agen-qa` — OG existe · 0 métrique inventée · POST contact (honeypot + Zod + erreurs champ) · 0 « jamais de tiers » · Copy Review 0.10+0.11 (`copy-editorial.md` §11) · `npm run check && npm run build`

---

## Sprint 1 — Architecture & craft (P1) · ~4–5 jours

| ✓ | # | Action | Owner (A) | Par qui | Date | Fichiers | Done quand |
|---|---|---|---|---|---|---|---|
| `[x]` | 1.1 | Reveal = CSS, 0 îlot par carte | **Dev** | **Dev** | 20/08 | `global.css`, `scripts/reveal.ts`, sections | 0 `Reveal client:` · H1 sans opacity 0 |
| `[x]` | 1.2 | Hero sans `client:load` décoratif | **Dev** | **Dev** | 20/08 | `HeroVisual.astro`, `HomeSections.astro` | Accueil = 1 îlot (`MobileMenu`) |
| `[ ]` | 1.3 | Hero graphique LCP HTML · clamp 8vw | **DA** | — | — | hero + `i18n.ts` | DA ≥ 4/5 · attend **A9** lock |
| `[ ]` | 1.4 | Découper `HomeSections.astro` | **Dev** | — | — | `sections/home/` | Assembleur · **après** 1.1 |
| `[ ]` | 1.5 | Copy → Content Layer | **Contenu** | — | — | `content/ui/` | i18n = chrome · **après** 0.11 |
| `[ ]` | 1.6 | 44×44 · focus trap · aria-label i18n | **UI** | — | — | `Header`, `MobileMenu` | QA a11y P1 = 0 |
| `[ ]` | 1.7 | 404 selon locale | **Dev** | — | — | `404.astro` | 404 bilingue |
| `[ ]` | 1.8 | Self-host WOFF2 | **Dev** | — | — | `BaseLayout`, `public/fonts/` | 0 Google CDN |
| `[ ]` | 1.9 | Cas éditoriaux | **Contenu** | — | — | `ProjectDetailSections` | Outcomes vrais · voix copy |
| `[ ]` | 1.10 | Punch 70/20/10 · 0 Cards clones | **DA** | — | — | `Card`, `Tag`, home | Punch visible |
| `[ ]` | 1.11 | Budget JS mesuré | **Dev** | — | — | islands | Lighthouse mesuré |

**QA Sprint 1 :** Lighthouse perf **mesuré** (LCP &lt; 2.5 s 4G, CLS &lt; 0.1) · clavier menu · 360 px · îlots comptés · 0 Google Fonts · cas : outcomes au 1er scroll

---

## Sprint 2 — Hygiène flagship (P2) · ~2–3 jours

| ✓ | # | Action | Owner (A) | Par qui | Date | Fichiers | Done quand |
|---|---|---|---|---|---|---|---|
| `[ ]` | 2.1 | Tailwind colors = tokens | **DA** | — | — | `tailwind.config.js`, UI | G-005 vert |
| `[ ]` | 2.2 | Purger deps / assets orphelins | **Dev** | — | — | `package.json`, `public/` | `npm ls` propre |
| `[ ]` | 2.3 | JSON-LD propre | **Contenu** | — | — | `seo.ts` | Schema valide |
| `[ ]` | 2.4 | Tests Zod + honeypot | **Dev** | — | — | `*.test.ts` | CI possible |
| `[ ]` | 2.5 | CI GitHub lint+check+build | **Git** | — | — | `.github/workflows/` | PR rouge si fail |
| `[ ]` | 2.6 | Retirer glass non essentiel | **DA** | — | — | `global.css`, `Card` | Veto glass |
| `[ ]` | 2.7 | KV `RATE_LIMIT` prod | **RSSI** | — | — | Cloudflare + README | G4 sécurité |
| `[ ]` | 2.8 | Keystatic local | **Contenu** | — | — | `keystatic.config.ts` | **Après** 1.5 |

---

## Hors sprint — décisions humaines (ne pas inventer)

- Validation avocat mentions + privacy → débloque G4.
- Quelles métriques de cas sont **vraies** ? Le reste = À valider ou suppression.
- Hero : capture réelle vs géométrie éditoriale **croppée comme un objet graphique**. **Interdit :** terminal SaaS, tabs de démo, WebGL comme LCP.
- Lock H1 (16 drafts) + verbe de CTA unique — Copy Review, pas un agent solo.
- Process réel « 24 h ouvrées » : oui / non. Si non, le copy contact ne le promet pas.
- Binding KV + clés Turnstile/Resend prod.
- WebGL / `/experience` : hors sprint, après G4, seulement si le punch graphique ne suffit plus.

---

## Ordre d’exécution recommandé (une semaine board)

Voir PERT et missions dans `plan-unifie.md`. Rappel :

```
J0    → C7 avocat lancé (0.7) · G.1 si demandé
J1    → A1 ∥ A8 ∥ A9 ∥ A2 ∥ A3   (0.1 0.2 · 0.8-copy · **0.10 H1** · 0.3 · 0.4)
J2    → A4–A7 → G2  ∥  A10 (0.11 pass) puis Copy Review
J3-4  → B1 → B2   (1.1 1.2) · B5 B6 · B8 dès A9 lock
J5    → B3 → B4   (1.3 1.10) · H1 = A9, pas A10
```

Ne pas commencer 1.4 (découpe Home) avant 1.1 (Reveal CSS) — sinon double refactor.  
1.5 (copy → Content Layer) **avant** 2.8 (Keystatic) — sinon on édite le mauvais modèle.  
2.5 CI peut glisser en parallèle dès que G.1 est vert — ce n’est pas un prérequis du Sprint 0.

---

## Critères de succès globaux

| ✓ | Critère | Par qui | Date |
|---|---|---|---|
| `[ ]` | Note architecture ≥ 8 (contenu + perf îlots + OG) | — | — |
| `[ ]` | Accueil : 1–3 îlots React · ≤ 40 KB gz above-fold | — | — |
| `[~]` | Hero 5 s · H1 artwork + Big Idea · 0 théâtre SaaS | **Dev** + **Contenu** | 20/08 partiel |
| `[ ]` | Copy Review Cycle A · 1 verbe CTA · EN second original | **Contenu** | — |
| `[x]` | Cas : 0 KPI inventé visible (JSON) | **Dev** + **Contenu** | 20/08 |
| `[x]` | Formulaire : Zod unique, honeypot, Turnstile, erreurs champ | **Back** + **Dev** | 20/08 |
| `[x]` | 0 « jamais de tiers » · 0 SLA 24 h fantôme | **Contenu** + **Dev** | 20/08 |
| `[x]` | 0 IP dans l’e-mail (API) | **Back** | 20/08 |
| `[x]` | 0 claim WCAG/LCP dans le copy hero | **Dev** | 20/08 |
| `[x]` | `agents.md` = stack réelle (Astro) | **Dev** | 19/08 |
| `[—]` | Working tree figé (G.1) · secrets hors Git | **Humain** | — |
| `[x]` | Pas de BDD — doctrine `architecture-donnees.md` | **DP** + **Back** | 20/08 |

## Références

- Plan unifié / PERT : `gestion-projet/plan-unifie.md`
- Revue front : canvas `frontend-architecture-review.canvas.tsx`
- Revue backend/produit : canvas `backend-product-architecture.canvas.tsx`
- Plan visuel : canvas `plan-action-remediation.canvas.tsx`
- Craft 2026 : canvas `design-best-practices-2026.canvas.tsx`
- Immersif graphique : canvas `immersive-sites-2026.canvas.tsx` · `gestion-projet/references-immersif.md`
- Données : `gestion-projet/architecture-donnees.md`
- Contenu / CMS : `gestion-projet/strategie-contenu-cms.md`
- GitOps-lite : `.cursor/skills/agen-git/references/sante-git.md`
- Industrie : `gestion-projet/references-industrie.md`
- Skills : `.cursor/skills/agen-*/SKILL.md`
- Mémoire : `gestion-projet/memoire/erreurs-globales.md` G-002, G-008–G-013, G-014 (plan), **G-015** (voix)
- Copy éditorial : `.cursor/skills/agen-contenu/references/copy-editorial.md`
