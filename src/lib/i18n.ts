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
    subtitle: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    systemNodesLabel: string;
  };
  frictions: {
    tag: string;
    title: string;
    subtitle: string;
    quote: string;
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
  };
  finalCta: {
    title: string;
    subtitle: string;
    button: string;
    altContact: string;
  };
  footer: {
    tagline: string;
    rights: string;
    privacy: string;
    legal: string;
    location: string;
  };
  contactForm: {
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
    directEmailText: string;
  };
}

export const translations: Record<Language, TranslationStructure> = {
  fr: {
    nav: {
      home: "Accueil",
      expertises: "Expertises",
      projects: "Projets",
      studio: "Le Studio",
      contact: "Contact",
      ctaButton: "Parler de votre projet",
      langSwitchLabel: "EN"
    },
    hero: {
      badge: "STUDIO NUMÉRIQUE INDÉPENDANT",
      title: "Think sharp. Build what matters.",
      subtitle: "Des systèmes numériques conçus autour de vos vraies opérations.",
      description: "AgenStudio transforme les processus dispersés, les tâches répétitives et les outils mal connectés en logiciels métier clairs, fiables et capables d’évoluer.",
      primaryCta: "Parler de votre projet",
      secondaryCta: "Voir nos projets",
      systemNodesLabel: "Flux opérationnels & Nœuds d'intégration"
    },
    frictions: {
      tag: "FRICTIONS MÉTIER",
      title: "Votre entreprise ne devrait pas dépendre d'un fichier Excel que personne n'ose modifier.",
      subtitle: "Nous résolvons les blocages opérationnels discrets qui freinent les équipes ambitieuses.",
      quote: "Les pertes de données et les doubles saisies ne sont pas une fatalité : ce sont des défauts d'architecture.",
      items: [
        {
          title: "Fichiers dispersés & double saisie",
          description: "Les informations clés naviguent par e-mails, fichiers de calcul manuels et messageries éphémères.",
          impact: "Risque de pertes, incohérences de données et temps précieux gaspillé."
        },
        {
          title: "Outils génériques inadaptés",
          description: "Des SaaS trop rigides ou sur-dimensionnés qui forcent vos équipes à adapter leurs méthodes au logiciel.",
          impact: "Baisse de productivité et rejet d'adoption par les équipes terrain."
        },
        {
          title: "Automatisations fragiles",
          description: "Des scripts bricolés sans surveillance qui cassent au moindre changement d'API ou de format.",
          impact: "Ruptures de service impromptues et manque de traçabilité."
        }
      ]
    },
    expertises: {
      tag: "NOS CAPACITÉS",
      title: "Une ingénierie claire au service du terrain",
      subtitle: "Chaque système est conçu sur-mesure avec une exigence de sobriété et de durabilité.",
      items: [
        {
          id: "software-engineering",
          title: "Logiciels Métier & Mini-ERP",
          problem: "Processus métiers spécifiques mal pris en charge par les outils standards du marché.",
          deliverable: "Application web sur-mesure centralisant opérations, stocks et validations.",
          benefit: "Vérité unique sur les données et fluidité de travail pour l'ensemble des collaborateurs.",
          example: "Plateforme de gestion logistique et de suivi d'inventaire multi-sites."
        },
        {
          id: "process-automation",
          title: "Automatisations & Flux de données",
          problem: "Tâches répétitives à faible valeur ajoutée chronophages pour les équipes.",
          deliverable: "Pipelines de traitement automatique, notifications et synchronisation temps réel.",
          benefit: "Zéro erreur manuelle et gain d'heures qualifiées chaque semaine.",
          example: "Validation automatique des commandes et génération de rapports de conformité."
        },
        {
          id: "systems-integration",
          title: "Intégration d'API & Connecteurs",
          problem: "Logiciels existants cloisonnés incapables de communiquer entre eux.",
          deliverable: "Passerelles d'intégration sécurisées et synchronisation bidirectionnelle.",
          benefit: "Écosystème unifié et circulation fluide des données décisionnelles.",
          example: "Connexion directe entre système de facturation et solution logistique."
        },
        {
          id: "web-saas-products",
          title: "Applications Web & Produits SaaS",
          problem: "Besoin de lancer une plateforme client moderne et hautement performante.",
          deliverable: "Produit numérique complet, du cadrage UX à l'architecture frontend et cloud.",
          benefit: "Expérience utilisateur d'exception et infrastructure prêle à passer à l'échelle.",
          example: "Interface client bilingue avec tableau de bord de pilotage en direct."
        }
      ],
      viewDetails: "En savoir plus sur cette expertise"
    },
    projects: {
      tag: "RÉALISATIONS & ÉTUDES DE CAS",
      title: "Des preuves tangibles de notre savoir-faire",
      subtitle: "Découvrez comment nous traduisons des enjeux métiers complexes en produits numériques précis.",
      viewCaseStudy: "Lire l'étude de cas",
      filterAll: "Tous les projets",
      types: {
        client: "Projet client autorisé",
        internal: "Produit interne",
        rd: "Recherche & Développement",
        concept: "Concept & Prototypage"
      }
    },
    method: {
      tag: "MÉTHODE AGENSTUDIO",
      title: "Rigueur, clarté et adoption progressive",
      subtitle: "Un processus de développement structuré pour garantir un impact réel en production.",
      steps: [
        {
          number: "01",
          title: "Comprendre",
          description: "Immersion dans vos opérations réelles, cartographie des flux et identification précise des points de friction.",
          outcome: "Cahier des charges fonctionnel clair et indicateurs de succès définis."
        },
        {
          number: "02",
          title: "Cadrer",
          description: "Conception de l'architecture technique, choix des tokens de design et prototypage des parcours prioritaires.",
          outcome: "Spécification produit et maquettes d'interface haute fidélité."
        },
        {
          number: "03",
          title: "Construire",
          description: "Développement itératif en TypeScript strict, intégration des automatisations et tests de charge.",
          outcome: "Code propre, sécurisé, rapide et documenté."
        },
        {
          number: "04",
          title: "Faire adopter",
          description: "Déploiement progressif, formation des équipes terrain et accompagnement au changement.",
          outcome: "Adoption rapide sans rupture dans les opérations quotidiennes."
        }
      ]
    },
    pov: {
      tag: "NOTRE POINT DE VUE",
      title: "Une technologie utile, conçue autour du terrain",
      subtitle: "Nous croyons en une ingénierie exigeante qui résout de vrais problèmes sans complexité inutile.",
      cards: [
        {
          title: "Précision avant accumulation",
          body: "Nous ne rajoutons pas des fonctionnalités gadget. Chaque écran et chaque ligne de code doit servir un objectif opérationnel vérifiable."
        },
        {
          title: "Sobriété & Performance",
          body: "Un logiciel rapide est un logiciel adopté. Nous privilégions les architectures légères qui se chargent instantanément, même sur connexion limitée."
        },
        {
          title: "Autonomie du client",
          body: "Nous construisons des systèmes transparents et documentés dont vous gardez la maîtrise totale, sans dépendance artificielle."
        }
      ]
    },
    studioIntro: {
      tag: "LE STUDIO",
      title: "Ancrage camerounais, standards internationaux",
      description: "Basé au Cameroun, AgenStudio est un studio numérique indépendant qui conçoit des produits logiciels pour les PME et organisations exigeantes. Nous combinons la réactivité d'une structure agile avec l'exigence des meilleurs standards d'ingénierie.",
      anchorage: "Basé à Douala & Yaoundé — Intervention à distance et sur site.",
      values: [
        {
          title: "Culture produit",
          desc: "Chaque projet est traité comme un produit pérenne, non comme une simple prestation."
        },
        {
          title: "Transparence totale",
          desc: "Des choix techniques expliqués clairement, sans jargon ni boîte noire."
        },
        {
          title: "Exécution sur-mesure",
          desc: "Aucun composant posé au hasard, chaque détail visuel et fonctionnel est maîtrisé."
        }
      ],
      cta: "Découvrir le Studio"
    },
    finalCta: {
      title: "Prêt à clarifier et automatiser vos opérations ?",
      subtitle: "Discutons de vos enjeux métiers et étudions ensemble la solution la plus adaptée.",
      button: "Initier un projet",
      altContact: "Ou envoyez-nous directement un e-mail à contact@agenstudio.com"
    },
    footer: {
      tagline: "Think sharp. Build what matters.",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      legal: "Mentions légales",
      location: "Douala / Yaoundé, Cameroun"
    },
    contactForm: {
      title: "Démarrer une conversation",
      subtitle: "Partagez votre besoin opérationnel ou votre projet numérique. Nous vous répondons sous 24h ouvrées.",
      nameLabel: "Nom complet & Fonction",
      namePlaceholder: "ex: Jean-Luc Mbarga, Directeur Général",
      emailLabel: "Adresse e-mail professionnelle",
      emailPlaceholder: "ex: jl.mbarga@entreprise.cm",
      companyLabel: "Nom de votre organisation",
      companyPlaceholder: "ex: Logistics Central Africa",
      problemLabel: "Quelle friction ou projet souhaitez-vous traiter ?",
      problemPlaceholder: "Décrivez vos opérations actuelles, le problème rencontré et les objectifs visés...",
      timelineLabel: "Délai envisagé",
      timelineOptions: [
        "Urgent (moins d'1 mois)",
        "Standard (1 à 3 mois)",
        "Cadrage stratégique (3 mois et +)",
        "À définir ensemble"
      ],
      submitButton: "Envoyer ma demande de projet",
      submitting: "Transmission en cours...",
      successMessage: "Merci ! Votre message a été transmis à l'équipe d'AgenStudio. Nous reviendrons vers vous sous 24 heures.",
      errorMessage: "Veuillez remplir correctement tous les champs obligatoires du formulaire.",
      directEmailText: "Vous préférez un échange direct ? Écrivez-nous à"
    }
  },
  en: {
    nav: {
      home: "Home",
      expertises: "Expertise",
      projects: "Projects",
      studio: "The Studio",
      contact: "Contact",
      ctaButton: "Talk about your project",
      langSwitchLabel: "FR"
    },
    hero: {
      badge: "INDEPENDENT DIGITAL STUDIO",
      title: "Think sharp. Build what matters.",
      subtitle: "Digital systems engineered around your real business operations.",
      description: "AgenStudio transforms scattered processes, repetitive tasks, and disconnected tools into clear, reliable, and scalable business software.",
      primaryCta: "Talk about your project",
      secondaryCta: "View our projects",
      systemNodesLabel: "Operational Flows & Integration Nodes"
    },
    frictions: {
      tag: "BUSINESS FRICTIONS",
      title: "Your business shouldn't rely on an Excel sheet no one dares to edit.",
      subtitle: "We resolve discrete operational bottlenecks that slow down ambitious teams.",
      quote: "Data loss and double entries aren't inevitable: they are architecture flaws.",
      items: [
        {
          title: "Scattered files & double entry",
          description: "Key information floats through emails, manual spreadsheets, and transient messaging apps.",
          impact: "Risk of data loss, inconsistencies, and wasted billable hours."
        },
        {
          title: "Unfit off-the-shelf software",
          description: "Over-engineered or rigid SaaS tools that force your team to adjust their workflow to the software.",
          impact: "Decreased team productivity and low software adoption rates."
        },
        {
          title: "Brittle automations",
          description: "Fragile scripts built without monitoring that break upon the slightest API or schema update.",
          impact: "Unplanned operational downtime and complete lack of audit trails."
        }
      ]
    },
    expertises: {
      tag: "OUR CAPABILITIES",
      title: "Clear engineering focused on field execution",
      subtitle: "Every system is custom-crafted with strict standards of clarity and durability.",
      items: [
        {
          id: "software-engineering",
          title: "Custom Business Software & Mini-ERPs",
          problem: "Niche operational workflows poorly supported by generic market tools.",
          deliverable: "Custom web application centralizing operations, inventory, and approvals.",
          benefit: "Single source of truth and effortless collaboration across teams.",
          example: "Multi-site inventory tracking and logistics management platform."
        },
        {
          id: "process-automation",
          title: "Automations & Data Pipelines",
          problem: "Low-value repetitive tasks consuming precious staff hours daily.",
          deliverable: "Automated processing pipelines, notifications, and real-time synchronization.",
          benefit: "Zero manual error and dozens of qualified hours saved weekly.",
          example: "Automated order validation and compliance report generation."
        },
        {
          id: "systems-integration",
          title: "API Integration & Custom Connectors",
          problem: "Siloed legacy systems unable to exchange data reliably.",
          deliverable: "Secure integration gateways and bi-directional sync mechanisms.",
          benefit: "Unified digital ecosystem with seamless decision-making metrics.",
          example: "Direct connection between billing engines and logistics software."
        },
        {
          id: "web-saas-products",
          title: "Web Applications & SaaS Products",
          problem: "Need to launch a modern, high-performance customer-facing digital product.",
          deliverable: "Full product engineering from UX architecture to frontend and cloud infra.",
          benefit: "Exceptional user experience with cloud infrastructure ready to scale.",
          example: "Bilingual client interface with live operational analytics dashboard."
        }
      ],
      viewDetails: "Learn more about this capability"
    },
    projects: {
      tag: "CASE STUDIES & WORK",
      title: "Tangible evidence of our engineering standards",
      subtitle: "Discover how we turn complex business challenges into precise digital products.",
      viewCaseStudy: "Read case study",
      filterAll: "All projects",
      types: {
        client: "Authorized Client Project",
        internal: "Internal Product",
        rd: "Research & Development",
        concept: "Concept & Prototype"
      }
    },
    method: {
      tag: "AGENSTUDIO METHOD",
      title: "Rigor, clarity, and seamless team adoption",
      subtitle: "A structured development process ensuring tangible operational impact.",
      steps: [
        {
          number: "01",
          title: "Understand",
          description: "Immersion into your actual field operations, workflow mapping, and pinpointing friction bottlenecks.",
          outcome: "Clear functional requirements specification and agreed KPIs."
        },
        {
          number: "02",
          title: "Frame",
          description: "Technical architecture design, design token definition, and wireframing of priority user journeys.",
          outcome: "High-fidelity UI mockups and complete technical specifications."
        },
        {
          number: "03",
          title: "Build",
          description: "Iterative development in strict TypeScript, integration of background automations, and stress testing.",
          outcome: "Clean, secure, performant, and well-documented codebase."
        },
        {
          number: "04",
          title: "Adopt",
          description: "Staged deployment, staff onboarding, and ongoing operational support.",
          outcome: "Rapid user adoption without operational friction or downtime."
        }
      ]
    },
    pov: {
      tag: "OUR POINT OF VIEW",
      title: "Useful technology, designed around field teams",
      subtitle: "We believe in demanding software engineering that solves real problems without useless complexity.",
      cards: [
        {
          title: "Precision over clutter",
          body: "We don't add bloated features. Every screen and line of code must serve a verifiable business goal."
        },
        {
          title: "Sobriety & Performance",
          body: "Fast software is software that gets used. We prioritize lightweight architecture that loads instantly, even on weak connections."
        },
        {
          title: "Client Ownership",
          body: "We build transparent, documented systems that you fully own and control without artificial lock-in."
        }
      ]
    },
    studioIntro: {
      tag: "THE STUDIO",
      title: "Cameroonian roots, global engineering standards",
      description: "Based in Cameroon, AgenStudio is an independent digital studio designing custom software products for ambitious SMEs and organizations. We blend agile responsiveness with world-class engineering standards.",
      anchorage: "Based in Douala & Yaoundé — On-site & Remote interventions.",
      values: [
        {
          title: "Product Culture",
          desc: "Every project is treated as a long-term asset, not a quick disposable deliverable."
        },
        {
          title: "Total Transparency",
          desc: "Clear technical choices explained in plain language, without black boxes."
        },
        {
          title: "Custom Execution",
          desc: "No random template components; every visual and functional detail is intentional."
        }
      ],
      cta: "Discover The Studio"
    },
    finalCta: {
      title: "Ready to clarify and automate your operations?",
      subtitle: "Let's discuss your business challenges and identify the optimal software architecture.",
      button: "Start a project",
      altContact: "Or email us directly at contact@agenstudio.com"
    },
    footer: {
      tagline: "Think sharp. Build what matters.",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      legal: "Legal Notice",
      location: "Douala / Yaoundé, Cameroon"
    },
    contactForm: {
      title: "Start a Conversation",
      subtitle: "Share your operational bottleneck or digital project. We reply within 24 business hours.",
      nameLabel: "Full Name & Position",
      namePlaceholder: "e.g., Jean-Luc Mbarga, Managing Director",
      emailLabel: "Work Email Address",
      emailPlaceholder: "e.g., jl.mbarga@company.cm",
      companyLabel: "Company / Organization Name",
      companyPlaceholder: "e.g., Logistics Central Africa",
      problemLabel: "What friction or project would you like to address?",
      problemPlaceholder: "Describe your current operations, the issue faced, and targeted goals...",
      timelineLabel: "Target Timeline",
      timelineOptions: [
        "Urgent (under 1 month)",
        "Standard (1 to 3 months)",
        "Strategic Framing (3+ months)",
        "To be defined together"
      ],
      submitButton: "Send Project Inquiry",
      submitting: "Sending inquiry...",
      successMessage: "Thank you! Your message has been received by the AgenStudio team. We will get back to you within 24 hours.",
      errorMessage: "Please fill out all required fields correctly before submitting.",
      directEmailText: "Prefer direct communication? Reach out to us at"
    }
  }
};
