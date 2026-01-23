// src/components/marketing/MarketingHero.js
import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// KEYFRAME ANIMATIONS
// ============================================

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scrollBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

// Editorial - Moving text lines
const editorialScroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// Gold - Shimmer effect
const goldShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const goldFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(3deg); }
`;

const goldSparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

// Botanical - Floating elements
const botanicalFloat1 = keyframes`
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
  25% { transform: translateY(-30px) translateX(10px) rotate(5deg); }
  50% { transform: translateY(-15px) translateX(-5px) rotate(-3deg); }
  75% { transform: translateY(-40px) translateX(15px) rotate(8deg); }
`;

const botanicalFloat2 = keyframes`
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
  33% { transform: translateY(-25px) translateX(-15px) rotate(-5deg); }
  66% { transform: translateY(-10px) translateX(10px) rotate(3deg); }
`;

const botanicalFloat3 = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-35px) rotate(-10deg); }
`;

// Contemporary - Gradient shift
const contemporaryGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const contemporaryPulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

// Luxe - Subtle reveal
const luxeReveal = keyframes`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`;

const luxeLine = keyframes`
  0% { width: 0; }
  100% { width: 60px; }
`;

// Neon - Flicker and glow
const neonFlicker = keyframes`
  0%, 100% { opacity: 1; text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
  92% { opacity: 1; }
  93% { opacity: 0.8; text-shadow: none; }
  94% { opacity: 1; text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
  96% { opacity: 0.9; text-shadow: 0 0 5px currentColor; }
  97% { opacity: 1; text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
`;

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.3), 0 0 40px rgba(255,0,255,0.2); }
  50% { box-shadow: 0 0 40px rgba(0,255,255,0.5), 0 0 80px rgba(255,0,255,0.3); }
`;

const neonScan = keyframes`
  0% { top: 0; opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

// ============================================
// MAIN SECTION
// ============================================

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 120px 5% 60px;
  box-sizing: border-box;
  
  ${p => p.$themeId === 'editorial' && css`
    background: #FFFFFF;
  `}
  
  ${p => p.$themeId === 'video' && css`
    background: linear-gradient(135deg, #0A0A0A 0%, #1A1510 50%, #0A0A0A 100%);
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    background: linear-gradient(180deg, #F8F6F0 0%, #EBE7DE 100%);
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
    background-size: 200% 200%;
    animation: ${contemporaryGradient} 8s ease infinite;
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    background: #FAF9F7;
  `}
  
  ${p => p.$themeId === 'neon' && css`
    background: #0a0a0f;
  `}
`;

// ============================================
// EDITORIAL BACKGROUND - Animated text lines
// ============================================

const EditorialBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0.04;
  pointer-events: none;
`;

const EditorialTextLine = styled.div`
  white-space: nowrap;
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: ${p => p.$size || '8vw'};
  font-style: italic;
  color: #000;
  animation: ${editorialScroll} ${p => p.$duration || '30s'} linear infinite;
  animation-direction: ${p => p.$reverse ? 'reverse' : 'normal'};
  
  span {
    display: inline-block;
    padding: 0 50px;
  }
`;

// ============================================
// GOLD BACKGROUND - Sparkles and particles
// ============================================

const GoldBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

const GoldGradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(212,175,55,0.1) 0%, transparent 50%);
`;

const GoldSparkle = styled.div`
  position: absolute;
  width: ${p => p.$size || '4px'};
  height: ${p => p.$size || '4px'};
  background: #D4AF37;
  border-radius: 50%;
  animation: ${goldSparkle} ${p => p.$duration || '3s'} ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  top: ${p => p.$top};
  left: ${p => p.$left};
  box-shadow: 0 0 10px #D4AF37, 0 0 20px rgba(212,175,55,0.5);
`;

const GoldLine = styled.div`
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent);
  width: 200px;
  top: ${p => p.$top};
  left: ${p => p.$left};
  transform: rotate(${p => p.$rotate || '0deg'});
  animation: ${goldFloat} ${p => p.$duration || '8s'} ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
`;

// ============================================
// BOTANICAL BACKGROUND - Floating plants
// ============================================

const BotanicalBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

const FloatingElement = styled.div`
  position: absolute;
  font-size: ${p => p.$size || '3rem'};
  opacity: ${p => p.$opacity || 0.6};
  animation: ${p => p.$animation === 1 ? botanicalFloat1 : p.$animation === 2 ? botanicalFloat2 : botanicalFloat3} 
             ${p => p.$duration || '10s'} ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  bottom: ${p => p.$bottom};
  filter: ${p => p.$blur ? `blur(${p.$blur})` : 'none'};
  transform-origin: center center;
`;

// ============================================
// CONTEMPORARY BACKGROUND
// ============================================

const ContemporaryBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

const ContemporaryShape = styled.div`
  position: absolute;
  border: 4px solid rgba(255,255,255,0.3);
  animation: ${contemporaryPulse} ${p => p.$duration || '4s'} ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  
  ${p => p.$shape === 'circle' && css`
    width: ${p.$size || '200px'};
    height: ${p.$size || '200px'};
    border-radius: 50%;
  `}
  
  ${p => p.$shape === 'square' && css`
    width: ${p.$size || '150px'};
    height: ${p.$size || '150px'};
  `}
  
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  bottom: ${p => p.$bottom};
`;

const ContemporaryText = styled.div`
  position: absolute;
  font-family: 'Space Grotesk', sans-serif;
  font-size: ${p => p.$size || '15vw'};
  font-weight: 700;
  color: rgba(255,255,255,0.08);
  text-transform: uppercase;
  white-space: nowrap;
  top: ${p => p.$top};
  left: ${p => p.$left};
`;

// ============================================
// LUXE BACKGROUND
// ============================================

const LuxeBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

const LuxeLine = styled.div`
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(180,160,140,0.2), transparent);
  top: ${p => p.$top};
  left: 0;
  right: 0;
`;

const LuxeAccent = styled.div`
  position: absolute;
  width: 1px;
  height: 100px;
  background: linear-gradient(180deg, transparent, rgba(180,160,140,0.3), transparent);
  top: ${p => p.$top};
  left: ${p => p.$left};
`;

// ============================================
// NEON BACKGROUND
// ============================================

const NeonBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

const NeonGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
`;

const NeonGlow = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  
  &:nth-child(1) {
    background: #00ffff;
    top: -100px;
    left: -100px;
  }
  
  &:nth-child(2) {
    background: #ff00ff;
    bottom: -100px;
    right: -100px;
  }
`;

const NeonScanLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,255,255,0.5), transparent);
  animation: ${neonScan} 4s linear infinite;
`;

// ============================================
// CONTENT CONTAINERS
// ============================================

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 60px;
  
  ${p => p.$themeId === 'editorial' && css`
    justify-content: space-between;
  `}
  
  ${p => p.$themeId === 'video' && css`
    justify-content: center;
    text-align: center;
    flex-direction: column;
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    justify-content: center;
    text-align: center;
    flex-direction: column;
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    justify-content: center;
    text-align: center;
    flex-direction: column;
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    justify-content: center;
    text-align: center;
    flex-direction: column;
  `}
  
  ${p => p.$themeId === 'neon' && css`
    justify-content: center;
    text-align: center;
    flex-direction: column;
  `}
  
  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Content = styled.div`
  flex: 1;
  max-width: ${p => p.$themeId === 'editorial' ? '600px' : '800px'};
  animation: ${fadeInUp} 1s ease-out;
`;

// Editorial Image Placeholder
const ImagePlaceholder = styled.div`
  flex: 1;
  max-width: 500px;
  aspect-ratio: 4/5;
  background: linear-gradient(135deg, #E0E0E0 0%, #F5F5F5 50%, #E0E0E0 100%);
  position: relative;
  animation: ${fadeInUp} 1s ease-out 0.3s both;
  
  &::before {
    content: '';
    position: absolute;
    inset: 20px;
    border: 1px solid rgba(0,0,0,0.1);
  }
  
  &::after {
    content: 'Euer Foto';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.5rem;
    font-style: italic;
    color: rgba(0,0,0,0.2);
  }
  
  @media (max-width: 900px) {
    max-width: 350px;
    order: -1;
  }
`;

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 1.5rem;
  animation: ${fadeInUp} 1s ease-out;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #999;
  `}
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #D4AF37;
    background: linear-gradient(90deg, #D4AF37, #F4D03F, #D4AF37);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${goldShimmer} 3s linear infinite;
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #8B9D83;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    
    &::before, &::after {
      content: '✿';
      font-size: 0.7rem;
    }
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #FFFFFF;
    background: rgba(0,0,0,0.2);
    padding: 10px 25px;
    display: inline-block;
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: #B4A08C;
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      background: #B4A08C;
      margin: 15px auto 0;
      animation: ${luxeLine} 1.5s ease-out 0.5s forwards;
    }
  `}
  
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #ff00ff;
    animation: ${neonFlicker} 4s ease-in-out infinite;
  `}
`;

const Title = styled.h1`
  margin: 0 0 1.5rem 0;
  animation: ${fadeInUp} 1s ease-out 0.2s both;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 400;
    font-style: italic;
    color: #1A1A1A;
    line-height: 1.1;
  `}
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 300;
    color: #FFFFFF;
    line-height: 1;
    
    span {
      display: block;
      background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: ${goldShimmer} 4s linear infinite;
    }
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 400;
    color: #2D3B2D;
    line-height: 1.1;
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(4rem, 12vw, 10rem);
    font-weight: 700;
    color: #FFFFFF;
    text-transform: uppercase;
    line-height: 0.9;
    text-shadow: 4px 4px 0 rgba(0,0,0,0.2);
    animation: ${fadeInUp} 1s ease-out 0.2s both, ${contemporaryPulse} 3s ease-in-out infinite 1s;
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 300;
    color: #2A2A2A;
    line-height: 1.2;
    letter-spacing: 0.02em;
    animation: ${fadeInUp} 1s ease-out 0.2s both, ${luxeReveal} 1.5s ease-out 0.5s both;
  `}
  
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(3.5rem, 9vw, 7rem);
    font-weight: 700;
    color: #00ffff;
    line-height: 1;
    text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff;
    animation: ${fadeInUp} 1s ease-out 0.2s both, ${neonFlicker} 5s ease-in-out infinite 1s;
  `}
`;

const Subtitle = styled.p`
  margin: 0 0 2.5rem 0;
  animation: ${fadeInUp} 1s ease-out 0.4s both;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    line-height: 1.7;
    color: #666;
    max-width: 450px;
  `}
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(255,255,255,0.6);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 1.15rem;
    line-height: 1.8;
    color: #5A6B5A;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.2rem;
    line-height: 1.6;
    color: rgba(255,255,255,0.9);
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.95rem;
    line-height: 2;
    color: #888;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    letter-spacing: 0.03em;
  `}
  
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    line-height: 1.7;
    color: rgba(255,255,255,0.7);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  animation: ${fadeInUp} 1s ease-out 0.6s both;
  
  ${p => (p.$themeId !== 'editorial') && css`
    justify-content: center;
  `}
  
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: ${p => p.$themeId === 'editorial' ? 'flex-start' : 'center'};
  }
`;

const PrimaryButton = styled.a`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #FFFFFF;
    background: #1A1A1A;
    padding: 18px 40px;
    &:hover { background: #333; transform: translateY(-3px); }
  `}
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #0A0A0A;
    background: linear-gradient(135deg, #D4AF37, #F4D03F);
    padding: 20px 50px;
    box-shadow: 0 10px 40px rgba(212,175,55,0.3);
    &:hover { 
      box-shadow: 0 15px 50px rgba(212,175,55,0.5);
      transform: translateY(-3px);
    }
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #FFFFFF;
    background: #8B9D83;
    padding: 18px 45px;
    border-radius: 50px;
    &:hover { background: #7A8C73; transform: translateY(-3px); }
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #0D0D0D;
    background: #FFFFFF;
    padding: 20px 50px;
    border: 4px solid #0D0D0D;
    box-shadow: 6px 6px 0 #0D0D0D;
    &:hover { 
      transform: translate(-3px, -3px);
      box-shadow: 9px 9px 0 #0D0D0D;
    }
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #2A2A2A;
    background: transparent;
    padding: 20px 50px;
    border: 1px solid #2A2A2A;
    &:hover { background: #2A2A2A; color: #FAF9F7; }
  `}
  
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #0a0a0f;
    background: #00ffff;
    padding: 18px 45px;
    box-shadow: 0 0 30px rgba(0,255,255,0.5);
    animation: ${neonPulse} 2s ease-in-out infinite;
    &:hover { 
      box-shadow: 0 0 50px rgba(0,255,255,0.8);
      transform: translateY(-3px);
    }
  `}
`;

const SecondaryButton = styled.a`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: #1A1A1A;
    background: transparent;
    padding: 18px 40px;
    border: 1px solid #E0E0E0;
    &:hover { border-color: #1A1A1A; }
  `}
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    background: transparent;
    padding: 20px 50px;
    border: 1px solid rgba(212,175,55,0.3);
    &:hover { border-color: #D4AF37; color: #D4AF37; }
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #2D3B2D;
    background: transparent;
    padding: 18px 45px;
    border: 2px solid #8B9D83;
    border-radius: 50px;
    &:hover { background: rgba(139,157,131,0.1); }
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #FFFFFF;
    background: transparent;
    padding: 20px 50px;
    border: 4px solid #FFFFFF;
    &:hover { background: rgba(255,255,255,0.1); }
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #888;
    background: transparent;
    padding: 20px 50px;
    &:hover { color: #2A2A2A; }
  `}
  
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #ff00ff;
    background: transparent;
    padding: 18px 45px;
    border: 2px solid rgba(255,0,255,0.5);
    &:hover { 
      border-color: #ff00ff;
      box-shadow: 0 0 20px rgba(255,0,255,0.3);
    }
  `}
`;

// ============================================
// SCROLL INDICATOR
// ============================================

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.3s ease;
  z-index: 10;
  
  ${p => p.$themeId === 'editorial' && css`
    color: #999;
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
  `}
  
  ${p => p.$themeId === 'video' && css`
    color: #D4AF37;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    color: #8B9D83;
    font-family: 'Lato', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    color: #FFFFFF;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    color: #B4A08C;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.3em;
  `}
  
  ${p => p.$themeId === 'neon' && css`
    color: #00ffff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.7rem;
    text-shadow: 0 0 10px currentColor;
  `}
`;

const ScrollArrow = styled.div`
  animation: ${scrollBounce} 2s ease-in-out infinite;
  font-size: 1.2rem;
`;

// ============================================
// COMPONENT
// ============================================

function MarketingHero() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

  useEffect(() => {
    const checkOverlap = () => {
      if (!sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Hide scroll indicator if content might overlap
      const contentBottom = sectionRect.top + sectionRect.height - 100;
      setScrollIndicatorVisible(contentBottom > viewportHeight - 80);
    };

    checkOverlap();
    window.addEventListener('resize', checkOverlap);
    window.addEventListener('scroll', () => {
      setScrollIndicatorVisible(window.scrollY < 50);
    });
    
    return () => {
      window.removeEventListener('resize', checkOverlap);
    };
  }, []);

  const renderBackground = () => {
    switch (currentTheme) {
      case 'editorial':
        return (
          <EditorialBackground>
            <EditorialTextLine $size="10vw" $duration="40s" style={{ top: '10%' }}>
              <span>Wedding • Love • Forever • Together • Celebrate</span>
              <span>Wedding • Love • Forever • Together • Celebrate</span>
              <span>Wedding • Love • Forever • Together • Celebrate</span>
            </EditorialTextLine>
            <EditorialTextLine $size="8vw" $duration="35s" $reverse style={{ top: '35%' }}>
              <span>Digital Couture • Premium Design • Handcrafted</span>
              <span>Digital Couture • Premium Design • Handcrafted</span>
              <span>Digital Couture • Premium Design • Handcrafted</span>
            </EditorialTextLine>
            <EditorialTextLine $size="12vw" $duration="45s" style={{ top: '60%' }}>
              <span>S&I • Wedding Websites • Elegant</span>
              <span>S&I • Wedding Websites • Elegant</span>
              <span>S&I • Wedding Websites • Elegant</span>
            </EditorialTextLine>
            <EditorialTextLine $size="7vw" $duration="30s" $reverse style={{ top: '85%' }}>
              <span>Timeless • Romantic • Beautiful • Unique</span>
              <span>Timeless • Romantic • Beautiful • Unique</span>
              <span>Timeless • Romantic • Beautiful • Unique</span>
            </EditorialTextLine>
          </EditorialBackground>
        );
        
      case 'gold':
        return (
          <GoldBackground>
            <GoldGradientOverlay />
            {[...Array(15)].map((_, i) => (
              <GoldSparkle 
                key={i}
                $size={`${3 + Math.random() * 4}px`}
                $top={`${Math.random() * 100}%`}
                $left={`${Math.random() * 100}%`}
                $duration={`${2 + Math.random() * 3}s`}
                $delay={`${Math.random() * 3}s`}
              />
            ))}
            <GoldLine $top="20%" $left="10%" $rotate="-15deg" $duration="10s" />
            <GoldLine $top="40%" $left="70%" $rotate="20deg" $duration="12s" $delay="2s" />
            <GoldLine $top="70%" $left="30%" $rotate="-10deg" $duration="8s" $delay="1s" />
          </GoldBackground>
        );
        
      case 'botanical':
        return (
          <BotanicalBackground>
            <FloatingElement $top="10%" $left="5%" $size="4rem" $animation={1} $duration="12s" $opacity={0.4}>🌿</FloatingElement>
            <FloatingElement $top="20%" $right="10%" $size="3rem" $animation={2} $duration="10s" $delay="1s" $opacity={0.5}>🍃</FloatingElement>
            <FloatingElement $top="60%" $left="8%" $size="2.5rem" $animation={3} $duration="14s" $delay="2s" $opacity={0.3} $blur="2px">🌸</FloatingElement>
            <FloatingElement $top="70%" $right="15%" $size="3.5rem" $animation={1} $duration="11s" $delay="0.5s" $opacity={0.45}>🌺</FloatingElement>
            <FloatingElement $top="40%" $left="3%" $size="2rem" $animation={2} $duration="13s" $delay="3s" $opacity={0.25} $blur="1px">🌼</FloatingElement>
            <FloatingElement $bottom="15%" $left="20%" $size="3rem" $animation={3} $duration="9s" $delay="1.5s" $opacity={0.35}>🍀</FloatingElement>
            <FloatingElement $top="15%" $right="25%" $size="2.5rem" $animation={1} $duration="15s" $delay="2.5s" $opacity={0.3} $blur="3px">🌱</FloatingElement>
            <FloatingElement $bottom="25%" $right="5%" $size="4rem" $animation={2} $duration="11s" $opacity={0.4}>🌾</FloatingElement>
          </BotanicalBackground>
        );
        
      case 'contemporary':
        return (
          <ContemporaryBackground>
            <ContemporaryText $size="25vw" $top="5%" $left="-5%">WOW</ContemporaryText>
            <ContemporaryText $size="20vw" $top="60%" $left="50%">LOVE</ContemporaryText>
            <ContemporaryShape $shape="circle" $size="300px" $top="-50px" $right="-50px" $duration="5s" />
            <ContemporaryShape $shape="square" $size="200px" $bottom="10%" $left="5%" $duration="4s" $delay="1s" />
            <ContemporaryShape $shape="circle" $size="150px" $top="40%" $right="10%" $duration="6s" $delay="2s" />
          </ContemporaryBackground>
        );
        
      case 'luxe':
        return (
          <LuxeBackground>
            <LuxeLine $top="25%" />
            <LuxeLine $top="50%" />
            <LuxeLine $top="75%" />
            <LuxeAccent $top="15%" $left="10%" />
            <LuxeAccent $top="35%" $left="90%" />
            <LuxeAccent $top="65%" $left="20%" />
          </LuxeBackground>
        );
        
      case 'neon':
        return (
          <NeonBackground>
            <NeonGlow />
            <NeonGlow />
            <NeonGrid />
            <NeonScanLine />
          </NeonBackground>
        );
        
      default:
        return null;
    }
  };

  return (
    <Section ref={sectionRef} $themeId={currentTheme}>
      {renderBackground()}
      
      <Container $themeId={currentTheme}>
        <Content $themeId={currentTheme}>
          <Eyebrow $themeId={currentTheme}>
            {currentTheme === 'editorial' && 'Premium Wedding Websites'}
            {currentTheme === 'video' && '✦ Exklusiv & Elegant ✦'}
            {currentTheme === 'botanical' && 'Natürlich Schön'}
            {currentTheme === 'contemporary' && 'Bold & Beautiful'}
            {currentTheme === 'luxe' && 'Maßgeschneidert'}
            {currentTheme === 'neon' && '// DIGITAL LOVE //'}
          </Eyebrow>
          
          <Title $themeId={currentTheme}>
            {currentTheme === 'editorial' && 'Eure Geschichte, digital erzählt.'}
            {currentTheme === 'video' && <><span>Zeitlose</span> Eleganz</>}
            {currentTheme === 'botanical' && 'Wo Liebe erblüht'}
            {currentTheme === 'contemporary' && 'MAKE IT COUNT'}
            {currentTheme === 'luxe' && 'Die Kunst der Einfachheit'}
            {currentTheme === 'neon' && 'NEXT LEVEL WEDDING'}
          </Title>
          
          <Subtitle $themeId={currentTheme}>
            {currentTheme === 'editorial' && 'Wir gestalten einzigartige Hochzeitswebsites, die eure Liebe feiern und eure Gäste begeistern.'}
            {currentTheme === 'video' && 'Luxuriöse Hochzeitswebsites für Paare mit Anspruch. Jedes Detail, perfekt inszeniert.'}
            {currentTheme === 'botanical' && 'Organisch schön, liebevoll gestaltet. Hochzeitswebsites, die sich anfühlen wie ein Spaziergang durch einen blühenden Garten.'}
            {currentTheme === 'contemporary' && 'Keine langweiligen Templates. Keine Kompromisse. Nur pure Kreativität für euren großen Tag.'}
            {currentTheme === 'luxe' && 'Weniger ist mehr. Entdeckt die Schönheit des Wesentlichen in einer Hochzeitswebsite, die Bände spricht.'}
            {currentTheme === 'neon' && 'Digitale Hochzeits-Experience der nächsten Generation. Cutting-edge Design trifft auf ewige Liebe.'}
          </Subtitle>
          
          <ButtonGroup $themeId={currentTheme}>
            <PrimaryButton href="#contact" $themeId={currentTheme}>
              {currentTheme === 'luxe' ? 'Beratung anfragen' : 'Jetzt starten'}
            </PrimaryButton>
            <SecondaryButton href="#themes" $themeId={currentTheme}>
              {currentTheme === 'luxe' ? 'Portfolio' : 'Designs entdecken'}
            </SecondaryButton>
          </ButtonGroup>
        </Content>
        
        {currentTheme === 'editorial' && <ImagePlaceholder />}
      </Container>
      
      <ScrollIndicator $themeId={currentTheme} $visible={scrollIndicatorVisible}>
        <span>Scroll</span>
        <ScrollArrow>↓</ScrollArrow>
      </ScrollIndicator>
    </Section>
  );
}

export default MarketingHero;
