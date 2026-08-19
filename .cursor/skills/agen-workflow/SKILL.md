---
name: agen-workflow
description: Workflow principal AgenStudio — orchestre l'équipe de skills, phases Playbook, gates G1-G4 et boucle d'apprentissage. Utiliser pour toute tâche projet, planification, livraison ou coordination multi-rôles.
icon: rocket
color: brand
---

# Workflow AgenStudio

Orchestre les 7 skills métier + la rétrospective pour livrer un site **premium, afrofuturiste, flamboyant et professionnel**.

## Boucle obligatoire (chaque évolution)

```
1. LIRE    → gestion-projet/memoire/ + lecons-apprises.md du skill concerné
2. PLAN    → phase Playbook · agents · critères de succès · gate
3. EXÉCUTER → mobiliser le(s) skill(s) métier
4. VALIDER  → /agen-qa (si livrable significatif)
5. APPRENDRE → /agen-retrospective (OBLIGATOIRE en fin d'évolution)
```

## Skills disponibles

| Skill | Rôle | Quand |
|---|---|---|
| `/agen-orchestrateur` | Directeur de Projet | Planification, priorités, gates |
| `/agen-da` | Direction Artistique | Revue visuelle, identité afrofuturiste |
| `/agen-ui-ux` | UI/UX Designer | Maquettes, specs, wireframes |
| `/agen-dev` | Lead Dev Front | Code Astro/React, API, build |
| `/agen-contenu` | Lead Contenu FR/EN | Copy, i18n, projets JSON, SEO |
| `/agen-qa` | QA + A11Y | Tests, recette, Lighthouse |
| `/agen-rssi` | RSSI / Juridique | Sécurité, RGPD, go-live |
| `/agen-retrospective` | Apprentissage | Fin de chaque évolution |

## Phases Playbook (00 → 14)

| Phase | Nom | Gate |
|---|---|---|
| 00 | Cadrage & Vision | — |
| 01 | Fondations techniques | **G1** |
| 02-03 | Layout · Design System | — |
| 04-07 | Pages (Home, Expertises, Projets, Studio) | — |
| 08 | Contact & Formulaire | **G2** |
| 09 | Contenu & SEO | **G3** |
| 10-11 | Polish · QA | — |
| 12-14 | Légal · Staging · Go-Live | **G4** |

Détails : `references/phases-gates.md`

## Matrice de routage

| Demande | Skills (ordre) |
|---|---|
| Nouvelle page/section | agen-da → agen-ui-ux → agen-contenu → agen-dev → agen-qa → agen-retrospective |
| Refonte visuelle | agen-da → agen-ui-ux → agen-dev → agen-qa → agen-retrospective |
| Bug/fix | agen-dev → agen-qa → agen-retrospective |
| Copy/traduction | agen-contenu → agen-retrospective |
| Revue qualité | agen-qa → agen-da → agen-retrospective |
| Sécurité/deploy | agen-rssi → agen-dev → agen-qa → agen-retrospective |
| Planification | agen-orchestrateur |

## Format de plan (obligatoire)

```markdown
## Plan — [titre]
**Phase :** XX · **Gate :** Gx
**Mémoire consultée :** [fichiers lus]

### Étapes
1. [/skill] — action — livrable
...

### Critères de succès
- [ ] ...

### Fin d'évolution
→ /agen-retrospective
```

## North Star (rappel)

Premium · Créatif · Moderne · Pro · Africain (subtil) · Flamboyant (2-3 wow/page max).

## Références

- `references/phases-gates.md` — détail phases et critères gates
- `gestion-projet/equipe-workflow.md` — workflow complet
- `gestion-projet/memoire/` — mémoire collective
- `agents.md` — standards techniques globaux
