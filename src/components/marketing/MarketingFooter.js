// src/components/marketing/Footer.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// KEYFRAME ANIMATIONS
// ============================================

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
`;

const goldShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const neonFlicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.3; }
  94% { opacity: 1; }
  96% { opacity: 0.5; }
  97% { opacity: 1; }
`;

const heartbeat = keyframes`
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.2); }
  28% { transform: scale(1); }
  42% { transform: scale(1.2); }
  70% { transform: scale(1); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const drawLine = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

// ============================================
// MAIN FOOTER
// ============================================

const FooterWrapper = styled.footer`
  position: relative;
  overflow: hidden;
  
  ${p => p.$themeId === 'editorial' && css`background: #1A1A1A;`}
  ${p => p.$themeId === 'gold' && css`background: #050505;`}
  ${p => p.$themeId === 'botanical' && css`background: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`background: #1A1A1A;`}
  ${p => p.$themeId === 'neon' && css`background: #050508;`}
`;

// ============================================
// PARALLAX BACKGROUNDS
// ============================================

const ParallaxBg = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

const FloatingElement = styled.div`
  position: absolute;
  transform: translateY(${p => p.$offset}px);
  transition: transform 0.15s ease-out;
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  bottom: ${p => p.$bottom};
`;

// ============================================
// EDITORIAL FOOTER
// ============================================

const EditorialFooter = styled.div`
  padding: 100px 5% 40px;
`;

const EditorialTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;
  padding-bottom: 80px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const EditorialBrand = styled.div`
  .logo {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 3rem;
    font-style: italic;
    color: #FFFFFF;
    margin-bottom: 20px;
  }
  
  .tagline {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    color: rgba(255,255,255,0.5);
    line-height: 1.7;
    max-width: 300px;
    margin-bottom: 30px;
  }
  
  .cta {
    display: inline-block;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #FFFFFF;
    text-decoration: none;
    padding: 15px 35px;
    border: 1px solid rgba(255,255,255,0.3);
    transition: all 0.3s ease;
    
    &:hover {
      background: #FFFFFF;
      color: #1A1A1A;
    }
  }
`;

const EditorialColumn = styled.div`
  .title {
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 25px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 15px;
  }
  
  a {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #FFFFFF;
    }
  }
`;

const EditorialBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const EditorialCopyright = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.4);
`;

const EditorialSocials = styled.div`
  display: flex;
  gap: 20px;
  
  a {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.5);
    transition: all 0.3s ease;
    
    &:hover {
      color: #FFFFFF;
      transform: translateY(-3px);
    }
  }
`;

const EditorialMadeWith = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.4);
  
  span {
    color: #FF6B6B;
    animation: ${heartbeat} 2s ease-in-out infinite;
    display: inline-block;
  }
`;

// ============================================
// GOLD FOOTER
// ============================================

const GoldFooter = styled.div`
  padding: 120px 5% 50px;
  text-align: center;
  position: relative;
`;

const GoldOrb = styled(FloatingElement)`
  width: ${p => p.$size || '200px'};
  height: ${p => p.$size || '200px'};
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%);
  filter: blur(60px);
`;

const GoldLogo = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 5rem;
  font-weight: 300;
  background: linear-gradient(135deg, #D4AF37, #F4D03F, #D4AF37);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${goldShimmer} 4s linear infinite;
  margin-bottom: 20px;
`;

const GoldTagline = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-style: italic;
  color: rgba(255,255,255,0.5);
  margin-bottom: 50px;
`;

const GoldDivider = styled.div`
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  margin: 0 auto 50px;
`;

const GoldNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 60px;
  flex-wrap: wrap;
  
  a {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: #D4AF37;
    }
  }
`;

const GoldCTA = styled.a`
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0A0A0A;
  background: linear-gradient(135deg, #D4AF37, #F4D03F);
  padding: 18px 50px;
  text-decoration: none;
  margin-bottom: 80px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 40px rgba(212,175,55,0.3);
  }
`;

const GoldBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  border-top: 1px solid rgba(212,175,55,0.1);
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const GoldCopyright = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.3);
`;

const GoldMadeWith = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.3);
  
  span {
    color: #D4AF37;
  }
`;

// ============================================
// BOTANICAL FOOTER
// ============================================

const BotanicalFooter = styled.div`
  padding: 100px 5% 40px;
  position: relative;
`;

const BotanicalPlant = styled(FloatingElement)`
  font-size: ${p => p.$size || '60px'};
  opacity: 0.15;
  animation: ${float} ${p => p.$duration || '8s'} ease-in-out infinite;
`;

const BotanicalTop = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 50px;
  padding-bottom: 60px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const BotanicalBrand = styled.div`
  .logo {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2.5rem;
    color: #FFFFFF;
    margin-bottom: 20px;
  }
  
  .tagline {
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    color: rgba(255,255,255,0.6);
    line-height: 1.8;
    max-width: 280px;
    margin-bottom: 30px;
  }
  
  .social {
    display: flex;
    gap: 15px;
    
    a {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: #FFFFFF;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        background: #8B9D83;
        transform: translateY(-3px);
      }
    }
  }
`;

const BotanicalColumn = styled.div`
  .title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.1rem;
    color: #FFFFFF;
    margin-bottom: 25px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 15px;
  }
  
  a {
    font-family: 'Lato', sans-serif;
    font-size: 0.95rem;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '·';
      color: #8B9D83;
    }
    
    &:hover {
      color: #FFFFFF;
      padding-left: 5px;
    }
  }
`;

const BotanicalCTA = styled.div`
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
  padding: 30px;
  
  .title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.2rem;
    color: #FFFFFF;
    margin-bottom: 15px;
  }
  
  .text {
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  a {
    display: inline-block;
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: #2D3B2D;
    background: #FFFFFF;
    padding: 12px 30px;
    border-radius: 30px;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      background: #8B9D83;
      color: #FFFFFF;
    }
  }
`;

const BotanicalBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const BotanicalCopyright = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
`;

const BotanicalMadeWith = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  
  span {
    color: #8B9D83;
  }
`;

// ============================================
// CONTEMPORARY FOOTER
// ============================================

const ContemporaryFooter = styled.div`
  border-top: 4px solid #0D0D0D;
`;

const ContemporaryTop = styled.div`
  padding: 80px 5%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 50px;
  
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ContemporaryBrand = styled.div`
  .logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 4rem;
    font-weight: 700;
    color: #0D0D0D;
    margin-bottom: 20px;
    line-height: 1;
  }
  
  .tagline {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
    max-width: 300px;
  }
`;

const ContemporaryColumn = styled.div`
  .title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #0D0D0D;
    margin-bottom: 25px;
    padding-bottom: 10px;
    border-bottom: 3px solid #0D0D0D;
    display: inline-block;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 12px;
  }
  
  a {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.95rem;
    color: #666;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      color: #0D0D0D;
      padding-left: 10px;
    }
  }
`;

const ContemporaryCTA = styled.div`
  background: #FFE66D;
  padding: 35px;
  border: 4px solid #0D0D0D;
  box-shadow: 6px 6px 0 #0D0D0D;
  
  .title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #0D0D0D;
    text-transform: uppercase;
    margin-bottom: 15px;
  }
  
  .text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    color: rgba(0,0,0,0.7);
    margin-bottom: 20px;
  }
  
  a {
    display: inline-block;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #FFFFFF;
    background: #0D0D0D;
    padding: 15px 30px;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translate(-3px, -3px);
      box-shadow: 3px 3px 0 #0D0D0D;
    }
  }
`;

const ContemporaryBottom = styled.div`
  background: #0D0D0D;
  padding: 30px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const ContemporaryCopyright = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
`;

const ContemporarySocials = styled.div`
  display: flex;
  gap: 15px;
  
  a {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: #FFFFFF;
    text-decoration: none;
    padding: 8px 15px;
    border: 2px solid rgba(255,255,255,0.3);
    transition: all 0.2s ease;
    
    &:hover {
      background: #FF6B6B;
      border-color: #FF6B6B;
    }
  }
`;

const ContemporaryMadeWith = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  
  span {
    color: #FF6B6B;
  }
`;

// ============================================
// LUXE FOOTER
// ============================================

const LuxeFooter = styled.div`
  padding: 100px 5% 50px;
  max-width: 1200px;
  margin: 0 auto;
`;

const LuxeTop = styled.div`
  text-align: center;
  padding-bottom: 80px;
  border-bottom: 1px solid rgba(180,160,140,0.2);
`;

const LuxeLogo = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 3.5rem;
  font-weight: 300;
  color: #FFFFFF;
  margin-bottom: 20px;
`;

const LuxeTagline = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #B4A08C;
  margin-bottom: 50px;
`;

const LuxeNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 50px;
  flex-wrap: wrap;
  
  a {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 1px;
      background: #B4A08C;
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: #FFFFFF;
      
      &::after {
        width: 100%;
      }
    }
  }
`;

const LuxeCTA = styled.a`
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #FFFFFF;
  padding: 18px 50px;
  border: 1px solid rgba(180,160,140,0.4);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(180,160,140,0.1);
    border-color: #B4A08C;
  }
`;

const LuxeMiddle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  padding: 60px 0;
  text-align: center;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const LuxeContact = styled.div`
  .label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #B4A08C;
    margin-bottom: 15px;
  }
  
  .value {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.3rem;
    color: #FFFFFF;
    
    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: #B4A08C;
      }
    }
  }
`;

const LuxeBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  border-top: 1px solid rgba(180,160,140,0.1);
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const LuxeCopyright = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.3);
`;

const LuxeMadeWith = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.3);
  
  span {
    color: #B4A08C;
  }
`;

// ============================================
// NEON FOOTER
// ============================================

const NeonFooter = styled.div`
  position: relative;
  padding: 100px 5% 40px;
`;

const NeonGridBg = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,255,0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
`;

const NeonGlow = styled(FloatingElement)`
  width: ${p => p.$size || '200px'};
  height: ${p => p.$size || '200px'};
  border-radius: 50%;
  background: ${p => p.$color || 'rgba(0,255,255,0.1)'};
  filter: blur(80px);
`;

const NeonTop = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 50px;
  padding-bottom: 60px;
  border-bottom: 1px solid rgba(0,255,255,0.1);
  position: relative;
  z-index: 2;
  
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const NeonBrand = styled.div`
  .logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 3rem;
    font-weight: 700;
    color: #00ffff;
    text-shadow: 0 0 20px rgba(0,255,255,0.5);
    animation: ${neonFlicker} 5s ease-in-out infinite;
    margin-bottom: 20px;
  }
  
  .tagline {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.95rem;
    color: rgba(255,255,255,0.5);
    line-height: 1.7;
    max-width: 280px;
    margin-bottom: 30px;
  }
  
  .status {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    color: #00ff00;
    
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00ff00;
      box-shadow: 0 0 10px #00ff00;
      animation: ${pulse} 2s ease-in-out infinite;
    }
  }
`;

const NeonColumn = styled.div`
  .title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ff00ff;
    margin-bottom: 25px;
    
    &::before {
      content: '// ';
      color: #00ffff;
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 15px;
  }
  
  a {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: #00ffff;
      text-shadow: 0 0 10px rgba(0,255,255,0.5);
    }
  }
`;

const NeonCTA = styled.div`
  background: rgba(0,255,255,0.03);
  border: 1px solid rgba(0,255,255,0.2);
  padding: 30px;
  
  .title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #00ffff;
    margin-bottom: 15px;
  }
  
  .text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.5);
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  a {
    display: inline-block;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #0a0a0f;
    background: #00ffff;
    padding: 12px 25px;
    text-decoration: none;
    box-shadow: 0 0 20px rgba(0,255,255,0.3);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 0 30px rgba(0,255,255,0.5);
      transform: translateY(-2px);
    }
  }
`;

const NeonBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const NeonCopyright = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.3);
`;

const NeonSocials = styled.div`
  display: flex;
  gap: 15px;
  
  a {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.4);
    transition: all 0.3s ease;
    
    &:hover {
      color: #00ffff;
      text-shadow: 0 0 15px rgba(0,255,255,0.5);
    }
  }
`;

const NeonMadeWith = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.3);
  
  span {
    color: #ff00ff;
    text-shadow: 0 0 10px rgba(255,0,255,0.5);
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================

function Footer() {
  const { currentTheme } = useTheme();
  const footerRef = useRef(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / window.innerHeight;
        setParallaxOffset(scrollProgress * 50);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Designs', href: '#designs' },
    { label: 'Preise', href: '#pricing' },
    { label: 'Über uns', href: '#about' },
    { label: 'Kontakt', href: '#contact' },
  ];

  const legalLinks = [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'AGB', href: '/agb' },
  ];

  const renderContent = () => {
    switch (currentTheme) {
      case 'editorial':
        return (
          <EditorialFooter>
            <EditorialTop>
              <EditorialBrand>
                <div className="logo">S & I</div>
                <p className="tagline">Einzigartige Hochzeitswebsites für Paare, die keine Kompromisse eingehen. Persönlich. Individuell. Premium.</p>
                <a href="#contact" className="cta">Beratung anfragen</a>
              </EditorialBrand>
              
              <EditorialColumn>
                <h4 className="title">Navigation</h4>
                <ul>
                  {navLinks.map(link => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </EditorialColumn>
              
              <EditorialColumn>
                <h4 className="title">Rechtliches</h4>
                <ul>
                  {legalLinks.map(link => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </EditorialColumn>
              
              <EditorialColumn>
                <h4 className="title">Kontakt</h4>
                <ul>
                  <li><a href="mailto:hallo@sarahundiver.de">hallo@sarahundiver.de</a></li>
                  <li><a href="tel:+491234567890">+49 123 456 7890</a></li>
                </ul>
              </EditorialColumn>
            </EditorialTop>
            
            <EditorialBottom>
              <EditorialCopyright>© {currentYear} S&I. Alle Rechte vorbehalten.</EditorialCopyright>
              <EditorialSocials>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Pinterest">📌</a>
              </EditorialSocials>
              <EditorialMadeWith>Made with <span>♥</span> in Germany</EditorialMadeWith>
            </EditorialBottom>
          </EditorialFooter>
        );
        
      case 'gold':
        return (
          <GoldFooter>
            <ParallaxBg>
              <GoldOrb $top="10%" $left="5%" $size="300px" $offset={parallaxOffset * 0.3} />
              <GoldOrb $top="50%" $right="10%" $size="250px" $offset={parallaxOffset * 0.5} />
            </ParallaxBg>
            
            <GoldLogo>S & I</GoldLogo>
            <GoldTagline>Wo Liebe auf Luxus trifft</GoldTagline>
            <GoldDivider />
            
            <GoldNav>
              {navLinks.map(link => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
              {legalLinks.map(link => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
            </GoldNav>
            
            <GoldCTA href="#contact">Jetzt Beratung anfragen</GoldCTA>
            
            <GoldBottom>
              <GoldCopyright>© {currentYear} S&I</GoldCopyright>
              <GoldMadeWith>Crafted with <span>✦</span> love</GoldMadeWith>
            </GoldBottom>
          </GoldFooter>
        );
        
      case 'botanical':
        return (
          <BotanicalFooter>
            <ParallaxBg>
              <BotanicalPlant $top="10%" $left="5%" $size="50px" $offset={parallaxOffset * 0.3}>🌿</BotanicalPlant>
              <BotanicalPlant $top="40%" $right="8%" $size="40px" $offset={parallaxOffset * 0.5} $duration="10s">🍃</BotanicalPlant>
              <BotanicalPlant $bottom="20%" $left="15%" $size="45px" $offset={parallaxOffset * 0.4} $duration="12s">🌸</BotanicalPlant>
            </ParallaxBg>
            
            <BotanicalTop>
              <BotanicalBrand>
                <div className="logo">S & I</div>
                <p className="tagline">Natürlich schön. Persönlich gestaltet. Für den wichtigsten Tag eures Lebens.</p>
                <div className="social">
                  <a href="#" aria-label="Instagram">📷</a>
                  <a href="#" aria-label="Pinterest">📌</a>
                </div>
              </BotanicalBrand>
              
              <BotanicalColumn>
                <h4 className="title">Entdecken</h4>
                <ul>
                  {navLinks.map(link => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </BotanicalColumn>
              
              <BotanicalColumn>
                <h4 className="title">Rechtliches</h4>
                <ul>
                  {legalLinks.map(link => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </BotanicalColumn>
              
              <BotanicalCTA>
                <h4 className="title">Bereit zu starten?</h4>
                <p className="text">Lasst uns gemeinsam eure perfekte Hochzeitswebsite kreieren.</p>
                <a href="#contact">Kontakt aufnehmen</a>
              </BotanicalCTA>
            </BotanicalTop>
            
            <BotanicalBottom>
              <BotanicalCopyright>© {currentYear} S&I. Alle Rechte vorbehalten.</BotanicalCopyright>
              <BotanicalMadeWith>Mit <span>💚</span> gestaltet</BotanicalMadeWith>
            </BotanicalBottom>
          </BotanicalFooter>
        );
        
      case 'contemporary':
        return (
          <ContemporaryFooter>
            <ContemporaryTop>
              <ContemporaryBrand>
                <div className="logo">S&I</div>
                <p className="tagline">Bold websites for bold couples. No templates. No limits.</p>
              </ContemporaryBrand>
              
              <ContemporaryColumn>
                <h4 className="title">Menu</h4>
                <ul>
                  {navLinks.map(link => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </ContemporaryColumn>
              
              <ContemporaryColumn>
                <h4 className="title">Legal</h4>
                <ul>
                  {legalLinks.map(link => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </ContemporaryColumn>
              
              <ContemporaryCTA>
                <h4 className="title">Let's Talk!</h4>
                <p className="text">Ready to create something amazing together?</p>
                <a href="#contact">Get in Touch →</a>
              </ContemporaryCTA>
            </ContemporaryTop>
            
            <ContemporaryBottom>
              <ContemporaryCopyright>© {currentYear} S&I</ContemporaryCopyright>
              <ContemporarySocials>
                <a href="#">IG</a>
                <a href="#">PIN</a>
              </ContemporarySocials>
              <ContemporaryMadeWith>Made with <span>♥</span></ContemporaryMadeWith>
            </ContemporaryBottom>
          </ContemporaryFooter>
        );
        
      case 'luxe':
        return (
          <LuxeFooter>
            <LuxeTop>
              <LuxeLogo>S & I</LuxeLogo>
              <LuxeTagline>Hochzeitswebsites mit Anspruch</LuxeTagline>
              
              <LuxeNav>
                {navLinks.map(link => (
                  <a key={link.href} href={link.href}>{link.label}</a>
                ))}
              </LuxeNav>
              
              <LuxeCTA href="#contact">Beratungstermin vereinbaren</LuxeCTA>
            </LuxeTop>
            
            <LuxeMiddle>
              <LuxeContact>
                <div className="label">Email</div>
                <div className="value"><a href="mailto:hallo@sarahundiver.de">hallo@sarahundiver.de</a></div>
              </LuxeContact>
              <LuxeContact>
                <div className="label">Telefon</div>
                <div className="value"><a href="tel:+491234567890">+49 123 456 7890</a></div>
              </LuxeContact>
              <LuxeContact>
                <div className="label">Social</div>
                <div className="value"><a href="#">@sarahundiver</a></div>
              </LuxeContact>
            </LuxeMiddle>
            
            <LuxeBottom>
              <LuxeCopyright>© {currentYear} S&I · Impressum · Datenschutz</LuxeCopyright>
              <LuxeMadeWith>Made with <span>devotion</span></LuxeMadeWith>
            </LuxeBottom>
          </LuxeFooter>
        );
        
      case 'neon':
        return (
          <NeonFooter>
            <NeonGridBg />
            <ParallaxBg>
              <NeonGlow $top="20%" $left="5%" $size="250px" $offset={parallaxOffset * 0.3} $color="rgba(0,255,255,0.08)" />
              <NeonGlow $top="60%" $right="10%" $size="200px" $offset={parallaxOffset * 0.5} $color="rgba(255,0,255,0.08)" />
            </ParallaxBg>
            
            <NeonTop>
              <NeonBrand>
                <div className="logo">S & I</div>
                <p className="tagline">Digital experiences for modern couples. Personal. Unique. Premium.</p>
                <div className="status">SYSTEM ONLINE</div>
              </NeonBrand>
              
              <NeonColumn>
                <h4 className="title">NAVIGATE</h4>
                <ul>
                  {navLinks.map(link => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </NeonColumn>
              
              <NeonColumn>
                <h4 className="title">LEGAL</h4>
                <ul>
                  {legalLinks.map(link => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </NeonColumn>
              
              <NeonCTA>
                <h4 className="title">// INITIATE CONTACT</h4>
                <p className="text">Ready to create something extraordinary?</p>
                <a href="#contact">Connect Now</a>
              </NeonCTA>
            </NeonTop>
            
            <NeonBottom>
              <NeonCopyright>© {currentYear} S&I // ALL RIGHTS RESERVED</NeonCopyright>
              <NeonSocials>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Pinterest">📌</a>
              </NeonSocials>
              <NeonMadeWith>Crafted with <span>♥</span> & code</NeonMadeWith>
            </NeonBottom>
          </NeonFooter>
        );
        
      default:
        return null;
    }
  };

  return (
    <FooterWrapper ref={footerRef} $themeId={currentTheme}>
      {renderContent()}
    </FooterWrapper>
  );
}

export default Footer;
