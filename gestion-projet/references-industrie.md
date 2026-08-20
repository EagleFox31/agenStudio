# Références industrie — contrats, edge, conversion

> **Date :** 20 août 2026  
> **But :** traduire des pratiques Silicon Valley / IETF / GOV.UK / Cloudflare en règles **à l’échelle AgenStudio** (une Function, pas une platform API).  
> **Anti-cargo-cult :** OpenAPI 3.1, Durable Objects, outbox Postgres — excellents *ailleurs*. Ici, le contrat **est** le Zod partagé.

Sources lues (pas inventées). Chaque « Prendre » est applicable au Sprint 0–2.

---

## 1. Contrat d’API — une source de vérité

| Source | Idée | AgenStudio |
|---|---|---|
| [Cadence, API design 2026](https://cadence.withremote.ai/blog/api-design-best-practices) | Spec = contrat ; handlers ensuite ; types dérivés | **Ne pas** ajouter OpenAPI pour 1 POST. Zod *est* la spec exécutable. |
| [ASOasis, contract-first](https://asoasis.tech/articles/2026-04-28-0253-api-contract-first-design-openapi/) | Code-first → spec qui dérive. Contract-first → moins de drift | Schema dans un fichier, pas dans le handler. G-011. |
| [zod-contract-first skill](https://cdn.jsdelivr.net/npm/claude-code-skills@0.5.0/skill-packs/backend/skills/zod-contract-first-api/SKILL.md) | Un Zod par endpoint ; `.strict()` ; `safeParse` ; pas de schema dans la route | `src/lib/contact-schema.ts` + `.strict()`. Interdit `passthrough()`. |
| [Schema Design & Validation](https://www.api-contract-testing.com/schema-design-validation-patterns/) | Runtime schema = spec. Drift = la panne | Client **et** Function importent le même module. |

**Prendre :** un schéma, `safeParse`, `strict()`, codes d’erreur stables sur les issues Zod, tests de contrat (fixture JSON).  
**Ne pas prendre :** générateur OpenAPI, SDK, `/openapi.json`, versioning `/v1` — une route interne same-origin.

---

## 2. Enveloppe d’erreur — machines + humains

| Source | Idée | AgenStudio |
|---|---|---|
| [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) (obsolète 7807) | `type`, `title`, `status`, `detail` + extensions `code`, `errors[]` | Sous-ensemble, pas besoin d’URI IANA. |
| [Swagger / SmartBear](https://swagger.io/blog/problem-details-rfc9457-doing-api-errors-well/) | `errors[].pointer` (JSON Pointer) pour le champ | `/email`, `/problem` — le formulaire mappe vers le label. |
| [400 vs 422](https://xerobit.dev/blog/when-to-use-422-vs-400/) | 400 = JSON illisible. 422 = JSON OK, champs faux. Stripe met souvent 400 partout ; GitHub/Shopify préfèrent 422 | **422** si Zod échoue, **400** si `JSON.parse` échoue. Être **consistant**. |
| [Jsonic](https://jsonic.io/guides/json-api-error-handling) | Codes stables, jamais de stack au client | Déjà la direction RSSI. |

Forme cible (une Function, un client) :

```json
{
  "type": "about:blank",
  "title": "Validation failed",
  "status": 422,
  "code": "validation_failed",
  "errors": [{ "pointer": "/email", "code": "email_invalid" }]
}
```

Succès : `{ "ok": true }` inchangé.  
`code` racine pour Turnstile / rate limit / send / misconfigured.  
Le **libellé** humain vit dans `i18n.ts`, jamais dans l’API (RFC 9457 : i18n côté client / `Accept-Language`).

---

## 3. Idempotence — Stripe, pas un payment rail

| Source | Idée | AgenStudio |
|---|---|---|
| [Stripe, idempotency](https://stripe.com/blog/idempotency) | POST + `Idempotency-Key` ; retry 5xx avec la **même** clé ; backoff + jitter | Double-clic / timeout réseau = 2 e-mails aujourd’hui. |
| [Stripe docs](https://docs.stripe.com/api/idempotent_requests) | UUID v4 ; ne pas mettre l’e-mail comme clé ; 24 h de cache | Header `Idempotency-Key`. Clé mintée au mount du formulaire. |

**Prendre (Sprint 0.9+ / 2.4) :** le client envoie une UUID ; la Function, si KV dispo, rejoue la réponse déjà stockée pour cette clé (TTL ≥ 15 min). Retry seulement sur 5xx/réseau, pas sur 422.  
**Ne pas prendre :** cache de 24 h type Stripe, header `Stripe-Should-Retry`, SDK.

---

## 4. Anti-spam — honeypot d’abord, captcha en dernier

| Source | Idée | AgenStudio |
|---|---|---|
| [splitforms 2026](https://splitforms.com/guides/form-spam) | Turnstile = défaut greenfield (GDPR, −0,4 % conv.). Honeypot : `aria-hidden`, `tabindex=-1`, **pas** `display:none`. Éviter noms `website` / `url` (password managers) | Champ actuel `website` + `hidden` = autofill + bots qui skip `display:none`. |
| [Honeypot first](https://www.digitalapplied.com/blog/form-bot-defense-honeypot-first-playbook) | Honeypot rempli → **200 silencieux**. Time-trap optionnel. Turnstile token ~300 s, usage unique | Aligné G-011. Time-trap (submit < 2–3 s) = P2. |
| [formester](https://formester.com/blog/how-to-protect-user-data-and-prevent-spam-in-web-forms/) | Couche : honeypot + Turnstile + Zod serveur | Déjà le modèle. Le Zod doit **parser** le honeypot. |

**Prendre :** renommer le honeypot (`company_fax` ou `hp_confirm`, jamais autocomplete standard) ; le cacher hors écran (CSS `sr-only` / `left: -9999px`), pas `hidden` ; 200 si rempli.  
**Ne pas prendre :** reCAPTCHA, time-trap agressif qui punit le copier-coller, Akismet.

---

## 5. Rate limit edge — KV n’est pas Redis

| Source | Idée | AgenStudio |
|---|---|---|
| [Cloudflare forum / SO](https://stackoverflow.com/questions/78360330/decrementing-a-count-property-by-1-with-cloudflare-workers-kv-and-promise-all-ca) | KV : pas d’incrément atomique, cohérence **éventuelle** | Le get-then-put actuel peut sous-compter. |
| [Flavio Copes](https://flaviocopes.com/rate-limiting-cloudflare-kv/) | OK comme *soft* anti-bot (5→6 parfois). Pas un quota facturable | Volume studio : **acceptable**. Documenter « soft limit ». |
| [Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/) | Compteur atomique = 1 DO **par IP**, pas un singleton global | Seulement si le spam casse Resend malgré Turnstile. |

**Prendre maintenant :** KV **obligatoire** en prod (soft).  
**Plus tard (abus réel) :** Rate Limiting binding Cloudflare **ou** Durable Object par IP. Pas un DO global.

---

## 6. Durabilité e-mail — outbox sans CRM

| Source | Idée | AgenStudio |
|---|---|---|
| [microservices.io outbox](https://microservices.io/patterns/data/transactional-outbox.html) | Dual-write (état + broker) = perte ou fantôme | Aujourd’hui : un seul write (Resend). Crash = lead perdu. |
| [Stripe / Outpost](https://github.com/tgoliveira11/outpost) | Persister **avant** d’envoyer ; retry idempotent | Hors scope G4. Évolution licite : KV/D1 `queued→sent`, **pas** le brief en clair. |

**Ne pas prendre maintenant :** Postgres + relay + Debezium. Volume inbox humaine = Resend suffit si le fail est visible (502 + e-mail direct).

---

## 7. Formulaire sans formation — Krug, Baymard, GOV.UK

| Source | Idée | AgenStudio |
|---|---|---|
| [Krug, Don’t Make Me Think](https://sensible.com/dont-make-me-think/) | Chaque pause = coût. Clics OK s’ils sont évidents | Hero SaaS fictif = pause. CTA unique. |
| [8-second clarity](https://njump.me/naddr1qq0k26t8dp6z6um9vdhkuepdd3skuerfdenj6urpvajj6cmgv43kkq3qk4g22vx79dgqt8ejpm7ve06j9rq7dmfq80mvsk5pz0m45r3hmrfsxpqqqp65wektxzx) | Message, action, preuve en 8 s | Tests produit déjà dans `/agen-produit`. |
| [Baymard, labels](https://baymard.com/blog/mobile-forms-avoid-inline-labels) | Label **permanent** au-dessus. Placeholder ≠ label | Labels OK. Ne pas les retirer. |
| [Baymard, inline validation](https://baymard.com/blog/inline-form-validation) | Inline bien fait aide ; mal fait (à chaque frappe) nuit | Formulaire court → valider **au submit**, pas au blur. |
| [GOV.UK validation](https://design-system.service.gov.uk/patterns/validation/) | `novalidate`. Pas `required` HTML5. Error summary + message **à côté du champ**. Garder les valeurs. Focus sur le résumé. | `novalidate` déjà là. Retirer `required` HTML. Ajouter résumé + `aria-invalid`. |

**Prendre :** pattern GOV.UK (submit, résumé, champ, focus). Copy d’erreur = comment corriger, pas « invalid ».  
**Ne pas prendre :** validation à chaque keystroke ; placeholders comme seuls labels.

---

## 8. Décisions verrouillées pour AgenStudio

1. Le contrat = Zod unique, pas OpenAPI.  
2. Erreurs = `{ code, errors[{ pointer, code }] }`, HTTP 400 parse / 422 Zod / 429 KV / 503 env / 502 Resend.  
3. Honeypot parse + 200 ; nom non-autofill ; hors écran.  
4. KV = soft rate limit obligatoire ; DO seulement si abus.  
5. `Idempotency-Key` client (UUID) quand on touche au POST.  
6. Pas de BDD. Outbox = plus tard, journal d’accusé, pas un CRM.  
7. UX formulaire = GOV.UK, pas un checkout Baymard de 20 champs.

Détail opérationnel : `.cursor/skills/agen-backend/references/contrat-api.md` · `.cursor/skills/agen-produit/references/ux-conversion.md`
