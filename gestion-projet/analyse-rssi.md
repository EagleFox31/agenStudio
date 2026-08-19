# Analyse RSSI — AgenStudio

> **Date :** 19 août 2026  
> **Périmètre :** site vitrine bilingue (FR/EN) — stack Astro + Cloudflare Pages  
> **Statut :** analyse initiale — à réviser avant go-live production

---

## 1. Synthèse exécutive

AgenStudio est un **site vitrine statique** avec **un seul point d'entrée dynamique** : le formulaire de contact (`/api/contact`). L'architecture est volontairement minimaliste : pas de base de données, pas d'authentification, pas de back-office.

**Verdict :** bon niveau de sécurité technique pour la catégorie (site corporate). Les risques principaux avant mise en production sont **juridiques** (RGPD, mentions légales en brouillon) et **opérationnels** (pas de Git, rate limiting optionnel).

| Indicateur | Valeur |
|---|---|
| Score global estimé | **3,4 / 5** |
| Vulnérabilités npm audit | **0** |
| Surface d'attaque | **Faible** |
| Bloquant go-live | Conformité RGPD + rate limiting KV |

---

## 2. Cartographie du système

### 2.1 Architecture

```
Navigateur
    │
    ├── Cloudflare Pages CDN ──► Assets statiques (HTML, CSS, JS, images)
    │
    ├── /api/contact (Pages Function)
    │       ├── Validation Zod
    │       ├── Honeypot
    │       ├── Turnstile siteverify
    │       ├── Rate limit KV (optionnel)
    │       └── Resend API ──► Boîte mail contact@
    │
    └── Google Fonts CDN (externe)
```

### 2.2 Stack technique

| Composant | Version / outil | Rôle |
|---|---|---|
| Framework | Astro 7 + TypeScript strict | Pages statiques, îlots React |
| UI | React 18, Tailwind CSS 3, Motion | Interactivité ciblée |
| Hébergement | Cloudflare Pages | CDN + edge functions |
| Email | Resend | Envoi des demandes de contact |
| Anti-spam | Cloudflare Turnstile | CAPTCHA invisible |
| Validation | Zod | Schémas client/serveur |
| Contenu | Content Collections (JSON) | Projets typés, build-time |

### 2.3 Fichiers clés (sécurité)

| Fichier | Rôle sécurité |
|---|---|
| `functions/api/contact.ts` | Endpoint API — validation, anti-spam, envoi email |
| `public/_headers` | CSP, HSTS, X-Frame-Options, Permissions-Policy |
| `public/robots.txt` | Exclusion `/api/` et pages légales |
| `.env.example` | Template variables sans secrets |
| `.gitignore` | Exclusion `.env`, `node_modules`, `dist` |
| `src/lib/contact-schema.ts` | Schéma Zod partagé (client) |
| `src/components/sections/ContactForm.tsx` | Formulaire + Turnstile widget |
| `src/components/sections/PrivacySections.astro` | Politique de confidentialité (brouillon) |

---

## 3. Classification des actifs

| Actif | Criticité | Localisation | Exposition |
|---|---|---|---|
| `RESEND_API_KEY` | Élevée | Cloudflare env vars | Serveur uniquement |
| `TURNSTILE_SECRET_KEY` | Élevée | Cloudflare env vars | Serveur uniquement |
| `PUBLIC_TURNSTILE_SITE_KEY` | Faible | Client (préfixe PUBLIC_) | Publique par design |
| Emails entrants (demandes clients) | Élevée | Transit Resend → inbox | Données commerciales |
| Code source / brand assets | Moyenne | Dépôt / CDN | Public une fois déployé |
| Quota Resend / réputation domaine | Moyenne | Compte Resend | Abusable via spam |

---

## 4. Contrôles en place

### 4.1 Secrets et configuration

- [x] `.env` dans `.gitignore`
- [x] `.env.example` sans valeurs sensibles
- [x] Séparation `PUBLIC_*` (client) vs secrets serveur
- [x] Aucun secret hardcodé dans le code source
- [x] Pas de fichier `.env` présent localement (vérifié le 19/08/2026)
- [ ] Validation des env vars au démarrage de la Function (fail-fast)

### 4.2 Formulaire de contact — défense en profondeur

| Couche | Mécanisme | Fichier |
|---|---|---|
| 1 | Validation Zod (longueurs, email, enum) | `functions/api/contact.ts` |
| 2 | Honeypot silencieux (`website`) | `functions/api/contact.ts` |
| 3 | Turnstile vérifié serveur (`siteverify`) | `functions/api/contact.ts` |
| 4 | Rate limiting IP (5 req / 15 min) | KV `RATE_LIMIT` — **optionnel** |
| 5 | Échappement HTML des champs email | `escape()` dans `contact.ts` |
| 6 | Pas de CORS ouvert | Endpoint same-origin |
| 7 | Erreurs génériques côté client | `ContactForm.tsx` |

### 4.3 En-têtes HTTP (`public/_headers`)

| Header | Valeur | Statut |
|---|---|---|
| `Content-Security-Policy` | Restrictive, Turnstile autorisé | OK |
| `Strict-Transport-Security` | max-age=31536000; preload | OK |
| `X-Frame-Options` | DENY | OK |
| `X-Content-Type-Options` | nosniff | OK |
| `Referrer-Policy` | strict-origin-when-cross-origin | OK |
| `Permissions-Policy` | camera/micro/geo désactivés | OK |

### 4.4 Vie privée by design

- [x] Pas de trackers publicitaires (GA, Meta, Hotjar, etc.)
- [x] Pages légales en `noindex`
- [x] `/api/` bloqué dans `robots.txt`
- [x] Pas de cookies tiers de profilage

### 4.5 Dépendances

- `npm audit` : **0 vulnérabilité** (19/08/2026)
- Stack mature et maintenue

---

## 5. Risques identifiés

### 5.1 Haute priorité

| ID | Risque | Impact | Probabilité | Recommandation |
|---|---|---|---|---|
| H1 | Rate limiting optionnel (KV non obligatoire) | Épuisement quota Resend, spam, coûts | Élevée si KV absent | Activer binding KV `RATE_LIMIT` en prod |
| H2 | Conformité RGPD incomplète | Sanctions, perte de confiance | Moyenne | Finaliser politique + mentions légales avec avocat |
| H3 | Pas de dépôt Git | Pas de traçabilité, pas de revue de code | Élevée | Initialiser Git + CI (audit, scan secrets) |

### 5.2 Priorité moyenne

| ID | Risque | Détail |
|---|---|---|
| M1 | Google Fonts (CDN externe) | Transfert IP vers Google — problématique RGPD |
| M2 | IP loggée dans l'email de contact | PII non mentionnée dans la politique de confidentialité |
| M3 | Schéma Zod dupliqué | `contact-schema.ts` (client) ≠ schéma inline dans `contact.ts` |
| M4 | Validation client faible | `ContactForm.tsx` ne réutilise pas le schéma partagé |
| M5 | Pas de validation env au boot | Déploiement possible sans clés → formulaire cassé |
| M6 | Sous-traitants non documentés | Resend (US), Cloudflare (US) absents de la politique |
| M7 | CSP `img-src https:` | Autorise toute image HTTPS (acceptable ici) |
| M8 | `style-src 'unsafe-inline'` | Nécessaire pour Tailwind, affaiblit la CSP |

### 5.3 Priorité basse

| ID | Risque | Détail |
|---|---|---|
| B1 | `<meta generator>` expose Astro | Fingerprinting mineur |
| B2 | Pas de SRI sur scripts/fonts externes | Turnstile chargé dynamiquement (normal) |
| B3 | Mentions légales « à valider » | Risque juridique, pas technique |
| B4 | Pas de monitoring/alerting API | Pas de détection d'abus en temps réel |

---

## 6. Conformité RGPD

### 6.1 État actuel

La politique de confidentialité (`src/components/sections/PrivacySections.astro`) est explicitement un **brouillon** :

> *« Dernière mise à jour : Août 2026 — Statut : à valider par le conseiller juridique. »*

Les mentions légales sont également incomplètes :

> *« Statut : à valider selon l'immatriculation. »*

### 6.2 Manques avant go-live

- [ ] Base légale du traitement (intérêt légitime / mesures précontractuelles)
- [ ] Durée de conservation des demandes (ex. 24 mois)
- [ ] Sous-traitants documentés : Cloudflare, Resend, Turnstile (localisation USA)
- [ ] Transferts hors UE/EEE et garanties (SCC, DPA)
- [ ] Droit d'accès/rectification/suppression — délai de réponse, identité du responsable
- [ ] Registre des traitements (Art. 30 RGPD)
- [ ] Logging IP dans les emails — documenter ou retirer
- [ ] Self-hosting des fonts ou bannière cookies si Google Fonts conservé
- [ ] Immatriculation légale (RCCM, NIU) dans les mentions légales

### 6.3 Flux de données personnelles

```
Utilisateur (formulaire)
    → Cloudflare Pages Function (IP loggée)
        → Resend API (email avec PII)
            → Boîte mail contact@agenstudio.com
```

**Données collectées :** nom, email, entreprise (optionnel), description du besoin, délai souhaité, langue, adresse IP.

**Sous-traitants impliqués :**

| Sous-traitant | Rôle | Localisation | DPA requis |
|---|---|---|---|
| Cloudflare Inc. | Hébergement, Turnstile, KV | USA | Oui |
| Resend Inc. | Envoi email | USA | Oui |
| Google LLC | Fonts CDN | USA | Oui (si conservé) |

---

## 7. Modèle de menaces (STRIDE)

| Menace | Cible | Mitigation actuelle | Gap |
|---|---|---|---|
| **Spoofing** | Formulaire | Turnstile | KV rate limit optionnel |
| **Tampering** | Payload JSON | Zod validation | Pas de signature (OK pour ce cas) |
| **Repudiation** | Envoi email | Logs Resend côté provider | Pas de log applicatif |
| **Info Disclosure** | Secrets | Env vars CF, pas de fuite client | Google Fonts |
| **DoS** | `/api/contact` | Turnstile + rate limit KV | KV non obligatoire |
| **Elevation** | N/A | Pas d'auth | — |

---

## 8. Score de maturité

| Domaine | Note /5 | Commentaire |
|---|---|---|
| Architecture | ⭐⭐⭐⭐⭐ | Static-first, surface minimale |
| Gestion des secrets | ⭐⭐⭐⭐ | Bonne séparation, manque validation au deploy |
| Protection applicative | ⭐⭐⭐⭐ | Turnstile + Zod + honeypot solides |
| Headers / durcissement | ⭐⭐⭐⭐ | CSP/HSTS bien configurés |
| Conformité RGPD | ⭐⭐ | Brouillon, sous-traitants absents |
| Opérations (Git, CI, monitoring) | ⭐ | Pas de Git, pas de CI |
| Dépendances | ⭐⭐⭐⭐⭐ | 0 vulnérabilité npm audit |

---

## 9. Plan d'action

### Immédiat (avant go-live)

- [ ] Activer **KV `RATE_LIMIT`** sur Cloudflare Pages
- [ ] Finaliser **politique de confidentialité** + **mentions légales** avec avocat
- [ ] **Self-hoster les fonts** (ou `@fontsource`) pour éviter le transfert Google
- [ ] Initialiser **Git** + pipeline CI (`npm audit`, scan secrets type gitleaks)
- [ ] Vérifier que toutes les **env vars prod** sont renseignées

### Court terme (S+2)

- [ ] Unifier le schéma Zod client/serveur (`contact-schema.ts` partagé)
- [ ] Ajouter validation env au démarrage de la Function (fail-fast)
- [ ] Documenter la **politique de rétention** des emails entrants
- [ ] Retirer ou justifier le **logging IP** dans les emails
- [ ] Configurer alertes Cloudflare sur pics de trafic `/api/contact`

### Moyen terme

- [ ] DPA signés avec Resend et Cloudflare
- [ ] Registre des traitements + procédure de réponse aux demandes RGPD
- [ ] Tests de charge légers sur le endpoint contact
- [ ] Revue périodique des dépendances (Dependabot/Renovate)

---

## 10. Variables d'environnement (checklist prod)

| Variable | Rôle | Côté | Obligatoire |
|---|---|---|---|
| `SITE_URL` | URL canonique (SEO, sitemap) | Build | Oui |
| `PUBLIC_TURNSTILE_SITE_KEY` | Site key Turnstile | Client | Oui |
| `TURNSTILE_SECRET_KEY` | Secret Turnstile | Serveur | Oui |
| `RESEND_API_KEY` | Clé API Resend | Serveur | Oui |
| `CONTACT_TO_EMAIL` | Destinataire des demandes | Serveur | Oui |
| `CONTACT_FROM_EMAIL` | Expéditeur (domaine vérifié) | Serveur | Oui |
| KV binding `RATE_LIMIT` | Rate limiting IP | Serveur | **Fortement recommandé** |

---

## 11. Historique des révisions

| Date | Auteur | Action |
|---|---|---|
| 19/08/2026 | Analyse initiale (IA) | Création du document — audit RSSI complet |
