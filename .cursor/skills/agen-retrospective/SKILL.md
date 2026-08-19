---
name: agen-retrospective
description: Rétrospective AgenStudio — capture les erreurs et bonnes pratiques après chaque évolution. Met à jour la mémoire collective pour que l'équipe apprenne. Utiliser OBLIGATOIREMENT en fin de chaque tâche ou livraison.
icon: book-open
color: purple
disable-model-invocation: false
---

# Rétrospective AgenStudio

**Obligatoire en fin de chaque évolution.** Transforme les erreurs en règles permanentes.

## Quand lancer

- Fin de toute tâche significative (page, section, fix, deploy)
- Après un échec ou un retour utilisateur négatif
- Avant chaque gate (G1-G4)
- Quand un skill a commis une erreur évitable

## Procédure

### 1. Collecter les faits
- Quelle était la demande ?
- Quels skills ont été mobilisés ?
- Quels fichiers ont été modifiés ?
- Build/check/lint : vert ou rouge ?
- Retours QA ou utilisateur ?

### 2. Analyser
- **Ce qui a bien fonctionné** (à répéter)
- **Erreurs commises** (techniques, design, copy, process)
- **Erreurs évitées grâce à la mémoire** (preuve que ça marche)
- **Root cause** de chaque erreur

### 3. Enregistrer

#### a) Journal global
Ajouter une entrée en **haut** de :
`gestion-projet/memoire/journal-evolutions.md`

#### b) Leçons par rôle
Pour chaque erreur, ajouter en **haut** du fichier :
`.cursor/skills/agen-[role]/references/lecons-apprises.md`

Format :
```markdown
### [YYYY-MM-DD] Titre court
- **Contexte :** ...
- **Erreur :** ...
- **Impact :** P0/P1/P2/P3
- **Correction :** ...
- **Règle :** instruction permanente
- **Tags :** #tag1 #tag2
```

#### c) Promotion globale
Si l'erreur est transversale OU revient pour la 3e fois → ajouter dans :
`gestion-projet/memoire/erreurs-globales.md`

### 4. Mettre à jour les skills (si nécessaire)
Si une règle change le comportement d'un skill → mettre à jour son `SKILL.md`.

### 5. Proposer la prochaine action
Indiquer clairement quoi faire ensuite.

## Format de sortie (obligatoire)

```markdown
## Rétrospective — [titre évolution]
**Date :** YYYY-MM-DD · **Verdict :** ✅ / ⚠️ / ❌

### ✅ Ce qui a bien fonctionné
- ...

### ❌ Erreurs commises
| Erreur | Rôle | Impact | Règle permanente |
|---|---|---|---|
| ... | agen-dev | P1 | ... |

### 📚 Mémoire mise à jour
- [ ] journal-evolutions.md
- [ ] lecons-apprises.md → [rôle]
- [ ] erreurs-globales.md (si applicable)

### ➡️ Prochaine action
→ [skill] : [action]
```

## Références

- `references/format-lecon.md` — template détaillé
- `gestion-projet/memoire/INDEX.md` — principe mémoire
