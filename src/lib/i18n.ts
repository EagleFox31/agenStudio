export type Language = 'fr' | 'en';

export interface TranslationStructure {
  nav: {
    home: string;
    expertises: string;
    projects: string;
    studio: string;
    contact: string;
    ctaButton: string;
    langSwitchLabel: string;
  };
  hero: {
    badge: string;
    title: string;
    tagline: string;
    subtitle: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    systemNodesLabel: string;
  };
  heroVisual: {
    tablistLabel: string;
    tabSystem: string;
    tabPreview: string;
    tabVision: string;
    mockLabel: string;
    mockNote: string;
    mockCaption: string;
    visionKicker: string;
    visionTitle: string;
    visionBody: string;
    visionFoot: string;
  };
  frictions: {
    tag: string;
    title: string;
    subtitle: string;
    quote: string;
    impactLabel: string;
    principleLabel: string;
    items: {
      title: string;
      description: string;
      impact: string;
    }[];
  };
  expertises: {
    tag: string;
    title: string;
    subtitle: string;
    seeAll: string;
    problemLabel: string;
    deliverableLabel: string;
    benefitLabel: string;
    exampleLabel: string;
    detailsLabel: string;
    capabilityLabel: string;
    items: {
      id: string;
      title: string;
      problem: string;
      deliverable: string;
      benefit: string;
      example: string;
    }[];
    viewDetails: string;
  };
  projects: {
    tag: string;
    title: string;
    subtitle: string;
    viewCaseStudy: string;
    filterAll: string;
    exploreCases: string;
    consultLabel: string;
    types: {
      client: string;
      internal: string;
      rd: string;
      concept: string;
    };
  };
  method: {
    tag: string;
    title: string;
    subtitle: string;
    outcomeLabel: string;
    steps: {
      number: string;
      title: string;
      description: string;
      outcome: string;
    }[];
  };
  pov: {
    tag: string;
    title: string;
    subtitle: string;
    cards: {
      title: string;
      body: string;
    }[];
  };
  studioIntro: {
    tag: string;
    title: string;
    description: string;
    anchorage: string;
    values: {
      title: string;
      desc: string;
    }[];
    cta: string;
    craftKicker: string;
    craftLead: string;
    craftPhoneLabel: string;
    craftMobile: string;
    craftNetLabel: string;
    craftPerf: string;
    craftLiveLabel: string;
    craftTs: string;
    craftLangLabel: string;
    craftI18n: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    button: string;
    altContact: string;
  };
  footer: {
    tagline: string;
    blurb: string;
    rights: string;
    privacy: string;
    legal: string;
    location: string;
    contactLabel: string;
    replyLabel: string;
    navHeading: string;
  };
  contactForm: {
    tag: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    problemLabel: string;
    problemPlaceholder: string;
    timelineLabel: string;
    timelineOptions: string[];
    submitButton: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
    errorSummary: string;
    missingTurnstile: string;
    turnstileRequired: string;
    networkError: string;
    directEmailText: string;
    directLabel: string;
    emailHeading: string;
    engageLabel: string;
    engageBody: string;
    privacyLabel: string;
    privacyBody: string;
    requiredLabel: string;
    againLabel: string;
    successHeading: string;
    apiErrors: {
      turnstile_failed: string;
      rate_limited: string;
      misconfigured: string;
      send_failed: string;
    };
    fieldErrors: {
      name_too_short: string;
      name_too_long: string;
      email_invalid: string;
      email_too_long: string;
      company_too_long: string;
      problem_too_short: string;
      problem_too_long: string;
    };
  };
}

export const translations: Record<Language, TranslationStructure> = {
  fr: {
    nav: {
      home: "Accueil",
      expertises: "Ce qu’on fait",
      projects: "Réalisations",
      studio: "Qui on est",
      contact: "Contact",
      ctaButton: "Nous écrire",
      langSwitchLabel: "EN"
    },
    hero: {
      badge: "Douala / Yaoundé",
      title: "Le logiciel qui n’existe pas en rayon, on le fabrique.",
      tagline: "",
      subtitle: "Stock, factures, qui a dit oui : au même endroit, et sur le téléphone de vos équipes.",
      description: "",
      primaryCta: "Nous écrire",
      secondaryCta: "Voir nos réalisations",
      systemNodesLabel: "Exemple de suivi de stock"
    },
    heroVisual: {
      tablistLabel: "Aperçus",
      tabSystem: "Stock",
      tabPreview: "Écran",
      tabVision: "L’équipe",
      mockLabel: "FABRIQUÉ ICI",
      mockNote: "Aperçu",
      mockCaption: "Écrit pour votre métier. Pas adapté depuis celui d’un autre.",
      visionKicker: "Où on est",
      visionTitle: "On est à Douala et à Yaoundé.",
      visionBody: "On fait des logiciels pour le dépôt, le magasin, le téléphone. Pas pour une présentation.",
      visionFoot: "Cameroun — sur place et à distance"
    },
    frictions: {
      tag: "LE PROBLÈME",
      title: "Votre entreprise ne devrait pas dépendre d'un fichier Excel que personne n'ose modifier.",
      subtitle: "Les fichiers passent d’une personne à l’autre. Le logiciel du commerce ne va pas. Le petit bricolage casse.",
      quote: "Perdre une info ou la retaper deux fois, ce n’est pas « comme ça ». C’est un outil mal fait pour vous.",
      impactLabel: "Résultat",
      principleLabel: "Notre avis",
      items: [
        {
          title: "Excel, WhatsApp, et on retape tout",
          description: "Les infos passent par mail, tableur et WhatsApp. Le soir, plus personne n’est sûr de la bonne version.",
          impact: "On perd du temps. On se trompe. Personne n’a vraiment les chiffres."
        },
        {
          title: "Un logiciel trop grand, ou trop rigide",
          description: "On vous demande de changer votre façon de travailler pour coller au logiciel. Au magasin, les gens l’évitent.",
          impact: "Retour à WhatsApp. Le logiciel reste ouvert « pour le bureau »."
        },
        {
          title: "Les petits bricolages qui cassent",
          description: "Un fichier ou un script que personne ne surveille. Un format change, tout s’arrête.",
          impact: "La journée est bloquée, et on ne sait pas ce qui s’est passé."
        }
      ]
    },
    expertises: {
      tag: "CE QU’ON FAIT",
      title: "Trois problèmes qu’on voit souvent",
      subtitle: "Pas une liste de services. Trois cas fréquents, et ce que vous recevez.",
      seeAll: "Voir les trois",
      problemLabel: "Le problème",
      deliverableLabel: "Ce que vous recevez",
      benefitLabel: "Au quotidien",
      exampleLabel: "Exemple",
      detailsLabel: "En savoir plus",
      capabilityLabel: "Cas",
      items: [
        {
          id: "software-engineering",
          title: "Un logiciel pour le stock et le suivi",
          problem: "Tout est dans des tableurs que personne n’ose modifier.",
          deliverable: "Un logiciel web : stock, accords, historique — au même endroit.",
          benefit: "La même info sur le téléphone et au bureau.",
          example: "Stock sur plusieurs sites — voir SokoLog."
        },
        {
          id: "process-automation",
          title: "Arrêter de retaper la même chose",
          problem: "La même ligne, trois fois, jusqu’à ce que quelqu’un craque.",
          deliverable: "Ça part tout seul, et on voit où ça a bloqué.",
          benefit: "Vos gens reviennent au travail, pas au copier-coller.",
          example: "Qui doit dire oui, et dans quel ordre — voir KaziFlow."
        },
        {
          id: "systems-integration",
          title: "Relier vos outils entre eux",
          problem: "Les factures d’un côté, le stock de l’autre, WhatsApp au milieu.",
          deliverable: "On relie vos outils pour ne plus recopier à la main.",
          benefit: "Plus besoin qu’une personne fasse le facteur.",
          example: "Factures ↔ dépôt."
        }
      ],
      viewDetails: "Voir ce cas"
    },
    projects: {
      tag: "RÉALISATIONS",
      title: "Ce qu’on a construit, et ce qu’on a seulement essayé",
      subtitle: "Outils internes, essais, concepts : le statut est écrit sur chaque fiche. Pas un mur de logos.",
      viewCaseStudy: "Lire le cas",
      filterAll: "Tout",
      exploreCases: "Voir les réalisations",
      consultLabel: "Voir",
      types: {
        client: "Projet client autorisé",
        internal: "Outil interne",
        rd: "Essai",
        concept: "Idée testée"
      }
    },
    method: {
      tag: "COMMENT ON TRAVAILLE",
      title: "On commence par vos journées, pas par un écran vide",
      subtitle: "On ne livre rien si vos équipes ne peuvent pas l’ouvrir au dépôt, au magasin, ou sur le téléphone.",
      outcomeLabel: "Vous repartez avec",
      steps: [
        {
          number: "01",
          title: "Voir comment vous travaillez",
          description: "On vient, ou vous nous racontez : tableurs, WhatsApp, files d’attente. Le problème a un nom.",
          outcome: "Un constat que vos équipes reconnaissent."
        },
        {
          number: "02",
          title: "Décider ce qu’on fait",
          description: "On choisit ensemble les écrans utiles — et ce qu’on ne fera pas. Moins de boutons, plus de gens qui s’en servent.",
          outcome: "Une liste courte, et un aperçu des écrans."
        },
        {
          number: "03",
          title: "Fabriquer",
          description: "On fabrique, on teste avec vous, on met en route petit à petit.",
          outcome: "Le logiciel marche vraiment. Ce n’est pas un dessin."
        },
        {
          number: "04",
          title: "Mettre en route",
          description: "On montre à vos équipes. On écrit comment ça marche. Vous n’avez pas besoin de nous pour l’ouvrir.",
          outcome: "Ça tourne sans tout arrêter."
        }
      ]
    },
    pov: {
      tag: "POUR ÊTRE CLAIR",
      title: "Trois choses qu’on ne fera pas",
      subtitle: "Mieux vaut le dire avant que vous écriviez.",
      cards: [
        {
          title: "Pas d’écran juste pour faire joli",
          body: "Si ça n’aide personne à décider ou à avancer, on ne le fait pas."
        },
        {
          title: "Pas un logiciel trop lourd pour le téléphone",
          body: "Si ça rame dès que le réseau est moyen, vos équipes ne l’utiliseront pas."
        },
        {
          title: "Pas un outil que vous ne comprenez pas",
          body: "Vous devez pouvoir l’ouvrir et le garder. On explique. On écrit comment ça marche."
        }
      ]
    },
    studioIntro: {
      tag: "L’ÉQUIPE",
      title: "On est à Douala et à Yaoundé.",
      description: "On fait des logiciels pour des entreprises d’ici — et pour celles qui nous écrivent de loin. Stock, suivi, factures. Pas un discours « Afrique + international ».",
      anchorage: "Douala et Yaoundé. On se déplace. On travaille aussi à distance.",
      values: [
        {
          title: "Ça doit servir après qu’on soit partis",
          desc: "On ne livre pas un outil à racheter tous les six mois pour qu’il tienne."
        },
        {
          title: "On explique simplement",
          desc: "Les choix, en français. Pas de mots compliqués pour cacher un doute."
        },
        {
          title: "Chaque écran a une raison",
          desc: "Rien n’est là « pour faire moderne »."
        }
      ],
      cta: "Qui on est",
      craftKicker: "Ce que ça change pour vos équipes",
      craftLead: "Ça s’ouvre sur un téléphone. Ça tient quand le réseau n’est pas parfait. Pas besoin d’une semaine de formation.",
      craftPhoneLabel: "Téléphone",
      craftMobile: "Fait pour un petit écran, pas seulement pour un grand bureau.",
      craftNetLabel: "Réseau",
      craftPerf: "Ça marche quand la connexion est moyenne.",
      craftLiveLabel: "En service",
      craftTs: "Mis en route avec vous — pas un dessin figé.",
      craftLangLabel: "Langue",
      craftI18n: "Français et anglais, selon vos équipes."
    },
    finalCta: {
      title: "Expliquez le problème en deux phrases.",
      subtitle: "On lit. Si vous préférez le mail, ça marche aussi.",
      button: "Nous écrire",
      altContact: "Ou écrivez à contact@agenstudio.com"
    },
    footer: {
      tagline: "Think sharp. Build what matters.",
      blurb: "À Douala et Yaoundé. On fait des logiciels pour le stock, les factures, le suivi — ce qui doit marcher tous les jours.",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      legal: "Mentions légales",
      location: "Douala / Yaoundé, Cameroun",
      contactLabel: "Nous écrire",
      replyLabel: "Quelqu’un de l’équipe lit. On n’affiche pas de délai tant qu’on ne peut pas le tenir.",
      navHeading: "Navigation"
    },
    contactForm: {
      tag: "NOUS ÉCRIRE",
      title: "Quel est le problème aujourd’hui ?",
      subtitle: "Nom, e-mail, deux phrases. Quelqu’un de l’équipe lit. Pas de délai affiché tant qu’on ne peut pas le tenir.",
      nameLabel: "Nom et poste",
      namePlaceholder: "ex. Jean-Luc Mbarga, gérant",
      emailLabel: "E-mail de travail",
      emailPlaceholder: "ex. jl.mbarga@entreprise.cm",
      companyLabel: "Entreprise (pas obligatoire)",
      companyPlaceholder: "ex. votre société",
      problemLabel: "Que se passe-t-il, et que voulez-vous changer ?",
      problemPlaceholder: "Comment vous travaillez, ce qui casse, ce que vous voulez. Deux phrases suffisent.",
      timelineLabel: "Délai (pas obligatoire)",
      timelineOptions: [
        "Urgent (moins d'1 mois)",
        "Dans 1 à 3 mois",
        "On prend le temps (3 mois et +)",
        "À définir ensemble"
      ],
      submitButton: "Envoyer le message",
      submitting: "Envoi en cours…",
      successMessage: "C’est bien reçu. On le lit et on vous écrit. Pour aller plus vite : contact@agenstudio.com",
      errorMessage: "Corrigez les champs indiqués ci-dessous, puis renvoyez.",
      errorSummary: "Il y a un problème avec le formulaire :",
      missingTurnstile:
        "Le formulaire n’est pas prêt sur cet ordinateur (sécurité anti-spam manquante).",
      turnstileRequired: "Cochez la case de sécurité, puis renvoyez.",
      networkError: "Impossible de joindre le serveur. Vérifiez la connexion, ou écrivez-nous.",
      directEmailText: "Vous pouvez aussi écrire directement à",
      directLabel: "Par e-mail",
      emailHeading: "Le mail marche aussi",
      engageLabel: "Ensuite",
      engageBody:
        "On lit chaque message. On répond dès qu’on a pu — sans promettre un délai sur le site.",
      privacyLabel: "Ce que devient votre message",
      privacyBody:
        "Le formulaire passe par Cloudflare, Turnstile et Resend. Pas de revente. Détail dans la politique de confidentialité (À valider par un avocat).",
      requiredLabel: "Obligatoire",
      againLabel: "Envoyer un autre message",
      successHeading: "C’est bien reçu.",
      apiErrors: {
        turnstile_failed: "Le contrôle anti-spam a échoué. Réessayez.",
        rate_limited: "Trop de tentatives. Réessayez dans quelques minutes.",
        misconfigured: "Le formulaire n’est pas configuré sur cet environnement.",
        send_failed: "L’envoi a échoué. Réessayez, ou passez par l’e-mail.",
      },
      fieldErrors: {
        name_too_short: "Indiquez au moins 2 caractères — le nom et le poste suffisent.",
        name_too_long: "Le nom est trop long (120 caractères maximum).",
        email_invalid: "Entrez une adresse e-mail de travail valide.",
        email_too_long: "L’e-mail est trop long (200 caractères maximum).",
        company_too_long: "Le nom d’entreprise est trop long (200 caractères maximum).",
        problem_too_short:
          "Décrivez le problème en au moins 20 caractères — deux phrases suffisent.",
        problem_too_long: "Le texte est trop long (4000 caractères maximum).",
      },
    }
  },
  en: {
    nav: {
      home: "Home",
      expertises: "What we do",
      projects: "Work",
      studio: "Who we are",
      contact: "Contact",
      ctaButton: "Write to us",
      langSwitchLabel: "FR"
    },
    hero: {
      badge: "Douala / Yaoundé",
      title: "We build the software you can’t buy off the shelf.",
      tagline: "",
      subtitle: "Stock, invoices, who said yes: in one place, and on your teams’ phones.",
      description: "",
      primaryCta: "Write to us",
      secondaryCta: "See our work",
      systemNodesLabel: "Example of stock tracking"
    },
    heroVisual: {
      tablistLabel: "Previews",
      tabSystem: "Stock",
      tabPreview: "Screen",
      tabVision: "The team",
      mockLabel: "BUILT HERE",
      mockNote: "Preview",
      mockCaption: "Written for your trade. Not adapted from someone else’s.",
      visionKicker: "Where we are",
      visionTitle: "We’re in Douala and Yaoundé.",
      visionBody: "We make software for the warehouse, the shop, the phone. Not for a presentation.",
      visionFoot: "Cameroon — on site and remote"
    },
    frictions: {
      tag: "THE PROBLEM",
      title: "Your business shouldn't rely on an Excel sheet no one dares to edit.",
      subtitle: "Files move from person to person. The shop-bought software doesn’t fit. The little workaround breaks.",
      quote: "Losing a record or typing it twice isn’t “just how it is”. It’s a tool that wasn’t made for you.",
      impactLabel: "Result",
      principleLabel: "Our view",
      items: [
        {
          title: "Excel, WhatsApp, and typing it all again",
          description: "Facts go by email, spreadsheet and WhatsApp. By evening, no one is sure which version is right.",
          impact: "Time lost. Mistakes. Nobody has the real numbers."
        },
        {
          title: "Software that’s too big, or too stiff",
          description: "You’re asked to change how you work to fit the software. In the shop, people avoid it.",
          impact: "Back to WhatsApp. The software stays open “for the office”."
        },
        {
          title: "Little workarounds that break",
          description: "A file or a script nobody watches. One format change and everything stops.",
          impact: "The day is blocked, and no one can say what happened."
        }
      ]
    },
    expertises: {
      tag: "WHAT WE DO",
      title: "Three problems we see a lot",
      subtitle: "Not a service list. Three common cases, and what you get.",
      seeAll: "See all three",
      problemLabel: "The problem",
      deliverableLabel: "What you get",
      benefitLabel: "Day to day",
      exampleLabel: "Example",
      detailsLabel: "Read more",
      capabilityLabel: "Case",
      items: [
        {
          id: "software-engineering",
          title: "Software for stock and tracking",
          problem: "Everything lives in spreadsheets no one dares to edit.",
          deliverable: "A web tool: stock, who said yes, history — in one place.",
          benefit: "The same facts on a phone and at a desk.",
          example: "Stock across several sites — see SokoLog."
        },
        {
          id: "process-automation",
          title: "Stop typing the same thing again",
          problem: "The same line, three times, until someone snaps.",
          deliverable: "It runs on its own, and you can see where it stuck.",
          benefit: "Your people go back to the work, not to copy-paste.",
          example: "Who has to say yes, and in what order — see KaziFlow."
        },
        {
          id: "systems-integration",
          title: "Connect your tools",
          problem: "Invoices on one side, stock on the other, WhatsApp in the middle.",
          deliverable: "We connect your tools so nobody has to retype.",
          benefit: "Nobody has to carry numbers from one tool to the next.",
          example: "Invoices ↔ warehouse."
        }
      ],
      viewDetails: "See this case"
    },
    projects: {
      tag: "WORK",
      title: "What we’ve built, and what we only tried",
      subtitle: "Internal tools, trials, concepts: the status is written on every card. No wall of logos.",
      viewCaseStudy: "Read the case",
      filterAll: "All",
      exploreCases: "See the work",
      consultLabel: "See",
      types: {
        client: "Authorized client project",
        internal: "Internal tool",
        rd: "Trial",
        concept: "Idea we tested"
      }
    },
    method: {
      tag: "HOW WE WORK",
      title: "We start with your days, not a blank screen",
      subtitle: "We don’t hand anything over if your teams can’t open it at the warehouse, the shop, or on a phone.",
      outcomeLabel: "You leave with",
      steps: [
        {
          number: "01",
          title: "See how you work",
          description: "We come, or you walk us through it: spreadsheets, WhatsApp, queues. The problem gets a name.",
          outcome: "A picture your teams recognise."
        },
        {
          number: "02",
          title: "Decide what we do",
          description: "Together we pick the useful screens — and what we will not make. Fewer buttons, more people who actually use it.",
          outcome: "A short list, and a look at the screens."
        },
        {
          number: "03",
          title: "Make it",
          description: "We make it, we test with you, we switch it on step by step.",
          outcome: "The software really runs. It isn’t a drawing."
        },
        {
          number: "04",
          title: "Switch it on",
          description: "We show your teams. We write down how it works. You don’t need us just to open it.",
          outcome: "It runs without stopping the work."
        }
      ]
    },
    pov: {
      tag: "TO BE CLEAR",
      title: "Three things we won’t do",
      subtitle: "Better said before you write to us.",
      cards: [
        {
          title: "No screen just to look nice",
          body: "If it doesn’t help someone decide or move, we don’t make it."
        },
        {
          title: "No software too heavy for a phone",
          body: "If it crawls when the network is average, your teams won’t use it."
        },
        {
          title: "No tool you don’t understand",
          body: "You should be able to open it and keep it. We explain. We write down how it works."
        }
      ]
    },
    studioIntro: {
      tag: "THE TEAM",
      title: "We’re in Douala and Yaoundé.",
      description: "We make software for companies here — and for those who write from further away. Stock, tracking, invoices. Not a speech about “Africa plus international”.",
      anchorage: "Douala and Yaoundé. We travel. We also work from a distance.",
      values: [
        {
          title: "It has to work after we’ve left",
          desc: "We don’t hand over a tool you have to buy again every six months for it to hold."
        },
        {
          title: "We explain in plain words",
          desc: "The choices, in French or English. No hard words to hide a doubt."
        },
        {
          title: "Every screen has a reason",
          desc: "Nothing is there “to look modern”."
        }
      ],
      cta: "Who we are",
      craftKicker: "What this changes for your teams",
      craftLead: "It opens on a phone. It holds when the network isn’t perfect. No need for a week of training.",
      craftPhoneLabel: "Phone",
      craftMobile: "Made for a small screen, not only a big office monitor.",
      craftNetLabel: "Network",
      craftPerf: "It works when the connection is average.",
      craftLiveLabel: "Running",
      craftTs: "Switched on with you — not a frozen drawing.",
      craftLangLabel: "Language",
      craftI18n: "French and English, depending on your teams."
    },
    finalCta: {
      title: "Explain the problem in two sentences.",
      subtitle: "We’ll read it. If you’d rather email, that works too.",
      button: "Write to us",
      altContact: "Or write to contact@agenstudio.com"
    },
    footer: {
      tagline: "Think sharp. Build what matters.",
      blurb: "In Douala and Yaoundé. We make software for stock, invoices, tracking — the work that has to run every day.",
      rights: "All rights reserved.",
      privacy: "Privacy policy",
      legal: "Legal notice",
      location: "Douala / Yaoundé, Cameroon",
      contactLabel: "Write to us",
      replyLabel: "Someone on the team reads. We don’t show a deadline we can’t keep.",
      navHeading: "Navigation"
    },
    contactForm: {
      tag: "WRITE TO US",
      title: "What’s the problem today?",
      subtitle: "Name, email, two sentences. Someone on the team reads. No deadline on the page until we can keep it.",
      nameLabel: "Name and job",
      namePlaceholder: "e.g. Jean-Luc Mbarga, manager",
      emailLabel: "Work email",
      emailPlaceholder: "e.g. jl.mbarga@company.cm",
      companyLabel: "Company (not required)",
      companyPlaceholder: "e.g. your company",
      problemLabel: "What’s happening, and what do you want to change?",
      problemPlaceholder: "How you work, what breaks, what you want. Two sentences will do.",
      timelineLabel: "Timing (not required)",
      timelineOptions: [
        "Urgent (under 1 month)",
        "In 1 to 3 months",
        "We take our time (3+ months)",
        "To be defined together"
      ],
      submitButton: "Send the message",
      submitting: "Sending…",
      successMessage: "Got it. We’ll read it and write back. To move faster: contact@agenstudio.com",
      errorMessage: "Fix the fields marked below, then send again.",
      errorSummary: "There is a problem with the form:",
      missingTurnstile:
        "The form isn’t ready on this computer (security check missing).",
      turnstileRequired: "Tick the security box, then send again.",
      networkError: "Could not reach the server. Check the connection, or email us.",
      directEmailText: "You can also write directly to",
      directLabel: "By email",
      emailHeading: "Email works too",
      engageLabel: "What happens next",
      engageBody:
        "We read every message. We reply once we can — without promising a deadline on the site.",
      privacyLabel: "What happens to your message",
      privacyBody:
        "The form goes through Cloudflare, Turnstile and Resend. No resale. Detail in the privacy policy (to be validated by counsel).",
      requiredLabel: "Required",
      againLabel: "Send another message",
      successHeading: "Got it.",
      apiErrors: {
        turnstile_failed: "The security check failed. Please try again.",
        rate_limited: "Too many attempts. Please try again in a few minutes.",
        misconfigured: "The form isn’t ready on this computer.",
        send_failed: "Sending failed. Try again, or use email.",
      },
      fieldErrors: {
        name_too_short: "Enter at least 2 characters — name and job are enough.",
        name_too_long: "The name is too long (120 characters maximum).",
        email_invalid: "Enter a valid work email address.",
        email_too_long: "The email is too long (200 characters maximum).",
        company_too_long: "The company name is too long (200 characters maximum).",
        problem_too_short: "Describe the problem in at least 20 characters — two sentences will do.",
        problem_too_long: "The text is too long (4000 characters maximum).",
      },
    }
  }
};
