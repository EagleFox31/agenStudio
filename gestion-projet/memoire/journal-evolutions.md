# Journal des évolutions — AgenStudio

> Chronologie des itérations. Chaque entrée est créée par `/agen-retrospective`.

---

## Format

```markdown
## [YYYY-MM-DD] Évolution #N — Titre
**Phase :** XX · **Gate :** Gx · **Skills mobilisés :** agen-dev, agen-da
**Demande :** résumé de la demande utilisateur
**Livrables :** fichiers modifiés
**Verdict :** ✅ OK · ⚠️ OK avec réserves · ❌ Échec partiel

### Ce qui a bien fonctionné
- ...

### Erreurs commises
- ...

### Leçons enregistrées
- [rôle] → references/lecons-apprises.md
- [global] → erreurs-globales.md

### Prochaine action
- ...
```

---

<!-- Les entrées sont ajoutées ci-dessous, les plus récentes en haut -->

## [2026-08-20] Évolution #19 — G.1 figer le working tree
**Phase :** 01 · **Gate :** G1 · **Skills :** agen-git
**Demande :** Commit G.1 — n’était bloqué que par G-007
**Livrables :** commit Cycle A/B local (contact, OG, copy, plans, Reveal CSS, hero HTML)
**Verdict :** ✅ OK si SHA sur `origin/main` · 0 Co-authored-by

### Ce qui a bien fonctionné
- Attendre la phrase explicite plutôt que d’interpréter « fais ton taf »

### Erreurs commises
- Avoir laissé G.1 en `[—]` Humain trop longtemps après que le user ait déjà demandé le taf

### Leçons enregistrées
- [git] « fais le commit G.1 » = demande humaine. G-007 levé.

### Prochaine action
- C5 CI (slack) · C6 si G2 vert · B3 si A9 lock

---

## [2026-08-20] Évolution #18 — B2 Hero sans îlot
**Phase :** 10 · **Gate :** G2 verte · **Skills :** agen-dev, agen-da, agen-qa
**Demande :** next PERT après B1
**Livrables :** `HeroVisual.astro` · `HomeSections.astro` · suppression `HeroVisual.tsx` + `SystemVisual.tsx`
**Verdict :** ✅ OK (`npm run check` 0 erreur · `npm run build` 21 pages · accueil 1 `astro-island`)

### Ce qui a bien fonctionné
- Remplacer l’îlot par du HTML, pas par des tabs CSS radio
- Copy existante (`mockLabel`, `mockCaption`, `visionFoot`) — rien inventé
- Champ teal + A géométrique croppée : pont vers B3 sans voler le clamp 8vw

### Erreurs commises
- Aucune — le skill proposait encore « tabs CSS » ; non suivi (théâtre SaaS)

### Leçons enregistrées
- [agen-dev] → B2 = tuer l’îlot, pas recréer les 3 onglets en CSS
- Skill `/agen-dev` : ligne Home mise à jour

### Prochaine action
- B3 : hero graphique LCP (DA A, Dev R) — H1 clamp 8vw, champ ≥ 40 % viewport, 1 objet

## [2026-08-20] Évolution #17 — B1 Reveal CSS
**Phase :** 10 · **Gate :** G2 verte · **Skills :** agen-dev, agen-ui-ux, agen-qa
**Demande :** Front = Dev, exécuter le next step PERT
**Livrables :** `scripts/reveal.ts` · CSS `.reveal` · 0 `Reveal client:` · `Reveal.tsx` supprimé · H1 sans opacity 0
**Verdict :** ✅ OK (`npm run check` 0 erreur · `npm run build` 21 pages)

### Ce qui a bien fonctionné
- Un observer pour tout le site, pas un îlot par carte
- Hero hors `.reveal` pour le LCP

### Erreurs commises
- Aucune (div extra Expertises/méthode corrigées avant build)

### Leçons enregistrées
- [dev] Reveal = CSS + 1 script. H1 jamais opacity 0 en attendant l’IO.

### Prochaine action
- B2 : retirer `HeroVisual client:load`

---

## [2026-08-20] Évolution #16 — Lexique gérant (recherches)
**Phase :** 09 · **Gate :** G3 (partiel) · **Skills :** agen-contenu, agen-produit, agen-retrospective
**Demande :** Vocabulaire incompréhensible — as-tu vraiment recherché ?
**Livrables :** `i18n.ts` · metas · privacy « message » · `copy-editorial.md` §6 sourcé · G-016 enrichi
**Sources :** Alivaon Douala 2026 · Yancommerce · DITP langage clair · GOV.UK words to avoid
**Verdict :** ⚠️ OK (`npm run build` à confirmer) · conflit playbook : CTA n’est plus « Envoyer un brief »

### Ce qui a bien fonctionné
- Les blogs PME Cameroun parlent stock, caisse, ventes, Excel, WhatsApp — pas « opérations »

### Erreurs commises
- Recherches Obys/Vikilinks pour la voix, zéro recherche sur le **lexique du visiteur**

### Leçons enregistrées
- [contenu] Croiser chaque mot avec Alivaon / Yancommerce
- [global] G-016 enrichi (lexique)

### Prochaine action
- Relire l’accueil à voix haute · CR-A

## [2026-08-20] Évolution #15 — Copy visiteur, plus pitch IA
**Phase :** 09 · **Gate :** G3 (partiel) · **Skills :** agen-contenu, agen-produit, agen-retrospective
**Demande :** Ton trop IA, pas proche du end user
**Livrables :** `i18n.ts` · `HomeSections.astro` · `HeroVisual.tsx` · metas FR/EN · `copy-editorial.md` · **G-016**
**Verdict :** ⚠️ OK avec réserves (build à confirmer · CR-A toujours ouverte · SystemVisual encore en jargon mock)

### Ce qui a bien fonctionné
- Gold Excel conservée — c'était déjà la voix visiteur
- CTA inchangé : Envoyer un brief

### Erreurs commises
- G-015 a poussé l'affiche (lames, théâtre, Figma) en croyant faire de l'éditorial

### Leçons enregistrées
- [contenu] Test du collègue
- [produit] 8 s = leur mardi
- [global] **G-016**

### Prochaine action
- Relire l'accueil 360 px à voix haute · CR-A DA+DP · B8 cas encore stack-speak

## [2026-08-20] Évolution #14 — A9 H1 lock + A10 pass accueil
**Phase :** 09 · **Gate :** G3 (partiel) · **Skills :** agen-contenu, agen-produit, agen-retrospective
**Demande :** Exécuter le taf Contenu si les prédécesseurs sont faits (A1·A8 verts)
**Livrables :** `i18n.ts` · `HomeSections.astro` · `ExpertisesSections.astro` · `StudioSections.astro` · `ContactSections.astro` · `PrivacySections.astro` · SEO accueil/contact · `copy-editorial.md` §12 · plans A9/A10 `[x]`
**Verdict :** ⚠️ OK avec réserves (`npm run build` vert · `npm run check` déjà rouge Zod 3 vs Astro 7, hors copy · CR-A pas encore DA+DP)

### Ce qui a bien fonctionné
- H1 lock documenté (16 drafts) avant de composer : « Des logiciels pour vos opérations. Conçus à Douala. »
- Kicker « Think sharp » hors H1 · dek = friction concrète · un verbe CTA sitewide
- Gold Excel conservée · 3 lames · méthode entrepôt · POV trois refus
- Contact 0 SLA 24 h · processeurs nommés · privacy « À valider »

### Erreurs commises
- A10 = accueil seulement : StudioSections restait « ingénierie souveraine » en dur (`lang === 'fr'`)
- Paires copy hors i18n encore dans HeroVisual / SystemVisual / Projects (Cycle B, pas Contenu A9)

### Leçons enregistrées
- [contenu] A10 n’est pas le site entier → grep `lang === 'fr'` après un pass
- [global] aucune promotion (G-015 déjà là)

### Prochaine action
- **CR-A** 30 min DA + DP (`copy-editorial.md` §11) · Front **B3** (1.3) débloqué · Contenu **B8** cas · **C1** Content Layer après CR-A · G.1 si demandé

## [2026-08-20] Évolution #13 — G2 contact (A8 copy + légal 0.7)
**Phase :** 08 · **Gate :** G2 · **Skills :** agen-dev, agen-contenu, agen-rssi
**Demande :** Enchaîner si prérequis faits — finaliser tuyau contact
**Livrables :** `ContactSections.astro` · `LegalSections.astro` · `PrivacySections.astro` · `Footer.astro` · meta contact · plans ✓ mis à jour
**Verdict :** ✅ OK (`npm run build` vert · check dette projets préexistante)

### Ce qui a bien fonctionné
- i18n contact déjà honnête — le bug était ContactSections en dur (SLA 24 h, « jamais de tiers »)
- Privacy : sous-traitants CF/Turnstile/Resend nommés, conservation « À valider »

### Erreurs commises
- Double source de vérité copy contact (i18n vs Astro hardcodé)

### Leçons enregistrées
- [dev] Toujours câbler les sections sur i18n après un pass Contenu

### Prochaine action
- A9 H1 lock · A10 pass accueil · B1 Reveal CSS

---

## [2026-08-20] Évolution #12 — Front A2 + A6 (PERT)
**Phase :** 08/09 · **Gate :** G2 (partiel) · **Skills :** agen-dev, agen-da, agen-ui-ux, agen-produit, agen-qa
**Demande :** Faire le taf Front si les prédécesseurs sont faits
**Livrables :** `public/brand/og-default.png` 1200×630 · ContactForm GOV.UK (erreurs champ, novalidate, 44×44)
**Verdict :** ✅ OK avec réserve (`npm run check` déjà rouge sur `content.config.ts` Zod 3 vs Astro 7 — hors A2/A6 · `npm run build` vert)

### Ce qui a bien fonctionné
- A3 déjà vert → A6 débloqué. A9/A1/A8 laissés à Contenu.
- G-009 : l’OG n’existait pas malgré un `[x]` au plan

### Erreurs commises
- Aucune régression ContactForm (0 erreur check sur nos fichiers)

### Leçons enregistrées
- [dev] Cocher un asset sans fichier
- [ui-ux] A6 ≠ A8

### Prochaine action
- Contenu A8 → G2. Front B1 Reveal CSS **après** G2. G.1 si demandé (tree sale).

---

## [2026-08-20] Évolution #13 — A3 A4 A7 contrat contact unique
**Phase :** 08 · **Gate :** G2 · **Skills mobilisés :** agen-backend, agen-rssi (C), agen-dev (C)
**Demande :** PERT publié — exécuter le lot backend Cycle A (Zod unique, honeypot vivant, enveloppe / 503 / 0 IP / Idempotency-Key)
**Livrables :** `src/lib/contact-schema.ts` · `functions/api/contact.ts` · `ContactForm.tsx` · `ContactSections.astro` (câble copy A8) · README KV obligatoire · cases 0.4–0.6 0.9 / A3–A5 A7
**Verdict :** ⚠️ OK avec réserves (`npm run check` rouge préexistant : Astro 7 content collections vs Zod 3 — hors lot. `npm run build` vert.)

### Ce qui a bien fonctionné
- Un Zod `.strict()` importé Function + formulaire (G-011)
- Honeypot `hp_confirm` parse puis 200, sans `max(0)` ni `name=website`
- Enveloppe `{ code, errors[] }` · env → 503 · pas d’IP dans le mail · Idempotency-Key
- Copy A8 (`missingTurnstile`, `fieldErrors`) câblé, pas de strings inventées

### Erreurs commises
- A5 (Front R) : blocage POST sans site key livré depuis le form (C→R) pour tuer le token vide
- `astro check` non débloqué (content.config Zod 3) — hors scope A3

### Leçons enregistrées
- [backend] turnstileToken hors `.min(10)` du Zod
- [backend] honeypot ≠ `website` / `.hidden`
- [global] G-011 déjà en vigueur — pas de nouvelle règle

### Prochaine action
- Front **A6** UI GOV.UK · Contenu **A8** aside « jamais de tiers » · RSSI veto A4/A7 · **G2**
- G.1 commit si demandé (tree sale)

---
## [2026-08-20] Évolution #12 — Suivi ✓ / Par qui sur les plans
**Phase :** 00 · **Gate :** G1 · **Skills :** agen-orchestrateur, agen-dev
**Demande :** Cases à cocher + attribution pour savoir ce qui est fait et par qui
**Livrables :** `plan-remediation-architecture.md` rév. 8 · `plan-unifie.md` PERT + gates · légende `[x]`/`[~]`/`[ ]`/`[—]`
**Verdict :** ✅ OK

### Ce qui a bien fonctionné
- État réel synchronisé (plus « Sprint 0 = 0 % »)
- Owner (A) vs exécuteur (Par qui) séparés — aligné RACI

### Erreurs commises
- Aucune — demande doc pure

### Leçons enregistrées
- Aucune nouvelle règle globale

### Prochaine action
- Exécuter 0.4–0.9 (aligner form/API) · cocher au fur et à mesure

---
## [2026-08-20] Évolution #11 — PERT recalé sur la doctrine contenu
**Phase :** 09 · **Gate :** G3 · **Skills :** agen-orchestrateur, agen-contenu
**Demande :** Adapter la répartition PERT aux mods Lead Contenu (G-015, 0.10/0.11)
**Livrables :** A9/A10 split · CR-A · canvas PERT · skill contenu · slack corrigé
**Verdict :** ✅ OK

### Ce qui a bien fonctionné
- 0.10 et 0.11 étaient déjà deux lignes de checklist — le PERT les avait recollées
- G2 reste indépendant du copy éditorial

### Erreurs commises
- #10 : A9 = 0.10+0.11 en prédécesseur de B3 (suroutillage du LCP)

### Leçons enregistrées
- [contenu] A9 n’est pas A10
- [orchestrateur] G3 n’est pas que 0 KPI — précisé A9 vs A10

### Prochaine action
- Exécuter A9 (H1 lock) J1, A10 J2, puis CR-A. Front n’ouvre pas 1.3 avant A9.

---
## [2026-08-20] Évolution #10 — Doctrine copy éditorial (H1 = artwork)
**Phase :** 09 · **Gate :** G3 · **Skills mobilisés :** agen-contenu, agen-orchestrateur, agen-produit, agen-da
**Demande :** Enrichir le skill contenu (voix copywriter) et recaler le plan sur les carences copy
**Livrables :** `copy-editorial.md` · SKILL/règle/agent contenu · 0.11 · A9 · **G-015** · G3 Copy Review
**Verdict :** ✅ OK (doctrine ; i18n.ts toujours beige — A9 pas encore exécuté)

### Ce qui a bien fonctionné
- Distinguer sol (G-002) et plafond (voix)
- Friction Excel déjà en prod = gold standard, pas à réinventer
- A9 parallèle à A3 : n’allonge pas le chemin G2

### Erreurs commises
- « Autorité calme » du playbook avait été lue comme beige consultant (P1 process)

### Leçons enregistrées
- [contenu] Honnêteté ≠ voix · 16 drafts · swap test
- [orchestrateur] G3 = Copy Review, pas seulement 0 KPI
- [global] G-015

### Prochaine action
- Exécuter A9 (0.10 + 0.11) en Cycle A, **avant** le hero graphique 1.3
- G.1 si demande de commit (tree sale)

---

## [2026-08-20] Évolution #9 — Mission Contenu sur le PERT
**Phase :** 09 · **Gate :** G3 · **Skills :** agen-orchestrateur, agen-contenu
**Demande :** Distribuer aussi des tâches au skill contenu
**Livrables :** `plan-unifie.md` §5.5 · A8 · RACI 5 colonnes · canvas PERT · skill contenu
**Verdict :** ✅ OK

### Ce qui a bien fonctionné
- Split A6 UI (Front) / A8 copy (Contenu) : un seul A par ligne
- G3 et KR1 ont enfin un owner

### Erreurs commises
- Évolution #8 : « quatre architectes », contenu relégué au consulté

### Leçons enregistrées
- [contenu] Contenu n’est pas un consulté PERT
- [orchestrateur] Cinq owners, pas quatre architectes
- [global] G-014 précisé (Contenu dans la liste)

### Prochaine action
- Cycle A : A1 + A8 (contenu) en parallèle de A2 (front) et A3 (backend)

---
## [2026-08-20] Évolution #8 — Plan unifié + PERT + 4 missions
**Phase :** 00/08/12-14 · **Gate :** G2/G4 · **Skills :** agen-orchestrateur, agen-workflow, agen-git, agen-rssi, agen-dev, agen-backend
**Demande :** Joindre les plans, PERT, positionner RSSI, archi front, archi backend, GitOps
**Livrables :** `plan-unifie.md` · G2 Contact OK (equipe-workflow, phases-gates, skills, agent DP) · canvas PERT · G-014
**Verdict :** ✅ OK (doctrine ; Cycle A code toujours à faire)

### Ce qui a bien fonctionné
- Carte (Playbook) vs terrain (sprints) au lieu de fusionner en un pavé
- Chemin critique A3→A6→G2→B1→B4 : le formulaire est plus long que le honeypot
- Avocat C7 hors critique sur tₑ, critique sur P — mission RSSI jour 0

### Erreurs commises
- Daily + G2 Design laissés dans equipe-workflow après que la remédiation avait déjà tranché

### Leçons enregistrées
- [orchestrateur] → deux plans sans traducteur = waterfall fantôme
- [global] G-014

### Prochaine action
- Cycle A : G.1 si demandé · A1 ∥ A2 ∥ A3 · avocat lancé

---
**Phase :** 09 · **Gate :** G3 · **Skills :** agen-contenu, agen-dev, agen-orchestrateur
**Demande :** Recherches CMS, penser avenir, ne pas créer un goulot UX auteur
**Livrables :** `strategie-contenu-cms.md` · 1.5 réécrit · 2.8 Keystatic · architecture §6 · G-010 précisé · canvas
**Verdict :** ✅ OK (doctrine ; JSON ui/ et Keystatic pas encore dans le code)

### Ce qui a bien fonctionné
- Content Layer Astro = vraie porte de sortie (changer le loader, pas les pages)
- Distinguer éditeur Git et BDD leads

### Erreurs commises
- Verdict précédent « contre mini CMS / 15 cas » : mauvais cadre (auteur vs visiteur)

### Leçons enregistrées
- [contenu] i18n.ts n’est pas un CMS
- [global] G-010 : Git = contenu ; Keystatic OK ; SQL = leads seulement

### Prochaine action
- Sprint 0 contact/crédibilité d’abord · 1.5 Content Layer avant 2.8 Keystatic

---
## [2026-08-20] Évolution #6 — Immersion graphique (pas WebGL)
**Phase :** 04/10 · **Gate :** G3 · **Skills :** agen-da, agen-ui-ux, agen-orchestrateur
**Demande :** Immersion UI, graphique, percutante — pas un univers 3D
**Livrables :** `references-immersif.md` recalée · canvas · plan rév. 5 · G-013
**Verdict :** ✅ OK (doctrine ; hero toujours à implémenter au Sprint 1.3)

### Ce qui a bien fonctionné
- 4 leviers : échelle, champ, cadrage, rythme
- Obys / Studio Thomas comme nord, sans copier le scroll virtuel

### Erreurs commises
- Évolution #5 : « immersif » lu comme Three.js (P1 process)

### Leçons enregistrées
- [da] Percutant = échelle + champ + cadrage
- [ui-ux] Le punch survit à 360 px
- [global] G-013

### Prochaine action
- Sprint 0.1 + 0.10 (H1 métier) puis 1.3 hero graphique

---

## [2026-08-20] Évolution #5 — Recherche sites immersifs
**Phase :** 04/10 · **Gate :** G2/G3 · **Skills :** agen-da, agen-dev, agen-orchestrateur
**Demande :** Se renseigner sur les sites immersifs
**Livrables :** `references-immersif.md` · canvas immersif · plan rév. 4 (pas de WebGL sur /fr /en)
**Verdict :** ✅ OK (doctrine ; pas de Three.js ajouté)

### Ce qui a bien fonctionné
- Distinguer 3 familles (scroll / WebGL / XR)
- ZERO/Praxvon : immersif = 4 mois + opt-in, pas un hero déco

### Erreurs commises
- Aucune code

### Leçons enregistrées
- [da] Immersif moyen > mal qu’un site propre
- [dev] WebGL jamais LCP · Lenis interdit sur la vitrine

### Prochaine action
- Sprint 0 inchangé. Immersif famille 2 = hors sprint post-G4.

---

## [2026-08-20] Évolution #4 — Plan rev. 3 (craft flagships)
**Phase :** 10-14 · **Gate :** G3/G4 · **Skills :** agen-da, agen-contenu, agen-dev, agen-orchestrateur
**Demande :** Plan d'action mis à jour après recherche Linear/Stripe/Monotonomo
**Livrables :** `plan-remediation-architecture.md` rév. 3 · canvas plan · tâches 0.10, 1.8–1.11 précisées
**Verdict :** ✅ OK (plan à jour ; code produit toujours 0 %)

### Ce qui a bien fonctionné
- Doctrine courte : Stripe éditorial, pas Linear dark
- Intégré sans casser GitOps-lite ni Sprint 0.8–0.9 formulaire

### Erreurs commises
- Aucune dans le code (plan seulement)

### Leçons enregistrées
- [da] 1 wow / page · teal 1× viewport · LCP = image
- [contenu] H1 5 s · outcomes avant process

### Prochaine action
- G.1 si demande commit, sinon Sprint 0.1 + 0.10

---

## [2026-08-20] Évolution #4 — Plan d'action recalé (GitOps + état réel)
**Phase :** 01/08/10-14 · **Gate :** G1–G4 · **Skills :** agen-orchestrateur, agen-git, agen-retrospective
**Demande :** Plan d'action mis à jour ?
**Livrables :** `plan-remediation-architecture.md` rév. 2 · canvas plan · Sprint G
**Verdict :** ✅ OK (plan à jour ; code produit toujours 0 %)

### Ce qui a bien fonctionné
- Distinguer process fait (skills, G-012) et produit pas fait (Sprint 0–2)
- G.1 en J0 sans violer G-007

### Erreurs commises
- Le plan du 19/08 était resté muet sur le tree sale et GitOps-lite

### Leçons enregistrées
- [orchestrateur] Un plan sans état « fait vs pas fait » ment dès la 2e session

### Prochaine action
- G.1 commit si l'utilisateur le demande · puis Sprint 0.1–0.3

---

## [2026-08-20] Évolution #3 — Recherche industrie contrats API + UX
**Phase :** 08 · **Gate :** G2 · **Skills :** agen-backend, agen-produit, agen-ui-ux, agen-rssi
**Demande :** Best practices Silicon Valley, blogs design patterns, contrats d’API
**Livrables :** `gestion-projet/references-industrie.md` · `contrat-api.md` · `ux-conversion.md` · canvas recherche · skills mis à jour · Sprint 0.8–0.9 précisés
**Verdict :** ✅ OK (doctrine sourcée ; code contact toujours à corriger)

### Ce qui a bien fonctionné
- Distinguer « ce que fait une platform API » de « ce qu’une vitrine doit copier »
- RFC 9457 / Stripe / GOV.UK / CF KV se traduisent en règles courtes

### Erreurs commises
- Aucune nouvelle dans le code (recherche seulement)

### Leçons enregistrées
- [backend] Zod = contrat, pas OpenAPI ; KV soft ; enveloppe errors[]
- [produit] GOV.UK submit-time, honeypot non-autofill

### Prochaine action
- Implémenter Sprint 0.4–0.6 + 0.8–0.9 selon `references-industrie.md`

---
## [2026-08-20] Évolution #3 — Skills git + GitOps-lite + santé repo
**Phase :** 01/12-14 · **Gate :** G1/G4 · **Skills :** agen-git, agen-rssi, agen-workflow, agen-orchestrateur, agen-retrospective
**Demande :** Analyser les skills concernés, les améliorer, garder la santé git
**Livrables :** `/agen-git` + `sante-git.md` · G-012 · `.gitignore` `.dev.vars` · RSSI deploy GitOps-lite · workflow/rules
**Verdict :** ✅ OK (skills + hygiène ; **aucun commit** — G-007 · tree toujours sale)

### Ce qui a bien fonctionné
- GitOps unicorn transposé en contrat vitrine (SHA, pull, revert) sans Argo
- Bug réel trouvé : recette commit bash vs shell PowerShell

### Erreurs commises
- Working tree : évolutions #1–#3 non figées sur `main` (un seul commit `first commit`)
- CI Gate G1 toujours absente (ticket, pas inventée ici)

### Leçons enregistrées
- [git] GitOps-lite · PowerShell commit · tree sale signalé
- [rssi] secrets dashboard
- [orchestrateur] git n'est pas un commit autonome
- [global] G-012

### Prochaine action
- Commit explicite demandé par l'utilisateur (skills + mémoire + gitignore)
- Ticket CI lint/check/audit (G1)
- Continuer Sprint 0.4–0.9 du plan de remédiation

---

## [2026-08-19] Évolution #2 — Revue architecte backend/données + skills produit
**Phase :** 00/08/12-14 · **Gate :** G2/G4 · **Skills :** agen-produit, agen-backend, agen-workflow, agen-orchestrateur, agen-dev, agen-ui-ux, agen-rssi, agen-qa, agen-contenu
**Demande :** Analyser le projet en architecte / backend / BDD ; améliorer les skills ; produit utilisable sans formation
**Livrables :** canvas revue · `gestion-projet/architecture-donnees.md` · skills `/agen-produit` `/agen-backend` · rules · G-010 G-011 · plan Sprint 0.8–0.9
**Verdict :** ✅ OK (diagnostic + skills ; code contact non encore corrigé)

### Ce qui a bien fonctionné
- La stack vitrine (Astro + une Function) est le bon modèle : pas de BDD à inventer
- Les skills craft existaient ; le trou était produit + contrat backend

### Erreurs commises (détectées dans le code, pas fixées ici)
- Zod orphelin / recopié, honeypot `max(0)`, Turnstile local → 400, copy « jamais de tiers », IP dans l’e-mail

### Leçons enregistrées
- [produit] visiteur sans formation
- [backend] un contrat, pas de SQL sans job de requête
- [global] G-010 stores · G-011 contrat unique · G-002 étendu aux processeurs

### Prochaine action
- Exécuter Sprint 0.4–0.6 + 0.8–0.9 (`plan-remediation-architecture.md`) via `/agen-backend` + `/agen-produit`

---
## [2026-08-19] Évolution #1 — Alignement skills + plan de remédiation
**Phase :** 10-14 · **Gate :** G3/G4 · **Skills :** agen-dev, agen-da, agen-ui-ux, agen-contenu, agen-qa, agen-rssi, agen-orchestrateur, agen-workflow
**Demande :** Vérifier les skills, les améliorer côté architecture frontend, créer un plan d'action
**Livrables :** skills + rules `.cursor/` · `agents.md` · `gestion-projet/plan-remediation-architecture.md` · mémoire G-008/G-009
**Verdict :** ✅ OK (plan rédigé, code produit non encore corrigé)

### Ce qui a bien fonctionné
- Les skills métier existaient déjà ; le diagnostic a pu s'y greffer
- Stack réelle (Astro) déjà dans agen-dev — seul `agents.md` racine mentait (Vite/React Router)

### Erreurs commises (détectées, pas encore fixées dans le code produit)
- Îlots Reveal × ~22, honeypot mort, OG manquant, KPI inventés — désormais dans le plan Sprint 0-2

### Leçons enregistrées
- [dev] Reveal n'est pas un îlot · un Zod contact
- [da] Théâtre SaaS
- [contenu] KPI = preuve
- [rssi] Honeypot max(0)
- [global] G-008 îlots · G-009 assets · G-002 étendu aux mockups

### Prochaine action
- Exécuter Sprint 0 du plan (`gestion-projet/plan-remediation-architecture.md`) via `/agen-contenu` + `/agen-dev`

---

## [2026-08-19] Évolution #0 — Mise en place équipe skills + mémoire
**Phase :** 00 · **Gate :** — · **Skills :** agen-workflow, agen-retrospective
**Demande :** Créer skills Cursor + workflow avec apprentissage continu
**Livrables :** `.cursor/skills/agen-*`, `gestion-projet/memoire/`
**Verdict :** ✅ OK

### Ce qui a bien fonctionné
- Structure skills conforme au standard Cursor (SKILL.md + references/)
- Boucle lire → agir → rétrospective → mémoriser définie

### Erreurs commises
- Première itération : agents créés en `.md` + rules `.mdc` sans boucle d'apprentissage

### Leçons enregistrées
- [global] → erreurs-globales.md : toujours partir de skills + mémoire, pas de prompts jetables

### Prochaine action
- Initialiser Git · lancer Phase 01 (Fondations) via `/agen-workflow`
