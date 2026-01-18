// src/components/marketing/ComponentsShowcase.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// KEYFRAME ANIMATIONS
// ============================================

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const luxeFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const neonGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.3), 0 0 40px rgba(0,255,255,0.1); }
  50% { box-shadow: 0 0 30px rgba(0,255,255,0.5), 0 0 60px rgba(0,255,255,0.2); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const botanicalSway = keyframes`
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
`;

const scrollBounce = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
`;

const scrollBounceUp = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-8px); }
`;

// ============================================
// ALL COMPONENTS DATA
// ============================================

const allComponents = [
  // Immer inklusive
  { icon: '🏠', title: 'Hero Section', description: 'Der erste Eindruck zählt – atemberaubend inszeniert.', included: true },
  { icon: '💑', title: 'Love Story', description: 'Eure Geschichte, wunderschön erzählt.', included: true },
  { icon: '💌', title: 'RSVP', description: 'Einfache Anmeldung für eure Gäste.', included: true },
  { icon: '🔐', title: 'Admin Login', description: 'Verwaltet eure RSVP-Anmeldungen.', included: true },
  // Optionale Komponenten
  { icon: '📅', title: 'Timeline', description: 'Euer Tagesablauf elegant dargestellt.' },
  { icon: '⏰', title: 'Countdown', description: 'Spannung bis zum großen Tag.' },
  { icon: '📸', title: 'Galerie', description: 'Eure schönsten Momente im Spotlight.' },
  { icon: '📍', title: 'Location', description: 'Interaktive Karten für alle Orte.' },
  { icon: '📝', title: 'Gästebuch', description: 'Liebevolle Nachrichten sammeln.' },
  { icon: '👔', title: 'Dresscode', description: 'Stilvolle Kleiderordnung kommuniziert.' },
  { icon: '💍', title: 'Wedding Party', description: 'Trauzeugen & Brautjungfern vorstellen.' },
  { icon: '🏨', title: 'Unterkünfte', description: 'Hotel-Empfehlungen für eure Gäste.' },
  { icon: '🎁', title: 'Geschenke', description: 'Wunschliste elegant präsentiert.' },
  { icon: '🎵', title: 'Musikwünsche', description: 'Gäste wählen die Playlist mit.' },
  { icon: '❓', title: 'FAQ', description: 'Alle Fragen vorab beantwortet.' },
  { icon: '✉️', title: 'Kontakt', description: 'Direkte Kommunikation ermöglichen.' },
  { icon: '🚗', title: 'Anfahrt', description: 'Wegbeschreibung & Parkmöglichkeiten.' },
];

// ============================================
// SECTION WRAPPER
// ============================================

const Section = styled.section`
  padding: 140px 5%;
  position: relative;
  overflow: hidden;
  
  ${p => p.$themeId === 'editorial' && css`
    background: #1A1A1A;
  `}
  
  ${p => p.$themeId === 'gold' && css`
    background: linear-gradient(180deg, #0A0A0A 0%, #151510 100%);
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    background: linear-gradient(180deg, #2D3B2D 0%, #1F2B1F 100%);
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    background: #0D0D0D;
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    background: #FAF9F7;
    min-height: 100vh;
  `}
  
  ${p => p.$themeId === 'neon' && css`
    background: #0a0a0f;
    padding: 0;
    min-height: auto;
  `}
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

// ============================================
// HEADER STYLES
// ============================================

const Header = styled.div`
  margin-bottom: 80px;
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${p => p.$themeId === 'luxe' && css`
    margin-bottom: 60px;
  `}
  
  ${p => p.$themeId === 'neon' && css`
    position: sticky;
    top: 120px;
    z-index: 10;
    padding: 20px 0;
    background: linear-gradient(180deg, #0a0a0f 0%, rgba(10,10,15,0.9) 80%, transparent 100%);
    margin-bottom: 40px;
  `}
`;

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 1rem;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    background: linear-gradient(90deg, #D4AF37, #F4D03F, #D4AF37);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 3s linear infinite;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #8B9D83;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #FF6B6B;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: #B4A08C;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ff00ff;
    text-shadow: 0 0 10px rgba(255,0,255,0.5);
  `}
`;

const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 400;
    font-style: italic;
    color: #FFFFFF;
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    color: #FFFFFF;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 400;
    color: #FFFFFF;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    color: #FFFFFF;
    text-transform: uppercase;
    line-height: 0.9;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 300;
    color: #2A2A2A;
    letter-spacing: 0.02em;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #00ffff;
    text-shadow: 0 0 20px rgba(0,255,255,0.5);
  `}
`;

const Subtitle = styled.p`
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.6);`}
  ${p => p.$themeId === 'gold' && css`font-family: 'Montserrat', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; font-size: 1.05rem; color: rgba(255,255,255,0.7);`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; color: rgba(255,255,255,0.7);`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; font-size: 0.9rem; color: #888; letter-spacing: 0.02em;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.6);`}
`;

// ============================================
// EDITORIAL - Clean Grid
// ============================================

const EditorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const EditorialCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 30px;
  transition: all 0.4s ease;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition-delay: ${p => p.$delay}s;
  
  &:hover {
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.15);
    transform: translateY(-5px);
  }
`;

const EditorialIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const EditorialTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0 0 8px 0;
`;

const EditorialDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
  margin: 0;
  line-height: 1.5;
`;

const EditorialBadge = styled.span`
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1A1A1A;
  background: #FFFFFF;
  padding: 4px 8px;
  margin-bottom: 12px;
`;

// ============================================
// GOLD - Elegant Horizontal Scroll Cards
// ============================================

const GoldScrollContainer = styled.div`
  overflow-x: auto;
  padding-bottom: 20px;
  margin: 0 -5%;
  padding-left: 5%;
  padding-right: 5%;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(212,175,55,0.1);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(212,175,55,0.3);
    border-radius: 2px;
  }
`;

const GoldCardsRow = styled.div`
  display: flex;
  gap: 25px;
  padding: 10px 0;
`;

const GoldCard = styled.div`
  flex: 0 0 280px;
  background: linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(212,175,55,0.02) 100%);
  border: 1px solid rgba(212,175,55,0.2);
  padding: 35px 30px;
  transition: all 0.5s ease;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '50px'});
  transition-delay: ${p => p.$delay}s;
  
  &:hover {
    border-color: rgba(212,175,55,0.5);
    box-shadow: 0 10px 40px rgba(212,175,55,0.15);
    transform: translateY(-8px);
  }
`;

const GoldIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 20px;
  filter: grayscale(100%) sepia(100%) hue-rotate(5deg) saturate(300%);
`;

const GoldTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 500;
  color: #D4AF37;
  margin: 0 0 10px 0;
`;

const GoldDesc = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
  margin: 0;
  line-height: 1.6;
`;

const GoldBadge = styled.span`
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #0A0A0A;
  background: linear-gradient(135deg, #D4AF37, #F4D03F);
  padding: 4px 10px;
  margin-bottom: 15px;
`;

// ============================================
// BOTANICAL - Organic Masonry with Sway
// ============================================

const BotanicalMasonry = styled.div`
  column-count: 4;
  column-gap: 25px;
  
  @media (max-width: 1100px) { column-count: 3; }
  @media (max-width: 768px) { column-count: 2; }
  @media (max-width: 500px) { column-count: 1; }
`;

const BotanicalCard = styled.div`
  break-inside: avoid;
  margin-bottom: 25px;
  background: rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 30px;
  transition: all 0.5s ease;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'}) rotate(${p => p.$rotate || 0}deg);
  transition-delay: ${p => p.$delay}s;
  
  &:hover {
    background: rgba(255,255,255,0.12);
    animation: ${botanicalSway} 2s ease-in-out infinite;
  }
  
  &:nth-child(odd) {
    padding-top: ${p => 30 + (p.$index % 3) * 15}px;
  }
`;

const BotanicalIcon = styled.div`
  font-size: 2.2rem;
  margin-bottom: 15px;
`;

const BotanicalTitle = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: #FFFFFF;
  margin: 0 0 8px 0;
`;

const BotanicalDesc = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
  margin: 0;
  line-height: 1.6;
`;

const BotanicalBadge = styled.span`
  display: inline-block;
  font-family: 'Lato', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2D3B2D;
  background: #8B9D83;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 12px;
`;

// ============================================
// CONTEMPORARY - Bold Grid with Numbers
// ============================================

const ContemporaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  
  @media (max-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const ContemporaryCard = styled.div`
  background: #FFFFFF;
  padding: 30px;
  position: relative;
  transition: all 0.3s ease;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: scale(${p => p.$visible ? 1 : 0.9});
  transition-delay: ${p => p.$delay}s;
  
  &:hover {
    background: #FF6B6B;
    transform: scale(1.02);
    z-index: 2;
    
    h3, p, span { color: #FFFFFF; }
  }
`;

const ContemporaryNumber = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  color: #F0F0F0;
  position: absolute;
  top: 10px;
  right: 15px;
  line-height: 1;
  transition: color 0.3s ease;
`;

const ContemporaryIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const ContemporaryTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #0D0D0D;
  text-transform: uppercase;
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const ContemporaryDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
  transition: color 0.3s ease;
`;

const ContemporaryBadge = styled.span`
  display: inline-block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #FFFFFF;
  background: #0D0D0D;
  padding: 4px 8px;
  margin-bottom: 10px;
  transition: background 0.3s ease;
`;

// ============================================
// LUXE - Floating Minimal Cards
// ============================================

const LuxeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px 60px;
  max-width: 1100px;
  margin: 0 auto;
`;

const LuxeCard = styled.div`
  flex: 0 0 200px;
  text-align: center;
  padding: 40px 20px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${p => p.$delay}s;
  animation: ${p => p.$visible ? css`${luxeFloat} ${4 + p.$index * 0.3}s ease-in-out infinite` : 'none'};
  animation-delay: ${p => p.$index * 0.2}s;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const LuxeLine = styled.div`
  width: 30px;
  height: 1px;
  background: #B4A08C;
  margin: 0 auto 20px;
  opacity: 0.5;
`;

const LuxeIcon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 20px;
  filter: grayscale(50%);
`;

const LuxeTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: #2A2A2A;
  margin: 0 0 10px 0;
  letter-spacing: 0.02em;
`;

const LuxeDesc = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  color: #999;
  margin: 0;
  line-height: 1.7;
  letter-spacing: 0.01em;
`;

const LuxeBadge = styled.span`
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #B4A08C;
  border: 1px solid #B4A08C;
  padding: 3px 8px;
  margin-bottom: 15px;
`;

// ============================================
// NEON - Force Scroll Single Card View
// ============================================

const NeonWrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0,255,255,0.05);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0,255,255,0.3);
  }
`;

const NeonSlide = styled.div`
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 5%;
  box-sizing: border-box;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(0,255,255,0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const NeonCard = styled.div`
  max-width: 700px;
  width: 100%;
  text-align: center;
  padding: 60px;
  background: rgba(0,255,255,0.02);
  border: 1px solid rgba(0,255,255,0.2);
  position: relative;
  animation: ${neonGlow} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

const NeonIconWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  background: rgba(0,255,255,0.05);
  border: 1px solid rgba(0,255,255,0.2);
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    font-size: 3rem;
  }
`;

const NeonContent = styled.div``;

const NeonTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #00ffff;
  margin: 0 0 15px 0;
  text-shadow: 0 0 20px rgba(0,255,255,0.5);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const NeonDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  color: rgba(255,255,255,0.6);
  margin: 0;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NeonBadge = styled.span`
  display: inline-block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #0a0a0f;
  background: #00ffff;
  padding: 6px 14px;
  margin-bottom: 20px;
  box-shadow: 0 0 15px rgba(0,255,255,0.4);
`;

const NeonCounter = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: #ff00ff;
  letter-spacing: 0.3em;
  text-shadow: 0 0 10px rgba(255,0,255,0.5);
`;

const NeonScrollHint = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0,255,255,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  animation: ${p => p.$direction === 'down' ? scrollBounce : scrollBounceUp} 2s ease-in-out infinite;
  
  ${p => p.$direction === 'up' && css`
    top: 20px;
  `}
  
  ${p => p.$direction === 'down' && css`
    bottom: 80px;
  `}
`;

const NeonHeader = styled.div`
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 5%;
  box-sizing: border-box;
  position: relative;
  text-align: center;
`;

// ============================================
// COMPONENT
// ============================================

function ComponentsShowcase() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const neonWrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const renderEditorial = () => (
    <EditorialGrid>
      {allComponents.map((comp, i) => (
        <EditorialCard key={comp.title} $visible={isVisible} $delay={0.05 + i * 0.03}>
          {comp.included && <EditorialBadge>Inklusive</EditorialBadge>}
          <EditorialIcon>{comp.icon}</EditorialIcon>
          <EditorialTitle>{comp.title}</EditorialTitle>
          <EditorialDesc>{comp.description}</EditorialDesc>
        </EditorialCard>
      ))}
    </EditorialGrid>
  );

  const renderGold = () => (
    <GoldScrollContainer>
      <GoldCardsRow>
        {allComponents.map((comp, i) => (
          <GoldCard key={comp.title} $visible={isVisible} $delay={0.05 + i * 0.05}>
            {comp.included && <GoldBadge>Inklusive</GoldBadge>}
            <GoldIcon>{comp.icon}</GoldIcon>
            <GoldTitle>{comp.title}</GoldTitle>
            <GoldDesc>{comp.description}</GoldDesc>
          </GoldCard>
        ))}
      </GoldCardsRow>
    </GoldScrollContainer>
  );

  const renderBotanical = () => (
    <BotanicalMasonry>
      {allComponents.map((comp, i) => (
        <BotanicalCard 
          key={comp.title} 
          $visible={isVisible} 
          $delay={0.05 + i * 0.04}
          $index={i}
          $rotate={(i % 3 - 1) * 1}
        >
          {comp.included && <BotanicalBadge>Inklusive</BotanicalBadge>}
          <BotanicalIcon>{comp.icon}</BotanicalIcon>
          <BotanicalTitle>{comp.title}</BotanicalTitle>
          <BotanicalDesc>{comp.description}</BotanicalDesc>
        </BotanicalCard>
      ))}
    </BotanicalMasonry>
  );

  const renderContemporary = () => (
    <ContemporaryGrid>
      {allComponents.map((comp, i) => (
        <ContemporaryCard key={comp.title} $visible={isVisible} $delay={0.03 + i * 0.02}>
          <ContemporaryNumber>{String(i + 1).padStart(2, '0')}</ContemporaryNumber>
          {comp.included && <ContemporaryBadge>Inklusive</ContemporaryBadge>}
          <ContemporaryIcon>{comp.icon}</ContemporaryIcon>
          <ContemporaryTitle>{comp.title}</ContemporaryTitle>
          <ContemporaryDesc>{comp.description}</ContemporaryDesc>
        </ContemporaryCard>
      ))}
    </ContemporaryGrid>
  );

  const renderLuxe = () => (
    <LuxeContainer>
      {allComponents.map((comp, i) => (
        <LuxeCard key={comp.title} $visible={isVisible} $delay={0.1 + i * 0.05} $index={i}>
          <LuxeLine />
          {comp.included && <LuxeBadge>Inklusive</LuxeBadge>}
          <LuxeIcon>{comp.icon}</LuxeIcon>
          <LuxeTitle>{comp.title}</LuxeTitle>
          <LuxeDesc>{comp.description}</LuxeDesc>
        </LuxeCard>
      ))}
    </LuxeContainer>
  );

  const renderNeon = () => (
    <NeonWrapper ref={neonWrapperRef}>
      {/* Header Slide */}
      <NeonHeader>
        <Eyebrow $themeId="neon">Komponenten</Eyebrow>
        <Title $themeId="neon">FEATURE STACK</Title>
        <Subtitle $themeId="neon">Scrolle durch alle 17 Komponenten – 4 davon immer inklusive.</Subtitle>
        <NeonScrollHint $direction="down">
          <span>Scroll Down</span>
          <span>↓</span>
        </NeonScrollHint>
      </NeonHeader>
      
      {/* Component Slides */}
      {allComponents.map((comp, i) => (
        <NeonSlide key={comp.title}>
          <NeonCard>
            <NeonIconWrapper>{comp.icon}</NeonIconWrapper>
            <NeonContent>
              {comp.included && <NeonBadge>Inklusive</NeonBadge>}
              <NeonTitle>{comp.title}</NeonTitle>
              <NeonDesc>{comp.description}</NeonDesc>
            </NeonContent>
            <NeonCounter>
              [ {String(i + 1).padStart(2, '0')} / {String(allComponents.length).padStart(2, '0')} ]
            </NeonCounter>
          </NeonCard>
          
          {i > 0 && (
            <NeonScrollHint $direction="up">
              <span>↑</span>
              <span>Scroll Up</span>
            </NeonScrollHint>
          )}
          
          {i < allComponents.length - 1 && (
            <NeonScrollHint $direction="down">
              <span>Scroll Down</span>
              <span>↓</span>
            </NeonScrollHint>
          )}
        </NeonSlide>
      ))}
    </NeonWrapper>
  );

  const renderComponents = () => {
    switch (currentTheme) {
      case 'editorial': return renderEditorial();
      case 'gold': return renderGold();
      case 'botanical': return renderBotanical();
      case 'contemporary': return renderContemporary();
      case 'luxe': return renderLuxe();
      default: return renderEditorial();
    }
  };

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="components">
      {currentTheme === 'neon' ? (
        renderNeon()
      ) : (
        <Container>
          <Header $visible={isVisible} $themeId={currentTheme}>
            <Eyebrow $themeId={currentTheme}>
              {currentTheme === 'luxe' ? 'Unsere Bausteine' : 'Komponenten'}
            </Eyebrow>
            <Title $themeId={currentTheme}>
              {currentTheme === 'editorial' && 'Alles was ihr braucht'}
              {currentTheme === 'gold' && 'Exquisite Bausteine'}
              {currentTheme === 'botanical' && 'Natürlich vielfältig'}
              {currentTheme === 'contemporary' && 'ALL-IN-ONE'}
              {currentTheme === 'luxe' && 'Sorgfältig kuratiert'}
            </Title>
            <Subtitle $themeId={currentTheme}>
              {currentTheme === 'luxe' 
                ? 'Jede Komponente mit der gleichen Hingabe gestaltet wie ein Gericht in einem Sternerestaurant.'
                : 'Wählt aus 17 liebevoll gestalteten Komponenten – 4 davon immer inklusive.'
              }
            </Subtitle>
          </Header>

          {renderComponents()}
        </Container>
      )}
    </Section>
  );
}

export default ComponentsShowcase;
