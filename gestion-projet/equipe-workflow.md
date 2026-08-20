# Équipe & Workflow — AgenStudio

> **Date :** 19 août 2026 · **rév. 20 août :** unifié avec le terrain (sprints)  
> **Objectif :** livrer un site **flamboyant, créatif, beau, moderne, pro, premium et africain** — sans jamais basculer dans le cliché ni le template SaaS générique.  
> **Plan vivant (ordre, PERT, missions GitOps / RSSI / Front / Backend / Contenu) :** [plan-unifie.md](./plan-unifie.md)  
> **Checklists d’exécution :** [plan-remediation-architecture.md](./plan-remediation-architecture.md)  
> **Autres :** [Playbook AgenStudio](../AgenStudio_Playbook_Site_Web.docx.pdf) · [agents.md](../agents.md) · [analyse-rssi.md](./analyse-rssi.md)

---

## 1. North Star — ce qu'on construit

AgenStudio n'est pas « un site web de plus ». C'est une **déclaration de studio** :

| Pilier | Ce que le visiteur doit ressentir |
|---|---|
| **Premium** | Chaque pixel respire l'intention. Rien n'est laissé au hasard. |
| **Créatif** | Des compositions qui surprennent — pas des grilles répétitives. |
| **Moderne** | Stack crédible, interfaces réelles, pas de décor futuriste creux. |
| **Pro** | Autorité calme, clarté stratégique, preuves tangibles. |
| **Africain** | Identité afrofuturiste **subtile** — géométrie, lumière, matière, voix — jamais folklorique. |
| **Flamboyant** | Des moments visuels mémorables (hero, transitions, détails typographiques) dans un cadre maîtrisé. |

**Test ultime :** un directeur technique européen et un entrepreneur camerounais doivent tous deux se dire *« ce studio est sérieux »* — le premier par la rigueur, le second par l'identité. Un directeur d’ops sur 4G doit envoyer un brief **sans mode d’emploi**.

---

## 2. Équipe — 9 rôles, 1 direction

Structure légère, adaptée à un studio indépendant. Chaque rôle est un **skill Cursor** (`.cursor/skills/agen-*`) avec mémoire d'apprentissage.

### Skills & boucle d'apprentissage

```
Demande → /agen-workflow
              │
              ├── LIRE  → memoire/ + lecons-apprises.md du rôle
              ├── AGIR  → /agen-da · /agen-dev · /agen-contenu ...
              ├── VALIDER → /agen-qa
              └── APPRENDRE → /agen-retrospective (obligatoire)
```

| Skill | Rôle |
|---|---|
| `/agen-workflow` | Orchestration phases + gates |
| `/agen-orchestrateur` | Directeur de Projet |
| `/agen-produit` | Product owner — job visiteur, sans formation |
| `/agen-da` | Direction Artistique |
| `/agen-ui-ux` | UI/UX Designer |
| `/agen-dev` | Lead Dev Front |
| `/agen-backend` | Backend / données (contact, stores, pas de BDD) |
| `/agen-contenu` | Lead Contenu FR/EN |
| `/agen-qa` | QA + A11Y |
| `/agen-rssi` | RSSI / Juridique |
| `/agen-retrospective` | Capture erreurs → mémoire |
| `/agen-git` | Git & commits (sur demande, sans co-auteur) |

Mémoire : `gestion-projet/memoire/` · Leçons par rôle : `.cursor/skills/agen-*/references/lecons-apprises.md`

```
                    ┌─────────────────────┐
                    │   DIRECTEUR·TRICE    │
                    │   DE PROJET (DP)     │
                    │   Vision · Priorités │
                    │   · Go/No-Go         │
                    └──────────┬──────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
┌────────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
│ DIRECTEUR·TRICE │  │  LEAD DEV         │  │  LEAD CONTENU   │
│ ARTISTIQUE (DA) │  │  Front + API      │  │  FR/EN · SEO    │
│ Identité visuelle│  │  Astro · React    │  │  Tone of voice  │
│ · Motion · QA vis│  │  · Cloudflare     │  │  · Projets JSON │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                     │                     │
    ┌────▼────┐          ┌────▼────┐          ┌────▼────┐
    │ UI/UX   │          │  QA     │          │ RSSI /  │
    │ DESIGNER│          │ TECH +  │          │ JURIDIQUE│
    │         │          │ A11Y    │          │         │
    └─────────┘          └─────────┘          └─────────┘
```

### 2.1 Fiches de poste

#### Directeur·trice de Projet (DP)
- **Mission :** garder le cap premium, arbitrer scope/temps/qualité.
- **Livrables :** backlog priorisé, planning des phases, validation des gates.
- **Ne fait pas :** du pixel-pushing ni du code.
- **KPI :** % gates passées à la 1ère review · 0 régression visuelle en prod.

#### Product owner
- **Mission :** le visiteur non formé comprend en 8 s et envoie un brief en 2 min.
- **Livrables :** parcours, CTA, spec formulaire (erreurs par champ), veto sur le théâtre SaaS et les claims faux.
- **Interdit :** auth, CRM, onboarding, BDD « pour plus tard ».
- **Référence :** `gestion-projet/architecture-donnees.md`

#### Directeur·trice Artistique (DA)
- **Mission :** garantir la cohérence visuelle afrofuturiste premium sur tout le site.
- **Livrables :** moodboards, grilles de composition, directives motion, revue visuelle de chaque page.
- **Référence interne :** palette 70/20/10 (Canvas 70 % · Ink 20 % · Teal/Magenta/Bordeaux/Coral/Gold 10 %).
- **Veto sur :** gradients excessifs, glassmorphism, blobs 3D, stock photos, or massif, cyberpunk dark.
- **Championne :** whitespace, typographie éditoriale, détails géométriques, interfaces réelles.

#### UI/UX Designer
- **Mission :** wireframes → maquettes haute fidélité → specs pour le dev.
- **Livrables :** frames Figma (360 → 1920), états interactifs (hover, focus, loading, error), specs spacing.
- **Breakpoints obligatoires :** 360 · 390 · 768 · 1024 · 1440 · 1920 px.
- **Règle :** mobile-first, chaque breakpoint doit sembler *intentionnel*, pas juste « responsive ».

#### Lead Dev Front
- **Mission :** implémenter le design system en Astro + React islands, maintenir la perf et la qualité code.
- **Livrables :** composants réutilisables, pages, build vert. Branche le contrat Zod, ne le recopie pas.
- **Stack :** Astro 7 · TypeScript strict · Tailwind · Zod · Cloudflare Pages.
- **Interdit :** `any`, secrets côté client, dépendances inutiles, composants > 200 lignes sans justification.

#### Backend / données
- **Mission :** unique API POST `/api/contact` — contrat, abuse, fail-closed, stores honnêtes.
- **Livrables :** schema unique, Function, KV, env. **Pas de SQL** tant qu’il n’y a pas de job de requête.
- **Référence :** `gestion-projet/architecture-donnees.md`

#### Lead Contenu (FR/EN)
- **Mission :** rédiger et valider tous les textes bilingues. H1 = artwork + job visiteur. Honnêteté = sol, voix = plafond. **PERT A de :** A1 · A8 · B8 · C1 · **G3** (`plan-unifie.md`).
- **Livrables :** copy pages (i18n puis Content Layer), fiches projets JSON, meta SEO, alt text, Copy Review G3.
- **Voix :** percutant · witty · élégant · faits africains (lieu, outils, terrain) — pas beige consultant. Doctrine : `.cursor/skills/agen-contenu/references/copy-editorial.md`.
- **Interdit :** Lorem · clients/métriques inventés · lexique « sur mesure / scalable / exceptionnel » · Think sharp en H1 · SLA non sourcé.

#### QA Tech + Accessibilité
- **Mission :** garantir que rien ne casse, que tout est accessible, que le build passe.
- **Livrables :** checklists par page, rapport de bugs, validation WCAG AA.
- **Checklist systématique :** clavier · focus visible · contraste · touch 44×44 · reduced motion · 0 overflow · 0 console error.

#### RSSI / Juridique
- **Mission :** sécuriser le go-live, finaliser la conformité RGPD.
- **Livrables :** politique de confidentialité validée, mentions légales, env vars prod, rate limiting KV.
- **Référence :** [analyse-rssi.md](./analyse-rssi.md).

### 2.2 Matrice RACI (simplifiée)

| Activité | DP | DA | UI/UX | Dev | Contenu | QA | RSSI |
|---|---|---|---|---|---|---|---|
| Vision & priorités | **R/A** | C | C | I | I | I | I |
| Direction visuelle | C | **R/A** | C | I | I | C | — |
| Maquettes & specs | I | C | **R/A** | C | C | I | — |
| Implémentation | I | C | C | **R/A** | I | C | C |
| Copy FR/EN | C | I | I | I | **R/A** | C | — |
| Revue visuelle | A | **R** | C | C | I | C | — |
| Tests & A11Y | A | I | I | C | I | **R** | — |
| Sécurité & légal | A | — | — | C | C | I | **R** |
| Go-live | **A** | C | — | R | C | R | R |

*R = Responsible · A = Accountable · C = Consulted · I = Informed*

---

## 3. Workflow — du Playbook à la production

Le Playbook (phases 00 → 14) est la **carte**. Le site existe déjà : l’exécution est le **terrain** (sprints G / 0 / 1 / 2). Les deux se parlent dans [plan-unifie.md](./plan-unifie.md). En cas de conflit de calendrier, le terrain gagne. En cas de conflit d’identité, le North Star §1 gagne.

### 3.1 Les 4 Gates (points de contrôle)

```
Phase 00-03          Phase 08 (+ Sprint 0)   Phase 09-11          Phase 12-14
Fondations      →    Tuyau brief        →   Contenu & punch  →  Launch
     │                      │                    │                  │
   GATE 1               GATE 2               GATE 3            GATE 4
  Fondations OK        Contact OK          Contenu OK         Go-Live OK
```

Le sign-off DA (6 critères ≥ 4/5, §4.1) reste obligatoire pour **montrer** une page. Il n’est **pas** G2 : un site beau sans brief = échec produit.

| Gate | Nom | Critères de passage | Valideur |
|---|---|---|---|
| **G1** | Fondations | Git · env · tokens · budget îlots · build vert. CI = dette G1, pas un prérequis J1 | DP + GitOps + Front |
| **G2** | Contact OK | Un Zod · honeypot vivant · Turnstile fail-closed · erreurs par champ · 0 claim « jamais de tiers » | Backend + RSSI + Produit |
| **G3** | Contenu OK | Copy honnête **et** distinctif (swap test · H1 artwork · 1 verbe CTA) · JSON · OG réel · 0 KPI inventé. « À valider » légal → G4 | Contenu + DP |
| **G4** | Go-Live OK | KV prod · secrets dashboard · RGPD **validé avocat** · Lighthouse mesuré · rollback = revert | RSSI + QA + DP |

### 3.2 Phases détaillées

#### Phase 00 — Cadrage & Vision
| | |
|---|---|
| **Durée** | 2 jours |
| **Équipe** | DP · DA · Contenu |
| **Livrables** | Brief validé · moodboard afrofuturiste · sitemap confirmé · backlog Phase 01 |
| **Gate** | — |

#### Phase 01 — Fondations techniques
| | |
|---|---|
| **Durée** | 2 jours |
| **Équipe** | Dev · RSSI |
| **Livrables** | Git init · CI basique · `.env` configuré · design tokens Tailwind · composants UI de base (Button, Card, Container, Section, Tag, Reveal) |
| **Gate** | → **G1** |

#### Phase 02 — Layout & Navigation
| | |
|---|---|
| **Durée** | 2 jours |
| **Équipe** | Dev · UI/UX · DA |
| **Livrables** | BaseLayout · Header · Footer · MobileMenu · routing FR/EN · skip link · SEO head |
| **Gate** | — |

#### Phase 03 — Design System & Motion
| | |
|---|---|
| **Durée** | 3 jours |
| **Équipe** | DA · Dev · UI/UX |
| **Livrables** | Specs motion (Reveal, AnimatedBackground, HeroVisual, SystemVisual) · règles reduced-motion · documentation tokens |
| **Gate** | — |

#### Phase 04 — Page Accueil (Hero + Sections)
| | |
|---|---|
| **Durée** | 4 jours |
| **Équipe** | DA · UI/UX · Dev · Contenu |
| **Livrables** | `/fr` + `/en` home complètes · hero flamboyant · sections expertises/process/CTA · copy intégré |
| **Critère premium** | Le hero doit être **le moment le plus mémorable** du site — composition, typographie, motion synchronisée. |
| **Gate** | — |

#### Phase 05 — Expertises
| | |
|---|---|
| **Durée** | 2 jours |
| **Équipe** | UI/UX · Dev · Contenu |
| **Livrables** | Pages expertises FR/EN · cards différenciées (pas de répétition identique) |

#### Phase 06 — Projets (Listing + Détail)
| | |
|---|---|
| **Durée** | 4 jours |
| **Équipe** | Dev · Contenu · DA |
| **Livrables** | Content Collections · filtres React · pages listing + `[slug]` · 3+ projets JSON réels |
| **Critère premium** | Chaque étude de cas raconte une histoire (friction → décision → solution), pas une fiche produit. |

#### Phase 07 — Studio & À propos
| | |
|---|---|
| **Durée** | 2 jours |
| **Équipe** | UI/UX · Dev · Contenu |
| **Livrables** | Pages studio FR/EN · identité africaine visible dans le ton et la composition |

#### Phase 08 — Contact & Formulaire
| | |
|---|---|
| **Durée** | 2 jours |
| **Équipe** | Dev · RSSI · UI/UX |
| **Livrables** | ContactForm · Turnstile · API `/api/contact` · états success/error/loading · rate limit KV |
| **Gate** | → **G2 Contact OK** (terrain : Sprint 0.4–0.9). Le DA sign-off des pages n’attend pas cette phase. |

#### Phase 09 — Contenu & SEO
| | |
|---|---|
| **Durée** | 3 jours |
| **Équipe** | Contenu · Dev |
| **Livrables** | i18n complet · meta OG/Twitter · JSON-LD · sitemap · hreflang · alt text images |
| **Gate** | → **G3** |

#### Phase 10 — Polish visuel & Motion
| | |
|---|---|
| **Durée** | 3 jours |
| **Équipe** | DA · Dev · UI/UX |
| **Livrables** | Micro-interactions · transitions de page · détails typographiques (accents serif, mono labels) · rythme visuel homogène |
| **Critère flamboyant** | 2-3 moments « wow » par page max — le reste est calme et respire. |

#### Phase 11 — QA & Accessibilité
| | |
|---|---|
| **Durée** | 2 jours |
| **Équipe** | QA · Dev |
| **Livrables** | Matrice de recette Playbook §9 verte · 0 bug bloquant · Lighthouse > 90 perf/a11y/best-practices |

#### Phase 12 — Légal & Conformité
| | |
|---|---|
| **Durée** | 2 jours |
| **Équipe** | RSSI · Contenu |
| **Livrables** | Confidentialité + mentions légales validées · self-hosted fonts · DPA Resend/Cloudflare |

#### Phase 13 — Staging & Recette client
| | |
|---|---|
| **Durée** | 2 jours |
| **Équipe** | DP · toute l'équipe |
| **Livrables** | Preview Cloudflare · walkthrough client · liste retours · corrections |

#### Phase 14 — Go-Live
| | |
|---|---|
| **Durée** | 1 jour |
| **Équipe** | Dev · RSSI · DP |
| **Livrables** | DNS · HTTPS · env vars prod · monitoring · annonce |
| **Gate** | → **G4** |

**Durée totale estimée : ~34 jours ouvrés (~7 semaines)**

---

## 4. Rituels d'équipe

| Rituel | Fréquence | Durée | Participants | Objectif |
|---|---|---|---|---|
| **Sync décision** | Quand un fund / kill / revise | 15 min | DP + owner PERT | Pas de daily théâtre. Une décision ou rien |
| **Design Review** | Fin de Cycle B, ou page prête à montrer | 45 min | DA · UI/UX · Front · DP | Grille §4.1 ≥ 4/5 — **pas** une gate G2 |
| **Copy Review** | Fin de Cycle A (0.10+0.11) puis G3 | 30 min | Contenu · DA · DP | Voix, swap test, CTA unique, KPI, « À valider » |
| **Demo** | Fin de cycle A / B / C | 30 min | Tous | Montrer l’OKR, pas une phase Playbook vide |
| **Retro** | Fin de cycle | 30 min | Tous | `/agen-retrospective` + mémoire |
| **QA Blitz** | Avant G4 | 2h | QA · Front · RSSI | Matrice Playbook §9 |

### 4.1 Design Review — grille d'évaluation

Chaque page est notée /5 sur 6 critères. **Minimum 4/5 sur chaque pour passer.**

| Critère | Question |
|---|---|
| **Premium** | Est-ce que ça respire l'intention et la qualité ? |
| **Créatif** | Y a-t-il une surprise visuelle maîtrisée ? |
| **Moderne** | Stack et UI crédibles, pas datés ? |
| **Pro** | Autorité et clarté sans arrogance ? |
| **Africain** | Identité subtile et contemporaine (pas folklorique) ? |
| **Flamboyant** | Au moins un moment mémorable par page ? |

---

## 5. Identité africaine — guide express

### Ce qu'on fait

| Levier | Application concrète |
|---|---|
| **Palette chaude** | Canvas crème `#F7F4EE` · Teal profond `#007C83` · Magenta `#B5175B` · Bordeaux `#7A092B` · Coral `#E05A47` · Gold `#D2A43B` |
| **Typographie** | Sora (headings) + Inter (body) + IBM Plex Mono (labels techniques) + Instrument Serif (accents italiques) |
| **Géométrie** | Motifs géométriques discrets (grilles, arcs, lignes) — pas de motifs wax literal |
| **Lumière** | Fonds lumineux, pas dark mode · lumière dorée/teal en accent |
| **Voix** | « Douala / Yaoundé » · « standards internationaux » · « friction opérationnelle » — ancrage local + ambition globale |
| **Visuels** | Interfaces réelles, dashboards, flows — pas de stock « personne africaine souriante avec laptop » |
| **Motion** | Révélation progressive (Reveal) · pulsation douce · transitions fluides — jamais agressif |

### Ce qu'on ne fait jamais

- Cyberpunk dark · gradients arc-en-ciel · glassmorphism générique
- Rockets · robots · blobs 3D · cartoon
- Or massif · wax literal · drapeaux · symboles tribaux
- Stock photos aléatoires · métriques inventées · clients fictifs
- Template SaaS violet · carousels auto · scroll-jacking

---

## 6. Outils & collaboration

| Domaine | Outil | Usage |
|---|---|---|
| Code | Git + GitHub | Branches `feat/`, `fix/`, PR reviews |
| Design | Figma | Maquettes · design system · prototypes |
| Contenu | Google Docs (ou Notion) | Copy FR/EN · relecture |
| Projet | Notion ou GitHub Projects | Backlog · phases · gates |
| Preview | Cloudflare Pages (branches) | Preview par PR |
| QA | Lighthouse · axe · clavier manuel | Perf · A11Y · navigation |
| Comms | Slack ou WhatsApp | Stand-ups · reviews |
| Secrets | Cloudflare env vars | Prod · staging |
| Email | Resend dashboard | Monitoring envois |

### 6.1 Conventions Git

```
main              ← production
├── staging       ← recette client
└── feat/phase-04-home
    feat/phase-06-projects
    fix/contact-rate-limit
```

**Règles :**
- 1 branche = 1 phase ou 1 fix
- PR obligatoire avec screenshot mobile + desktop
- Build + lint + check verts avant merge
- Squash merge sur `staging`, merge commit sur `main`
- GitOps-lite : prod = SHA `main` · secrets Cloudflare · rollback = `git revert` · jamais `Co-authored-by` · commit sur demande explicite seulement (`/agen-git`)

---

## 7. Definition of Done (DoD)

Une tâche n'est **terminée** que si **tous** ces critères sont remplis :

### Technique
- [ ] `npm run build` passe sans erreur
- [ ] `npm run check` passe (TypeScript strict)
- [ ] `npm run lint` passe
- [ ] 0 erreur console navigateur
- [ ] Formulaire contact fonctionne (Turnstile + Resend)

### Design
- [ ] Validé par DA (Design Review ≥ 4/5 sur les 6 critères)
- [ ] Testé sur 360 · 390 · 768 · 1024 · 1440 · 1920 px
- [ ] Aucun overflow horizontal
- [ ] États hover · focus · active · loading · disabled · error présents
- [ ] `prefers-reduced-motion` respecté

### Contenu
- [ ] Copy FR + EN intégré (pas de Lorem Ipsum)
- [ ] Meta title · description · OG image renseignés
- [ ] Alt text sur toutes les images

### Accessibilité
- [ ] Navigation clavier complète
- [ ] Focus visible sur tous les interactifs
- [ ] Contraste WCAG AA
- [ ] Touch targets ≥ 44×44 px
- [ ] HTML sémantique (headings, landmarks, labels)

### Premium
- [ ] Aucune section ne ressemble à un placeholder
- [ ] Hiérarchie visuelle claire · rythme cohérent
- [ ] Au moins un moment mémorable par page
- [ ] Le mobile semble intentionnellement conçu, pas « adapté »

---

## 8. Plan d'action immédiat

Le calendrier 7 semaines (cases vides du 19/08) est **archivé** : le site n’est plus un greenfield. Ordre réel, PERT et missions :

→ **[plan-unifie.md](./plan-unifie.md)** — Cycle A (board) → B (punch) → C (G3/G4)  
→ **[plan-remediation-architecture.md](./plan-remediation-architecture.md)** — checklists 0.1 … 2.8

**Maintenant :** G.1 (commit si demandé) → A1 ∥ A8 ∥ **A9** ∥ A2 ∥ A3 → G2 ∥ A10. B3 attend le H1 lock, pas le pass accueil. Contenu = A de A1 A8 A9 A10 B8 G3.

---

## 9. Métriques de succès post-launch

| Métrique | Cible | Outil |
|---|---|---|
| Lighthouse Performance | ≥ 90 | Chrome DevTools |
| Lighthouse Accessibility | ≥ 95 | Chrome DevTools |
| Lighthouse Best Practices | ≥ 95 | Chrome DevTools |
| First Contentful Paint | < 1.5s | Web Vitals |
| Cumulative Layout Shift | < 0.1 | Web Vitals |
| Formulaire contact | 100 % fonctionnel | Test manuel |
| 0 erreur console | 0 | DevTools |
| Temps de réponse contact | < 24h ouvrées | Process interne |

---

## 10. Anti-patterns — ce qui tue le premium

| Anti-pattern | Pourquoi c'est fatal | Alternative |
|---|---|---|
| Copier un template Tailwind/UI | Generic SaaS, zero identité | Composer avec le design system AgenStudio |
| Ajouter des features non demandées | Scope creep, qualité diluée | Playbook = source de vérité |
| Sauter le mobile | 60 %+ du trafic camerounais | Mobile-first, toujours |
| Inventer des clients/résultats | Crédibilité détruite | « À valider » ou structure vide |
| Animations partout | Fatigue visuelle, perf | 2-3 moments wow par page max |
| Dark mode cyberpunk | Contredit l'identité lumineuse | Canvas clair + accents teal/magenta |
| Ignorer l'accessibilité | Exclut, non-pro | WCAG AA minimum |
| Déployer sans RGPD | Risque juridique | Gate G4 bloquante |

---

## 11. Historique

| Date | Action |
|---|---|
| 19/08/2026 | Création du document — équipe, workflow, plan d'action 7 semaines |
| 20/08/2026 | Unification : G2 = Contact OK · §8 pointe vers plan-unifie.md · rituels sans daily |
