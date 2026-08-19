# Erreurs globales — AgenStudio

> Patterns transversaux qui concernent **plusieurs rôles**. Promus ici après 1 occurrence majeure ou 3 répétitions.

---

## Règles permanentes (toute l'équipe)

### G-001 — Skills + mémoire, pas de prompts jetables
- **Contexte :** 2026-08-19 · setup équipe
- **Erreur :** Agents créés en markdown sans boucle d'apprentissage
- **Règle :** Toujours utiliser `/agen-workflow` + skills Cursor. Lire la mémoire avant, `/agen-retrospective` après.
- **Tags :** #workflow #setup

### G-002 — Ne jamais inventer de contenu
- **Erreur :** Clients, métriques, awards, infos légales fictives
- **Règle :** Structure réaliste + « À valider ». Skills : agen-contenu, agen-da.
- **Tags :** #copy #legal #credibility

### G-003 — Build vert avant de s'arrêter
- **Erreur :** Livrer sans `npm run check && npm run build`
- **Règle :** Todo dev et QA. Skill : agen-dev, agen-qa.
- **Tags :** #build #quality

### G-004 — Mobile intentionnel, pas adapté
- **Erreur :** Desktop-first puis resize approximatif
- **Règle :** Tester 360px en premier. Skills : agen-ui-ux, agen-dev, agen-qa.
- **Tags :** #mobile #responsive

### G-005 — Palette tokens uniquement
- **Erreur :** Couleurs hex hardcodées hors tailwind.config.js
- **Règle :** canvas · ink · teal · magenta · bordeaux · coral · gold. Skill : agen-dev, agen-da.
- **Tags :** #design-tokens #consistency

### G-006 — Jamais de Co-authored-by dans les commits
- **Erreur :** Agent ajoute Co-authored-by: Cursor ou attribution IA
- **Règle :** Commits = auteur humain uniquement. Skill : /agen-git. Voir conventions-commits.md
- **Tags :** #git #commit #co-author #P0

### G-007 — Commit uniquement sur demande explicite
- **Erreur :** Agent commit de sa propre initiative
- **Règle :** Ne jamais git commit sans demande explicite de l'utilisateur
- **Tags :** #git #commit #autonomy

---

<!-- Nouvelles erreurs globales ajoutées ci-dessus, les plus récentes en haut -->
