# Format d'une leçon apprise

## Template

```markdown
### [YYYY-MM-DD] Titre descriptif (max 8 mots)
- **Contexte :** Phase XX · tâche · fichiers concernés
- **Erreur :** description factuelle de ce qui s'est mal passé
- **Impact :** P0 (bloquant) · P1 (majeur) · P2 (mineur) · P3 (cosmétique)
- **Correction :** ce qui a été fait pour fixer
- **Règle :** instruction impérative pour ne plus refaire (commence par un verbe)
- **Tags :** #mobile #a11y #build #copy #design #security #perf
```

## Exemples

### Bon
```markdown
### [2026-08-20] Overflow hero mobile 360px
- **Contexte :** Phase 04 · HomeSections.astro · hero title
- **Erreur :** Titre H1 sans break-word, déborde à 360px
- **Impact :** P1
- **Correction :** Ajout text-balance + text-3xl sm:text-5xl
- **Règle :** Toujours tester le hero à 360px avant de valider une page
- **Tags :** #mobile #overflow #hero
```

### Mauvais (trop vague)
```markdown
### Mobile cassé
- **Erreur :** ça déborde
- **Règle :** faire attention au mobile
```

## Promotion vers erreurs-globales

Promouvoir si :
- L'erreur touche 2+ rôles
- Impact P0 ou P1
- Même erreur 3× dans le même rôle
- Pattern systémique (ex. oublier build, inventer contenu)

Format global (préfixe G-XXX) :
```markdown
### G-00N — Titre
- **Erreur :** ...
- **Règle :** ...
- **Skills concernés :** agen-dev, agen-qa
- **Tags :** ...
```
