# Agents AgenStudio → Skills Cursor

> **Migration :** les agents sont désormais des **skills Cursor** avec **mémoire d'apprentissage**.
> Ce dossier reste comme référence détaillée ; l'exécution se fait via `.cursor/skills/`.

## Utilisation (recommandée)

```
/agen-workflow          ← Point d'entrée pour toute tâche
/agen-retrospective     ← OBLIGATOIRE en fin d'évolution
/agen-da                ← Direction artistique
/agen-dev               ← Développement
...
```

Skills dans : `.cursor/skills/agen-*/SKILL.md`

## Boucle d'apprentissage

```
LIRE mémoire → AGIR (skill) → VALIDER (qa) → APPRENDRE (retrospective)
```

| Mémoire | Rôle |
|---|---|
| `gestion-projet/memoire/journal-evolutions.md` | Chronologie |
| `gestion-projet/memoire/erreurs-globales.md` | Leçons transversales |
| `.cursor/skills/agen-*/references/lecons-apprises.md` | Leçons par rôle |

## Mapping agents → skills

| Fichier agent (référence) | Skill Cursor |
|---|---|
| 00-orchestrateur.md | `/agen-orchestrateur` |
| 01-directeur-artistique.md | `/agen-da` |
| 02-ui-ux-designer.md | `/agen-ui-ux` |
| 03-lead-dev-front.md | `/agen-dev` |
| 04-lead-contenu.md | `/agen-contenu` |
| 05-qa-a11y.md | `/agen-qa` |
| 06-rssi-juridique.md | `/agen-rssi` |
| — | `/agen-workflow` (orchestration) |
| — | `/agen-retrospective` (apprentissage) |

## Références

- [equipe-workflow.md](../equipe-workflow.md)
- [memoire/INDEX.md](../memoire/INDEX.md)
- [analyse-rssi.md](../analyse-rssi.md)
