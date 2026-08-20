# Conventions de commits — AgenStudio

> Pour l'agent : skill `/agen-git` · Règle `.cursor/rules/agen-git.mdc`

---

## Politique co-auteur

**Interdit.** Les commits sont signés **uniquement** par l'auteur Git de la machine (humain).

L'agent ne doit **jamais** ajouter :

```
Co-authored-by: ...
Co-authored-by: Cursor <...>
Co-authored-by: GitHub Copilot ...
Signed-off-by: AI ...
```

Ni mentionner Cursor, Copilot, Claude ou « AI-assisted » dans le message.

---

## Quand committer

- **Uniquement** sur demande explicite de l'utilisateur
- Jamais de commit proactif « pour sauvegarder »

---

## Format (Conventional Commits)

```
<type>(<scope>): <description>

[corps optionnel]
```

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | CSS / formatage |
| `refactor` | Refactoring |
| `perf` | Performance |
| `chore` | Maintenance |
| `ci` | CI/CD |

**Scopes :** `home` · `expertises` · `projets` · `contact` · `layout` · `ui` · `i18n` · `seo` · `api` · `security` · `skills` · `gestion-projet`

**Exemples :**

```
feat(home): add hero section with Reveal animation

fix(api): enable KV rate limit on contact endpoint

docs(gestion-projet): add commit conventions

chore: init git repository and project structure
```

---

## Checklist agent (avant chaque commit)

- [ ] `git status` + `git diff` + `git log -3` exécutés
- [ ] Aucun `.env` / `.dev.vars` / secret dans le staging
- [ ] Message conventional, impératif, ≤ 72 car. (sujet)
- [ ] **Aucun** Co-authored-by ou attribution IA
- [ ] Commit via HEREDOC
- [ ] `git status` post-commit OK
- [ ] Pas de push sauf demande explicite

---

## Sécurité git

| Interdit | Exception |
|---|---|
| `git config` modify | Jamais |
| `--no-verify` | Demande user explicite |
| `push --force` main / staging | Jamais |
| `commit --amend` | User demande + HEAD local + pas pushed |
| Committer `.env`, `.dev.vars`, secrets | Jamais |

## GitOps-lite

Prod = SHA sur `main`. Secrets dans le dashboard Cloudflare. Rollback = `git revert`. Détail : `.cursor/skills/agen-git/references/sante-git.md`.

## Commit sous PowerShell

```powershell
@"
type(scope): description

Corps optionnel.
"@ | git commit -F -
```

Ne pas coller un HEREDOC bash (`cat <<'EOF'`) dans PowerShell.

---

## Branches

| Branche | Usage |
|---|---|
| `main` | Production |
| `staging` | Recette client |
| `feat/*` | Nouvelles features |
| `fix/*` | Corrections |
| `docs/*` | Documentation |

---

## Fichiers exclus (.gitignore)

`.env` · `.env.*` · `.dev.vars` · `node_modules/` · `dist/` · `.astro/` · `.wrangler/` · `*.log` · `*.pem`

À versionner : `.cursor/skills/` · `.cursor/rules/` · `gestion-projet/memoire/`
