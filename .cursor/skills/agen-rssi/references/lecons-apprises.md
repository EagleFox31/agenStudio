# Leçons apprises — RSSI / Juridique

---

### [2026-08-19] Rate limit KV non optionnel en prod
- **Contexte :** Audit RSSI initial
- **Erreur :** Rate limiting documenté comme optionnel
- **Impact :** P1
- **Règle :** KV RATE_LIMIT obligatoire avant go-live. Sans KV = NO-GO Gate G4.
- **Tags : #security #rate-limit #contact #P1**

### [2026-08-19] RGPD brouillon = bloquant go-live
- **Contexte :** Audit RSSI initial
- **Erreur :** PrivacySections.astro marqué « à valider par avocat »
- **Impact :** P0
- **Règle :** Gate G4 bloquée tant que politique + mentions légales non validées
- **Tags : #rgpd #legal #P0**

### [2026-08-19] Google Fonts = transfert IP
- **Contexte :** Audit RSSI initial
- **Erreur :** Fonts chargées depuis CDN Google sans consentement
- **Impact :** P2
- **Règle :** Self-host via @fontsource ou documenter + consentement avant prod
- **Tags : #rgpd #fonts #privacy**

<!-- Nouvelles leçons ajoutées ci-dessus -->
