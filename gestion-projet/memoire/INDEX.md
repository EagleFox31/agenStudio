# Mémoire collective — AgenStudio

> Chaque skill de l'équipe **lit** cette mémoire avant d'agir et **l'enrichit** après chaque évolution via `/agen-retrospective`.

## Principe

```
Évolution N
    │
    ├── 1. LIRE  → references/lecons-apprises.md du skill concerné
    │              + erreurs-globales.md si pertinent
    │
    ├── 2. AGIR  → exécuter la tâche (skill role + workflow)
    │
    ├── 3. TEST  → /agen-qa si livrable significatif
    │
    └── 4. APPRENDRE → /agen-retrospective
                       → journal-evolutions.md
                       → lecons-apprises.md du rôle
                       → erreurs-globales.md si transversal
```

## Fichiers

| Fichier | Contenu | Mis à jour par |
|---|---|---|
| [journal-evolutions.md](./journal-evolutions.md) | Chronologie de toutes les évolutions | `/agen-retrospective` |
| [erreurs-globales.md](./erreurs-globales.md) | Patterns d'erreurs transversaux (tous rôles) | `/agen-retrospective` |
| [../plan-unifie.md](../plan-unifie.md) | Plan vivant : Playbook × sprints, PERT, missions GitOps / RSSI / Front / Backend / Contenu | `/agen-orchestrateur` |
| [../plan-remediation-architecture.md](../plan-remediation-architecture.md) | Checklists sprints P0→P2 | `/agen-orchestrateur` |
| [../references-immersif.md](../references-immersif.md) | Immersion **graphique** (typo, champ, cadrage) · WebGL en annexe | `/agen-da` |
| `.cursor/skills/agen-contenu/references/copy-editorial.md` | Voix, H1 artwork, jobs de section, Copy Review | `/agen-contenu` |
| [../architecture-donnees.md](../architecture-donnees.md) | Stores réels, interdiction BDD leads, contrat contact | `/agen-backend` |
| [../strategie-contenu-cms.md](../strategie-contenu-cms.md) | Content Layer → Keystatic → loader CMS | `/agen-contenu` |
| [../references-industrie.md](../references-industrie.md) | Pratiques API/UX sourcées (Zod, RFC 9457, Stripe, GOV.UK, CF) | `/agen-backend` · `/agen-produit` |
| `.cursor/skills/agen-git/references/sante-git.md` | GitOps-lite vitrine, secrets, promotion SHA | `/agen-git` |
| `.cursor/skills/agen-*/references/lecons-apprises.md` | Erreurs et bonnes pratiques par rôle | Skill concerné via rétrospective |

## Format d'une leçon

```markdown
### [YYYY-MM-DD] Titre court
- **Contexte :** phase/tâche
- **Erreur :** ce qui s'est mal passé
- **Impact :** P0/P1/P2
- **Correction :** fix appliqué
- **Règle :** instruction permanente pour ne plus refaire
- **Tags :** #mobile #a11y #copy #build ...
```

## Règles

1. **Jamais supprimer** une leçon — rayer avec ~~strikethrough~~ si obsolète, ajouter la correction.
2. **Consolider** : si une erreur revient 3×, la promouvoir dans `erreurs-globales.md`.
3. **Lire avant d'agir** : chaque skill DOIT consulter sa mémoire en début de session.
4. **Écrire après chaque évolution** : même les petites corrections comptent.

---

## Comment garantir que l'agent suit le workflow

La mémoire seule ne suffit pas — il faut **3 couches** qui se renforcent :

### Couche 1 — Règle always-on (automatique)

Fichier : `.cursor/rules/agen-workflow-always.mdc`  
`alwaysApply: true` → injectée dans **chaque** conversation Agent.

L'agent est contraint de :
- lire la mémoire avant d'agir ;
- clôturer par `/agen-retrospective` si des fichiers ont été modifiés ;
- inclure une section `## Rétrospective` en fin de réponse.

**Vérifier dans Cursor :** Customize → Rules → la règle `agen-workflow-always` doit apparaître dans « Always Applied ».

### Couche 2 — Mémoire persistante (fichiers Git)

| Fichier | Rôle |
|---|---|
| `erreurs-globales.md` | Rappels transversaux lus à chaque tâche |
| `journal-evolutions.md` | Historique — l'agent voit ce qui s'est passé avant |
| `lecons-apprises.md` par skill | Erreurs par métier — s'enrichit à chaque retro |

**Commit ces fichiers dans Git** pour que la mémoire survive entre sessions et machines.

### Couche 3 — Habitudes utilisateur (manuel)

| Action | Effet |
|---|---|
| Démarrer par `/agen-workflow` | Force le plan + skills avant exécution |
| Finir par `/agen-retrospective` | Force la mise à jour mémoire si l'agent oublie |
| Custom Mode `Option+Enter` sur `/agen-workflow` | Skill actif toute la session |
| User Rule Cursor (Settings) | Backup : « Sur agenstudio, toujours suivre agen-workflow-always » |

### Couche 4 — User Rule (optionnel, backup)

Dans **Cursor Settings → Rules → User Rules**, ajouter :

```
Sur le projet AgenStudio, respecte toujours .cursor/rules/agen-workflow-always.mdc :
lis la mémoire avant d'agir, termine par une rétrospective si tu modifies des fichiers.
```

### Test rapide

Demander : *« Corrige le typo dans le footer »*

L'agent doit :
1. Lire `erreurs-globales.md` (même pour un petit fix)
2. Faire le fix
3. Terminer avec `## Rétrospective` + entrée dans `journal-evolutions.md`
