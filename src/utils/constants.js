// src/utils/constants.js

export const THEMES = {
  video: {
    id: "video",
    name: "Video",
    description: "Cinematisch elegant mit Video-Hero",
    color: "#B8976A",
  },
  editorial: {
    id: "editorial",
    name: "Editorial",
    description: "Minimalistisch modern in Schwarz/Weiß",
    color: "#1A1A1A",
  },
  botanical: {
    id: "botanical",
    name: "Botanical",
    description: "Natürlich organisch mit Grüntönen",
    color: "#7A9972",
  },
  contemporary: {
    id: "contemporary",
    name: "Contemporary",
    description: "Modern & bunt mit klaren Linien",
    color: "#FF6B6B",
  },
  luxe: {
    id: "luxe",
    name: "Luxe",
    description: "Opulent & raffiniert mit Gold-Akzenten",
    color: "#D4AF37",
  },
  neon: {
    id: "neon",
    name: "Neon",
    description: "Mutig & modern mit leuchtenden Akzenten",
    color: "#00FFFF",
  },
}

export const PACKAGES = {
  klassik: {
    id: "klassik",
    name: "Klassik",
    price: 1490,
    description: "Perfekter Einstieg",
    features: [
      "1 Premium-Theme",
      "Basis-Komponenten",
      "1 Feedback-Runde",
      "E-Mail Support",
      "Hosting bis 1 Monat nach Hochzeit",
    ],
    maxOptionalComponents: 2,
  },
  signature: {
    id: "signature",
    name: "Signature",
    price: 2190,
    description: "Unser Bestseller",
    features: [
      "Alle Premium-Themes",
      "Erweiterte Komponenten",
      "2 Feedback-Runden",
      "Kick-off Call (30 Min.)",
      "Hosting bis 3 Monate nach Hochzeit",
    ],
    maxOptionalComponents: 5,
    popular: true,
  },
  couture: {
    id: "couture",
    name: "Couture",
    price: 2990,
    description: "Full-Service Erlebnis",
    features: [
      "Alle Premium-Themes",
      "Alle Komponenten",
      "Unlimited Feedback-Runden",
      "2 persönliche Meetings",
      "Hosting bis 6 Monate nach Hochzeit",
      "Priority Support",
    ],
    maxOptionalComponents: 999,
  },
}

// Immer inklusive - können nicht abgewählt werden
export const CORE_COMPONENTS = [
  { id: "hero", name: "Hero-Section", description: "Eure Willkommens-Sektion mit Namen & Datum" },
  { id: "countdown", name: "Countdown", description: "Animierter Countdown bis zur Hochzeit" },
  { id: "rsvp", name: "RSVP", description: "Online-Zusage mit Gästeverwaltung" },
  { id: "loveStory", name: "Love Story", description: "Eure Liebesgeschichte" },
  { id: "kundenDashboard", name: "Kunden-Dashboard", description: "Verwaltungsbereich für das Brautpaar" },
]

// Optional - je nach Paket begrenzt
export const OPTIONAL_COMPONENTS = [
  { id: "ablauf", name: "Tagesablauf", description: "Timeline mit allen Events des Tages" },
  { id: "locations", name: "Locations", description: "Karten, Adressen & Wegbeschreibungen" },
  { id: "galerie", name: "Galerie", description: "Bildergalerie mit euren schönsten Fotos" },
  { id: "geschenke", name: "Geschenkeliste", description: "Digitale Wunschliste für eure Gäste" },
  { id: "faq", name: "FAQ", description: "Antworten auf häufige Fragen" },
  { id: "unterkunft", name: "Unterkünfte", description: "Hotel-Empfehlungen für eure Gäste" },
  { id: "dresscode", name: "Dresscode", description: "Styling-Guide für eure Gäste" },
  { id: "musik", name: "Musikwünsche", description: "Gäste können Songs vorschlagen" },
  { id: "gaestebuch", name: "Gästebuch", description: "Digitale Glückwünsche sammeln" },
  { id: "trauzeugen", name: "Trauzeugen & Team", description: "Vorstellung eurer wichtigsten Personen" },
  { id: "kontakt", name: "Kontakt", description: "Kontaktmöglichkeit für Rückfragen" },
]

// Add-ons mit Preisen
export const ADDONS = [
  { id: "extraPages", name: "Extra Seiten", price: 150, description: "Zusätzliche individuelle Unterseiten" },
  { id: "printDesign", name: "Print Design", price: 290, description: "Passende Save-the-Date & Einladungskarten" },
  { id: "photoUpload", name: "Foto-Upload", price: 190, description: "Gäste können Fotos hochladen" },
  { id: "liveStream", name: "Livestream Integration", price: 250, description: "Einbettung eures Livestreams" },
  { id: "guestManagement", name: "Erweiterte Gästeverwaltung", price: 290, description: "Tischplan, Menüauswahl, etc." },
  { id: "multiLanguage", name: "Mehrsprachigkeit", price: 350, description: "Website in mehreren Sprachen" },
  { id: "customDomain", name: "Eigene Domain", price: 50, description: "z.B. anna-und-max.de (jährlich)" },
  { id: "extendedHosting", name: "Hosting-Verlängerung", price: 25, description: "Pro zusätzlichem Monat" },
]

export const PROJECT_STATUS = {
  inquiry: "Anfrage",
  contract_sent: "Vertrag gesendet",
  contract_signed: "Vertrag unterschrieben",
  invoice_sent: "Rechnung gesendet",
  paid: "Bezahlt",
  in_progress: "In Bearbeitung",
  review: "Zur Abnahme",
  live: "Live",
  archived: "Archiviert",
}

// Theme-Vorschau-Styles für Admin
export const THEME_PREVIEWS = {
  video: {
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    color: "#B8976A",
    fontFamily: "'Cormorant Garamond', serif",
    text: "S & I",
  },
  editorial: {
    background: "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)",
    color: "#1A1A1A",
    border: "#E0E0E0",
    fontFamily: "'Instrument Serif', serif",
    text: "S & I",
  },
  botanical: {
    background: "linear-gradient(135deg, #FAF9F6 0%, #F0EDE5 100%)",
    color: "#7A9972",
    fontFamily: "'Playfair Display', serif",
    text: "S & I 🌿",
  },
  contemporary: {
    background: "linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 100%)",
    color: "#FF6B6B",
    fontFamily: "'Space Grotesk', sans-serif",
    text: "S & I",
  },
  luxe: {
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    color: "#D4AF37",
    fontFamily: "'Cormorant Garamond', serif",
    text: "S & I",
  },
  neon: {
    background: "linear-gradient(135deg, #0a0a0f 0%, #12121a 100%)",
    color: "#00FFFF",
    fontFamily: "'Space Grotesk', sans-serif",
    text: "S & I",
  },
}

// Admin Credentials (in production würde man das anders lösen)
export const ADMIN_CREDENTIALS = {
  email: "wedding@sarahiver.de",
  password: "Iggy2025!#"
}
