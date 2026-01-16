// src/utils/constants.js

export const THEMES = {
  gold: {
    id: "gold",
    name: "Gold Luxury",
    description: "Klassisch elegant mit Gold-Akzenten",
    color: "#d4af37",
  },
  editorial: {
    id: "editorial",
    name: "Editorial",
    description: "Minimalistisch modern in Schwarz/Weiß",
    color: "#000000",
  },
  botanical: {
    id: "botanical",
    name: "Botanical Garden",
    description: "Natürlich organisch mit Grüntönen",
    color: "#7D9D7C",
  },
}

export const PACKAGES = {
  starter: {
    id: "starter",
    name: "Starter",
    price: 990,
    description: "Template-basiertes Design",
    features: [
      "3 Seiten/Komponenten",
      "1 Design-Feedbackrunde",
      "E-Mail-Support",
      "Hosting bis 1 Monat nach Hochzeit",
    ],
    maxComponents: 3,
  },
  signature: {
    id: "signature",
    name: "Signature",
    price: 1800,
    description: "1 Premium-Theme",
    features: [
      "5 Seiten/Komponenten",
      "2 Design-Feedbackrunden",
      "Kick-off-Gespräch (60 Min.)",
      "Hosting bis 3 Monate nach Hochzeit",
    ],
    maxComponents: 5,
    popular: true,
  },
  couture: {
    id: "couture",
    name: "Couture",
    price: 2800,
    description: "Custom-Design",
    features: [
      "Unbegrenzte Seiten/Komponenten",
      "Unlimited Design-Feedbackrunden",
      "2 persönliche Meetings (je 90 Min.)",
      "Hosting bis 6 Monate nach Hochzeit",
    ],
    maxComponents: 999,
  },
  bespoke: {
    id: "bespoke",
    name: "Bespoke",
    price: 3500,
    description: "Vollständig individuell",
    features: [
      "Full-Service Betreuung",
      "Unbegrenzte Meetings",
      "Content-Creation Support",
      "Hosting bis 12 Monate nach Hochzeit",
    ],
    maxComponents: 999,
  },
}

export const STANDARD_COMPONENTS = [
  { id: "navigation", name: "Navigation", disabled: true, alwaysEnabled: true },
  { id: "hero", name: "Hero", disabled: true, alwaysEnabled: true },
  { id: "footer", name: "Footer", disabled: true, alwaysEnabled: true },
  { id: "ablauf", name: "Ablauf", disabled: true, alwaysEnabled: true },
  { id: "countdown", name: "Countdown", disabled: true, alwaysEnabled: true },
]

export const OPTIONAL_COMPONENTS = [
  {
    id: "galerie",
    name: "Galerie",
    description: "Bildergalerie mit mehreren Fotos",
  },
  {
    id: "ueberUns",
    name: "Über das Paar",
    description: "Liebesgeschichte & Fotos",
  },
  {
    id: "rsvp",
    name: "RSVP / Anmeldung",
    description: "Gästeverwaltung mit Formular",
  },
  {
    id: "locations",
    name: "Locations",
    description: "Karten & Wegbeschreibungen",
  },
  { id: "faq", name: "FAQ", description: "Häufig gestellte Fragen" },
  {
    id: "geschenke",
    name: "Geschenkeliste",
    description: "Digitale Wunschliste",
  },
  { id: "abc", name: "Hochzeits-ABC", description: "Alphabetische Infos" },
  {
    id: "zeitplan",
    name: "Zeitplan",
    description: "Detaillierter Tagesablauf",
  },
]

export const PROJECT_STATUS = {
  draft: "Entwurf",
  form_sent: "Formular gesendet",
  form_completed: "Formular ausgefüllt",
  live: "Live",
  archived: "Archiviert",
}
