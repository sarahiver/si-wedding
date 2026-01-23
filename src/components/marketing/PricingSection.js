// src/components/marketing/PricingSection.js
import { useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { useTheme } from "../../context/ThemeContext"

// ============================================
// PRICING DATA
// ============================================

const pricingTiers = [
  {
    id: "essential",
    name: "Essential",
    nameDE: "Essentiell",
    price: "1.890",
    subtitle: "Für den perfekten Start",
    features: [
      { text: "4 Komponenten nach Wahl", highlight: false },
      { text: "1 persönliches Beratungsgespräch", highlight: false },
      { text: "1 Revisionsrunde", highlight: false },
      { text: "Hosting bis 1 Monat nach der Hochzeit", highlight: false },
      { text: "Maximale Laufzeit: 7 Monate", highlight: false },
      { text: "Eigene Domain inklusive", highlight: true },
      { text: "SSL-Verschlüsselung", highlight: false },
      { text: "DSGVO-konform", highlight: false },
    ],
    cta: "Paket wählen",
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    nameDE: "Premium",
    price: "2.690",
    subtitle: "Unser Bestseller",
    features: [
      { text: "9 Komponenten nach Wahl", highlight: true },
      { text: "Persönliches Erstgespräch + Feedback-Call", highlight: false },
      { text: "2 Revisionsrunden", highlight: true },
      { text: "Hosting bis 3 Monate nach der Hochzeit", highlight: false },
      { text: "Maximale Laufzeit: 9 Monate", highlight: false },
      { text: "Eigene Domain inklusive", highlight: true },
      { text: "Passwortschutz", highlight: false },
      { text: "Gästemanagement & RSVP", highlight: true },
      { text: "Mehrsprachig (DE/EN)", highlight: false },
    ],
    cta: "Bestseller wählen",
    popular: true,
  },
  {
    id: "luxe",
    name: "Luxe",
    nameDE: "Luxuriös",
    price: "3.890",
    subtitle: "Keine Kompromisse",
    features: [
      { text: "Unbegrenzte Komponenten", highlight: true },
      { text: "So viele Gespräche wie nötig", highlight: true },
      { text: "Unbegrenzte Revisionen", highlight: true },
      { text: "Hosting für 12 Monate", highlight: true },
      { text: "Eigene Domain inklusive", highlight: true },
      { text: "Priority Support", highlight: false },
      { text: "Alle Premium-Features", highlight: false },
      { text: "Dedizierter Ansprechpartner", highlight: true },
      { text: "Express-Lieferung möglich", highlight: false },
    ],
    cta: "Luxe wählen",
    popular: false,
  },
  {
    id: "custom",
    name: "Individuell",
    nameDE: "Individuell",
    price: "Auf Anfrage",
    subtitle: "Maßgeschneidert für euch",
    features: [
      { text: "Alles nach Absprache", highlight: true },
      { text: "Komplexe Anforderungen", highlight: false },
      { text: "Spezielle Integrationen", highlight: false },
      { text: "Individuelle Laufzeiten", highlight: false },
      { text: "Maßgeschneidertes Design", highlight: true },
      { text: "Persönliche Betreuung", highlight: false },
      { text: "Flexible Zahlungsmodelle", highlight: false },
      { text: "Enterprise-Features", highlight: false },
    ],
    cta: "Anfrage senden",
    popular: false,
  },
]

const upsellItems = [
  {
    icon: "💌",
    title: "Einladungskarten",
    description: "Im Design eurer Website",
  },
  {
    icon: "🪑",
    title: "Tischaufsteller",
    description: "Tischkarten & Menükarten",
  },
  {
    icon: "📄",
    title: "Save the Date",
    description: "Digitale & gedruckte Versionen",
  },
  {
    icon: "🎁",
    title: "Weitere Drucksorten",
    description: "Dankeskarten, Programme & mehr",
  },
]

// ============================================
// KEYFRAME ANIMATIONS
// ============================================

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`

const videoShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.3); }
  50% { box-shadow: 0 0 40px rgba(0,255,255,0.5), 0 0 60px rgba(255,0,255,0.3); }
`

const contemporaryBounce = keyframes`
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-8px) rotate(1deg); }
`

// ============================================
// MAIN SECTION
// ============================================

const Section = styled.section`
  padding: 140px 5%;
  position: relative;
  overflow: hidden;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #fafafa;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      background: linear-gradient(180deg, #0a0a0a 0%, #0d0b08 100%);
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #f5f5f5;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: #faf9f7;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: #0a0a0f;
    `}
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`

// ============================================
// PARALLAX BACKGROUNDS
// ============================================

const ParallaxContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`

const ParallaxElement = styled.div`
  position: absolute;
  transform: translateY(${(p) => p.$offset}px);
  transition: transform 0.1s ease-out;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
  bottom: ${(p) => p.$bottom};
`

const EditorialParallaxText = styled(ParallaxElement)`
  font-family: "Instrument Serif", Georgia, serif;
  font-size: ${(p) => p.$size || "300px"};
  font-style: italic;
  color: rgba(0, 0, 0, 0.02);
  line-height: 1;
  white-space: nowrap;
`

const VideoParallaxOrb = styled(ParallaxElement)`
  width: ${(p) => p.$size || "300px"};
  height: ${(p) => p.$size || "300px"};
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.12) 0%,
    transparent 70%
  );
  filter: blur(60px);
`

const BotanicalParallaxPlant = styled(ParallaxElement)`
  font-size: ${(p) => p.$size || "80px"};
  opacity: 0.15;
  animation: ${float} ${(p) => p.$duration || "10s"} ease-in-out infinite;
`

const NeonParallaxLine = styled(ParallaxElement)`
  height: 1px;
  width: ${(p) => p.$width || "400px"};
  background: linear-gradient(
    90deg,
    transparent,
    ${(p) => p.$color || "#00ffff"},
    transparent
  );
  opacity: 0.3;
  box-shadow: 0 0 20px ${(p) => p.$color || "#00ffff"};
`

// ============================================
// HEADER STYLES
// ============================================

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  z-index: 2;
`

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 1rem;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #999;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.75rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #d4af37;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 0.85rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #8b9d83;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      color: #ffffff;
      background: #0d0d0d;
      padding: 8px 20px;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.6rem;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      color: #b4a08c;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #ff00ff;
    `}
`

const Title = styled.h2`
  margin: 0 0 1.5rem 0;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Instrument Serif", Georgia, serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 400;
      font-style: italic;
      color: #1a1a1a;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 300;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(2.2rem, 4vw, 3.5rem);
      font-weight: 400;
      color: #2d3b2d;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: clamp(3rem, 7vw, 5rem);
      font-weight: 700;
      color: #0d0d0d;
      text-transform: uppercase;
      line-height: 0.9;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 300;
      color: #2a2a2a;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      color: #00ffff;
      text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    `}
`

const Subtitle = styled.p`
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 1.1rem;
      color: #666;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.5);
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 1.1rem;
      color: #5a6b5a;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.1rem;
      color: #666;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.9rem;
      color: #888;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.5);
    `}
`

// ============================================
// PRICING GRID
// ============================================

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  margin-bottom: 100px;
  position: relative;
  z-index: 2;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

// ============================================
// EDITORIAL PRICING CARDS
// ============================================

const EditorialCard = styled.div`
  background: #ffffff;
  border: 1px solid ${(p) => (p.$popular ? "#1A1A1A" : "#E0E0E0")};
  padding: 50px 35px;
  position: relative;
  transition: all 0.4s ease;

  ${(p) =>
    p.$popular &&
    css`
      border-width: 2px;
      transform: scale(1.02);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    `}

  &:hover {
    border-color: #1a1a1a;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.12);
  }
`

const EditorialPopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #1a1a1a;
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 20px;
`

const EditorialTierName = styled.h3`
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 1.8rem;
  font-style: italic;
  color: #1a1a1a;
  margin: 0 0 8px 0;
`

const EditorialTierSubtitle = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 25px;
`

const EditorialPrice = styled.div`
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 3rem;
  font-style: italic;
  color: #1a1a1a;
  margin-bottom: 5px;

  span {
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-style: normal;
    color: #999;
  }
`

const EditorialPriceNote = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  color: #999;
  margin-bottom: 30px;
`

const EditorialFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 35px 0;
`

const EditorialFeature = styled.li`
  font-family: "Inter", sans-serif;
  font-size: 0.85rem;
  color: ${(p) => (p.$highlight ? "#1A1A1A" : "#666")};
  font-weight: ${(p) => (p.$highlight ? "600" : "400")};
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "${(p) => (p.$highlight ? "★" : "✓")}";
    color: ${(p) => (p.$highlight ? "#1A1A1A" : "#999")};
  }
`

const EditorialCTA = styled.button`
  width: 100%;
  padding: 18px;
  background: ${(p) => (p.$popular ? "#1A1A1A" : "transparent")};
  color: ${(p) => (p.$popular ? "#FFFFFF" : "#1A1A1A")};
  border: 2px solid #1a1a1a;
  font-family: "Inter", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(p) => (p.$popular ? "#333" : "#1A1A1A")};
    color: #ffffff;
  }
`

// ============================================
// GOLD PRICING CARDS
// ============================================

const VideoCard = styled.div`
  background: ${(p) =>
    p.$popular
      ? "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)"
      : "rgba(255,255,255,0.02)"};
  border: 1px solid
    ${(p) => (p.$popular ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.15)")};
  padding: 50px 35px;
  position: relative;
  transition: all 0.4s ease;

  ${(p) =>
    p.$popular &&
    css`
      transform: scale(1.03);
      box-shadow: 0 0 60px rgba(212, 175, 55, 0.15);

      &::before {
        content: "";
        position: absolute;
        inset: -1px;
        background: linear-gradient(135deg, #d4af37, #f4d03f, #d4af37);
        z-index: -1;
        opacity: 0.3;
      }
    `}

  &:hover {
    border-color: rgba(212, 175, 55, 0.5);
    box-shadow: 0 0 50px rgba(212, 175, 55, 0.2);
  }
`

const VideoPopularBadge = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  background: linear-gradient(90deg, #d4af37, #f4d03f, #d4af37);
  background-size: 200% auto;
  animation: ${videoShimmer} 3s linear infinite;
  color: #0a0a0a;
  font-family: "Montserrat", sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 10px;
  text-align: center;
`

const VideoTierName = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 2rem;
  font-weight: 300;
  color: #ffffff;
  margin: ${(p) => (p.$popular ? "20px 0 8px 0" : "0 0 8px 0")};
`

const VideoTierSubtitle = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 25px;
`

const VideoPrice = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 3.5rem;
  font-weight: 300;
  background: linear-gradient(135deg, #d4af37, #f4d03f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 5px;

  span {
    font-family: "Montserrat", sans-serif;
    font-size: 0.9rem;
    -webkit-text-fill-color: rgba(255, 255, 255, 0.4);
  }
`

const VideoPriceNote = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.1em;
  margin-bottom: 30px;
`

const VideoFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 35px 0;
`

const VideoFeature = styled.li`
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  color: ${(p) => (p.$highlight ? "#D4AF37" : "rgba(255,255,255,0.6)")};
  padding: 10px 0;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "${(p) => (p.$highlight ? "✦" : "·")}";
    color: #d4af37;
  }
`

const VideoCTA = styled.button`
  width: 100%;
  padding: 18px;
  background: ${(p) =>
    p.$popular ? "linear-gradient(135deg, #D4AF37, #F4D03F)" : "transparent"};
  color: ${(p) => (p.$popular ? "#0A0A0A" : "#D4AF37")};
  border: 1px solid #d4af37;
  font-family: "Montserrat", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #d4af37, #f4d03f);
    color: #0a0a0a;
  }
`

// ============================================
// BOTANICAL PRICING CARDS
// ============================================

const BotanicalCard = styled.div`
  background: ${(p) => (p.$popular ? "#2D3B2D" : "#F8F6F0")};
  border-radius: 30px;
  padding: 50px 35px;
  position: relative;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${(p) =>
    p.$popular
      ? "0 30px 80px rgba(45,59,45,0.25)"
      : "0 10px 40px rgba(45,59,45,0.08)"};

  ${(p) =>
    p.$popular &&
    css`
      transform: scale(1.03);
    `}

  &:hover {
    transform: translateY(-10px) ${(p) => (p.$popular ? "scale(1.03)" : "")};
    box-shadow: 0 30px 80px rgba(45, 59, 45, 0.2);
  }
`

const BotanicalPopularBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: #8b9d83;
  color: #ffffff;
  font-family: "Lato", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 8px 25px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "🌟";
  }
`

const BotanicalTierName = styled.h3`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.8rem;
  color: ${(p) => (p.$popular ? "#FFFFFF" : "#2D3B2D")};
  margin: 0 0 8px 0;
`

const BotanicalTierSubtitle = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 0.85rem;
  color: ${(p) => (p.$popular ? "rgba(255,255,255,0.6)" : "#8B9D83")};
  margin-bottom: 25px;
`

const BotanicalPrice = styled.div`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 3rem;
  color: ${(p) => (p.$popular ? "#FFFFFF" : "#2D3B2D")};
  margin-bottom: 5px;

  span {
    font-family: "Lato", sans-serif;
    font-size: 1rem;
    color: ${(p) => (p.$popular ? "rgba(255,255,255,0.5)" : "#8B9D83")};
  }
`

const BotanicalPriceNote = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 0.75rem;
  color: ${(p) => (p.$popular ? "rgba(255,255,255,0.4)" : "#8B9D83")};
  margin-bottom: 30px;
`

const BotanicalFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 35px 0;
`

const BotanicalFeature = styled.li`
  font-family: "Lato", sans-serif;
  font-size: 0.9rem;
  color: ${(p) =>
    p.$popular
      ? p.$highlight
        ? "#FFFFFF"
        : "rgba(255,255,255,0.7)"
      : p.$highlight
        ? "#2D3B2D"
        : "#5A6B5A"};
  font-weight: ${(p) => (p.$highlight ? "600" : "400")};
  padding: 10px 0;
  border-bottom: 1px solid
    ${(p) => (p.$popular ? "rgba(255,255,255,0.1)" : "rgba(45,59,45,0.1)")};
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "${(p) => (p.$highlight ? "✿" : "·")}";
    color: ${(p) => (p.$popular ? "#8B9D83" : "#8B9D83")};
  }
`

const BotanicalCTA = styled.button`
  width: 100%;
  padding: 18px;
  background: ${(p) => (p.$popular ? "#FFFFFF" : "#2D3B2D")};
  color: ${(p) => (p.$popular ? "#2D3B2D" : "#FFFFFF")};
  border: none;
  border-radius: 50px;
  font-family: "Lato", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 30px rgba(45, 59, 45, 0.2);
  }
`

// ============================================
// CONTEMPORARY PRICING CARDS
// ============================================

const ContemporaryCard = styled.div`
  background: ${(p) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#AA96DA"]
    return p.$popular ? "#0D0D0D" : colors[p.$index % colors.length]
  }};
  padding: 50px 35px;
  border: 4px solid #0d0d0d;
  box-shadow: ${(p) =>
    p.$popular ? "12px 12px 0 #FF6B6B" : "8px 8px 0 #0D0D0D"};
  position: relative;
  transition: all 0.3s ease;
  animation: ${(p) =>
    !p.$popular &&
    css`
      ${contemporaryBounce} ${4 + p.$index * 0.5}s ease-in-out infinite
    `};

  ${(p) =>
    p.$popular &&
    css`
      transform: scale(1.02);
    `}

  &:hover {
    transform: translate(-4px, -4px) ${(p) => (p.$popular ? "scale(1.02)" : "")};
    box-shadow: ${(p) =>
      p.$popular ? "16px 16px 0 #FF6B6B" : "12px 12px 0 #0D0D0D"};
    animation-play-state: paused;
  }
`

const ContemporaryPopularBadge = styled.div`
  position: absolute;
  top: -20px;
  right: 20px;
  background: #ff6b6b;
  color: #ffffff;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 10px 20px;
  transform: rotate(3deg);
`

const ContemporaryTierName = styled.h3`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(p) => (p.$popular ? "#FFFFFF" : "#0D0D0D")};
  text-transform: uppercase;
  margin: 0 0 8px 0;
`

const ContemporaryTierSubtitle = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.85rem;
  color: ${(p) => (p.$popular ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")};
  margin-bottom: 25px;
`

const ContemporaryPrice = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: ${(p) => (p.$popular ? "#FF6B6B" : "#0D0D0D")};
  margin-bottom: 5px;

  span {
    font-size: 1rem;
    color: ${(p) => (p.$popular ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")};
  }
`

const ContemporaryPriceNote = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.75rem;
  color: ${(p) => (p.$popular ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)")};
  margin-bottom: 30px;
`

const ContemporaryFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 35px 0;
`

const ContemporaryFeature = styled.li`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.85rem;
  color: ${(p) => (p.$popular ? "#FFFFFF" : "#0D0D0D")};
  font-weight: ${(p) => (p.$highlight ? "700" : "400")};
  padding: 10px 0;
  border-bottom: 2px solid
    ${(p) => (p.$popular ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")};

  &::before {
    content: "${(p) => (p.$highlight ? "→ " : "· ")}";
  }
`

const ContemporaryCTA = styled.button`
  width: 100%;
  padding: 18px;
  background: ${(p) => (p.$popular ? "#FF6B6B" : "#0D0D0D")};
  color: #ffffff;
  border: none;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`

// ============================================
// LUXE PRICING CARDS
// ============================================

const LuxeCard = styled.div`
  background: ${(p) => (p.$popular ? "#2A2A2A" : "#FFFFFF")};
  border: 1px solid ${(p) => (p.$popular ? "#B4A08C" : "rgba(180,160,140,0.2)")};
  padding: 50px 35px;
  position: relative;
  transition: all 0.4s ease;

  ${(p) =>
    p.$popular &&
    css`
      transform: scale(1.02);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
    `}

  &:hover {
    border-color: #b4a08c;
  }
`

const LuxePopularBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #b4a08c, #d4c4b0, #b4a08c);
`

const LuxeTierName = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.8rem;
  font-weight: 300;
  color: ${(p) => (p.$popular ? "#FFFFFF" : "#2A2A2A")};
  margin: 0 0 8px 0;
`

const LuxeTierSubtitle = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${(p) => (p.$popular ? "rgba(255,255,255,0.4)" : "#B4A08C")};
  margin-bottom: 25px;
`

const LuxePrice = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 3rem;
  font-weight: 300;
  color: ${(p) => (p.$popular ? "#B4A08C" : "#2A2A2A")};
  margin-bottom: 5px;

  span {
    font-family: "Montserrat", sans-serif;
    font-size: 0.85rem;
    color: ${(p) => (p.$popular ? "rgba(255,255,255,0.4)" : "#888")};
  }
`

const LuxePriceNote = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: ${(p) => (p.$popular ? "rgba(255,255,255,0.3)" : "#B4A08C")};
  margin-bottom: 30px;
`

const LuxeFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 35px 0;
`

const LuxeFeature = styled.li`
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  color: ${(p) =>
    p.$popular
      ? p.$highlight
        ? "#B4A08C"
        : "rgba(255,255,255,0.6)"
      : p.$highlight
        ? "#2A2A2A"
        : "#888"};
  padding: 10px 0;
  border-bottom: 1px solid
    ${(p) => (p.$popular ? "rgba(255,255,255,0.05)" : "rgba(180,160,140,0.1)")};
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "${(p) => (p.$highlight ? "—" : "·")}";
    color: #b4a08c;
  }
`

const LuxeCTA = styled.button`
  width: 100%;
  padding: 18px;
  background: ${(p) => (p.$popular ? "#B4A08C" : "transparent")};
  color: ${(p) => (p.$popular ? "#FFFFFF" : "#2A2A2A")};
  border: 1px solid ${(p) => (p.$popular ? "#B4A08C" : "rgba(180,160,140,0.3)")};
  font-family: "Montserrat", sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(p) => (p.$popular ? "#9A8A7C" : "#2A2A2A")};
    color: #ffffff;
    border-color: ${(p) => (p.$popular ? "#9A8A7C" : "#2A2A2A")};
  }
`

// ============================================
// NEON PRICING CARDS
// ============================================

const NeonCard = styled.div`
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid ${(p) => (p.$popular ? "#00ffff" : "rgba(0,255,255,0.2)")};
  padding: 50px 35px;
  position: relative;
  transition: all 0.3s ease;

  ${(p) =>
    p.$popular &&
    css`
      animation: ${neonPulse} 3s ease-in-out infinite;

      &::before {
        content: "";
        position: absolute;
        inset: -2px;
        background: linear-gradient(135deg, #00ffff, #ff00ff);
        z-index: -1;
        opacity: 0.3;
        filter: blur(10px);
      }
    `}

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.2);
  }
`

const NeonPopularBadge = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  background: linear-gradient(90deg, #00ffff, #ff00ff);
  color: #0a0a0f;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 10px;
  text-align: center;
`

const NeonTierName = styled.h3`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(p) => (p.$popular ? "#00ffff" : "#FFFFFF")};
  text-shadow: ${(p) => (p.$popular ? "0 0 10px rgba(0,255,255,0.5)" : "none")};
  margin: ${(p) => (p.$popular ? "20px 0 8px 0" : "0 0 8px 0")};
`

const NeonTierSubtitle = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 25px;
`

const NeonPrice = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: ${(p) => (p.$popular ? "#ff00ff" : "#00ffff")};
  text-shadow: 0 0 20px
    ${(p) => (p.$popular ? "rgba(255,0,255,0.5)" : "rgba(0,255,255,0.5)")};
  margin-bottom: 5px;

  span {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.4);
    text-shadow: none;
  }
`

const NeonPriceNote = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 30px;
`

const NeonFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 35px 0;
`

const NeonFeature = styled.li`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.8rem;
  color: ${(p) => (p.$highlight ? "#00ffff" : "rgba(255,255,255,0.6)")};
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);

  &::before {
    content: "${(p) => (p.$highlight ? "▸ " : "· ")}";
    color: ${(p) => (p.$highlight ? "#ff00ff" : "#00ffff")};
  }
`

const NeonCTA = styled.button`
  width: 100%;
  padding: 18px;
  background: ${(p) => (p.$popular ? "#00ffff" : "transparent")};
  color: ${(p) => (p.$popular ? "#0a0a0f" : "#00ffff")};
  border: 1px solid #00ffff;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${(p) => (p.$popular ? "0 0 30px rgba(0,255,255,0.3)" : "none")};

  &:hover {
    background: #00ffff;
    color: #0a0a0f;
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.5);
  }
`

// ============================================
// UPSELL SECTION
// ============================================

const UpsellSection = styled.div`
  position: relative;
  z-index: 2;
  padding: 60px;
  text-align: center;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #ffffff;
      border: 1px solid #e0e0e0;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      background: rgba(212, 175, 55, 0.03);
      border: 1px solid rgba(212, 175, 55, 0.2);
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: #f8f6f0;
      border-radius: 40px;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #0d0d0d;
      border: 4px solid #0d0d0d;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: transparent;
      border-top: 1px solid rgba(180, 160, 140, 0.2);
      border-bottom: 1px solid rgba(180, 160, 140, 0.2);
      padding: 80px 60px;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: rgba(255, 0, 255, 0.03);
      border: 1px solid rgba(255, 0, 255, 0.2);
    `}
`

const UpsellTitle = styled.h3`
  margin: 0 0 15px 0;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Instrument Serif", Georgia, serif;
      font-size: 2rem;
      font-style: italic;
      color: #1a1a1a;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 2rem;
      font-weight: 300;
      color: #d4af37;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Playfair Display", Georgia, serif;
      font-size: 1.8rem;
      color: #2d3b2d;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 2rem;
      font-weight: 700;
      color: #ffffff;
      text-transform: uppercase;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.8rem;
      font-weight: 300;
      color: #2a2a2a;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.8rem;
      font-weight: 700;
      color: #ff00ff;
      text-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
    `}
`

const UpsellSubtitle = styled.p`
  margin: 0 0 40px 0;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 1rem;
      color: #666;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.5);
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 1rem;
      color: #5a6b5a;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.6);
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.8rem;
      color: #888;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.5);
    `}
`

const UpsellGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const UpsellItem = styled.div`
  text-align: center;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      .icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }
      .title {
        font-family: "Instrument Serif", Georgia, serif;
        font-size: 1.2rem;
        font-style: italic;
        color: #1a1a1a;
        margin: 0 0 5px 0;
      }
      .desc {
        font-family: "Inter", sans-serif;
        font-size: 0.8rem;
        color: #999;
      }
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      .icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
        filter: grayscale(100%) sepia(100%) saturate(300%);
      }
      .title {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 1.2rem;
        color: #ffffff;
        margin: 0 0 5px 0;
      }
      .desc {
        font-family: "Montserrat", sans-serif;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.4);
      }
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      .icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }
      .title {
        font-family: "Playfair Display", Georgia, serif;
        font-size: 1.1rem;
        color: #2d3b2d;
        margin: 0 0 5px 0;
      }
      .desc {
        font-family: "Lato", sans-serif;
        font-size: 0.85rem;
        color: #8b9d83;
      }
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: ${["#FF6B6B", "#4ECDC4", "#FFE66D", "#AA96DA"][p.$index % 4]};
      padding: 30px 20px;
      border: 3px solid #0d0d0d;
      .icon {
        font-size: 2rem;
        margin-bottom: 10px;
      }
      .title {
        font-family: "Space Grotesk", sans-serif;
        font-size: 1rem;
        font-weight: 700;
        color: #0d0d0d;
        text-transform: uppercase;
        margin: 0 0 5px 0;
      }
      .desc {
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.75rem;
        color: rgba(0, 0, 0, 0.6);
      }
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      .icon {
        font-size: 2rem;
        margin-bottom: 15px;
        opacity: 0.7;
      }
      .title {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 1.2rem;
        color: #2a2a2a;
        margin: 0 0 5px 0;
      }
      .desc {
        font-family: "Montserrat", sans-serif;
        font-size: 0.7rem;
        color: #b4a08c;
      }
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      border: 1px solid rgba(0, 255, 255, 0.2);
      padding: 25px 20px;
      .icon {
        font-size: 2rem;
        margin-bottom: 10px;
      }
      .title {
        font-family: "Space Grotesk", sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: #00ffff;
        margin: 0 0 5px 0;
      }
      .desc {
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.5);
      }
    `}
`

// ============================================
// MAIN COMPONENT
// ============================================

function PricingSection() {
  const { currentTheme } = useTheme()
  const sectionRef = useRef(null)
  const [parallaxOffset, setParallaxOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollProgress = -rect.top / window.innerHeight
        setParallaxOffset(scrollProgress * 80)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Render parallax backgrounds
  const renderParallax = () => {
    switch (currentTheme) {
      case "editorial":
        return (
          <ParallaxContainer>
            <EditorialParallaxText
              $top='10%'
              $left='-5%'
              $size='400px'
              $offset={parallaxOffset * 0.3}
            >
              €
            </EditorialParallaxText>
            <EditorialParallaxText
              $top='50%'
              $right='-10%'
              $size='300px'
              $offset={parallaxOffset * 0.5}
            >
              Premium
            </EditorialParallaxText>
          </ParallaxContainer>
        )
      case "video":
        return (
          <ParallaxContainer>
            <VideoParallaxOrb
              $top='5%'
              $left='10%'
              $size='400px'
              $offset={parallaxOffset * 0.4}
            />
            <VideoParallaxOrb
              $top='40%'
              $right='5%'
              $size='300px'
              $offset={parallaxOffset * 0.6}
            />
            <VideoParallaxOrb
              $top='70%'
              $left='30%'
              $size='350px'
              $offset={parallaxOffset * 0.3}
            />
          </ParallaxContainer>
        )
      case "botanical":
        return (
          <ParallaxContainer>
            <BotanicalParallaxPlant
              $top='5%'
              $left='5%'
              $size='80px'
              $offset={parallaxOffset * 0.4}
            >
              🌿
            </BotanicalParallaxPlant>
            <BotanicalParallaxPlant
              $top='30%'
              $right='8%'
              $size='60px'
              $offset={parallaxOffset * 0.6}
            >
              🌸
            </BotanicalParallaxPlant>
            <BotanicalParallaxPlant
              $bottom='20%'
              $left='10%'
              $size='70px'
              $offset={parallaxOffset * 0.5}
            >
              🌺
            </BotanicalParallaxPlant>
          </ParallaxContainer>
        )
      case "neon":
        return (
          <ParallaxContainer>
            <NeonParallaxLine
              $top='15%'
              $left='0'
              $width='50%'
              $offset={parallaxOffset * 0.4}
              $color='#00ffff'
            />
            <NeonParallaxLine
              $top='45%'
              $right='0'
              $width='40%'
              $offset={parallaxOffset * 0.6}
              $color='#ff00ff'
            />
            <NeonParallaxLine
              $top='75%'
              $left='20%'
              $width='60%'
              $offset={parallaxOffset * 0.3}
              $color='#00ffff'
            />
          </ParallaxContainer>
        )
      default:
        return null
    }
  }

  // Render pricing cards based on theme
  const renderPricingCard = (tier, index) => {
    const priceDisplay =
      tier.price === "Auf Anfrage" ? tier.price : `€${tier.price}`

    switch (currentTheme) {
      case "editorial":
        return (
          <EditorialCard key={tier.id} $popular={tier.popular}>
            {tier.popular && (
              <EditorialPopularBadge>Bestseller</EditorialPopularBadge>
            )}
            <EditorialTierName>{tier.name}</EditorialTierName>
            <EditorialTierSubtitle>{tier.subtitle}</EditorialTierSubtitle>
            <EditorialPrice>
              {priceDisplay}
              {tier.price !== "Auf Anfrage" && <span> einmalig</span>}
            </EditorialPrice>
            <EditorialPriceNote>zzgl. MwSt.</EditorialPriceNote>
            <EditorialFeatures>
              {tier.features.map((f, i) => (
                <EditorialFeature key={i} $highlight={f.highlight}>
                  {f.text}
                </EditorialFeature>
              ))}
            </EditorialFeatures>
            <EditorialCTA $popular={tier.popular}>{tier.cta}</EditorialCTA>
          </EditorialCard>
        )

      case "video":
        return (
          <VideoCard key={tier.id} $popular={tier.popular}>
            {tier.popular && (
              <VideoPopularBadge>✦ Bestseller ✦</VideoPopularBadge>
            )}
            <VideoTierName $popular={tier.popular}>{tier.name}</VideoTierName>
            <VideoTierSubtitle>{tier.subtitle}</VideoTierSubtitle>
            <VideoPrice>
              {priceDisplay}
              {tier.price !== "Auf Anfrage" && <span> einmalig</span>}
            </VideoPrice>
            <VideoPriceNote>zzgl. MwSt.</VideoPriceNote>
            <VideoFeatures>
              {tier.features.map((f, i) => (
                <VideoFeature key={i} $highlight={f.highlight}>
                  {f.text}
                </VideoFeature>
              ))}
            </VideoFeatures>
            <VideoCTA $popular={tier.popular}>{tier.cta}</VideoCTA>
          </VideoCard>
        )

      case "botanical":
        return (
          <BotanicalCard key={tier.id} $popular={tier.popular}>
            {tier.popular && (
              <BotanicalPopularBadge>Bestseller</BotanicalPopularBadge>
            )}
            <BotanicalTierName $popular={tier.popular}>
              {tier.name}
            </BotanicalTierName>
            <BotanicalTierSubtitle $popular={tier.popular}>
              {tier.subtitle}
            </BotanicalTierSubtitle>
            <BotanicalPrice $popular={tier.popular}>
              {priceDisplay}
              {tier.price !== "Auf Anfrage" && <span> einmalig</span>}
            </BotanicalPrice>
            <BotanicalPriceNote $popular={tier.popular}>
              zzgl. MwSt.
            </BotanicalPriceNote>
            <BotanicalFeatures>
              {tier.features.map((f, i) => (
                <BotanicalFeature
                  key={i}
                  $highlight={f.highlight}
                  $popular={tier.popular}
                >
                  {f.text}
                </BotanicalFeature>
              ))}
            </BotanicalFeatures>
            <BotanicalCTA $popular={tier.popular}>{tier.cta}</BotanicalCTA>
          </BotanicalCard>
        )

      case "contemporary":
        return (
          <ContemporaryCard
            key={tier.id}
            $popular={tier.popular}
            $index={index}
          >
            {tier.popular && (
              <ContemporaryPopularBadge>★ Bestseller</ContemporaryPopularBadge>
            )}
            <ContemporaryTierName $popular={tier.popular}>
              {tier.name}
            </ContemporaryTierName>
            <ContemporaryTierSubtitle $popular={tier.popular}>
              {tier.subtitle}
            </ContemporaryTierSubtitle>
            <ContemporaryPrice $popular={tier.popular}>
              {priceDisplay}
              {tier.price !== "Auf Anfrage" && <span> einmalig</span>}
            </ContemporaryPrice>
            <ContemporaryPriceNote $popular={tier.popular}>
              zzgl. MwSt.
            </ContemporaryPriceNote>
            <ContemporaryFeatures>
              {tier.features.map((f, i) => (
                <ContemporaryFeature
                  key={i}
                  $highlight={f.highlight}
                  $popular={tier.popular}
                >
                  {f.text}
                </ContemporaryFeature>
              ))}
            </ContemporaryFeatures>
            <ContemporaryCTA $popular={tier.popular}>
              {tier.cta}
            </ContemporaryCTA>
          </ContemporaryCard>
        )

      case "luxe":
        return (
          <LuxeCard key={tier.id} $popular={tier.popular}>
            {tier.popular && <LuxePopularBadge />}
            <LuxeTierName $popular={tier.popular}>{tier.name}</LuxeTierName>
            <LuxeTierSubtitle $popular={tier.popular}>
              {tier.subtitle}
            </LuxeTierSubtitle>
            <LuxePrice $popular={tier.popular}>
              {priceDisplay}
              {tier.price !== "Auf Anfrage" && <span> einmalig</span>}
            </LuxePrice>
            <LuxePriceNote $popular={tier.popular}>zzgl. MwSt.</LuxePriceNote>
            <LuxeFeatures>
              {tier.features.map((f, i) => (
                <LuxeFeature
                  key={i}
                  $highlight={f.highlight}
                  $popular={tier.popular}
                >
                  {f.text}
                </LuxeFeature>
              ))}
            </LuxeFeatures>
            <LuxeCTA $popular={tier.popular}>{tier.cta}</LuxeCTA>
          </LuxeCard>
        )

      case "neon":
        return (
          <NeonCard key={tier.id} $popular={tier.popular}>
            {tier.popular && (
              <NeonPopularBadge>{"// BESTSELLER"}</NeonPopularBadge>
            )}
            <NeonTierName $popular={tier.popular}>{tier.name}</NeonTierName>
            <NeonTierSubtitle>{tier.subtitle}</NeonTierSubtitle>
            <NeonPrice $popular={tier.popular}>
              {priceDisplay}
              {tier.price !== "Auf Anfrage" && <span> einmalig</span>}
            </NeonPrice>
            <NeonPriceNote>zzgl. MwSt.</NeonPriceNote>
            <NeonFeatures>
              {tier.features.map((f, i) => (
                <NeonFeature key={i} $highlight={f.highlight}>
                  {f.text}
                </NeonFeature>
              ))}
            </NeonFeatures>
            <NeonCTA $popular={tier.popular}>{tier.cta}</NeonCTA>
          </NeonCard>
        )

      default:
        return null
    }
  }

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id='pricing'>
      {renderParallax()}

      <Container>
        <Header>
          <Eyebrow $themeId={currentTheme}>Preise</Eyebrow>
          <Title $themeId={currentTheme}>
            {currentTheme === "contemporary"
              ? "CHOOSE YOUR PLAN"
              : currentTheme === "neon"
                ? "SELECT PACKAGE"
                : "Transparente Preise"}
          </Title>
          <Subtitle $themeId={currentTheme}>
            Investiert in eine Website, die so einzigartig ist wie eure Liebe.
            Alle Pakete beinhalten eure eigene Domain.
          </Subtitle>
        </Header>

        <PricingGrid>
          {pricingTiers.map((tier, index) => renderPricingCard(tier, index))}
        </PricingGrid>

        {/* Upsell Section */}
        <UpsellSection $themeId={currentTheme}>
          <UpsellTitle $themeId={currentTheme}>
            {currentTheme === "contemporary"
              ? "PRINT ADD-ONS"
              : "Passende Drucksorten"}
          </UpsellTitle>
          <UpsellSubtitle $themeId={currentTheme}>
            Erweitert euer digitales Erlebnis mit physischen Produkten im
            gleichen Design.
          </UpsellSubtitle>
          <UpsellGrid>
            {upsellItems.map((item, index) => (
              <UpsellItem key={index} $themeId={currentTheme} $index={index}>
                <div className='icon'>{item.icon}</div>
                <h4 className='title'>{item.title}</h4>
                <p className='desc'>{item.description}</p>
              </UpsellItem>
            ))}
          </UpsellGrid>
        </UpsellSection>
      </Container>
    </Section>
  )
}

export default PricingSection
