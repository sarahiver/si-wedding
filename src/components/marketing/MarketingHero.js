// src/components/marketing/MarketingHero.js
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============ KEYFRAMES ============
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const floatReverse = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(20px) rotate(-5deg); }
`;

const glitchText = keyframes`
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(-3px, -3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(3px, -3px); }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.3), inset 0 0 20px rgba(0,255,255,0.1); }
  50% { box-shadow: 0 0 40px rgba(0,255,255,0.6), inset 0 0 30px rgba(0,255,255,0.2); }
`;

const drawLine = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const drawLineVertical = keyframes`
  from { height: 0; }
  to { height: 100%; }
`;

const botanicalFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.15; }
  50% { transform: translateY(-15px) rotate(3deg) scale(1.05); opacity: 0.2; }
`;

// ============ SECTION ============
const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  ${p => p.$themeId === 'video' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'editorial' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`background: linear-gradient(180deg, #F8F6F0 0%, #EBE7DE 100%);`}
  ${p => p.$themeId === 'contemporary' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'luxe' && css`background: #0a0a0a;`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
`;

// ============ VIDEO BACKGROUND ============
const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`;

// ============ LUXE BACKGROUND IMAGE ============
const LuxeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10, 10, 10, 0.5) 0%,
      rgba(10, 10, 10, 0.3) 50%,
      rgba(10, 10, 10, 0.7) 100%
    );
  }
`;

// ============ EDITORIAL LINES ============
const EditorialLines = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
`;

const HorizontalLine = styled.div`
  position: absolute;
  left: 0;
  height: 1px;
  background: #E0E0E0;
  animation: ${drawLine} 2s ease forwards;
  animation-delay: ${p => p.$delay || '0s'};
  width: 0;
  
  ${p => p.$top && css`top: ${p.$top};`}
  ${p => p.$bottom && css`bottom: ${p.$bottom};`}
`;

const VerticalLine = styled.div`
  position: absolute;
  top: 0;
  width: 1px;
  background: #E0E0E0;
  animation: ${drawLineVertical} 2s ease forwards;
  animation-delay: ${p => p.$delay || '0s'};
  height: 0;
  
  ${p => p.$left && css`left: ${p.$left};`}
  ${p => p.$right && css`right: ${p.$right};`}
`;

// ============ CONTEMPORARY LAYOUT ============
const ContemporaryLayout = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ContemporaryLeft = styled.div`
  position: relative;
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 5% 80px 8%;
  z-index: 2;
`;

const ContemporaryRight = styled.div`
  position: relative;
  background: linear-gradient(160deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(255,255,255,0.03) 40px,
        rgba(255,255,255,0.03) 41px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 40px,
        rgba(255,255,255,0.03) 40px,
        rgba(255,255,255,0.03) 41px
      );
  }
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const ContemporaryShapes = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const Circle = styled.div`
  position: absolute;
  width: ${p => p.$size || '80px'};
  height: ${p => p.$size || '80px'};
  border-radius: 50%;
  background: ${p => p.$gradient ? 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)' : p.$color || '#FF6B6B'};
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  bottom: ${p => p.$bottom};
  animation: ${p => p.$reverse ? floatReverse : floatSlow} ${p => p.$duration || '8s'} ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
`;

const Square = styled.div`
  position: absolute;
  width: ${p => p.$size || '30px'};
  height: ${p => p.$size || '30px'};
  background: ${p => p.$color || '#FFE66D'};
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  bottom: ${p => p.$bottom};
  animation: ${p => p.$reverse ? floatReverse : floatSlow} ${p => p.$duration || '6s'} ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  
  ${p => p.$outline && css`
    background: transparent;
    border: 2px solid ${p.$color || '#1A1A1A'};
  `}
`;

const Diamond = styled.div`
  position: absolute;
  width: ${p => p.$size || '50px'};
  height: ${p => p.$size || '50px'};
  background: ${p => p.$color || '#4ECDC4'};
  transform: rotate(45deg);
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  bottom: ${p => p.$bottom};
  animation: ${floatSlow} ${p => p.$duration || '7s'} ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
`;

const DateBox = styled.div`
  position: absolute;
  padding: 20px 40px;
  background: #1A1A1A;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #FFFFFF;
  animation: ${fadeIn} 1s ease 0.8s forwards;
  opacity: 0;
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  z-index: 2;
`;

const LocationTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 25px;
  background: #FFE66D;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 30px;
  animation: ${fadeInUp} 1s ease 0.5s both;
  
  &::before {
    content: '📍';
  }
`;

// ============ NEON ELEMENTS ============
const NeonElements = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const NeonSquare = styled.div`
  position: absolute;
  width: ${p => p.$size || '60px'};
  height: ${p => p.$size || '60px'};
  border: 2px solid ${p => p.$color || '#00ffff'};
  box-shadow: 0 0 10px ${p => p.$color || '#00ffff'}40, inset 0 0 10px ${p => p.$color || '#00ffff'}20;
  animation: ${pulseGlow} 3s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  opacity: 0.7;
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  bottom: ${p => p.$bottom};
  transform: rotate(${p => p.$rotate || '0deg'});
`;

const NeonCircle = styled.div`
  position: absolute;
  width: ${p => p.$size || '80px'};
  height: ${p => p.$size || '80px'};
  border-radius: 50%;
  border: 2px solid ${p => p.$color || '#00ffff'};
  box-shadow: 0 0 10px ${p => p.$color || '#00ffff'}40, inset 0 0 10px ${p => p.$color || '#00ffff'}20;
  animation: ${pulseGlow} 3s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  opacity: 0.7;
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  bottom: ${p => p.$bottom};
`;

const NeonTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: ${p => p.$size || '40px'} solid transparent;
  border-right: ${p => p.$size || '40px'} solid transparent;
  border-bottom: 70px solid ${p => p.$color || '#00ffff'};
  filter: drop-shadow(0 0 10px ${p => p.$color || '#00ffff'});
  opacity: 0.5;
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  bottom: ${p => p.$bottom};
  transform: rotate(${p => p.$rotate || '0deg'});
`;

const Scanline = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, rgba(0,255,255,0.4), transparent);
  animation: ${scanline} 6s linear infinite;
  z-index: 5;
`;

const NeonFrame = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  max-width: 700px;
  height: 55%;
  border: 2px solid rgba(0,255,255,0.3);
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border-color: #00ffff;
    border-style: solid;
  }
  
  &::before {
    top: -2px;
    left: -2px;
    border-width: 3px 0 0 3px;
  }
  
  &::after {
    bottom: -2px;
    right: -2px;
    border-width: 0 3px 3px 0;
  }
`;

const HorizontalNeonLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #00ffff 20%, #00ffff 80%, transparent 100%);
  box-shadow: 0 0 10px rgba(0,255,255,0.5);
  
  ${p => p.$top && css`top: ${p.$top};`}
  ${p => p.$bottom && css`bottom: ${p.$bottom};`}
`;

// ============ BOTANICAL ELEMENTS ============
const BotanicalElements = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
`;

const LeafDecoration = styled.div`
  position: absolute;
  font-size: ${p => p.$size || '4rem'};
  animation: ${botanicalFloat} ${p => p.$duration || '6s'} ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  bottom: ${p => p.$bottom};
  opacity: 0.15;
`;

// ============ CONTENT ============
const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 0 5%;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  
  ${p => p.$themeId === 'video' && css`text-align: center;`}
  ${p => p.$themeId === 'editorial' && css`text-align: left; padding-left: 10%;`}
  ${p => p.$themeId === 'botanical' && css`text-align: center;`}
  ${p => p.$themeId === 'contemporary' && css`text-align: left; padding-left: 5%;`}
  ${p => p.$themeId === 'luxe' && css`text-align: center;`}
  ${p => p.$themeId === 'neon' && css`text-align: center;`}
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  margin-bottom: 30px;
  animation: ${fadeInUp} 1s ease 0.2s both;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif; 
    color: #FFFFFF;
    background: #FF6B6B;
    padding: 8px 20px;
    font-weight: 700;
  `}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37; letter-spacing: 0.4em;`}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif; 
    color: #00ffff; 
    text-shadow: 0 0 10px rgba(0,255,255,0.5);
  `}
`;

const LogoBox = styled.div`
  display: inline-block;
  background: #1A1A1A;
  padding: 30px 40px;
  margin-bottom: 30px;
  animation: ${fadeInUp} 1s ease 0.3s both;
`;

const LogoText = styled.span`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 400;
  color: #FFFFFF;
  line-height: 1;
`;

const NeonLogo = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: clamp(5rem, 15vw, 12rem);
  line-height: 1;
  margin-bottom: 20px;
  animation: ${fadeInUp} 1s ease 0.3s both;
  position: relative;
  
  .main {
    background: linear-gradient(180deg, #00ffff 0%, #ff00ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 30px rgba(0,255,255,0.5));
  }
  
  .glitch {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    color: #ff00ff;
    animation: ${glitchText} 0.5s ease infinite;
    opacity: 0.3;
    clip-path: inset(10% 0 60% 0);
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 25px;
  animation: ${fadeInUp} 1s ease 0.4s both;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    color: #FFFFFF;
    text-shadow: 0 4px 30px rgba(0,0,0,0.3);
    font-size: clamp(3rem, 8vw, 6rem);
    
    span {
      background: linear-gradient(135deg, #B8976A, #D4AF37, #B8976A);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${shimmer} 4s linear infinite;
    }
  `}
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    color: #1A1A1A;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    max-width: 500px;
    
    span {
      color: #FF6B6B;
    }
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    color: #2D3B2D;
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: clamp(4rem, 12vw, 10rem);
    color: #1A1A1A;
    line-height: 0.9;
    margin-bottom: 20px;
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    color: #FFFFFF;
    font-size: clamp(3rem, 8vw, 6rem);
    
    span {
      background: linear-gradient(135deg, #D4AF37, #F4D03F, #D4AF37);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${shimmer} 4s linear infinite;
    }
  `}
  
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    color: #FFFFFF;
  `}
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 300;
  line-height: 1.8;
  margin-bottom: 50px;
  max-width: 600px;
  animation: ${fadeInUp} 1s ease 0.6s both;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif; 
    color: rgba(255,255,255,0.7);
    margin-left: auto;
    margin-right: auto;
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif; 
    color: #666;
    
    span {
      color: #FF6B6B;
    }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif; 
    color: #5A6B5A;
    margin-left: auto;
    margin-right: auto;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif; 
    color: #666;
    font-size: 1rem;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif; 
    color: rgba(255,255,255,0.6);
    margin-left: auto;
    margin-right: auto;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif; 
    color: rgba(255,255,255,0.5);
    margin-left: auto;
    margin-right: auto;
  `}
`;

const NeonDate = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #00ffff;
  margin-bottom: 40px;
  animation: ${fadeInUp} 1s ease 0.7s both;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  
  &::before, &::after {
    content: '';
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ffff);
  }
  
  &::after {
    background: linear-gradient(90deg, #00ffff, transparent);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  animation: ${fadeInUp} 1s ease 0.8s both;
  
  ${p => p.$themeId === 'video' && css`justify-content: center;`}
  ${p => p.$themeId === 'editorial' && css`flex-direction: column; gap: 15px;`}
  ${p => p.$themeId === 'botanical' && css`justify-content: center;`}
  ${p => p.$themeId === 'contemporary' && css`flex-direction: column; gap: 15px;`}
  ${p => p.$themeId === 'luxe' && css`justify-content: center;`}
  ${p => p.$themeId === 'neon' && css`justify-content: center;`}
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 20px 45px;
  text-decoration: none;
  transition: all 0.4s ease;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif;
    color: #1A1A1A;
    background: #B8976A;
    &:hover { background: #D4AF37; transform: translateY(-3px); }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: #FFFFFF;
    background: #1A1A1A;
    width: fit-content;
    &:hover { background: #333; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: #FFFFFF;
    background: #8B9D83;
    border-radius: 30px;
    &:hover { background: #6B7D63; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: #FFFFFF;
    background: #1A1A1A;
    width: fit-content;
    &:hover { background: #333; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: #0a0a0a;
    background: #D4AF37;
    &:hover { background: #F4D03F; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: #00ffff;
    background: transparent;
    border: 2px solid #00ffff;
    box-shadow: 0 0 20px rgba(0,255,255,0.3), inset 0 0 20px rgba(0,255,255,0.1);
    &:hover { 
      background: rgba(0,255,255,0.1);
      box-shadow: 0 0 40px rgba(0,255,255,0.5), inset 0 0 30px rgba(0,255,255,0.2);
    }
  `}
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 20px 45px;
  text-decoration: none;
  background: transparent;
  transition: all 0.4s ease;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif;
    color: #B8976A;
    border: 1px solid rgba(184,151,106,0.4);
    &:hover { border-color: #B8976A; background: rgba(184,151,106,0.1); }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: #1A1A1A;
    border: 1px solid #1A1A1A;
    width: fit-content;
    &:hover { background: #1A1A1A; color: #FFFFFF; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: #2D3B2D;
    border: 2px solid #2D3B2D;
    border-radius: 30px;
    &:hover { background: #2D3B2D; color: #F8F6F0; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: #1A1A1A;
    border: 1px solid #1A1A1A;
    width: fit-content;
    &:hover { background: #1A1A1A; color: #FFFFFF; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: #FFFFFF;
    border: 1px solid rgba(255,255,255,0.3);
    &:hover { border-color: #D4AF37; color: #D4AF37; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: #ff00ff;
    border: 2px solid #ff00ff;
    box-shadow: 0 0 15px rgba(255,0,255,0.2);
    &:hover { background: rgba(255,0,255,0.1); box-shadow: 0 0 30px rgba(255,0,255,0.4); }
  `}
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50px;
  display: flex;
  align-items: center;
  gap: 15px;
  animation: ${fadeInUp} 1s ease 1.2s both;
  z-index: 2;
  
  @media (max-width: 768px) {
    left: 20px;
    bottom: 30px;
  }
`;

const ScrollDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  
  ${p => p.$themeId === 'video' && css`background: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`background: #FF6B6B;`}
  ${p => p.$themeId === 'botanical' && css`background: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`background: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`background: #00ffff; box-shadow: 0 0 10px rgba(0,255,255,0.5);`}
`;

const ScrollText = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #999;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(255,255,255,0.4);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

// ============ CONSTANTS ============
const VIDEO_URL = "https://res.cloudinary.com/si-weddings/video/upload/v1769070616/si_comming_soon_video_hero_xga2ia.mp4";
const LUXE_BG_URL = "https://res.cloudinary.com/si-weddings/image/upload/v1769072318/si_cooming_soon_luxe_hero_wowu9v.jpg";

// ============ COMPONENT ============
function MarketingHero() {
  const { currentTheme } = useTheme();

  return (
    <Section $themeId={currentTheme} id="hero">
      
      {/* VIDEO BACKGROUND */}
      {currentTheme === 'video' && (
        <VideoBackground>
          <video autoPlay muted loop playsInline>
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </VideoBackground>
      )}
      
      {/* LUXE BACKGROUND IMAGE */}
      {currentTheme === 'luxe' && (
        <LuxeBackground>
          <img src={LUXE_BG_URL} alt="" />
        </LuxeBackground>
      )}
      
      {/* EDITORIAL LINES */}
      {currentTheme === 'editorial' && (
        <EditorialLines>
          <HorizontalLine $top="15%" $delay="0.5s" />
          <HorizontalLine $top="85%" $delay="0.7s" />
          <VerticalLine $left="8%" $delay="0.6s" />
          <VerticalLine $right="8%" $delay="0.8s" />
        </EditorialLines>
      )}
      
      {/* CONTEMPORARY 2-COLUMN LAYOUT */}
      {currentTheme === 'contemporary' && (
        <ContemporaryLayout>
          <ContemporaryLeft>
            <ContemporaryShapes>
              <Circle $color="#FF6B6B" $size="70px" $top="8%" $left="35%" $duration="8s" />
              <Circle $color="#FFE66D" $size="30px" $top="55%" $left="38%" $duration="6s" $delay="0.5s" />
              <Square $outline $color="#1A1A1A" $size="40px" $bottom="15%" $left="42%" $duration="7s" $delay="1s" />
              <Diamond $color="#4ECDC4" $size="45px" $bottom="22%" $left="2%" $duration="8s" $delay="0.3s" />
            </ContemporaryShapes>
            
            <Eyebrow $themeId={currentTheme} style={{background: 'none', color: '#999', padding: 0, fontWeight: 500}}>
              WE'RE GETTING MARRIED ————
            </Eyebrow>
            
            <Title $themeId={currentTheme} style={{fontSize: 'clamp(3.5rem, 10vw, 7rem)', marginBottom: '10px'}}>
              <span style={{color: '#FF6B6B', display: 'block'}}>SOPHIE</span>
            </Title>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '30px'}}>
              <span style={{fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ccc', fontStyle: 'italic'}}>&</span>
              <Title $themeId={currentTheme} style={{fontSize: 'clamp(3.5rem, 10vw, 7rem)', margin: 0, animation: 'none'}}>
                MAX
              </Title>
            </div>
            
            <LocationTag>Schloss Heidelberg</LocationTag>
            
            <ButtonGroup $themeId={currentTheme}>
              <PrimaryButton href="#contact" $themeId={currentTheme} style={{background: '#FF6B6B', color: '#FFFFFF'}}>
                Jetzt Zusagen →
              </PrimaryButton>
              <SecondaryButton href="#about" $themeId={currentTheme}>Unsere Story</SecondaryButton>
            </ButtonGroup>
          </ContemporaryLeft>
          
          <ContemporaryRight>
            <DateBox $top="45%" $left="-5%">15. AUGUST 2025</DateBox>
            <Square $outline $color="rgba(255,255,255,0.3)" $size="35px" $bottom="12%" $right="20%" $duration="9s" />
          </ContemporaryRight>
        </ContemporaryLayout>
      )}
      
      {/* NEON ELEMENTS */}
      {currentTheme === 'neon' && (
        <NeonElements>
          <Scanline />
          <NeonFrame />
          <HorizontalNeonLine $top="35%" />
          <HorizontalNeonLine $bottom="30%" />
          <NeonSquare $color="#00ffff" $size="70px" $top="10%" $left="5%" $rotate="10deg" $delay="0s" />
          <NeonSquare $color="#ff00ff" $size="90px" $top="8%" $right="8%" $rotate="-15deg" $delay="0.5s" />
          <NeonCircle $color="#ff00ff" $size="100px" $bottom="15%" $left="3%" $delay="1s" />
          <NeonTriangle $color="#00ffff" $size="40px" $bottom="25%" $right="12%" $rotate="20deg" />
        </NeonElements>
      )}
      
      {/* BOTANICAL ELEMENTS */}
      {currentTheme === 'botanical' && (
        <BotanicalElements>
          <LeafDecoration $size="8rem" $top="10%" $left="5%" $delay="0s" $duration="8s">🌿</LeafDecoration>
          <LeafDecoration $size="6rem" $top="20%" $right="8%" $delay="1s" $duration="7s">🍃</LeafDecoration>
          <LeafDecoration $size="10rem" $bottom="10%" $left="10%" $delay="2s" $duration="9s">🌸</LeafDecoration>
          <LeafDecoration $size="5rem" $bottom="20%" $right="15%" $delay="0.5s" $duration="6s">🌿</LeafDecoration>
        </BotanicalElements>
      )}
      
      {currentTheme !== 'contemporary' && (
      <Content $themeId={currentTheme}>
        
        {/* NEON LAYOUT */}
        {currentTheme === 'neon' && (
          <>
            <Eyebrow $themeId={currentTheme}>// COMING SOON //</Eyebrow>
            <NeonLogo>
              <span className="glitch">S&I.</span>
              <span className="main">S&I.</span>
            </NeonLogo>
            <Title $themeId={currentTheme}>Individuelle Hochzeitswebsites</Title>
            <Subtitle $themeId={currentTheme}>
              die so einzigartig sind wie eure Liebe
            </Subtitle>
            <NeonDate>01. OKTOBER 2026</NeonDate>
            <ButtonGroup $themeId={currentTheme}>
              <PrimaryButton href="#contact" $themeId={currentTheme}>Let's make it epic →</PrimaryButton>
            </ButtonGroup>
          </>
        )}
        
        {/* VIDEO LAYOUT */}
        {currentTheme === 'video' && (
          <>
            <Eyebrow $themeId={currentTheme}>— Premium Wedding Websites —</Eyebrow>
            <Title $themeId={currentTheme}><span>Euer Film</span> beginnt hier</Title>
            <Subtitle $themeId={currentTheme}>
              Cineastische Hochzeitswebsites mit Video-Hintergründen.<br/>
              Eure Liebesgeschichte, filmreif inszeniert.
            </Subtitle>
            <ButtonGroup $themeId={currentTheme}>
              <PrimaryButton href="#contact" $themeId={currentTheme}>Jetzt starten</PrimaryButton>
              <SecondaryButton href="#designs" $themeId={currentTheme}>Designs entdecken</SecondaryButton>
            </ButtonGroup>
          </>
        )}
        
        {/* EDITORIAL LAYOUT */}
        {currentTheme === 'editorial' && (
          <>
            <Eyebrow $themeId={currentTheme}>Coming Soon</Eyebrow>
            <LogoBox>
              <LogoText>S&I.</LogoText>
            </LogoBox>
            <Title $themeId={currentTheme}>
              Individuelle Hochzeitswebsites,<br/>
              <span>die so einzigartig sind wie eure Liebe</span>
            </Title>
            <ButtonGroup $themeId={currentTheme}>
              <PrimaryButton href="#contact" $themeId={currentTheme}>Jetzt Eintragen</PrimaryButton>
              <SecondaryButton href="#about" $themeId={currentTheme}>Unsere Story</SecondaryButton>
            </ButtonGroup>
          </>
        )}
        
        {/* LUXE LAYOUT */}
        {currentTheme === 'luxe' && (
          <>
            <Eyebrow $themeId={currentTheme}>— Maßgeschneidert —</Eyebrow>
            <Title $themeId={currentTheme}>Die Kunst der <span>Einfachheit</span></Title>
            <Subtitle $themeId={currentTheme}>
              Weniger ist mehr. Entdeckt die Schönheit des Wesentlichen<br/>
              in einer Hochzeitswebsite, die Bände spricht.
            </Subtitle>
            <ButtonGroup $themeId={currentTheme}>
              <PrimaryButton href="#contact" $themeId={currentTheme}>Jetzt starten</PrimaryButton>
              <SecondaryButton href="#designs" $themeId={currentTheme}>Designs entdecken</SecondaryButton>
            </ButtonGroup>
          </>
        )}
        
        {/* BOTANICAL LAYOUT */}
        {currentTheme === 'botanical' && (
          <>
            <Eyebrow $themeId={currentTheme}>✿ Natürlich Schön ✿</Eyebrow>
            <Title $themeId={currentTheme}>Wo Liebe erblüht</Title>
            <Subtitle $themeId={currentTheme}>
              Organisch schön, liebevoll gestaltet. Hochzeitswebsites,<br/>
              die sich anfühlen wie ein Spaziergang durch einen blühenden Garten.
            </Subtitle>
            <ButtonGroup $themeId={currentTheme}>
              <PrimaryButton href="#contact" $themeId={currentTheme}>Jetzt starten</PrimaryButton>
              <SecondaryButton href="#designs" $themeId={currentTheme}>Designs entdecken</SecondaryButton>
            </ButtonGroup>
          </>
        )}
        
      </Content>
      )}
      
      {currentTheme !== 'contemporary' && (
      <ScrollIndicator>
        <ScrollDot $themeId={currentTheme} />
        <ScrollText $themeId={currentTheme}>Scroll to Explore</ScrollText>
      </ScrollIndicator>
      )}
      
    </Section>
  );
}

export default MarketingHero;
