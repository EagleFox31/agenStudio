# Immersion UI graphique — AgenStudio

> Recalé 20 août 2026 après correction : **immersion = impact visuel**, pas un univers WebGL.  
> Sources : Obys, Studio Thomas / Favorit / Charlie (Refero), Figma Trends 2026, Vikilinks editorial, playbook AgenStudio.

**Percutant** = contraste d’échelle + un champ de couleur engagé + un cadrage.  
Ce n’est pas plus d’animation, plus de cartes, ni Three.js.

WebGL / XR = autre produit, voir l’annexe. Pas le brief vitrine.

---

## Ce que c’est

L’immersion graphique est une **expérience de lecture et de regard**. Le visiteur entre dans une page comme dans une couverture de magazine : un premier plan énorme, un silence, puis un second coup.

Elle se joue dans le DOM : typo, grille, lumière, crop, un accent qui **occupe** l’écran.

Elle n’est pas :

- un hero Three.js ;
- un faux dashboard 99,98 % ;
- cinq `Reveal` en cascade sur le même bloc ;
- une pastille teal de 8 px appelée « identité ».

Figma 2026 (Trend 4) : la typo **est** l’interface. Vikilinks : *when the headline is the artwork, you ship fewer megabytes and more personality*. Donc **écrire le H1 avant de le composer**. Craft verbal : `.cursor/skills/agen-contenu/references/copy-editorial.md`. Un clamp 8vw sur du beige, c’est un haut-parleur branché sur rien.

## Quatre leviers (dans l’ordre)

| Levier | Percutant | Plat (état actuel accueil) |
|---|---|---|
| **Échelle** | H1 `clamp(2.5rem, 8vw, 6rem)`, `leading-[0.9]`, saut de 4–6 crans vs le body | `text-3xl` → `lg:text-6xl` `leading-[1.1]` + slogan « Think sharp » |
| **Champ** | Un viewport où teal **ou** magenta tient ≥ 40 % de la surface | Badge `bg-teal/10` + tags rainbow |
| **Cadrage** | Une image / géométrie **trop grande**, crop, type qui chevauche | Colonne 5/12 avec tabs + terminal SaaS |
| **Rythme** | Silence → coup → silence. 2–3 wow / page | 5 îlots Reveal + 3 Cards clones |

Obys (mai 2026) : on commence par la **lettre**, pas par le wireframe. Le logo / la marque devient un élément d’interface, pas un favicon.

Studio Thomas (Refero) : trois couleurs, mais **une** assez forte pour posséder l’écran qu’elle touche. Full-bleed, pas un rail `max-w`.

Charlie : silence / détonation / silence. AgenStudio reste **lumineux** (canvas `#F7F4EE`) — on copie le rythme, pas le fond noir.

Favorit : la photo **est** la mise en page. Sans photo réelle, AgenStudio utilise géométrie + un écran de cas **croppé comme un objet graphique**.

## Recette AgenStudio (playbook + punch)

Palette 70/20/10 inchangée. Le 10 % n’est plus une puce : c’est un **panneau**.

### Accueil

1. **H1 métier** (quoi / pour qui / pourquoi en 5 s). « Think sharp » = signature, hors du H1 ou en kicker.
2. Le H1 **est** le LCP : HTML, Sora preload, pas un canvas.
3. Colonne type large ; à droite **un** objet : géométrie éditoriale **ou** capture réelle, plein cadre, sans tabs Flux/Interface/Vision.
4. Un coup de teal en champ (bande, split, ou knockout du serif) — une fois au-dessus de la ligne de flottaison.
5. Motion : `clip-path` / `opacity` / `transform` sur le titre. Un seul reveal, CSS. `prefers-reduced-motion` = statique d’abord.

### Cas

Une image mur, type à côté ou dessus. Outcomes avant process. Interdit : 3 thumbs égaux.

### Expertises / studio

Asymétrie 7/5 ou 8/4. Jamais une rangée de `Card` identiques comme identité visuelle.

### Mobile 360

Le punch survit : H1 toujours énorme, champ de couleur en bande pleine largeur, objet graphique sous le titre (pas une maquette SaaS illisible). Hover n’existe pas.

## Figma 2026 — prendre / refuser

| Prendre | Refuser (playbook + job 8 s) |
|---|---|
| Trend 4 — typo bold, kinetic **sobre** | Trend 1 — 3D / WebGL comme défaut |
| Trend 6 — motion = rythme, pas déco | Trend 2 — nav expérimentale (radial, hidden) |
| Trend 10 — overlap **une fois**, pas collage | Trend 5 — dark par défaut |
| Trend 13 — type léger = perf | Trend 7 gamification · 8 neumorphism · 9 rétrofuturisme arcade · 11 collage sticker · 12 néo-brutalisme Mailchimp |

Afrofuturisme AgenStudio = lumière chaude + géométrie précise + voix. Pas chrome, neon, wax literal.

## Specs à viser (Sprint 1.3 / 1.10)

```
H1     text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tight font-heading
Kicker text-xs font-mono uppercase tracking-widest text-ink/60
Body   text-base sm:text-lg max-w-[36rem] leading-relaxed
Champ  un bloc bg-teal ou bg-magenta min-h-[40vh] OU type knockout — 1× / page above-fold
Objet  1 image ou 1 géométrie, object-cover, pas de radius générique 16px partout
Wow    2–3 / page · teal 1× / viewport
```

Done visuel : DA ≥ 4/5 **Flamboyant** sans tomber sous 4/5 **Pro**. Si on hausse le punch et que ça ressemble à un template Awwwards, veto.

## Annexe — l’autre immersif (WebGL)

Familles Metabole : scroll narratif · univers Three.js · XR.  
ZERO = 4 mois, 1 Go → < 10 Mo, 60 fps Android. Praxvon : WebGL jamais LCP, `/experience` opt-in.

Hors sprint, après G4, si le DA le tranche. **Ne pas** l’utiliser pour rattraper un hero plat.

Détail craft 3D : inchangé ci-dessous pour mémoire d’équipe.

| Principe 3D | Règle |
|---|---|
| HTML d’abord | Texte dans le DOM |
| WebGL ≠ LCP | Init 400–800 ms |
| Lazy + pause | Three.js ~140 KB gz |
| DPR ≤ 2 | Téléphone DPR 3 = ~9× pixels |
| Reduced motion | Poster d’abord |

## Sources

- Obys, *Designing Ourselves* — Codrops, 14 mai 2026
- Refero Styles — Studio Thomas, Favorit Studio, Charlie, BUTT Studio
- Figma, *Top Web Design Trends for 2026* (Trend 4 typo, 6 motion, 10 maximalism)
- Vikilinks, *Editorial Web Design: A Practical Guide*
- Metabole, *Immersive Website* (26 avr. 2026) — annexe 3D seulement
- Playbook AgenStudio — 70/20/10, 2–3 wow, pas de scroll-jack
