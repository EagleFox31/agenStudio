# Équipe & Workflow — AgenStudio

> **Date :** 19 août 2026  
> **Objectif :** livrer un site **flamboyant, créatif, beau, moderne, pro, premium et africain** — sans jamais basculer dans le cliché ni le template SaaS générique.  
> **Référence :** [Playbook AgenStudio](../AgenStudio_Playbook_Site_Web.docx.pdf) · [agents.md](../agents.md) · [analyse-rssi.md](./analyse-rssi.md)

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

**Test ultime :** un directeur technique européen et un entrepreneur camerounais doivent tous deux se dire *« ce studio est sérieux »* — le premier par la rigueur, le second par l'identité.

---

## 2. Équipe — 7 rôles, 1 direction

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
| `/agen-da` | Direction Artistique |
| `/agen-ui-ux` | UI/UX Designer |
| `/agen-dev` | Lead Dev Front |
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
- **Livrables :** composants réutilisables, pages, API contact, build vert.
- **Stack :** Astro 7 · TypeScript strict · Tailwind · Motion · Zod · Cloudflare Pages.
- **Interdit :** `any`, secrets côté client, dépendances inutiles, composants > 200 lignes sans justification.

#### Lead Contenu (FR/EN)
- **Mission :** rédiger et valider tous les textes bilingues dans la voix AgenStudio.
- **Livrables :** copy dans `src/lib/i18n.ts`, fiches projets JSON, meta SEO, alt text.
- **Voix :** autorité calme · clarté stratégique · intelligence technique · standards internationaux · identité africaine subtile · confiance sans arrogance.
- **Interdit :** Lorem Ipsum · clients/testimonials/awards inventés · métriques non validées.

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

Le workflow reprend les **15 phases du Playbook** (00 → 14) enrichies de **4 gates de qualité** et de **rituels d'équipe**.

### 3.1 Les 4 Gates (points de contrôle)

```
Phase 00-03          Phase 04-08          Phase 09-11          Phase 12-14
Fondations      →    Design & Build   →   Polish & Contenu  →  Launch
     │                      │                    │                  │
   GATE 1               GATE 2               GATE 3            GATE 4
  Fondations OK        Design OK           Contenu OK         Go-Live OK
```

| Gate | Nom | Critères de passage | Valideur |
|---|---|---|---|
| **G1** | Fondations | Git init · env vars · design tokens · structure composants · build vert | DP + Dev |
| **G2** | Design OK | Chaque page maquettée 360→1920 · DA sign-off · 0 placeholder visuel | DA + UI/UX |
| **G3** | Contenu OK | Copy FR/EN validé · projets JSON complets · SEO meta · 0 « À valider » bloquant | Contenu + DP |
| **G4** | Go-Live OK | Build prod · formulaire testé · RGPD · rate limit KV · perf Lighthouse > 90 | RSSI + QA + DP |

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
| **Gate** | → **G2** |

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
| **Stand-up** | Quotidien | 15 min | Tous | Blocages · priorités du jour |
| **Design Review** | 2×/semaine | 45 min | DA · UI/UX · Dev · DP | Valider/comparer maquettes vs implémentation |
| **Copy Review** | 1×/semaine | 30 min | Contenu · DA · DP | Voix, ton, traductions EN |
| **Demo** | Fin de phase | 30 min | Tous | Montrer l'avancement · célébrer |
| **Retro** | Fin de gate | 30 min | Tous | Améliorer le workflow |
| **QA Blitz** | Avant G4 | 2h | QA · Dev | Passer la matrice de recette complète |

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

### Semaine 1 — Fondations (Phases 00-03)

| Jour | Action | Responsable | Statut |
|---|---|---|---|
| J1 | Initialiser Git + CI (lint, check, audit) | Dev | ⬜ |
| J1 | Moodboard afrofuturiste premium (Figma) | DA | ⬜ |
| J2 | Configurer env vars + Turnstile + Resend staging | Dev + RSSI | ⬜ |
| J2 | Valider sitemap + backlog complet | DP | ⬜ |
| J3 | Finaliser composants UI de base | Dev | ⬜ |
| J3 | Specs motion + tokens documentés | DA | ⬜ |
| J4 | Layout (Header, Footer, MobileMenu, BaseLayout) | Dev | ⬜ |
| J5 | **Gate G1** — fondations validées | DP | ⬜ |

### Semaine 2-3 — Design & Build (Phases 04-08)

| Action | Responsable | Statut |
|---|---|---|
| Hero flamboyant + sections home FR/EN | DA · Dev · Contenu | ⬜ |
| Pages expertises | UI/UX · Dev | ⬜ |
| Content Collections + 3 projets JSON | Dev · Contenu | ⬜ |
| Pages studio + contact | Dev · UI/UX | ⬜ |
| **Gate G2** — design validé sur toutes les pages | DA | ⬜ |

### Semaine 4-5 — Polish & Contenu (Phases 09-11)

| Action | Responsable | Statut |
|---|---|---|
| SEO complet (meta, JSON-LD, sitemap, hreflang) | Contenu · Dev | ⬜ |
| Micro-interactions + polish motion | DA · Dev | ⬜ |
| Copy final FR/EN · alt text | Contenu | ⬜ |
| **Gate G3** — contenu validé | Contenu · DP | ⬜ |
| QA blitz · matrice recette Playbook §9 | QA | ⬜ |

### Semaine 6-7 — Launch (Phases 12-14)

| Action | Responsable | Statut |
|---|---|---|
| Politique confidentialité + mentions légales | RSSI · Contenu | ⬜ |
| Self-host fonts · activer KV rate limit | Dev · RSSI | ⬜ |
| Staging + recette client | DP · tous | ⬜ |
| **Gate G4** — go-live | RSSI · QA · DP | ⬜ |
| DNS · HTTPS · monitoring · annonce | Dev · DP | ⬜ |

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
