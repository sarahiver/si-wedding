// src/components/marketing/ExamplesShowcase.js
import React, { useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { useTheme } from "../../context/ThemeContext"

// ============================================
// KEYFRAME ANIMATIONS
// ============================================
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const modalSlideIn = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`

const goldShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const botanicalFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(3deg); }
`

const contemporaryGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const neonFlicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.7; }
  94% { opacity: 1; }
  96% { opacity: 0.8; }
`

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(0,255,255,0.3); }
  50% { box-shadow: 0 0 20px rgba(0,255,255,0.5), 0 0 30px rgba(255,0,255,0.3); }
`

const luxeReveal = keyframes`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`

// ============================================
// CUSTOMER DATA
// ============================================
const customerExamples = [
  {
    id: "editorial",
    couple: "Marie & Thomas",
    date: "21. Juni 2025",
    location: "Hamburg",
    theme: "Editorial",
    tagline: "Modern & Minimalistisch",
    story:
      "Wir haben uns 2019 in einer kleinen Buchhandlung in der Hamburger Speicherstadt kennengelernt. Marie suchte nach einem Gedichtband, Thomas nach dem perfekten Krimi.",
    venue: "Elbphilharmonie Plaza",
  },
  {
    id: "gold",
    couple: "Victoria & Alexander",
    date: "14. September 2025",
    location: "Düsseldorf",
    theme: "Gold",
    tagline: "Luxuriös & Opulent",
    story:
      "Eine Begegnung auf dem Wiener Opernball 2020 veränderte alles. Victoria trug ein goldenes Kleid, Alexander konnte den Blick nicht abwenden.",
    venue: "Schloss Benrath",
  },
  {
    id: "botanical",
    couple: "Emma & Lukas",
    date: "3. Mai 2025",
    location: "Bergisch Gladbach",
    theme: "Botanical",
    tagline: "Natürlich & Romantisch",
    story:
      "Beim Wandern im Schwarzwald kreuzten sich unsere Wege. Lukas half Emma über einen umgestürzten Baum – und hielt ihre Hand seitdem nicht mehr los.",
    venue: "Gut Hohenholz",
  },
  {
    id: "contemporary",
    couple: "Mia & Felix",
    date: "08.08.2025",
    location: "Berlin",
    theme: "Contemporary",
    tagline: "Bold & Playful",
    story:
      "Tinder-Match 2021. Erstes Date im Berghain-Garten. Dritter Tag: schon zusammengezogen. Wir machen keine halben Sachen.",
    venue: "Alte Münze Berlin",
  },
  {
    id: "luxe",
    couple: "Charlotte & Sebastian",
    date: "12. Juli 2025",
    location: "Starnberg",
    theme: "Luxe",
    tagline: "Raffiniert & Zeitlos",
    story:
      "Ein zufälliges Treffen bei einer Kunstauktion in München. Sebastian bot auf ein Gemälde, Charlotte auf sein Herz.",
    venue: "Villa am Starnberger See",
  },
  {
    id: "neon",
    couple: "Zoe & Max",
    date: "31.12.2025",
    location: "Frankfurt",
    theme: "Neon",
    tagline: "Futuristisch & Digital",
    story:
      "Online-Gaming brachte uns zusammen. Nach 3 Jahren als Raid-Partner war es Zeit, auch offline ein Team zu werden.",
    venue: "Club Tanzhaus West",
  },
]

// ============================================
// MAIN SECTION STYLES
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

const Header = styled.div`
  margin-bottom: 60px;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transform: translateY(${(p) => (p.$visible ? 0 : "40px")});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
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
      text-align: left;
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
      font-size: 0.85rem;
      font-weight: 700;
      color: #ff6b6b;
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
  margin: 0 0 1rem 0;
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
  line-height: 1.7;
  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 1rem;
      color: #666;
      margin: 0;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.5);
      max-width: 500px;
      margin: 0 auto;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 1.05rem;
      color: #5a6b5a;
      max-width: 500px;
      margin: 0 auto;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      color: #666;
      margin: 0;
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
      color: rgba(255, 255, 255, 0.6);
      max-width: 500px;
      margin: 0 auto;
    `}
`

// ============================================
// EDITORIAL THEME LAYOUT - Clean List
// ============================================
const EditorialGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: #e0e0e0;
  border: 1px solid #e0e0e0;
`

const EditorialCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 150px 120px;
  align-items: center;
  padding: 30px 40px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #fafafa;
    padding-left: 50px;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`

const EditorialCouple = styled.div`
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 1.5rem;
  font-style: italic;
  color: #1a1a1a;
`

const EditorialLocation = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.85rem;
  color: #666;
`

const EditorialDate = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.85rem;
  color: #999;
`

const EditorialTheme = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1a1a1a;
  text-align: right;
`

// ============================================
// GOLD THEME LAYOUT - Elegant Cards
// ============================================
const GoldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const GoldCard = styled.div`
  background: rgba(212, 175, 55, 0.03);
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 40px 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(212, 175, 55, 0.05),
      transparent
    );
    transition: left 0.6s ease;
  }
  &:hover {
    border-color: rgba(212, 175, 55, 0.5);
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.15);
    &::before {
      left: 100%;
    }
  }
`

const GoldInitials = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 2.5rem;
  font-weight: 300;
  background: linear-gradient(135deg, #d4af37, #f4d03f, #d4af37);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${goldShimmer} 4s linear infinite;
  margin-bottom: 20px;
`

const GoldCouple = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 10px;
`

const GoldMeta = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
`

// ============================================
// BOTANICAL THEME LAYOUT - Organic Cards
// ============================================
const BotanicalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
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
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(45, 59, 45, 0.08);
  position: relative;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(45, 59, 45, 0.15);
  }
`

const BotanicalEmoji = styled.div`
  font-size: 2.5rem;
  margin-bottom: 20px;
  animation: ${botanicalFloat} 4s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || "0s"};
`

const BotanicalCouple = styled.div`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.4rem;
  color: #2d3b2d;
  margin-bottom: 10px;
`

const BotanicalLocation = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 0.9rem;
  color: #8b9d83;
  margin-bottom: 5px;
`

const BotanicalDate = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 0.8rem;
  color: #5a6b5a;
`

// ============================================
// CONTEMPORARY THEME LAYOUT - Bold Grid
// ============================================
const ContemporaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const ContemporaryCard = styled.div`
  background: linear-gradient(
    135deg,
    ${(p) =>
        p.$index === 0
          ? "#FF6B6B"
          : p.$index === 1
            ? "#4ECDC4"
            : p.$index === 2
              ? "#FFE66D"
              : p.$index === 3
                ? "#95E1D3"
                : p.$index === 4
                  ? "#F38181"
                  : "#AA96DA"}
      0%,
    ${(p) =>
        p.$index === 0
          ? "#FF8E8E"
          : p.$index === 1
            ? "#7DE3D4"
            : p.$index === 2
              ? "#FFF0A5"
              : p.$index === 3
                ? "#B8F0E5"
                : p.$index === 4
                  ? "#F7A4A4"
                  : "#C4B6E5"}
      100%
  );
  padding: 50px 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 4px solid #0d0d0d;
  box-shadow: 6px 6px 0 #0d0d0d;
  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 10px 10px 0 #0d0d0d;
  }
`

const ContemporaryNumber = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 4rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1;
  margin-bottom: 15px;
`

const ContemporaryCouple = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
`

const ContemporaryMeta = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`

// ============================================
// LUXE THEME LAYOUT - Minimal Elegance
// ============================================
const LuxeGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const LuxeCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  border-bottom: 1px solid rgba(180, 160, 140, 0.2);
  cursor: pointer;
  transition: all 0.4s ease;
  &:first-child {
    border-top: 1px solid rgba(180, 160, 140, 0.2);
  }
  &:hover {
    padding-left: 30px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`

const LuxeCouple = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.8rem;
  font-weight: 300;
  color: #2a2a2a;
  animation: ${luxeReveal} 1s ease forwards;
  animation-delay: ${(p) => p.$delay || "0s"};
`

const LuxeCenter = styled.div`
  text-align: center;
  flex: 1;
  padding: 0 40px;
  @media (max-width: 768px) {
    text-align: left;
    padding: 0;
  }
`

const LuxeLocation = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #b4a08c;
`

const LuxeRight = styled.div`
  text-align: right;
  @media (max-width: 768px) {
    text-align: left;
  }
`

const LuxeDate = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: #666;
`

// ============================================
// NEON THEME LAYOUT - Cyberpunk Cards
// ============================================
const NeonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const NeonCard = styled.div`
  background: rgba(0, 255, 255, 0.02);
  border: 1px solid rgba(0, 255, 255, 0.2);
  padding: 35px 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00ffff, #ff00ff, #00ffff);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  &:hover {
    border-color: rgba(0, 255, 255, 0.5);
    animation: ${neonPulse} 2s ease-in-out infinite;
    &::before {
      transform: scaleX(1);
    }
  }
`

const NeonIndex = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.7rem;
  color: #ff00ff;
  margin-bottom: 15px;
`

const NeonCouple = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  animation: ${neonFlicker} 4s ease-in-out infinite;
  margin-bottom: 10px;
`

const NeonMeta = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
`

const NeonTheme = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.65rem;
  color: #ff00ff;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 0, 255, 0.2);
`

// ============================================
// MODAL STYLES
// ============================================
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease;
  @media (max-width: 768px) {
    padding: 20px;
  }
`

const ModalContent = styled.div`
  width: 100%;
  max-width: 1000px;
  background: #000;
  position: relative;
  animation: ${modalSlideIn} 0.4s ease;
  margin: auto;
`

const ModalClose = styled.button`
  position: fixed;
  top: 30px;
  right: 30px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10000;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`

// ============================================
// MODAL COMPONENTS - HERO SECTION
// ============================================
const ModalHero = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 60px;
  position: relative;
  overflow: hidden;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      background: #ffffff;
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1510 100%);
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      background: linear-gradient(180deg, #f8f6f0 0%, #ebe7de 100%);
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      background: linear-gradient(
        135deg,
        #ff6b6b 0%,
        #4ecdc4 50%,
        #ffe66d 100%
      );
      background-size: 200% 200%;
      animation: ${contemporaryGradient} 8s ease infinite;
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      background: #faf9f7;
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      background: #0a0a0f;
    `}
`

const HeroEyebrow = styled.div`
  margin-bottom: 25px;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #999;
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.8rem;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      background: linear-gradient(90deg, #d4af37, #f4d03f, #d4af37);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${goldShimmer} 3s linear infinite;
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 0.85rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #8b9d83;
      &::before,
      &::after {
        content: " ✿ ";
        font-size: 0.7rem;
      }
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #ffffff;
      background: rgba(0, 0, 0, 0.2);
      padding: 12px 30px;
      display: inline-block;
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.6rem;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      color: #b4a08c;
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #ff00ff;
      animation: ${neonFlicker} 4s ease-in-out infinite;
    `}
`

const HeroTitle = styled.h1`
  margin: 0 0 25px 0;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      font-family: "Instrument Serif", Georgia, serif;
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 400;
      font-style: italic;
      color: #1a1a1a;
      line-height: 1.1;
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(4rem, 10vw, 8rem);
      font-weight: 300;
      color: #ffffff;
      line-height: 1;
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 400;
      color: #2d3b2d;
      line-height: 1.1;
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: clamp(4rem, 12vw, 10rem);
      font-weight: 700;
      color: #ffffff;
      text-transform: uppercase;
      line-height: 0.9;
      text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(3rem, 7vw, 5rem);
      font-weight: 300;
      color: #2a2a2a;
      line-height: 1.2;
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: clamp(4rem, 10vw, 8rem);
      font-weight: 700;
      color: #00ffff;
      line-height: 0.95;
      text-shadow:
        0 0 10px #00ffff,
        0 0 20px #00ffff,
        0 0 40px #00ffff;
      animation: ${neonFlicker} 5s ease-in-out infinite;
    `}
`

const HeroDate = styled.div`
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: #1a1a1a;
      letter-spacing: 0.1em;
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.7);
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      font-family: "Playfair Display", Georgia, serif;
      font-size: 1.3rem;
      color: #2d3b2d;
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
      background: #0d0d0d;
      padding: 15px 40px;
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.2rem;
      font-style: italic;
      color: #888;
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.3rem;
      font-weight: 600;
      color: #ff00ff;
      text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
    `}
`

// ============================================
// MODAL COMPONENTS - LOVE STORY SECTION
// ============================================
const ModalLoveStory = styled.div`
  padding: 100px 60px;
  text-align: center;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      background: #fafafa;
      border-top: 1px solid #e0e0e0;
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      background: #0a0a0a;
      border-top: 1px solid rgba(212, 175, 55, 0.2);
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      background: #ffffff;
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      background: #0d0d0d;
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      background: #ffffff;
      border-top: 1px solid #e8e4de;
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      background: #050508;
      border-top: 1px solid rgba(0, 255, 255, 0.1);
    `}
`

const LoveStoryTitle = styled.h2`
  margin: 0 0 40px 0;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      font-family: "Instrument Serif", Georgia, serif;
      font-size: 2.5rem;
      font-style: italic;
      color: #1a1a1a;
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 2.5rem;
      font-weight: 300;
      color: #d4af37;
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      font-family: "Playfair Display", Georgia, serif;
      font-size: 2.5rem;
      color: #2d3b2d;
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 3rem;
      font-weight: 700;
      color: #ffffff;
      text-transform: uppercase;
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 2rem;
      font-weight: 300;
      color: #2a2a2a;
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      color: #00ffff;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    `}
`

const LoveStoryText = styled.p`
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.9;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 1.1rem;
      color: #666;
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.6);
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 1.1rem;
      color: #5a6b5a;
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.7);
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.95rem;
      color: #888;
      letter-spacing: 0.02em;
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.6);
    `}
`

// ============================================
// MODAL COMPONENTS - COUNTDOWN SECTION
// ============================================
const ModalCountdown = styled.div`
  padding: 80px 60px;
  text-align: center;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      background: #ffffff;
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      background: linear-gradient(180deg, #0a0a0a 0%, #151510 100%);
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      background: #f5f1eb;
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      background: #ffffff;
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      background: #faf9f7;
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      background: #0a0a0f;
    `}
`

const CountdownTitle = styled.h3`
  margin: 0 0 40px 0;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #999;
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.75rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #d4af37;
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 0.85rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #8b9d83;
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #0d0d0d;
      text-transform: uppercase;
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.6rem;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: #b4a08c;
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #ff00ff;
    `}
`

const CountdownNumbers = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`

const CountdownItem = styled.div`
  text-align: center;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      .number {
        font-family: "Instrument Serif", Georgia, serif;
        font-size: 4rem;
        font-style: italic;
        color: #1a1a1a;
        line-height: 1;
      }
      .label {
        font-family: "Inter", sans-serif;
        font-size: 0.7rem;
        color: #999;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-top: 10px;
      }
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      .number {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 5rem;
        font-weight: 300;
        background: linear-gradient(135deg, #d4af37, #f4d03f);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1;
      }
      .label {
        font-family: "Montserrat", sans-serif;
        font-size: 0.65rem;
        color: rgba(255, 255, 255, 0.4);
        letter-spacing: 0.2em;
        margin-top: 10px;
      }
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      .number {
        font-family: "Playfair Display", Georgia, serif;
        font-size: 4rem;
        color: #2d3b2d;
        line-height: 1;
      }
      .label {
        font-family: "Lato", sans-serif;
        font-size: 0.75rem;
        color: #8b9d83;
        margin-top: 10px;
      }
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      background: #0d0d0d;
      padding: 25px 35px;
      .number {
        font-family: "Space Grotesk", sans-serif;
        font-size: 4rem;
        font-weight: 700;
        color: #ffffff;
        line-height: 1;
      }
      .label {
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.7rem;
        font-weight: 600;
        color: #4ecdc4;
        text-transform: uppercase;
        margin-top: 10px;
      }
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      .number {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 4rem;
        font-weight: 300;
        color: #2a2a2a;
        line-height: 1;
      }
      .label {
        font-family: "Montserrat", sans-serif;
        font-size: 0.55rem;
        color: #b4a08c;
        letter-spacing: 0.3em;
        margin-top: 10px;
      }
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      border: 1px solid rgba(0, 255, 255, 0.2);
      padding: 25px 35px;
      .number {
        font-family: "Space Grotesk", sans-serif;
        font-size: 4rem;
        font-weight: 700;
        color: #00ffff;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        line-height: 1;
      }
      .label {
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.5);
        margin-top: 10px;
      }
    `}
`

// ============================================
// MODAL COMPONENTS - RSVP SECTION
// ============================================
const ModalRSVP = styled.div`
  padding: 100px 60px;
  text-align: center;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      background: #1a1a1a;
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      background: #0a0a0a;
      border-top: 1px solid rgba(212, 175, 55, 0.2);
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      background: #2d3b2d;
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      background: linear-gradient(135deg, #4ecdc4 0%, #ff6b6b 100%);
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      background: #2a2a2a;
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      background: #0a0a0f;
      border-top: 1px solid rgba(255, 0, 255, 0.2);
    `}
`

const RSVPTitle = styled.h2`
  margin: 0 0 20px 0;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      font-family: "Instrument Serif", Georgia, serif;
      font-size: 3rem;
      font-style: italic;
      color: #ffffff;
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 3rem;
      font-weight: 300;
      color: #d4af37;
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      font-family: "Playfair Display", Georgia, serif;
      font-size: 2.5rem;
      color: #ffffff;
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 4rem;
      font-weight: 700;
      color: #ffffff;
      text-transform: uppercase;
      text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 2.5rem;
      font-weight: 300;
      color: #e8ddd4;
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 3rem;
      font-weight: 700;
      color: #ff00ff;
      text-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
    `}
`

const RSVPSubtitle = styled.p`
  margin: 0 0 40px 0;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.6);
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.5);
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.9);
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.5);
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.6);
    `}
`

const RSVPButton = styled.div`
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
  ${(p) =>
    p.$clientTheme === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      color: #1a1a1a;
      background: #ffffff;
      padding: 18px 50px;
      &:hover {
        background: #f5f5f5;
      }
    `}
  ${(p) =>
    p.$clientTheme === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #0a0a0a;
      background: linear-gradient(135deg, #d4af37, #f4d03f);
      padding: 20px 60px;
    `}
  ${(p) =>
    p.$clientTheme === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: #2d3b2d;
      background: #ffffff;
      padding: 18px 50px;
      border-radius: 50px;
    `}
  ${(p) =>
    p.$clientTheme === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      color: #0d0d0d;
      background: #ffffff;
      padding: 20px 60px;
      border: 4px solid #0d0d0d;
      box-shadow: 6px 6px 0 #0d0d0d;
    `}
  ${(p) =>
    p.$clientTheme === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.7rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #2a2a2a;
      background: transparent;
      padding: 20px 60px;
      border: 1px solid #e8ddd4;
      &:hover {
        background: #e8ddd4;
      }
    `}
  ${(p) =>
    p.$clientTheme === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: #0a0a0f;
      background: #00ffff;
      padding: 18px 50px;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
    `}
`

// ============================================
// MAIN COMPONENT
// ============================================
function ExamplesShowcase() {
  const { currentTheme } = useTheme()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedExample, setSelectedExample] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setSelectedExample(null)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    if (selectedExample) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedExample])

  // Render different layouts based on current theme
  const renderCards = () => {
    switch (currentTheme) {
      case "editorial":
        return (
          <EditorialGrid>
            {customerExamples.map((ex) => (
              <EditorialCard key={ex.id} onClick={() => setSelectedExample(ex)}>
                <EditorialCouple>{ex.couple}</EditorialCouple>
                <EditorialLocation>{ex.location}</EditorialLocation>
                <EditorialDate>{ex.date}</EditorialDate>
                <EditorialTheme>{ex.theme}</EditorialTheme>
              </EditorialCard>
            ))}
          </EditorialGrid>
        )

      case "gold":
        return (
          <GoldGrid>
            {customerExamples.map((ex) => (
              <GoldCard key={ex.id} onClick={() => setSelectedExample(ex)}>
                <GoldInitials>
                  {ex.couple
                    .split(" & ")
                    .map((n) => n[0])
                    .join(" & ")}
                </GoldInitials>
                <GoldCouple>{ex.couple}</GoldCouple>
                <GoldMeta>
                  {ex.location} • {ex.date}
                </GoldMeta>
              </GoldCard>
            ))}
          </GoldGrid>
        )

      case "botanical":
        const emojis = ["🌿", "🌸", "🍃", "🌺", "🌼", "🌾"]
        return (
          <BotanicalGrid>
            {customerExamples.map((ex, i) => (
              <BotanicalCard key={ex.id} onClick={() => setSelectedExample(ex)}>
                <BotanicalEmoji $delay={`${i * 0.2}s`}>
                  {emojis[i]}
                </BotanicalEmoji>
                <BotanicalCouple>{ex.couple}</BotanicalCouple>
                <BotanicalLocation>{ex.location}</BotanicalLocation>
                <BotanicalDate>{ex.date}</BotanicalDate>
              </BotanicalCard>
            ))}
          </BotanicalGrid>
        )

      case "contemporary":
        return (
          <ContemporaryGrid>
            {customerExamples.map((ex, i) => (
              <ContemporaryCard
                key={ex.id}
                $index={i}
                onClick={() => setSelectedExample(ex)}
              >
                <ContemporaryNumber>
                  {String(i + 1).padStart(2, "0")}
                </ContemporaryNumber>
                <ContemporaryCouple>{ex.couple}</ContemporaryCouple>
                <ContemporaryMeta>
                  {ex.location} → {ex.date}
                </ContemporaryMeta>
              </ContemporaryCard>
            ))}
          </ContemporaryGrid>
        )

      case "luxe":
        return (
          <LuxeGrid>
            {customerExamples.map((ex, i) => (
              <LuxeCard key={ex.id} onClick={() => setSelectedExample(ex)}>
                <LuxeCouple $delay={`${i * 0.1}s`}>{ex.couple}</LuxeCouple>
                <LuxeCenter>
                  <LuxeLocation>{ex.location}</LuxeLocation>
                </LuxeCenter>
                <LuxeRight>
                  <LuxeDate>{ex.date}</LuxeDate>
                </LuxeRight>
              </LuxeCard>
            ))}
          </LuxeGrid>
        )

      case "neon":
        return (
          <NeonGrid>
            {customerExamples.map((ex, i) => (
              <NeonCard key={ex.id} onClick={() => setSelectedExample(ex)}>
                <NeonIndex>
                  {"// "}
                  {String(i + 1).padStart(2, "0")}
                </NeonIndex>
                <NeonCouple>{ex.couple}</NeonCouple>
                <NeonMeta>
                  {ex.location} | {ex.date}
                </NeonMeta>
                <NeonTheme>THEME: {ex.theme.toUpperCase()}</NeonTheme>
              </NeonCard>
            ))}
          </NeonGrid>
        )

      default:
        return null
    }
  }

  return (
    <>
      <Section ref={sectionRef} $themeId={currentTheme} id='examples'>
        <Container>
          <Header $themeId={currentTheme} $visible={isVisible}>
            <Eyebrow $themeId={currentTheme}>Portfolio</Eyebrow>
            <Title $themeId={currentTheme}>
              {currentTheme === "contemporary" ? "REAL COUPLES" : "Echte Paare"}
            </Title>
            <Subtitle $themeId={currentTheme}>
              Entdecke, wie andere Paare ihren großen Tag digital präsentiert
              haben.
            </Subtitle>
          </Header>

          {renderCards()}
        </Container>
      </Section>

      {/* Modal */}
      {selectedExample && (
        <ModalOverlay onClick={() => setSelectedExample(null)}>
          <ModalClose onClick={() => setSelectedExample(null)}>×</ModalClose>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {/* Hero Section */}
            <ModalHero $clientTheme={selectedExample.id}>
              <HeroEyebrow $clientTheme={selectedExample.id}>
                Wir heiraten
              </HeroEyebrow>
              <HeroTitle $clientTheme={selectedExample.id}>
                {selectedExample.couple}
              </HeroTitle>
              <HeroDate $clientTheme={selectedExample.id}>
                {selectedExample.date} • {selectedExample.location}
              </HeroDate>
            </ModalHero>

            {/* Love Story Section */}
            <ModalLoveStory $clientTheme={selectedExample.id}>
              <LoveStoryTitle $clientTheme={selectedExample.id}>
                Unsere Geschichte
              </LoveStoryTitle>
              <LoveStoryText $clientTheme={selectedExample.id}>
                {selectedExample.story}
              </LoveStoryText>
            </ModalLoveStory>

            {/* Countdown Section */}
            <ModalCountdown $clientTheme={selectedExample.id}>
              <CountdownTitle $clientTheme={selectedExample.id}>
                Countdown bis zum großen Tag
              </CountdownTitle>
              <CountdownNumbers>
                <CountdownItem $clientTheme={selectedExample.id}>
                  <div className='number'>127</div>
                  <div className='label'>Tage</div>
                </CountdownItem>
                <CountdownItem $clientTheme={selectedExample.id}>
                  <div className='number'>14</div>
                  <div className='label'>Stunden</div>
                </CountdownItem>
                <CountdownItem $clientTheme={selectedExample.id}>
                  <div className='number'>38</div>
                  <div className='label'>Minuten</div>
                </CountdownItem>
                <CountdownItem $clientTheme={selectedExample.id}>
                  <div className='number'>52</div>
                  <div className='label'>Sekunden</div>
                </CountdownItem>
              </CountdownNumbers>
            </ModalCountdown>

            {/* RSVP Section */}
            <ModalRSVP $clientTheme={selectedExample.id}>
              <RSVPTitle $clientTheme={selectedExample.id}>
                Seid ihr dabei?
              </RSVPTitle>
              <RSVPSubtitle $clientTheme={selectedExample.id}>
                Wir freuen uns auf eure Zusage!
              </RSVPSubtitle>
              <RSVPButton $clientTheme={selectedExample.id}>
                Jetzt zusagen
              </RSVPButton>
            </ModalRSVP>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  )
}

export default ExamplesShowcase
