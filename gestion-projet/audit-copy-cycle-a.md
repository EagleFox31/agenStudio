# Audit copy — CR-A, reprise Lead Contenu

> **Date :** 20 août 2026 · **Auteur :** Lead Contenu (reprise de mandat)
> **Portée :** tout le copy visible du site, FR et EN.
> **Grille :** `.claude/skills/copywriting-web/references/grille-audit.md`
> **Statut :** corrections appliquées · build vert (21 pages) · deux points restent ouverts (§5)

---

## 1. Verdict

Le mandat précédent a marqué **A1, A8, A9, A10 faits** et **auto-validé les onze cases de la Copy Review §11**. La vérification fichier par fichier montre que le balayage n'a couvert qu'un seul fichier — `src/lib/i18n.ts` — sur les neuf qui portent du texte visible.

Le défaut n'est pas une suite de phrases faibles. C'est **une réécriture partielle**, et c'est pire qu'une absence de réécriture : l'accueil a été refait dans un registre très simple pendant que les études de cas, les meta de six pages, le JSON-LD, le visuel du hero et cinq composants restaient en beige consultant. **Le site parlait deux marques.**

Second défaut, de méthode : la correction du beige a été poussée jusqu'à un registre qui parle à l'acheteur **en dessous de son rang**. Le beige ne sélectionne personne ; l'infantilisant ne fait signer personne. On a échangé une panne contre l'autre.

---

## 2. Ce qui était bon — et qui a été protégé

Un audit qui ne liste que les fautes détruit les meilleures lignes. Celles-ci n'ont pas été touchées :

- **La ligne d'or des frictions** — « Votre entreprise ne devrait pas dépendre d'un fichier Excel que personne n'ose modifier. » Toujours la meilleure phrase du site.
- **L'honnêteté du formulaire** — sous-traitants nommés (Cloudflare, Turnstile, Resend), aucun « jamais de tiers », aucun délai promis. C'est un vrai acquis du mandat précédent.
- **`replyLabel`** — « On n'affiche pas de délai tant qu'on ne peut pas le tenir. » Rare et juste.
- **Le verrou CTA** `Nous écrire` / `Write to us`.
- **La structure des cas** contexte → ce qui coinçait → décision → construction.
- **Les messages d'erreur par champ**, conformes GOV.UK.

---

## 3. Constats et corrections

### Bloquants

| # | Fichier | Constat | Correction |
|---|---|---|---|
| B1 | `src/content.config.ts:25` · `ProjectDetailSections.astro:143` | **Fuite de langue.** `metrics.value` est typé `z.string()` — monolingue — dans un schéma par ailleurs bilingue, et rendu brut. Un visiteur EN lisait « À valider », un visiteur FR « To validate », sur la même page. | Métriques vidées (§5 pour la suite) |
| B2 | 3 JSON projets | **Placeholder en production.** Un bloc « Résultats & indicateurs » ne contenant que « À valider » annonce l'inachevé à l'endroit exact où l'acheteur cherche la preuve. Contraire à KR1. | `metrics: []` — le bloc disparaît (garde `.length > 0`) |
| B3 | 9 fichiers | **Deux voix sur un site.** Accueil en registre gérant ; cas, meta, JSON-LD, hero visuel et 5 composants en beige. A1 marqué fait sans que la prose ait été touchée. | Registre unifié partout |

### Majeurs

| # | Fichier | Constat | Correction |
|---|---|---|---|
| M1 | `fr/projets/index.astro` · `en/projects/index.astro` | **Rupture d'odeur SERP → page.** Title « Cas — ce que le terrain a forcé », H1 « Des logiciels qu'on a déjà dû faire ». Le clic et l'arrivée ne disent pas la même chose. | Title = H1 |
| M2 | `fr/studio.astro` · `en/studio.astro` · `ProjectDetailSections.astro` · `SystemVisual.tsx` | **Lexique banni survivant** : « flux » (×4), « validations », « sur-mesure », « OPÉRATIONNEL ». Dont trois occurrences dans le **visuel du hero**, le composant le plus vu du site. | Balayés |
| M3 | `ProjectDetailSections.astro:32` | **Verrou CTA brisé** — « Discuter de votre projet » au lieu de « Nous écrire ». Deux verbes concurrents pour la même action. | `Nous écrire` / `Write to us` |
| M4 | `i18n.ts` hero | **Le H1 diluait la ligne d'or.** « Excel » et « WhatsApp » apparaissaient trois fois au-dessus de la ligne de flottaison : H1, titre frictions, premier item. La doctrine l'interdit noir sur blanc (`copy-editorial.md` §12 : « Ne pas diluer la ligne Excel des frictions »). Le mandat précédent a enfreint sa propre règle. | H1 relocké (§4) |
| M5 | `i18n.ts` hero | **H1 redondant avec le badge.** « À Douala. » collé en fin de H1, sous un badge affichant déjà « Douala / Yaoundé ». | Géographie laissée au badge et au dek |
| M6 | nav, tags, meta, composants | **Nomenclature instable** — la même chose s'appelait Exemples, Cas, projets, et « répertoire » dans le filtre. | « Réalisations » / « Work » partout |
| M7 | ensemble du site | **Autorité détruite.** « Des logiciels qu'on a déjà dû faire », « Essai », « Idée testée », phrases de six mots en rafale. L'honnêteté n'exige pas l'auto-dénigrement : en B2B, le guide doit prouver qu'il a fait la traversée. | Registre remonté au niveau du pair, statuts précisés au lieu d'être minimisés |

### Défauts de doctrine — corrigés dans `copy-editorial.md`

| # | Constat |
|---|---|
| D1 | **Le test du swap confond « générique » et « non-unique ».** Une phrase positionnée qu'un concurrent *pourrait* prononcer n'est pas du beige. Appliqué à la lettre, le test pousse à agrafer un nom de ville au H1 comme passe-droit — c'est exactement ce qui a produit « À Douala. ». Le test est désormais apparié au **test du pair**. |
| D2 | **La liste de mots bannis mélangeait deux choses.** Le jargon importé et vide (`scalable`, `sur mesure`, `accompagner`) mérite le bannissement. Le vocabulaire que l'acheteur emploie lui-même (`opérations`, `processus`, `validation`) ne le mérite pas : le lui retirer ne le rapproche pas, ça le rabaisse. La question n'est pas « ce mot est-il simple ? » mais **« mon acheteur l'emploie-t-il ? »**. |

---

## 4. H1 — nouveau lock

Les 16 drafts du mandat précédent restent valables comme matériau ; le lock v3 ne l'était pas (M4, M5). Nouveau lock, mêmes contraintes, deux de plus : ne rien voler aux frictions, ne rien redire du badge.

**FR** — `Le logiciel qui n'existe pas en rayon, on le fabrique.`
**EN** — `We build the software you can't buy off the shelf.`
**Dek FR** — `Stock, factures, qui a dit oui : au même endroit, et sur le téléphone de vos équipes.`
**Dek EN** — `Stock, invoices, who said yes: in one place, and on your teams' phones.`

Pourquoi celui-là :

- **Il énonce l'offre, pas le renoncement.** L'ancien disait ce qu'on arrête d'utiliser. Celui-ci dit ce qu'on obtient — et pose le logiciel fabriqué contre celui du commerce, la vraie position du studio.
- **Il ne vole rien.** Excel et WhatsApp restent la propriété exclusive de la section frictions, où ils frappent le plus fort.
- **Il passe le test du pair.** Un dirigeant le dirait à un pair sans se sentir pris pour un enfant. « En rayon » est du vocabulaire de gérant, pas d'agence.
- **53 caractères, 10 mots** — dans le budget, mesuré (voir ci-dessous).
- **Swap** : il reste positionné plutôt qu'unique (cf. D1). Le hero ancre par le badge et le dek, pas par une ville agrafée au H1.

### Le budget H1 reposait sur une maquette qui n'existe pas

La doctrine raisonnait en `clamp(8vw)` / `leading-[0.9]`. Vérification faite, **le hero ne les utilise pas** : `HomeSections.astro:49` rend le H1 en `text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]`. Le `clamp(8vw)` décrit le hero **de B3, pas encore construit**.

À 360 px cela donne 30 px de corps en extrabold, soit **environ 20 caractères par ligne**. Un premier lock v4 à 71 caractères passait donc à **4 lignes visuelles** — hors budget (2, rarement 3). Resserré à 53. Contrainte chiffrée ajoutée à la doctrine : **≤ 55 caractères**, à recompter quand B3 livrera.

---

## 5. Points ouverts — traités le 20/08

### Fermés

**Schéma des métriques.** `metrics.value` est passé de `z.string()` à `bilingual` dans `src/content.config.ts`, et `ProjectDetailSections.astro:143` rend désormais `m.value[lang]`. La cause de B1 est traitée, pas seulement le symptôme : un chiffre réel pourra être publié sans rouvrir la fuite de langue.

**Les 52 erreurs `ts(18046)`.** Ce n'était pas du bruit, c'était une cause racine. `content.config.ts` importait `z` depuis le paquet `zod` (v3, dépendance du projet pour `contact-schema`), alors qu'**Astro 7 embarque zod v4** — deux instances distinctes. Le Content Layer échouait à lire le schéma (`Cannot read properties of undefined (reading 'def')`), ne générait plus les types des collections, et `entry.data` devenait `unknown` dans tous les fichiers consommateurs.

Corrigé en important `z` depuis `astro:content`. `ProjectFrontmatter` — code mort, jamais importé nulle part — a été retiré : les composants utilisent déjà la forme idiomatique `CollectionEntry<'projects'>['data']`.

**Résultat : `astro check` passe de 52 erreurs à 0 erreur, 0 warning.** Build vert, 21 pages.

`zod` v3 reste la dépendance directe du projet pour `contact-schema.ts` et la Function `/api/contact` — intacte, hors périmètre, et hors du chemin G2.

### Toujours ouvert

**La case DA.** B3 (hero graphique) dépend d'A9, et le relock v4 la rouvre. Le H1 tient en 3 lignes sur le hero actuel ; il devra être remesuré sur le hero de B3, dont la typographie n'est pas encore écrite. **DA = C, à traiter avec B3.**

**Suivi Dev, non bloquant :** `astro check` signale `z` d'`astro:content` comme déprécié (hint, pas erreur). L'alignement propre serait de passer la dépendance `zod` du projet en v4 — mais cela touche `contact-schema.ts` et la Function contact, gelés par G2. À planifier hors chemin critique, pas maintenant.

---

## 6. Copy Review §11 — état réel

| Case | Avant | Après |
|---|---|---|
| 16 drafts documentés, un seul lock | `[x]` optimiste | `[x]` — relock documenté §4 |
| Test du swap | `[x]` | `[~]` — test amendé (D1), arbitrage assumé |
| H1 ≠ tagline ≠ paraphrase | `[x]` | `[x]` |
| Lu à voix haute à 360 px | `[x]` | `[x]` |
| Une pointe de wit / viewport | `[x]` | `[x]` |
| Un verbe de CTA sitewide | `[x]` **faux** — « Discuter de votre projet » vivait dans les cas | `[x]` — vérifié sur tous les fichiers |
| 0 mot du lexique interdit | `[x]` **faux** — 6 occurrences survivantes | `[x]` — grep à zéro sur `src/` |
| EN = second original | `[x]` | `[x]` |
| 0 SLA / claim non sourcé | `[x]` | `[x]` |
| Test du pair (G-016) | `[x]` **faux** — registre sous le rang de l'acheteur | `[x]` |
| DA : le H1 tient comme artwork | `[ ]` | `[ ]` — **toujours ouvert, et rouvert par le relock** |

**Leçon à porter en rétro :** une case de Copy Review ne se coche pas après lecture du fichier principal. Le balayage exhaustif des porteurs de texte est désormais l'étape 0 de la grille d'audit.
