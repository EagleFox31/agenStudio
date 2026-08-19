---
name: agen-git
description: Git et commits AgenStudio — conventions de messages, sécurité, push. Utiliser quand l'utilisateur demande un commit, push, branche ou opération git. Jamais de co-auteur AI.
icon: git-branch
color: blue
disable-model-invocation: true
paths:
  - ".git/**"
  - ".gitignore"
---

# Git & Commits — AgenStudio

Skill exclusif pour les opérations git. **Uniquement quand l'utilisateur le demande explicitement.**

## Avant toute action

1. Lire `references/lecons-apprises.md`
2. Lire `gestion-projet/conventions-commits.md`

## Interdictions absolues

- **JAMAIS** de trailer `Co-authored-by:` (ni Cursor, ni Copilot, ni AI, ni personne)
- **JAMAIS** `Signed-off-by:` au nom de l'agent
- **JAMAIS** `--no-verify` / `--no-gpg-sign` sauf demande explicite user
- **JAMAIS** `git push --force` sur main/master
- **JAMAIS** `git commit --amend` sauf conditions strictes (voir ci-dessous)
- **JAMAIS** committer `.env`, secrets, clés API, credentials
- **JAMAIS** `git config` (modify)
- **JAMAIS** commit sans demande explicite de l'utilisateur

## Format des messages (Conventional Commits)

```
<type>(<scope>): <description courte>

[corps optionnel — pourquoi, pas quoi]
```

### Types autorisés

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation uniquement |
| `style` | Formatage, CSS, pas de logique |
| `refactor` | Refactoring sans changement de comportement |
| `perf` | Amélioration performance |
| `test` | Tests |
| `chore` | Maintenance (deps, config, gitignore) |
| `ci` | CI/CD |

### Scopes courants

`home` · `expertises` · `projets` · `contact` · `layout` · `ui` · `i18n` · `seo` · `api` · `security` · `skills` · `gestion-projet`

### Règles de rédaction

- **Impératif**, présent : « add hero section » pas « added »
- **Minuscules** après le type (sauf nom propre AgenStudio)
- **Pas de point** en fin de ligne sujet
- **Max 72 caractères** pour la première ligne
- **Français ou anglais** — rester cohérent dans un même commit (préférer anglais pour le sujet conventional, corps en FR si besoin)
- Focus sur le **pourquoi** dans le corps, pas un inventaire de fichiers

### Exemples

```
feat(home): add flamboyant hero with Reveal motion

fix(contact): unify Zod schema client and server

docs(gestion-projet): add commit conventions and git skill

chore(skills): add agen-git skill with no co-author policy
```

## Procédure commit (obligatoire)

Exécuter **en parallèle** avant de committer :
```bash
git status
git diff
git log -3 --oneline
```

Puis **séquentiellement** :
1. Vérifier qu'aucun fichier secret n'est staged (`.env`, clés)
2. `git add` — uniquement fichiers pertinents au changement
3. Commit via HEREDOC (PowerShell ou bash selon shell) :

```bash
git commit -m "$(cat <<'EOF'
type(scope): description

Corps optionnel.
EOF
)"
```

4. `git status` pour confirmer le succès
5. **Ne pas push** sauf demande explicite

## Amend — conditions TOUTES requises

1. User a demandé amend explicitement, OU hook pre-commit a modifié des fichiers après commit réussi
2. HEAD commit créé par toi dans **cette** conversation
3. Commit **pas** poussé sur remote

Si le commit **échoue** (hook rejected) → fix + **nouveau** commit, jamais amend.

## Branches

```
main              ← production
staging           ← recette
feat/phase-04-home
fix/contact-rate-limit
docs/commit-conventions
```

- 1 branche = 1 phase ou 1 fix logique
- Pas de `-i` (rebase -i, add -i) — non interactif

## Fichiers à ne jamais committer

```
.env
.env.*
!.env.example
node_modules/
dist/
.wrangler/
*.log
.claude/settings.local.json
```

## Auteur du commit

- Le commit est attribué **uniquement** à l'utilisateur Git configuré sur la machine
- L'agent n'ajoute **aucune** attribution supplémentaire dans le message
- Pas de mention « généré par IA », « with Cursor », etc.

## Après l'opération

→ `/agen-retrospective` si erreur (secret commité, mauvais message, amend incorrect)

## Références

- `references/lecons-apprises.md`
- `gestion-projet/conventions-commits.md`
