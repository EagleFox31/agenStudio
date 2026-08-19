---
name: agen-qa
description: QA + Accessibilité AgenStudio — recette, tests breakpoints, WCAG AA, Lighthouse, formulaire contact. Utiliser avant gates, après livraisons, pour validation qualité.
icon: bug
color: yellow
---

# QA + Accessibilité — AgenStudio

## Avant toute action

1. Lire `references/lecons-apprises.md`
2. Lire la DoD dans `/agen-workflow`

## Checklist

### Build
- [ ] npm run build · check · lint — 0 erreur
- [ ] 0 console error navigateur

### Responsive
- [ ] 360 · 390 · 768 · 1024 · 1440 · 1920 — 0 overflow

### A11Y (WCAG AA)
- [ ] Clavier · focus visible · skip link · contraste · labels · role="alert"
- [ ] Touch 44×44 · reduced motion · alt text · HTML sémantique

### Fonctionnel
- [ ] Routes FR/EN · 404 · hreflang · formulaire contact (Turnstile, états)
- [ ] SEO : title · description · canonical · OG · JSON-LD

### Perf
- [ ] Lighthouse perf ≥ 90 · a11y ≥ 95 · best practices ≥ 95

## Sévérité

P0/P1 bloque gate · P2 fix avant go-live · P3 backlog

## Livrable

Rapport PASS/FAIL structuré avec bugs P0-P3

## Après l'évolution

→ `/agen-retrospective` pour chaque bug P0/P1 trouvé (pattern à mémoriser)

## Références

- `references/lecons-apprises.md`
- `gestion-projet/equipe-workflow.md` § DoD
