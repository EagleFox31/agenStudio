# Erreurs globales — AgenStudio

> Patterns transversaux qui concernent **plusieurs rôles**. Promus ici après 1 occurrence majeure ou 3 répétitions.

---

## Règles permanentes (toute l'équipe)

### G-016 — Percutant n'est pas un pitch d'agence
- **Contexte :** 2026-08-20 · retour user sur copy A9/A10 (« trop IA, pas proche du end user »)
- **Erreur :** Corriger le beige (G-015) a produit du staccato d'affiche : « trois lames », « théâtre SaaS », « on commence dans Figma », « Un brief. Deux phrases. On lit. »
- **Règle :** Test du collègue **et** test du lexique. Un directeur d'ops / un gérant le dirait-il au dépôt ? Mots sourcés : stock, ventes, caisse, factures, Excel, WhatsApp (Alivaon Douala, Yancommerce). Interdit visiteur : opérations, friction, brief, flux, spec, maquette, atelier. Think sharp / TypeScript = footer. Skills : agen-contenu, agen-produit.
- **Tags :** #copy #voix #produit #P1

### G-014 — Un seul plan d'ordre
- **Contexte :** 2026-08-20 · Playbook 7 semaines vs sprints de remédiation
- **Erreur :** G2 = Design OK dans un doc, Contact OK dans l’autre · calendrier greenfield sur un site déjà là
- **Règle :** `plan-unifie.md` = ordre + PERT + missions GitOps/RSSI/Front/Backend/**Contenu**. `plan-remediation-architecture.md` = checklists. `equipe-workflow.md` = rôles / DoD / identité. G2 = contact. Skills : agen-orchestrateur.
- **Tags :** #plan #pert #gates #P1

### G-015 — Honnêteté n'est pas une voix
- **Contexte :** 2026-08-20 · revue copy éditorial (Obys, Vikilinks, TYPZA, Ogilvy)
- **Erreur :** G-002 + G3 = « 0 KPI inventé ». Le H1 « Logiciels métier sur mesure pour équipes qui veulent avancer » est vrai et **anonyme**. Le skill contenu protégeait le sol, pas le plafond.
- **Règle :** Un texte vrai peut encore être beige. H1 = artwork + Big Idea (16 drafts, test du swap). Kicker ≠ H1. Une pointe de wit / écran. Un verbe de CTA. Doctrine : `copy-editorial.md`. G3 exige Copy Review §11, pas seulement l’honnêteté. Skills : agen-contenu, agen-produit, agen-da, agen-orchestrateur.
- **Tags :** #copy #voix #h1 #P1

### G-013 — Immersion AgenStudio = graphique, pas WebGL
- **Contexte :** 2026-08-20 · brief « immersif » lu comme Three.js
- **Erreur :** Planifier un veto 3D sans recette de punch UI (échelle, champ de couleur, cadrage)
- **Règle :** Percutant = H1 artwork + 1 panneau d’accent + 1 objet croppé. WebGL seulement opt-in après G4. Skills : agen-da, agen-ui-ux, agen-dev, agen-orchestrateur.
- **Tags :** #da #immersion #hero #P1

### G-012 — Git = vérité, secrets hors repo, rollback = revert
- **Contexte :** 2026-08-20 · GitOps-lite + santé git
- **Erreur :** Skills git couvraient le message, pas l'exploitation (promotion SHA, `.dev.vars`, working tree sale, HEREDOC bash sous PowerShell)
- **Règle :** Cloudflare déploie un commit. Secrets dans le dashboard, jamais Git. Rollback = `git revert`. Commit uniquement sur demande. Signaler un tree sale. Pas d'Argo sur cette vitrine. Skills : agen-git, agen-rssi.
- **Tags :** #git #gitops #secrets #P0

### G-011 — Un contrat API, jamais deux
- **Contexte :** 2026-08-19 · revue architecte backend
- **Erreur :** `contact-schema.ts` orphelin ; Zod recopié dans `functions/api/contact.ts` ; formulaire en validation ad hoc
- **Règle :** Un Zod importé par ContactForm et la Function. Honeypot sans `max(0)`. Pas de schema inline. Skills : agen-backend, agen-dev, agen-rssi.
- **Tags :** #api #zod #contact

### G-010 — Pas de base de données sans job de requête
- **Contexte :** 2026-08-19 · revue architecte données
- **Erreur :** Tentation d'ajouter Postgres/Auth/CRM sur une vitrine dont le SoR est l'inbox
- **Règle :** Git = source de vérité **contenu** (JSON + éditeur Git type Keystatic). Resend = leads. KV = abuse. SQL/D1 métier/Auth **sur les briefs** interdits tant que G4 n'est pas verte. Ne pas gonfler `i18n.ts` : copy de pages → Content Layer. Voir `architecture-donnees.md` et `strategie-contenu-cms.md`.
- **Tags :** #data #scope #architecture

### G-008 — Budget d'îlots React
- **Contexte :** 2026-08-19 · revue architecture accueil
- **Erreur :** ~22 `<Reveal client:visible>` + HeroVisual `client:load`
- **Règle :** Reveal = CSS. Îlots = MobileMenu, ProjectFilters, ContactForm. Pas de Vite/React Router. Skills : agen-dev, agen-ui-ux, agen-qa.
- **Tags :** #perf #astro #islands

### G-009 — Ne pas référencer un asset inexistant
- **Erreur :** `og-default.png` dans seo.ts, fichier absent
- **Règle :** Créer l'asset avant le lien. QA vérifie l'existence. Skills : agen-dev, agen-da, agen-qa.
- **Tags :** #seo #og #assets

### G-002 — Ne jamais inventer de contenu
- **Erreur :** Clients, métriques, awards, infos légales fictives, **KPI visuels** (99.98 %, 12 ms, « réduit à zéro »), **claims processeurs** (« jamais transmis à des tiers » alors que Cloudflare / Resend / Turnstile traitent la PII)
- **Règle :** Structure réaliste + « À valider » ou omettre. S'applique au JSON, aux mockups, **et** au copy contact/privacy. Skills : agen-contenu, agen-da, agen-dev, agen-produit, agen-rssi.
- **Tags :** #copy #legal #credibility #metrics

### G-001 — Skills + mémoire, pas de prompts jetables
- **Contexte :** 2026-08-19 · setup équipe
- **Erreur :** Agents créés en markdown sans boucle d'apprentissage
- **Règle :** Toujours utiliser `/agen-workflow` + skills Cursor. Lire la mémoire avant, `/agen-retrospective` après.
- **Tags :** #workflow #setup

### G-003 — Build vert avant de s'arrêter
- **Erreur :** Livrer sans `npm run check && npm run build`
- **Règle :** Todo dev et QA. Skill : agen-dev, agen-qa.
- **Tags :** #build #quality

### G-004 — Mobile intentionnel, pas adapté
- **Erreur :** Desktop-first puis resize approximatif
- **Règle :** Tester 360px en premier. Skills : agen-ui-ux, agen-dev, agen-qa.
- **Tags :** #mobile #responsive

### G-005 — Palette tokens uniquement
- **Erreur :** Couleurs hex hardcodées hors tailwind.config.js **et** CSS vars `:root` désynchronisées
- **Règle :** Une source (CSS vars) → Tailwind. Interdit hex dans Button/Tag/SystemVisual/ContactForm. Skills : agen-dev, agen-da.
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
