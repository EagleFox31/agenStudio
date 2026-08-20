# Plan unifié AgenStudio — Playbook × remédiation × PERT

> **Date :** 20 août 2026 (rév. A9/A10 split · **suivi ✓ / par qui**)  
> **Statut :** document vivant (séquencement, PERT, missions).  
> **Checklists d’exécution :** `plan-remediation-architecture.md`  
> **Rôles, DoD, identité :** `equipe-workflow.md`  
> **OKR trimestre :** un inconnu envoie un brief depuis un site qu’on ose montrer.

Les phases Playbook 00–14 restent la **carte**. Les sprints G / 0 / 1 / 2 sont le **terrain** (le site existe déjà). Ce fichier les fait parler : même gates, un seul ordre, un PERT, cinq missions (GitOps · RSSI · Front · Backend · **Contenu**).

---

## 1. Comment les deux plans se parlent

| Playbook (`equipe-workflow`) | Terrain (`plan-remediation`) | Gate | ✓ | Par qui | État 20/08 |
|---|---|---|---|---|---|
| 00–03 Fondations | Sprint G + tokens / layout déjà posés | **G1** | `[~]` | **Dev** · **Git** | Build OK · CI absente · tree non figé |
| 08 Contact | Sprint 0.4–0.9 | **G2** | `[x]` | **Back** + **Dev** + **Contenu** | Contrat · UI · copy aside · légal brouillon |
| 04–07 + 10 Pages & punch | Sprint 0.1–0.3, **0.10–0.11** + Sprint 1 | DA 4/5 | `[~]` | **Dev** + **Contenu** | H1 lock · pass accueil · punch DA + îlots ouverts |
| 09 Contenu & SEO | 0.1, 0.3, **0.10–0.11**, 1.5, 1.9 | **G3** | `[ ]` | **Contenu** | A9·A10 ✅ · CR-A · B8 · C1 |
| 12–14 Légal · staging · live | 0.7, 2.7, avocat, KV | **G4** | `[ ]` | **RSSI** · **Avocat** | NO-GO légal |

**Règle d’arbitrage :** en cas de conflit, le terrain gagne sur le calendrier 7 semaines. Le Playbook gagne sur le North Star et le DoD.

**G2 n’est plus « Design OK ».** Le sign-off DA (6 critères ≥ 4/5) reste obligatoire pour *montrer* une page, mais il ne bloque plus le tuyau brief. Un site beau sans formulaire conversation = échec produit.

---

## 2. OKR du trimestre

| | |
|---|---|
| **O** | Un inconnu envoie un brief crédible depuis un site qu’on ose montrer |
| **KR1** | 0 KPI inventé visible (JSON + mockups) |
| **KR2** | Formulaire conversation : un Zod, honeypot vivant, erreurs par champ, fail-closed |
| **KR3** | Hero compris en 5 s · H1 distinctive (swap test) · punch graphique · ≤ 3 îlots · LCP HTML |
| **KR4** | SHA `main` figé · secrets hors Git · KV prod documenté |

Owner unique (single-threaded) : **DP** (`/agen-orchestrateur`). Cinq missions exécutent. DA, produit, QA, UI/UX restent **consultés** — pas le Lead Contenu, qui porte KR1 et G3.

---

## 3. Trois cycles (Shape Up lite)

| Cycle | Appetite | Dans le bet | Hors bet |
|---|---|---|---|
| **A** · ~3 j | Montrable board | G.1 (demande humaine) · 0.1–0.11 | Keystatic, découpe Home, CI non bloquante, WebGL |
| **B** · ~5 j | Punch + perf | 1.1 1.2 1.3 1.10 1.11 · 1.6 1.7 1.8 · 1.9 | 1.4 après Reveal CSS · 1.5 Content Layer |
| **C** · cool-down | Hygiène → G3/G4 | 1.5 puis 2.8 · 2.1 2.5 · KV · avocat | Nouveau « immersif », CMS distant, BDD |

Pas de daily. Sync seulement s’il y a un fund / kill / revise. Retro en **fin de cycle**.

---

## 4. PERT

Durées en **jours ouvrés**. Espérance \( t_e = (O + 4M + P) / 6 \).  
Unité : 0,25 j ≈ 2 h. Avocat (C7) est externe — le démarrer **jour 0**.

### 4.1 Activités

Symboles : `[x]` done · `[~]` partiel · `[ ]` à faire · `[—]` bloqué. Détail : `plan-remediation-architecture.md`.

> **† Rouvert puis refermé le 20/08 — reprise Lead Contenu.** A1, A9 et A10 avaient été marqués faits alors que le balayage n'avait couvert qu'`i18n.ts` : les 3 JSON projets, les meta de 6 pages, le JSON-LD et 5 composants portaient encore l'ancien registre, plus une fuite de langue FR↔EN et des placeholders « À valider » visibles en production. Corrigé, build vert (21 pages). Rapport : **`audit-copy-cycle-a.md`**.
> **Fermé dans la foulée :** `metrics.value` passé en `bilingual` · `content.config.ts` importait `z` de `zod` v3 alors qu'Astro 7 embarque zod v4 — deux instances, Content Layer incapable de générer les types, 52 erreurs `ts(18046)`. Corrigé (`z` depuis `astro:content`) : **`astro check` = 0 erreur, 0 warning**.
> **Reste ouvert :** **CR-A remis à `[~]`** — il avait été marqué `[x]` à tort : le rituel exige DA + DP consultés, seule la moitié Contenu était faite. Pack de revue prêt (**`cr-a-copy-review.md`**) : 3 décisions DA, 3 décisions DP, 30 min, hors chemin critique. La case DA « H1 comme artwork » ne peut se fermer qu'après **B3**.

| ✓ | ID | Activité | Owner (A) | Par qui | Date | Sprint | **tₑ** | Prédécesseurs |
|---|---|---|---|---|---|---|---|---|
| `[x]` | G.1 | Figer working tree | **Git** | **Git** (demande user 20/08 14:13) | 20/08 | G | **0,54** | — · **humain levé** |
| `[x]` | A1 | Honnêteté KPI (0.1 0.2) | **Contenu** | **Dev** + **Contenu** | 20/08 † | 0 | **0,50** | — |
| `[x]` | A2 | OG `og-default.png` (0.3) | **Dev** | **Dev** + **DA** | 20/08 | 0 | **0,54** | — |
| `[x]` | A3 | Contrat Zod unique (0.4) | **Back** | **Back** · **Dev** (form) | 20/08 | 0 | **0,83** | — |
| `[x]` | A4 | Honeypot vivant (0.5) | **RSSI** | **Back** | 20/08 | 0 | **0,50** | A3 |
| `[x]` | A5 | Turnstile fail-closed local (0.6) | **RSSI** | **Back** (C) · **Dev** | 20/08 | 0 | **0,54** | A3 |
| `[x]` | A6 | Formulaire conversation — UI (0.8) | **Dev** | **Dev** | 20/08 | 0 | **1,00** | A3 |
| `[x]` | A7 | Enveloppe API, PII, Idempotency (0.9) | **RSSI** | **Back** | 20/08 | 0 | **0,79** | A3 |
| `[x]` | A8 | Copy contact / claims i18n (0.8 copy) | **Contenu** | **Dev** + **Contenu** | 20/08 | 0 | **0,54** | — |
| `[x]` | A9 | **H1 artwork lock** (0.10) | **Contenu** | **Contenu** | 20/08 † | 0 | **0,83** | — |
| `[x]` | A10 | **Pass copy accueil** (0.11) | **Contenu** | **Contenu** | 20/08 † | 0 | **0,79** | **A9** |
| `[x]` | **G2** | Gate contact | **Back** | **Back** + **Dev** + **Contenu** | 20/08 | — | **jalon** | A4 · A5 · A6 · A7 · A8 |
| `[x]` | B1 | Reveal = CSS (1.1) | **Dev** | **Dev** | 20/08 | 1 | **1,00** | G2 |
| `[x]` | B2 | Hero sans îlot décoratif (1.2) | **Dev** | **Dev** | 20/08 | 1 | **0,50** | B1 |
| `[ ]` | B3 | Hero graphique LCP (1.3) | **DA** | — | — | 1 | **1,46** | B2 · **A9** |
| `[ ]` | B4 | Punch 70/20/10 (1.10) | **DA** | — | — | 1 | **0,75** | B3 |
| `[ ]` | B5 | 44×44 · focus trap · 404 (1.6 1.7) | **Dev** | — | — | 1 | **0,79** | B1 |
| `[ ]` | B6 | WOFF2 self-host (1.8) | **Dev** | — | — | 1 | **0,83** | G.1 |
| `[ ]` | B7 | Budget JS mesuré (1.11) | **Dev** | — | — | 1 | **0,54** | B2 |
| `[~]` | B8 | Cas éditoriaux (1.9) | **Contenu** | **Contenu** | 20/08 | 1 | **1,00** | A1 · **A9** |
| `[ ]` | C1 | Copy → Content Layer (1.5) | **Contenu** | — | — | 1 | **1,58** | B3 · **A10** |
| `[ ]` | C2 | Découpe HomeSections (1.4) | **Dev** | — | — | 1 | **1,00** | B1 |
| `[ ]` | C5 | CI GitHub (2.5) | **Git** | — | — | 2 | **0,54** | G.1 |
| `[ ]` | C6 | KV `RATE_LIMIT` prod (2.7) | **RSSI** | — | — | 2 | **0,54** | G2 · G.1 |
| `[—]` | C7 | Avocat mentions + privacy | **RSSI** | **Avocat** | — | 0/G4 | **3,83** | — · **externe** |
| `[~]` | **CR-A** | Copy Review Cycle A | **Contenu** | **Contenu** (DA + DP = C) | 20/08 | 0 | **0,27** | A1 · A8 · A9 · A10 |
| `[ ]` | **G3** | Gate contenu | **Contenu** | — | — | — | **jalon** | A1 · A2 · A9 · A10 · B8 · B3 · **CR-A** |
| `[ ]` | **G4** | Gate go-live | **RSSI** | — | — | — | **jalon** | G3 · B4 · B7 · C6 · C7 · C5 |

C3 Keystatic (2.8) et C4 tokens hex (2.1) : **hors chemin G4**. C3 après C1. Ne pas les mettre sur le PERT go-live.

### 4.2 Chemin critique (produit → G4)

```
A3 (Zod) → A6 (formulaire UI) → G2 → B1 (Reveal CSS) → B2 (îlot hero)
    → B3 (hero graphique, H1 déjà lock) → B4 (punch) → G4
```

\( t_e \) cumulé ≈ **5,54 j** (hors avocat). **G2 n’attend pas le copy éditorial.** A9 / A10 courent en parallèle d’A3.

Chemin copy (ne rallonge G2) :

```
A9 (H1 lock, tₑ 0,83) → A10 (pass accueil, tₑ 0,79) → CR-A → (G3 plus tard)
```

EF A10 ≈ **1,62 j** — avant G2 (1,83). Copy Review Cycle A rentre dans le slack de G2.

| Si… | Alors |
|---|---|
| Avocat > ~5,5 j (P = 10) | **C7** vole le chemin G4 — lancer jour 0 |
| On commence B3 sans A9 | Clamp 8vw sur du beige — **interdit** (G-015) |
| On fait attendre B3 pour A10 | Le pass expertises n’est pas du LCP — **ne pas coupler** |
| On exige Content Layer pour G3 | …→B3→**C1** (après A10) →G3→G4 ≈ **6,4 j** |
| On code 1.4 avant 1.1 | Double refactor — interdit |

### 4.3 Marges (slack)

| Activité | Slack | Lecture |
|---|---|---|
| A6, B1, B2, B3, B4 | **0** | Critique produit — ne pas interrompre |
| A9 | ~2,5 j jusqu’à B3 · **~1 j** jusqu’à fin Cycle A | H1 lock. Ne bloque pas G2. Bloque B3 (soft) |
| A10 | ~3 j jusqu’à G3 · **~0,2 j** jusqu’à G2 | Pass accueil. Ne bloque **pas** B3. Bloque CR-A et C1 |
| A4, A5, A7, A8 | ~0,2–0,5 j | Parallèles d’A6 |
| A1 | Fort jusqu’à B8 / G3 | Honnêteté KPI, plus le H1 |
| G.1 | ~1,3 j | Pas après G2 si C6 suit |
| B6, B5, B8 | Fort | Pendant B2–B4 |
| C5 CI | Fort | Dès G.1 |
| C7 avocat | ~1,7 j sur tₑ · **0 sur P** | Seul aléa G4 |

---

## 5. Missions — cinq owners

RACI : **R** exécute · **A** accountable (un seul A par ligne) · **C** consulté · **I** informé.  
DP reste A de l’OKR. QA recette en fin de cycle. DA / produit / UI/UX = C sur B3, A6, A1.

### 5.1 GitOps — `/agen-git`

**Mission :** Git est la vérité déployable. Cloudflare tire un SHA. Les secrets n’existent pas dans le repo. Rollback = `git revert`. Pas d’Argo.

| Cycle | Livrable | Done quand |
|---|---|---|
| A | **G.1** — commit+push du tree (skills, mémoire, gitignore, plans) | SHA sur `origin/main` · 0 `Co-authored-by` · **demande humaine** |
| A–C | Signaler tree sale à chaque fin de cycle | Phrase explicite, proposition de message, pas de commit fantôme |
| C | **C5** — workflow `lint` + `check` + `build` | PR rouge si check fail |
| G4 | Recette rollback | `git revert` documenté · CI sans secrets prod |

**Ne fait pas :** coder le formulaire, choisir le hero, coller des clés dans Git « pour que ça marche ».  
**Bloque :** C5, C6, B6 (fonts dans `public/` doivent pouvoir être revertibles).

### 5.2 RSSI — `/agen-rssi`

**Mission :** GO / NO-GO G4. Honeypot vivant, un Zod, KV prod, processeurs nommés, PII minimale, légal pas brouillon.

| Cycle | Livrable | Done quand |
|---|---|---|
| A | Veto A4 A5 A7 + claims 0.8 (« jamais de tiers ») | Honeypot 200 · pas `max(0)` · 503 env · 0 IP mail · Turnstile local = message |
| A | **C7 lancé** — dossier avocat (brouillon 0.7 honnête) | Structure complète, reste « À valider » jusqu’à signature |
| B | Recette B6 fonts | 0 Google CDN · pas de consentement bandeau pour du self-host |
| C | **C6** binding KV prod | G4 sécu verte · README + dashboard |
| G4 | Verdict GO / NO-GO | Bloquants listés, pas un « on verra en prod » |

**Ne fait pas :** composition DA, Content Layer, CI YAML (GitOps).  
**A de :** G4 sécurité + RGPD. **C de :** A3 (contrat), C3 (Keystatic local, 0 OAuth prod).

### 5.3 Dev-architecte front — `/agen-dev`

**Mission :** Astro + budget d’îlots + LCP HTML + tokens. Importe le Zod, ne le possède pas. Mobile 360 px intentionnel.

| Cycle | Livrable | Done quand |
|---|---|---|
| A | A2 OG fichier réel · A6 UI formulaire (GOV.UK, 44×44, `novalidate`) | G-009 vert · formulaire conversation |
| B | **Critique** B1→B2→B3→B4 · plus B5 B7 | 0 `Reveal client:` · hero graphique · Lighthouse mesuré |
| B | B6 implémentation fonts (RSSI recette) | WOFF2, preload 1–2 fichiers |
| C | C2 découpe Home **après** B1 · C1 **câblage** Content Layer (Contenu = A) · C4 hex→vars | G-005, G-008 verts |

**Ne fait pas :** schema Zod recopié, SQL, commit autonome, WebGL sur `/fr` `/en`, **rédiger** le copy (A = contenu).  
**A de :** G-008 îlots, G-003 build, chemin critique B1–B4, A6 UI.

### 5.4 Dev-architecte backend — `/agen-backend`

**Mission :** une route POST, un contrat, des stores honnêtes. Git = contenu. Resend = leads. KV = abuse. Pas de BDD.

| Cycle | Livrable | Done quand |
|---|---|---|
| A | **A3** schema unique `.strict()` importé Function + form | G-011 vert |
| A | A4 honeypot (avec RSSI) · A7 enveloppe `{ code, errors[] }` + Idempotency-Key | Bot 200 · humain mail · 0 IP |
| C | Contrat C6 (KV soft, pas de DO tant que volume studio) | Binding documenté, fail-closed |
| — | Veto SQL / Auth / CRM « pour plus tard » | G-010 |

**Ne fait pas :** îlots React, punch DA, workflow GitHub, pages légales (RSSI+contenu), copy i18n.  
**A de :** G-010, G-011, Function `/api/contact`.

### 5.5 Lead Contenu — `/agen-contenu`

**Mission :** les mots que le visiteur lit. KR1 (0 KPI inventé) **et** KR3 (H1 distinctive). G3. Voix percutante — doctrine `copy-editorial.md`. Copy de pages hors `i18n.ts`. FR d’abord, EN = second original.

| Cycle | Livrable | Done quand |
|---|---|---|
| A | **A1** — JSON projets honnêtes (0.1) · veto KPI mockups (0.2 avec DA) | 0 chiffre inventé visible |
| A | **A9** — H1 artwork 16 drafts (0.10) | Swap test · kicker ≠ H1 · tient `clamp(8vw)` |
| A | **A10** — pass copy accueil (0.11) | 0 beige · un verbe sitewide · EN seconds originaux |
| A | **A8** — aside contact + erreurs form · 0 « jamais de tiers » · 0 SLA 24 h fantôme | Copy conversation, G-002 |
| A | **CR-A** — Copy Review §11 (avec DA + DP) | Cycle A copy verte, **sans** attendre G2 |
| A | **C7** — brouillon mentions / privacy (R, RSSI = A) | Structure complète, « À valider » jusqu’à avocat |
| B | **B8** — cas éditoriaux · friction imagée · outcomes vrais · stack aside | Conversion, pas fiche React |
| B | B3 — H1 **déjà lock (A9)** mis en page | Le clamp n’agrandit pas du beige |
| C | **C1** Content Layer après **A10** · puis **C3** Keystatic | i18n.ts = chrome · G3 |
| G3 | **A de la gate** — Copy Review + SEO | OG (A2) · 0 KPI · H1 swap · légal → G4 |

**Ne fait pas :** îlots, Zod, CI, composition DA, inventer un client « pour remplir ».  
**A de :** G-002, G-015, G3, A1, A8, **A9, A10**, B8, C1, CR-A. **R de :** C7 draft. **C de :** A6 UI.

### 5.6 Matrice RACI (activités PERT)

| ID | GitOps | RSSI | Front | Backend | **Contenu** |
|---|---|---|---|---|---|
| G.1 | **R/A** | C | I | I | I |
| A1 | I | I | C | — | **R/A** |
| A2 | I | I | **R/A** | — | C |
| A3 | I | C | C | **R/A** | — |
| A4 | I | **A** | I | **R** | — |
| A5 | I | **A** | **R** | C | — |
| A6 | I | C | **R/A** | C | C |
| A7 | I | **A** | I | **R** | — |
| A8 | I | C | C | — | **R/A** |
| A9 | I | I | C | — | **R/A** |
| A10 | I | I | I | — | **R/A** |
| CR-A | I | I | I | — | **A** (DA+DP = C) |
| B1–B4 | I | I | **R/A** | — | C (B3) · H1 déjà lock |
| B5 B7 | I | I | **R/A** | — | — |
| B6 | I | **A** recette | **R** | — | — |
| B8 | I | — | C | — | **R/A** |
| C1 | I | I | **R** | — | **A** |
| C2 | I | I | **R/A** | — | I |
| C3 | I | C | **R** | — | **A** |
| C5 | **R/A** | I | C | I | I |
| C6 | C | **R/A** | I | C | — |
| C7 | I | **A** | — | — | **R** |
| G2 | I | C | C | **A** contrat | C (A8) |
| G3 | I | C | C | — | **A** |
| G4 | C | **A** | C | C | C |

DA / produit / QA : C sur B3, A6, G4 — voir `equipe-workflow.md`. Pas de colonne pour rester lisible.

---

## 6. Ordre d’exécution (une semaine board)

```
J0      C7 avocat lancé (dossier 0.7)          RSSI + Contenu (R)
J0      G.1 si tu le demandes                  GitOps
J1      A1 ∥ A8 ∥ **A9** ∥ A2 ∥ A3             Contenu + Front + Backend
J2      A4–A7 → G2  ∥  **A10** puis CR-A       RSSI/Back/Front  ·  Contenu (pass)
J3–J4   B1 → B2                                Front   (B5 B6 · B8 dès A9)
J5      B3 → B4                                Front + DA · H1 = A9 (pas A10)
J5–J6   B7 mesuré · C6 KV si G.1 vert          Front · RSSI
J7+     C1 (après A10) puis C3 · G3 · G4       G3 = Contenu
```

Ne pas commencer C2 (1.4) avant B1.  
Ne pas commencer C3 (Keystatic) avant C1.  
Ne pas commencer B3 (1.3) avant **A9**.  
Ne pas faire attendre B3 pour **A10**.  
Ne pas commencer un refactor visuel avant G2.

---

## 7. Définition de « fini » pour ce plan

- [x] Un seul document vivant pour l’ordre : **celui-ci** — **DP** · 20/08
- [x] `equipe-workflow.md` décrit rôles / DoD / phases — **DP** · 20/08
- [x] `plan-remediation-architecture.md` = checklists avec **✓ / Par qui / Date** — **DP** · 20/08
- [x] G2 = contact · G1 = fondations · G4 = RSSI — **DP** · 20/08
- [x] Cinq missions = owners PERT — **DP** · 20/08
- [ ] Canvas PERT `pert-agenstudio.canvas.tsx` — **DP** · absent

## Références

- Checklists : `plan-remediation-architecture.md`
- Équipe / DoD : `equipe-workflow.md`
- Gates : `.cursor/skills/agen-workflow/references/phases-gates.md`
- Données : `architecture-donnees.md`
- GitOps-lite : `.cursor/skills/agen-git/references/sante-git.md`
- Canvas PERT : `pert-agenstudio.canvas.tsx`
- Copy éditorial : `.cursor/skills/agen-contenu/references/copy-editorial.md`
- Audit copy CR-A : `audit-copy-cycle-a.md`
- Pack de revue CR-A (décisions DA + DP) : `cr-a-copy-review.md`
- Méthode copy réutilisable : `.claude/skills/copywriting-web/`
