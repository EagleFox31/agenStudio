# CR-A — Copy Review Cycle A

> **Rituel :** 30 min · **A :** Lead Contenu · **C :** DA, DP
> **Date :** 20 août 2026 · **Statut :** `[~]` — moitié Contenu faite, **décisions DA + DP en attente**
> **Position PERT :** slack ~0,2 j sur G2, **hors chemin critique** (A3→A6→G2→B1→B2→B3→B4→G4). Se tient en parallèle de B2/B3 sans rien retarder.
> **Constats détaillés :** `audit-copy-cycle-a.md` · **Doctrine :** `.cursor/skills/agen-contenu/references/copy-editorial.md`

---

## 1. Correction préalable

J'ai marqué CR-A `[x]` dans le plan. **C'était faux.** Le livrable CR-A est une revue **avec DA et DP consultés** (`plan-unifie.md` §5.5, RACI : Contenu = A, DA + DP = C). Je n'avais fait que la moitié Contenu : audit, corrections, doctrine.

Remis à `[~]`. Ce document est la moitié manquante — la matière à trancher.

---

## 2. Périmètre revu

| Item | Objet | Verdict |
|---|---|---|
| **A1** | JSON projets honnêtes | ✅ après reprise — 3 cas réécrits, placeholders « À valider » retirés des blocs de preuve, fuite de langue FR↔EN corrigée à la racine |
| **A8** | Copy contact + claims | ✅ — **acquis du mandat précédent**, non touché. Sous-traitants nommés, aucun délai promis, erreurs par champ |
| **A9** | H1 artwork lock | ⚠️ **relocké v4** — v3 diluait la ligne d'or et redisait le badge. Ouvre une décision DA |
| **A10** | Pass copy accueil | ✅ après reprise — le pass n'avait couvert qu'`i18n.ts` sur 9 porteurs de texte |

Détail des constats, gravités et corrections : `audit-copy-cycle-a.md` §3.

---

## 3. Effet de bord — B1/B2 ont bougé sous la revue

Dev a livré B1 (Reveal = CSS) et attaqué B2 pendant la revue. `Reveal.tsx` et `SystemVisual.tsx` supprimés, `HeroVisual.tsx` → `HeroVisual.astro` (SVG, plus d'îlot). Deux conséquences copy :

**a) Un défaut vivant, corrigé.** `mockLabel` annonçait « Exemple — suivi de stock » et `mockCaption` « Un écran comme au magasin ou au bureau » — **au-dessus d'un SVG abstrait**, plus d'une capture. Le copy promettait une capture d'écran et livrait une forme géométrique. Remplacé :

| | FR | EN |
|---|---|---|
| `mockLabel` | `FABRIQUÉ ICI` | `BUILT HERE` |
| `mockCaption` | `Écrit pour votre métier. Pas adapté depuis celui d'un autre.` | `Written for your trade. Not adapted from someone else's.` |

Le bloc reprend le job du H1 (fabriqué contre acheté) au lieu de décrire une image absente.

**b) Neuf champs i18n orphelins.** Le panneau à onglets a disparu ; son copy est resté. Plus référencés nulle part hors `i18n.ts` :

`heroVisual.tablistLabel` · `tabSystem` · `tabPreview` · `tabVision` · `mockNote` · `visionKicker` · `visionTitle` · `visionBody` · `hero.systemNodesLabel`

Seuls `mockLabel`, `mockCaption`, `visionFoot` survivent (`HeroVisual.astro`).

**Je ne les ai pas supprimés** — B3 (hero graphique, DA) n'a pas commencé et pourrait réemployer ces emplacements. Les retirer exige de toucher `TranslationStructure`, type partagé, pendant que Dev est en vol sur B2. C'est une décision de coordination, pas un arbitrage éditorial → **question DA/Dev ci-dessous.**

---

## 4. Décisions demandées — DA

| # | Décision | Enjeu | Ma recommandation |
|---|---|---|---|
| **DA-1** | **Échelle typo du H1 en B3.** La doctrine raisonnait en `clamp(8vw)` / `leading-[0.9]` : le hero ne les a jamais utilisés (`text-3xl sm:text-4xl md:text-5xl leading-[1.1]`). v4 tient en 3 lignes à 360 px sur le hero actuel. | B3 réécrit la typo — le budget caractères doit être recalé **avant**, pas après | Fixer la valeur cible maintenant. À 30 px de corps, ~20 car./ligne → **≤ 55 car.** J'ai calé v4 à 53. Si B3 monte l'échelle, je redescends le compte |
| **DA-2** | **Longueur du bloc texte HeroVisual.** `mockCaption` fait 57 car. dans un `max-w-[16rem]` en `text-lg sm:text-xl` → ~3–4 lignes à 360 px | Le bloc est en bas d'un conteneur `min-h-[280px]` — risque de tassement mobile | Valider ou me demander une version courte. J'ai une v2 à 38 car. prête : `Écrit pour votre métier, pas pour tous.` |
| **DA-3** | **Les 9 champs orphelins reviennent-ils en B3 ?** | Si non, je nettoie `i18n.ts` + `TranslationStructure`. Si oui, je les garde et je réécris le copy | Purger. B3 est un travail **graphique** ; s'il faut du texte, ce seront de nouveaux emplacements avec de nouveaux noms |

**Case §11 toujours ouverte :** « le H1 tient comme artwork ». Elle ne peut se fermer qu'après B3 — pas avant.

---

## 5. Décisions demandées — DP

| # | Décision | Enjeu | Ma recommandation |
|---|---|---|---|
| **DP-1** | **Ratifier deux amendements de doctrine.** (a) le test du swap est apparié au **test du pair** ; (b) `opérations`, `processus`, `validation` sont **réhabilités** | Touche **G-016**, règle globale — pas au Lead Contenu de la modifier seul | Ratifier. Les deux défauts ont une trace : le swap seul a produit « À Douala. » agrafé sous un badge qui l'affichait déjà ; la liste bannie a produit un site qui parlait à un dirigeant sous son rang |
| **DP-2** | **G3 exige-t-il C1 (Content Layer) ?** | Le plan chiffre l'écart : avec C1, …→B3→C1→G3→G4 ≈ **6,4 j**. Sans, on économise ~1,6 j | **Ne pas l'exiger.** C1 est de l'hygiène d'architecture, pas de la qualité éditoriale. Le copy est déjà juste ; le déplacer d'`i18n.ts` vers Content Layer ne change pas un mot lu par un visiteur. À faire en cool-down |
| **DP-3** | **B8 reste `[~]`.** Les 3 cas sont réécrits (registre, structure, honnêteté des statuts) mais sans outcome chiffré — aucun chiffre réel n'existe | KR1 dit « 0 KPI inventé », pas « des KPI » | Accepter `[~]` comme état final pour G3. Un bloc de preuve vide vaut mieux qu'un « À valider » affiché. Rouvrir quand un client autorisera un chiffre |

---

## 6. Checklist §11 — état à l'entrée de la revue

| Case | État | Note |
|---|---|---|
| 16 drafts, un seul lock | `[x]` | v4 documenté, `copy-editorial.md` §12 |
| Test du swap | `[~]` | Apparié au test du pair — **DP-1** |
| H1 ≠ tagline ≠ paraphrase | `[x]` | |
| Voix haute à 360 px | `[x]` | 3 lignes, mesuré sur le HTML généré |
| Une pointe de wit / viewport | `[x]` | |
| Un verbe de CTA sitewide | `[x]` | Vérifié sur tous les fichiers |
| 0 mot du lexique interdit | `[x]` | grep à zéro sur `src/` |
| EN = second original | `[x]` | `off the shelf` ≠ calque de `en rayon` |
| 0 SLA / claim non sourcé | `[x]` | |
| Test du pair | `[x]` | |
| Une seule voix | `[x]` | 9 porteurs de texte balayés |
| 0 placeholder en production | `[x]` | Légales exceptées — `noindex`, en attente C7 |
| 0 fuite de langue | `[x]` | Corrigé à la racine (`metrics.value` bilingue) |
| **DA : H1 tient comme artwork** | `[ ]` | **Bloqué par B3** |

---

## 7. Ce qui bloque encore G3

G3 dépend de `A1 · A2 · A9 · A10 · B8 · B3 · CR-A`.

| Dépendance | État | Bloqueur |
|---|---|---|
| A1, A2, A9, A10 | `[x]` | — |
| B8 | `[~]` | Arbitrage **DP-3** |
| **B3** | `[ ]` | Dépend de B2, en cours chez Dev. **Vrai chemin bloquant** |
| **CR-A** | `[~]` | Ce document — décisions DA + DP |

**G3 n'attend pas le copy.** Il attend B3 et une réunion de 30 minutes. Les deux peuvent courir en parallèle : la revue ne consomme pas de temps Dev.

---

## 8. Après la revue

À faire par le Lead Contenu, selon les réponses :

1. DA-3 « purger » → nettoyage des 9 champs + `TranslationStructure`, **après** que Dev ait posé B2.
2. DA-1 → recalage du budget caractères dans `copy-editorial.md` §4, et relock H1 si l'échelle change.
3. DA-2 → bascule sur la version courte de `mockCaption` si demandé.
4. DP-1 → doctrine figée, mention dans `memoire/erreurs-globales.md` (G-016 amendé).
5. DP-2 / DP-3 → mise à jour des prédécesseurs de G3 dans `plan-unifie.md`.
