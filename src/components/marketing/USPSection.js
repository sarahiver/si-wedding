// src/components/marketing/USPSection.js
import { useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { useTheme } from "../../context/ThemeContext"

// ============================================
// 10 PREMIUM USPs
// ============================================

const usps = [
  {
    id: 1,
    icon: "🌐",
    title: "Eure eigene Domain",
    subtitle: "sarah-und-thomas.de",
    description:
      "Keine kryptischen URLs – eure Hochzeitswebsite läuft auf eurer persönlichen Domain, die ihr behaltet.",
    highlight: "Inklusive",
  },
  {
    id: 2,
    icon: "🎨",
    title: "100% individuelles Design",
    subtitle: "Kein Template",
    description:
      "Jede Website wird von Grund auf für euch gestaltet. Keine zwei Paare haben die gleiche Seite.",
    highlight: "Maßgeschneidert",
  },
  {
    id: 3,
    icon: "👤",
    title: "Persönliche Beratung",
    subtitle: "Kein Chatbot",
    description:
      "Direkter Kontakt zu eurem Designer. Wir verstehen eure Vision und setzen sie perfekt um.",
    highlight: "1:1 Betreuung",
  },
  {
    id: 4,
    icon: "🔒",
    title: "Passwortgeschützt",
    subtitle: "Nur für eure Gäste",
    description:
      "Eure Hochzeitsdetails bleiben privat. Nur eingeladene Gäste haben Zugang zur Website.",
    highlight: "Sicher",
  },
  {
    id: 5,
    icon: "🇩🇪",
    title: "DSGVO-konform",
    subtitle: "Deutsche Server",
    description:
      "Hosting in Deutschland, volle Datenschutz-Konformität. Eure Gästedaten sind sicher.",
    highlight: "Datenschutz",
  },
  {
    id: 6,
    icon: "♾️",
    title: "Unbegrenzte Gäste",
    subtitle: "Keine Limits",
    description:
      "Ob 50 oder 500 Gäste – keine künstlichen Beschränkungen, keine versteckten Kosten.",
    highlight: "Unlimited",
  },
  {
    id: 7,
    icon: "🌍",
    title: "Mehrsprachig",
    subtitle: "Für internationale Gäste",
    description:
      "Automatische Sprachumschaltung für Gäste aus aller Welt. DE, EN, FR und mehr.",
    highlight: "Global",
  },
  {
    id: 8,
    icon: "📱",
    title: "Perfekt auf jedem Gerät",
    subtitle: "Mobile-First Design",
    description:
      "Responsive Design, das auf Smartphone, Tablet und Desktop gleichermaßen beeindruckt.",
    highlight: "Responsive",
  },
  {
    id: 9,
    icon: "⚡",
    title: "Blitzschnelles Hosting",
    subtitle: "Premium Performance",
    description:
      "Enterprise-Hosting für Ladezeiten unter 2 Sekunden. Auch bei vielen gleichzeitigen Besuchern.",
    highlight: "High-Speed",
  },
  {
    id: 10,
    icon: "💎",
    title: "Support bis nach der Hochzeit",
    subtitle: "Lifetime Care",
    description:
      "Wir begleiten euch vom ersten Entwurf bis nach dem großen Tag. Änderungen jederzeit möglich.",
    highlight: "Full Service",
  },
]

// ============================================
// KEYFRAME ANIMATIONS
// ============================================

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
`

const goldShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const neonGlow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(0,255,255,0.3), 0 0 10px rgba(0,255,255,0.2); }
  50% { box-shadow: 0 0 20px rgba(0,255,255,0.5), 0 0 30px rgba(0,255,255,0.3); }
`

const scanLine = keyframes`
  0% { top: -10%; }
  100% { top: 110%; }
`

const contemporaryBounce = keyframes`
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-15px) rotate(3deg); }
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
      background: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      background: #0a0a0a;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: #f8f6f0;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #0d0d0d;
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
// PARALLAX BACKGROUND ELEMENTS
// ============================================

const ParallaxContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`

// Editorial Parallax - Large Numbers
const EditorialParallaxNumber = styled.div`
  position: absolute;
  font-family: "Instrument Serif", Georgia, serif;
  font-size: ${(p) => p.$size || "400px"};
  font-style: italic;
  color: rgba(0, 0, 0, 0.02);
  line-height: 1;
  transform: translateY(${(p) => p.$offset}px);
  transition: transform 0.1s ease-out;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
`

// Gold Parallax - Glowing Orbs
const GoldParallaxOrb = styled.div`
  position: absolute;
  width: ${(p) => p.$size || "300px"};
  height: ${(p) => p.$size || "300px"};
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.15) 0%,
    transparent 70%
  );
  filter: blur(60px);
  transform: translateY(${(p) => p.$offset}px);
  transition: transform 0.1s ease-out;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
  animation: ${pulse} ${(p) => p.$duration || "8s"} ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || "0s"};
`

// Botanical Parallax - Floating Plants
const BotanicalParallaxPlant = styled.div`
  position: absolute;
  font-size: ${(p) => p.$size || "80px"};
  opacity: ${(p) => p.$opacity || 0.15};
  transform: translateY(${(p) => p.$offset}px)
    rotate(${(p) => p.$rotate || "0deg"});
  transition: transform 0.1s ease-out;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
  bottom: ${(p) => p.$bottom};
  animation: ${float} ${(p) => p.$duration || "10s"} ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || "0s"};
`

// Contemporary Parallax - Geometric Shapes
const ContemporaryParallaxShape = styled.div`
  position: absolute;
  width: ${(p) => p.$size || "200px"};
  height: ${(p) => p.$size || "200px"};
  border: 4px solid ${(p) => p.$color || "rgba(255,255,255,0.1)"};
  border-radius: ${(p) => (p.$round ? "50%" : "0")};
  transform: translateY(${(p) => p.$offset}px)
    rotate(${(p) => p.$rotate || "0deg"});
  transition: transform 0.1s ease-out;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
`

// Luxe Parallax - Subtle Lines
const LuxeParallaxLine = styled.div`
  position: absolute;
  height: 1px;
  width: ${(p) => p.$width || "300px"};
  background: linear-gradient(
    90deg,
    transparent,
    rgba(180, 160, 140, 0.3),
    transparent
  );
  transform: translateY(${(p) => p.$offset}px);
  transition: transform 0.1s ease-out;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
`

// Neon Parallax - Glowing Lines
const NeonParallaxLine = styled.div`
  position: absolute;
  height: 2px;
  width: ${(p) => p.$width || "400px"};
  background: linear-gradient(
    90deg,
    transparent,
    ${(p) => p.$color || "#00ffff"},
    transparent
  );
  opacity: 0.3;
  transform: translateY(${(p) => p.$offset}px);
  transition: transform 0.1s ease-out;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
  box-shadow: 0 0 20px ${(p) => p.$color || "#00ffff"};
`

const NeonParallaxGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  transform: perspective(500px) rotateX(60deg) translateY(${(p) => p.$offset}px);
  transform-origin: center top;
  transition: transform 0.1s ease-out;
`

// ============================================
// HEADER STYLES
// ============================================

const Header = styled.div`
  margin-bottom: 80px;
  position: relative;
  z-index: 2;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      text-align: left;
      max-width: 600px;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      text-align: center;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      text-align: center;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      text-align: center;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      text-align: center;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      text-align: center;
    `}
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
    p.$themeId === "gold" &&
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
      color: #ff6b6b;
      background: #ff6b6b;
      color: #ffffff;
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
    p.$themeId === "gold" &&
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
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 700;
      color: #ffffff;
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
  line-height: 1.7;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 1.1rem;
      color: #666;
      margin: 0;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.5);
      max-width: 600px;
      margin: 0 auto;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 1.1rem;
      color: #5a6b5a;
      max-width: 600px;
      margin: 0 auto;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.6);
      max-width: 600px;
      margin: 0 auto;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.9rem;
      color: #888;
      max-width: 500px;
      margin: 0 auto;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.5);
      max-width: 600px;
      margin: 0 auto;
    `}
`

// ============================================
// EDITORIAL THEME - Horizontal Scroll Cards
// ============================================

const EditorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: #e0e0e0;
  border: 1px solid #e0e0e0;
  position: relative;
  z-index: 2;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const EditorialCard = styled.div`
  background: #ffffff;
  padding: 50px 40px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "${(p) => String(p.$index + 1).padStart(2, "0")}";
    position: absolute;
    top: -20px;
    right: 20px;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 120px;
    font-style: italic;
    color: rgba(0, 0, 0, 0.03);
    line-height: 1;
    transition: all 0.4s ease;
  }

  &:hover {
    background: #fafafa;

    &::before {
      color: rgba(0, 0, 0, 0.06);
      transform: translateY(-10px);
    }
  }
`

const EditorialIcon = styled.div`
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  flex-shrink: 0;
`

const EditorialContent = styled.div`
  flex: 1;
`

const EditorialCardTitle = styled.h3`
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 1.4rem;
  font-style: italic;
  color: #1a1a1a;
  margin: 0 0 8px 0;
`

const EditorialCardSubtitle = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 15px;
`

const EditorialDescription = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.7;
  margin: 0;
`

// ============================================
// GOLD THEME - Staggered Elegant Cards
// ============================================

const GoldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  position: relative;
  z-index: 2;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const GoldCard = styled.div`
  background: rgba(212, 175, 55, 0.03);
  border: 1px solid rgba(212, 175, 55, 0.15);
  padding: 35px 25px;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  transform: translateY(${(p) => (p.$index % 2 === 0 ? "0" : "30px")});

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    border-color: rgba(212, 175, 55, 0.4);
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.15);
    transform: translateY(${(p) => (p.$index % 2 === 0 ? "-10px" : "20px")});

    &::before {
      transform: scaleX(1);
    }
  }
`

const GoldIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 20px;
  filter: grayscale(100%) sepia(100%) hue-rotate(0deg) saturate(300%);
`

const GoldCardTitle = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: #ffffff;
  margin: 0 0 8px 0;
`

const GoldHighlight = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: linear-gradient(90deg, #d4af37, #f4d03f, #d4af37);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${goldShimmer} 3s linear infinite;
`

// ============================================
// BOTANICAL THEME - Organic Masonry
// ============================================

const BotanicalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  position: relative;
  z-index: 2;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const BotanicalCard = styled.div`
  background: #ffffff;
  border-radius: 30px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 20px rgba(45, 59, 45, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: "${(p) => p.$emoji}";
    position: absolute;
    top: -30px;
    right: -30px;
    font-size: 120px;
    opacity: 0.05;
    transition: all 0.5s ease;
  }

  &:hover {
    transform: translateY(-15px)
      rotate(${(p) => (p.$index % 2 === 0 ? "1deg" : "-1deg")});
    box-shadow: 0 25px 60px rgba(45, 59, 45, 0.18);

    &::before {
      transform: rotate(20deg) scale(1.1);
      opacity: 0.08;
    }
  }
`

const BotanicalIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 20px;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || "0s"};
`

const BotanicalCardTitle = styled.h3`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.3rem;
  color: #2d3b2d;
  margin: 0 0 10px 0;
`

const BotanicalDescription = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 0.9rem;
  color: #5a6b5a;
  line-height: 1.7;
  margin: 0;
`

const BotanicalBadge = styled.div`
  display: inline-block;
  font-family: "Lato", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: #ffffff;
  background: #8b9d83;
  padding: 6px 15px;
  border-radius: 20px;
  margin-top: 15px;
`

// ============================================
// CONTEMPORARY THEME - Bold Scattered Cards
// ============================================

const ContemporaryWrapper = styled.div`
  position: relative;
  z-index: 2;
`

const ContemporaryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`

const ContemporaryCard = styled.div`
  width: calc(25% - 15px);
  min-width: 280px;
  background: ${(p) => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#FFE66D",
      "#95E1D3",
      "#F38181",
      "#AA96DA",
      "#6C5CE7",
      "#FFEAA7",
      "#74B9FF",
      "#FD79A8",
    ]
    return colors[p.$index % colors.length]
  }};
  padding: 40px 30px;
  border: 4px solid #0d0d0d;
  box-shadow: 8px 8px 0 #0d0d0d;
  transition: all 0.3s ease;
  position: relative;
  animation: ${contemporaryBounce} ${(p) => 4 + p.$index * 0.5}s ease-in-out
    infinite;
  animation-delay: ${(p) => p.$index * 0.2}s;

  &:hover {
    transform: translate(-6px, -6px) rotate(0deg) !important;
    box-shadow: 14px 14px 0 #0d0d0d;
    animation-play-state: paused;
  }

  @media (max-width: 1200px) {
    width: calc(33.33% - 14px);
  }
  @media (max-width: 800px) {
    width: calc(50% - 10px);
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`

const ContemporaryNumber = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 4rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.15);
  line-height: 1;
  margin-bottom: 15px;
`

const ContemporaryCardTitle = styled.h3`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #0d0d0d;
  text-transform: uppercase;
  margin: 0 0 10px 0;
`

const ContemporaryDescription = styled.p`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.6;
  margin: 0;
`

// ============================================
// LUXE THEME - Minimalist Reveal List
// ============================================

const LuxeGrid = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`

const LuxeCard = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 40px;
  align-items: center;
  padding: 40px 0;
  border-bottom: 1px solid rgba(180, 160, 140, 0.2);
  transition: all 0.4s ease;
  cursor: default;

  &:first-child {
    border-top: 1px solid rgba(180, 160, 140, 0.2);
  }

  &:hover {
    padding-left: 20px;
    background: linear-gradient(90deg, rgba(180, 160, 140, 0.03), transparent);
  }

  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr;
    gap: 20px;

    > *:last-child {
      grid-column: 1 / -1;
    }
  }
`

const LuxeNumber = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 2.5rem;
  font-weight: 300;
  color: #b4a08c;
`

const LuxeContent = styled.div``

const LuxeCardTitle = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: #2a2a2a;
  margin: 0 0 8px 0;
`

const LuxeDescription = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  color: #888;
  line-height: 1.7;
  margin: 0;
`

const LuxeBadge = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #b4a08c;
  padding: 10px 20px;
  border: 1px solid rgba(180, 160, 140, 0.3);
`

// ============================================
// NEON THEME - Cyberpunk Terminal
// ============================================

const NeonWrapper = styled.div`
  position: relative;
  z-index: 2;
`

const NeonTerminal = styled.div`
  background: rgba(0, 255, 255, 0.02);
  border: 1px solid rgba(0, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -10%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 255, 255, 0.5),
      transparent
    );
    animation: ${scanLine} 3s linear infinite;
  }
`

const NeonTerminalHeader = styled.div`
  padding: 15px 25px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
`

const NeonDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  box-shadow: 0 0 10px ${(p) => p.$color};
`

const NeonHeaderText = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 10px;
`

const NeonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const NeonCard = styled.div`
  padding: 30px;
  border: 1px solid rgba(0, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: ${(p) => (p.$index % 2 === 0 ? "#00ffff" : "#ff00ff")};
    transition: height 0.3s ease;
    box-shadow: 0 0 15px ${(p) => (p.$index % 2 === 0 ? "#00ffff" : "#ff00ff")};
  }

  &:hover {
    background: rgba(0, 255, 255, 0.03);
    animation: ${neonGlow} 2s ease-in-out infinite;

    &::before {
      height: 100%;
    }
  }
`

const NeonIndex = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.7rem;
  color: #ff00ff;
  margin-bottom: 15px;
`

const NeonCardTitle = styled.h3`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #00ffff;
  margin: 0 0 8px 0;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
`

const NeonDescription = styled.p`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  margin: 0 0 15px 0;
`

const NeonTag = styled.div`
  display: inline-block;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.6rem;
  color: ${(p) => (p.$index % 2 === 0 ? "#00ffff" : "#ff00ff")};
  border: 1px solid currentColor;
  padding: 4px 10px;
`

// ============================================
// DOMAIN HIGHLIGHT SECTION
// ============================================

const DomainHighlight = styled.div`
  margin-top: 80px;
  padding: 60px;
  text-align: center;
  position: relative;
  z-index: 2;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #1a1a1a;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      background: linear-gradient(
        135deg,
        rgba(212, 175, 55, 0.1) 0%,
        rgba(212, 175, 55, 0.02) 100%
      );
      border: 1px solid rgba(212, 175, 55, 0.3);
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: #2d3b2d;
      border-radius: 40px;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #ffffff;
      border: 4px solid #0d0d0d;
      box-shadow: 12px 12px 0 #ff6b6b;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: transparent;
      border-top: 1px solid rgba(180, 160, 140, 0.3);
      border-bottom: 1px solid rgba(180, 160, 140, 0.3);
      margin-top: 100px;
      padding: 80px 60px;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: rgba(255, 0, 255, 0.05);
      border: 1px solid rgba(255, 0, 255, 0.3);
      box-shadow: 0 0 50px rgba(255, 0, 255, 0.1);
    `}
`

const DomainIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 25px;

  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #0d0d0d;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 25px;
    `}
`

const DomainTitle = styled.h3`
  margin: 0 0 15px 0;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Instrument Serif", Georgia, serif;
      font-size: 2rem;
      font-style: italic;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
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
      font-size: 2rem;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      color: #0d0d0d;
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
      font-size: 2rem;
      font-weight: 700;
      color: #ff00ff;
      text-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
    `}
`

const DomainExample = styled.div`
  margin: 25px 0;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 1.5rem;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.7);

      span {
        color: #ffffff;
        font-weight: 600;
      }
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.8rem;
      color: rgba(255, 255, 255, 0.6);

      span {
        background: linear-gradient(90deg, #d4af37, #f4d03f);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Playfair Display", Georgia, serif;
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.7);

      span {
        color: #ffffff;
      }
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.3rem;
      color: #666;
      background: #f5f5f5;
      padding: 15px 30px;
      display: inline-block;
      border: 2px solid #0d0d0d;

      span {
        color: #ff6b6b;
        font-weight: 700;
      }
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.5rem;
      font-style: italic;
      color: #888;

      span {
        color: #2a2a2a;
      }
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.3rem;
      color: rgba(255, 255, 255, 0.5);

      span {
        color: #00ffff;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
      }
    `}
`

const DomainSubtext = styled.p`
  margin: 0;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.5);
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.4);
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.9rem;
      color: #999;
      margin-top: 20px;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.75rem;
      color: #b4a08c;
      letter-spacing: 0.1em;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.4);
    `}
`

// ============================================
// MAIN COMPONENT
// ============================================

function USPSection() {
  const { currentTheme } = useTheme()
  const sectionRef = useRef(null)
  const [parallaxOffset, setParallaxOffset] = useState(0)

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollProgress = -rect.top / window.innerHeight
        setParallaxOffset(scrollProgress * 100)
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
            <EditorialParallaxNumber
              $top='5%'
              $left='-5%'
              $size='500px'
              $offset={parallaxOffset * 0.3}
            >
              01
            </EditorialParallaxNumber>
            <EditorialParallaxNumber
              $top='40%'
              $right='-10%'
              $size='400px'
              $offset={parallaxOffset * 0.5}
            >
              10
            </EditorialParallaxNumber>
            <EditorialParallaxNumber
              $top='70%'
              $left='20%'
              $size='300px'
              $offset={parallaxOffset * 0.2}
            >
              USP
            </EditorialParallaxNumber>
          </ParallaxContainer>
        )
      case "gold":
        return (
          <ParallaxContainer>
            <GoldParallaxOrb
              $top='-10%'
              $left='10%'
              $size='400px'
              $offset={parallaxOffset * 0.4}
              $duration='10s'
            />
            <GoldParallaxOrb
              $top='30%'
              $right='5%'
              $size='300px'
              $offset={parallaxOffset * 0.6}
              $duration='12s'
              $delay='2s'
            />
            <GoldParallaxOrb
              $top='60%'
              $left='30%'
              $size='350px'
              $offset={parallaxOffset * 0.3}
              $duration='8s'
              $delay='1s'
            />
            <GoldParallaxOrb
              $top='80%'
              $right='20%'
              $size='250px'
              $offset={parallaxOffset * 0.5}
              $duration='14s'
              $delay='3s'
            />
          </ParallaxContainer>
        )
      case "botanical":
        return (
          <ParallaxContainer>
            <BotanicalParallaxPlant
              $top='5%'
              $left='5%'
              $size='100px'
              $offset={parallaxOffset * 0.4}
              $rotate='-15deg'
              $duration='12s'
            >
              🌿
            </BotanicalParallaxPlant>
            <BotanicalParallaxPlant
              $top='15%'
              $right='8%'
              $size='80px'
              $offset={parallaxOffset * 0.6}
              $rotate='10deg'
              $duration='10s'
              $delay='1s'
            >
              🍃
            </BotanicalParallaxPlant>
            <BotanicalParallaxPlant
              $top='45%'
              $left='3%'
              $size='90px'
              $offset={parallaxOffset * 0.3}
              $rotate='20deg'
              $duration='14s'
              $delay='2s'
            >
              🌸
            </BotanicalParallaxPlant>
            <BotanicalParallaxPlant
              $top='55%'
              $right='5%'
              $size='70px'
              $offset={parallaxOffset * 0.5}
              $rotate='-10deg'
              $duration='11s'
              $delay='0.5s'
            >
              🌺
            </BotanicalParallaxPlant>
            <BotanicalParallaxPlant
              $bottom='15%'
              $left='10%'
              $size='85px'
              $offset={parallaxOffset * 0.4}
              $rotate='5deg'
              $duration='13s'
              $delay='1.5s'
            >
              🌼
            </BotanicalParallaxPlant>
            <BotanicalParallaxPlant
              $bottom='10%'
              $right='12%'
              $size='95px'
              $offset={parallaxOffset * 0.35}
              $rotate='-20deg'
              $duration='9s'
              $delay='2.5s'
            >
              🌾
            </BotanicalParallaxPlant>
          </ParallaxContainer>
        )
      case "contemporary":
        return (
          <ParallaxContainer>
            <ContemporaryParallaxShape
              $top='10%'
              $left='5%'
              $size='200px'
              $offset={parallaxOffset * 0.5}
              $rotate='15deg'
              $color='rgba(255,107,107,0.2)'
            />
            <ContemporaryParallaxShape
              $top='30%'
              $right='10%'
              $size='150px'
              $round
              $offset={parallaxOffset * 0.3}
              $color='rgba(78,205,196,0.2)'
            />
            <ContemporaryParallaxShape
              $top='60%'
              $left='15%'
              $size='180px'
              $round
              $offset={parallaxOffset * 0.6}
              $color='rgba(255,230,109,0.2)'
            />
            <ContemporaryParallaxShape
              $top='75%'
              $right='5%'
              $size='120px'
              $offset={parallaxOffset * 0.4}
              $rotate='-20deg'
              $color='rgba(255,255,255,0.1)'
            />
          </ParallaxContainer>
        )
      case "luxe":
        return (
          <ParallaxContainer>
            <LuxeParallaxLine
              $top='15%'
              $left='0'
              $width='40%'
              $offset={parallaxOffset * 0.3}
            />
            <LuxeParallaxLine
              $top='35%'
              $right='0'
              $width='30%'
              $offset={parallaxOffset * 0.5}
            />
            <LuxeParallaxLine
              $top='55%'
              $left='20%'
              $width='50%'
              $offset={parallaxOffset * 0.2}
            />
            <LuxeParallaxLine
              $top='75%'
              $right='10%'
              $width='35%'
              $offset={parallaxOffset * 0.4}
            />
            <LuxeParallaxLine
              $top='90%'
              $left='5%'
              $width='45%'
              $offset={parallaxOffset * 0.35}
            />
          </ParallaxContainer>
        )
      case "neon":
        return (
          <ParallaxContainer>
            <NeonParallaxGrid $offset={parallaxOffset * 0.2} />
            <NeonParallaxLine
              $top='20%'
              $left='0'
              $width='60%'
              $offset={parallaxOffset * 0.5}
              $color='#00ffff'
            />
            <NeonParallaxLine
              $top='40%'
              $right='0'
              $width='50%'
              $offset={parallaxOffset * 0.3}
              $color='#ff00ff'
            />
            <NeonParallaxLine
              $top='65%'
              $left='10%'
              $width='70%'
              $offset={parallaxOffset * 0.6}
              $color='#00ffff'
            />
            <NeonParallaxLine
              $top='85%'
              $right='5%'
              $width='40%'
              $offset={parallaxOffset * 0.4}
              $color='#ff00ff'
            />
          </ParallaxContainer>
        )
      default:
        return null
    }
  }

  // Render USP cards based on theme
  const renderUSPs = () => {
    switch (currentTheme) {
      case "editorial":
        return (
          <EditorialGrid>
            {usps.map((usp, index) => (
              <EditorialCard key={usp.id} $index={index}>
                <EditorialIcon>{usp.icon}</EditorialIcon>
                <EditorialContent>
                  <EditorialCardTitle>{usp.title}</EditorialCardTitle>
                  <EditorialCardSubtitle>{usp.subtitle}</EditorialCardSubtitle>
                  <EditorialDescription>{usp.description}</EditorialDescription>
                </EditorialContent>
              </EditorialCard>
            ))}
          </EditorialGrid>
        )

      case "gold":
        return (
          <GoldGrid>
            {usps.map((usp, index) => (
              <GoldCard key={usp.id} $index={index}>
                <GoldIcon>{usp.icon}</GoldIcon>
                <GoldCardTitle>{usp.title}</GoldCardTitle>
                <GoldHighlight>{usp.highlight}</GoldHighlight>
              </GoldCard>
            ))}
          </GoldGrid>
        )

      case "botanical":
        const emojis = [
          "🌿",
          "🎨",
          "👤",
          "🔒",
          "🇩🇪",
          "♾️",
          "🌍",
          "📱",
          "⚡",
          "💎",
        ]
        return (
          <BotanicalGrid>
            {usps.map((usp, index) => (
              <BotanicalCard key={usp.id} $index={index} $emoji={emojis[index]}>
                <BotanicalIcon $delay={`${index * 0.2}s`}>
                  {usp.icon}
                </BotanicalIcon>
                <BotanicalCardTitle>{usp.title}</BotanicalCardTitle>
                <BotanicalDescription>{usp.description}</BotanicalDescription>
                <BotanicalBadge>{usp.highlight}</BotanicalBadge>
              </BotanicalCard>
            ))}
          </BotanicalGrid>
        )

      case "contemporary":
        return (
          <ContemporaryWrapper>
            <ContemporaryGrid>
              {usps.map((usp, index) => (
                <ContemporaryCard key={usp.id} $index={index}>
                  <ContemporaryNumber>
                    {String(index + 1).padStart(2, "0")}
                  </ContemporaryNumber>
                  <ContemporaryCardTitle>{usp.title}</ContemporaryCardTitle>
                  <ContemporaryDescription>
                    {usp.description}
                  </ContemporaryDescription>
                </ContemporaryCard>
              ))}
            </ContemporaryGrid>
          </ContemporaryWrapper>
        )

      case "luxe":
        return (
          <LuxeGrid>
            {usps.map((usp, index) => (
              <LuxeCard key={usp.id}>
                <LuxeNumber>{String(index + 1).padStart(2, "0")}</LuxeNumber>
                <LuxeContent>
                  <LuxeCardTitle>{usp.title}</LuxeCardTitle>
                  <LuxeDescription>{usp.description}</LuxeDescription>
                </LuxeContent>
                <LuxeBadge>{usp.highlight}</LuxeBadge>
              </LuxeCard>
            ))}
          </LuxeGrid>
        )

      case "neon":
        return (
          <NeonWrapper>
            <NeonTerminal>
              <NeonTerminalHeader>
                <NeonDot $color='#ff5f56' />
                <NeonDot $color='#ffbd2e' />
                <NeonDot $color='#27c93f' />
                <NeonHeaderText>
                  usp_features.exe — 10 modules loaded
                </NeonHeaderText>
              </NeonTerminalHeader>
              <NeonGrid>
                {usps.map((usp, index) => (
                  <NeonCard key={usp.id} $index={index}>
                    <NeonIndex>
                      {"// MODULE_"}
                      {String(index + 1).padStart(2, "0")}
                    </NeonIndex>
                    <NeonCardTitle>{usp.title}</NeonCardTitle>
                    <NeonDescription>{usp.description}</NeonDescription>
                    <NeonTag $index={index}>{usp.highlight}</NeonTag>
                  </NeonCard>
                ))}
              </NeonGrid>
            </NeonTerminal>
          </NeonWrapper>
        )

      default:
        return null
    }
  }

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id='usps'>
      {renderParallax()}

      <Container>
        <Header $themeId={currentTheme}>
          <Eyebrow $themeId={currentTheme}>Warum S&I</Eyebrow>
          <Title $themeId={currentTheme}>
            {currentTheme === "contemporary"
              ? "WHAT YOU GET"
              : currentTheme === "neon"
                ? "10 REASONS TO CHOOSE US"
                : "Was uns auszeichnet"}
          </Title>
          <Subtitle $themeId={currentTheme}>
            Premium-Features für Paare, die keine Kompromisse eingehen. Jede
            Website ist ein Unikat.
          </Subtitle>
        </Header>

        {renderUSPs()}

        {/* Custom Domain Highlight */}
        <DomainHighlight $themeId={currentTheme}>
          <DomainIcon $themeId={currentTheme}>🌐</DomainIcon>
          <DomainTitle $themeId={currentTheme}>
            {currentTheme === "contemporary"
              ? "YOUR OWN DOMAIN"
              : "Eure eigene Domain – inklusive"}
          </DomainTitle>
          <DomainExample $themeId={currentTheme}>
            www.<span>sarah-und-thomas</span>.de
          </DomainExample>
          <DomainSubtext $themeId={currentTheme}>
            Keine kryptischen URLs. Eure Hochzeitswebsite, eure Domain. Setup
            und erstes Jahr inklusive.
          </DomainSubtext>
        </DomainHighlight>
      </Container>
    </Section>
  )
}

export default USPSection
