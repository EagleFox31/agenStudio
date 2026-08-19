# Leçons apprises — Lead Dev

---

### [2026-08-19] Build vert = non négociable
- **Contexte :** Setup projet
- **Erreur :** S'arrêter sans npm run check && npm run build
- **Impact :** P0
- **Règle :** Toujours exécuter check + build avant de terminer. Corriger toutes les erreurs.
- **Tags : #build #quality #P0**

### [2026-08-19] Inspecter avant de modifier
- **Contexte :** Setup projet
- **Erreur :** Réécrire des composants existants au lieu de les étendre
- **Impact :** P1
- **Règle :** Lire src/components/ui/ et sections existantes avant d'implémenter
- **Tags : #architecture #reuse**

### [2026-08-19] Schéma Zod contact dupliqué
- **Contexte :** API contact
- **Erreur :** contact-schema.ts (client) ≠ schéma inline dans contact.ts
- **Impact :** P2
- **Règle :** Unifier le schéma Zod client/serveur dans src/lib/contact-schema.ts
- **Tags : #validation #contact #DRY**

<!-- Nouvelles leçons ajoutées ci-dessus -->
