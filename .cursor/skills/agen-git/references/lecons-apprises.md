# Leçons apprises — Git & Commits

---

### [2026-08-19] Jamais de Co-authored-by
- **Contexte :** Setup conventions git
- **Erreur :** Agents IA ajoutent `Co-authored-by: Cursor` ou similar
- **Impact :** P1
- **Règle :** Aucun trailer Co-authored-by, Signed-off-by AI, ou mention IA dans les commits. Commit = auteur humain uniquement.
- **Tags : #git #commit #co-author #P1**

### [2026-08-19] Commit uniquement sur demande explicite
- **Contexte :** Setup conventions git
- **Erreur :** Agent commit de sa proche initiative
- **Impact :** P1
- **Règle :** Ne jamais git commit sans que l'utilisateur l'ait demandé explicitement
- **Tags : #git #commit #autonomy**

### [2026-08-19] Vérifier secrets avant add
- **Contexte :** Setup conventions git
- **Erreur :** Risque de committer .env
- **Impact :** P0
- **Règle :** Toujours git status + vérifier staged files avant commit. .env = bloquant absolu.
- **Tags : #git #secrets #P0**

<!-- Nouvelles leçons ajoutées ci-dessus -->
