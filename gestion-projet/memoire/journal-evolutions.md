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
