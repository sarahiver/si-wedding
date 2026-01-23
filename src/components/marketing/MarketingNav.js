// src/components/marketing/MarketingNav.js
import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const neonFlicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  96% { opacity: 0.9; }
  97% { opacity: 1; }
`;

const bounceRight = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
`;

const botanicalFloat = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-3px) translateX(2px); }
  50% { transform: translateY(-1px) translateX(-1px); }
  75% { transform: translateY(-4px) translateX(1px); }
`;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  
  /* Full width themes - no padding on wrapper */
  ${p => (p.$themeId === 'editorial' || p.$themeId === 'video' || p.$themeId === 'luxe' || p.$themeId === 'neon') && css`
    padding: 0;
  `}
  
  /* Floating themes - padding for floating effect */
  ${p => p.$themeId === 'botanical' && css`
    padding: 15px 5%;
    background: transparent;
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    padding: 15px 5%;
    background: transparent;
  `}
`;

const Nav = styled.nav`
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
  
  /* Editorial - Full Width Classic */
  ${p => p.$themeId === 'editorial' && css`
    width: 100%;
    background: ${p.$scrolled ? 'rgba(255,255,255,0.98)' : 'transparent'};
    border-bottom: ${p.$scrolled ? '1px solid #E0E0E0' : 'none'};
    backdrop-filter: ${p.$scrolled ? 'blur(20px)' : 'none'};
  `}
  
  /* Gold - Full Width Luxury */
  ${p => p.$themeId === 'video' && css`
    width: 100%;
    background: ${p.$scrolled ? 'rgba(10,10,10,0.95)' : 'transparent'};
    border-bottom: ${p.$scrolled ? '1px solid rgba(212,175,55,0.2)' : 'none'};
    backdrop-filter: ${p.$scrolled ? 'blur(20px)' : 'none'};
  `}
  
  /* Botanical - Floating Pill with Wobble Animation */
  ${p => p.$themeId === 'botanical' && css`
    max-width: 900px;
    margin: 0 auto;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(20px);
    border-radius: 50px;
    box-shadow: 0 8px 32px rgba(45,59,45,0.12), 0 2px 8px rgba(0,0,0,0.05);
    border: 1px solid rgba(139,157,131,0.2);
    padding: 0 10px;
    animation: ${botanicalFloat} 6s ease-in-out infinite;
    
    &:hover {
      animation-play-state: paused;
      box-shadow: 0 12px 40px rgba(45,59,45,0.18), 0 4px 12px rgba(0,0,0,0.08);
    }
  `}
  
  /* Contemporary - Floating with Brutal Border */
  ${p => p.$themeId === 'contemporary' && css`
    max-width: 950px;
    margin: 0 auto;
    background: #FFFFFF;
    border: 3px solid #0D0D0D;
    box-shadow: 6px 6px 0 #0D0D0D;
    padding: 0 15px;
    
    &:hover {
      box-shadow: 8px 8px 0 #FF6B6B;
    }
  `}
  
  /* Luxe - Full Width Subtle */
  ${p => p.$themeId === 'luxe' && css`
    width: 100%;
    background: ${p.$scrolled ? 'rgba(10,10,10,0.98)' : 'transparent'};
    border-bottom: ${p.$scrolled ? '1px solid rgba(212,175,55,0.1)' : 'none'};
    backdrop-filter: ${p.$scrolled ? 'blur(30px)' : 'none'};
  `}
  
  /* Neon - Full Width Glow */
  ${p => p.$themeId === 'neon' && css`
    width: 100%;
    background: ${p.$scrolled ? 'rgba(10,10,15,0.95)' : 'transparent'};
    border-bottom: ${p.$scrolled ? '1px solid rgba(0,255,255,0.2)' : 'none'};
    backdrop-filter: ${p.$scrolled ? 'blur(20px)' : 'none'};
    ${p.$scrolled && css`
      box-shadow: 0 0 30px rgba(0,255,255,0.1);
    `}
  `}
`;

const NavContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0 5%;
  box-sizing: border-box;
  
  /* Default height */
  height: ${p => p.$scrolled ? '70px' : '90px'};
  
  /* Floating navs have fixed smaller height */
  ${p => (p.$themeId === 'botanical' || p.$themeId === 'contemporary') && css`
    height: 60px;
    max-width: 100%;
    padding: 0 15px;
  `}
`;

const Logo = styled.a`
  text-decoration: none;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.5rem;
    font-style: italic;
    color: #1A1A1A;
    &:hover { opacity: 0.7; }
  `}
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.6rem;
    font-weight: 300;
    color: #D4AF37;
    letter-spacing: 0.1em;
    &:hover { text-shadow: 0 0 20px rgba(212,175,55,0.3); }
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.4rem;
    color: #2D3B2D;
    &:hover { color: #8B9D83; }
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #0D0D0D;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    &:hover { color: #FF6B6B; }
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 300;
    font-style: italic;
    color: #E8DDD4;
    letter-spacing: 0.05em;
    &:hover { color: #D4AF37; }
  `}
  
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0,255,255,0.5);
    animation: ${neonFlicker} 5s infinite;
    &:hover { 
      text-shadow: 0 0 20px rgba(0,255,255,0.8), 0 0 40px rgba(0,255,255,0.4);
    }
  `}
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  
  @media (max-width: 900px) {
    display: none;
  }
  
  ${p => p.$themeId === 'contemporary' && css`gap: 30px;`}
  ${p => p.$themeId === 'neon' && css`gap: 35px;`}
`;

const NavLink = styled.a`
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: #666;
    &:hover { color: #1A1A1A; }
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 1px;
      background: #1A1A1A;
      transition: width 0.3s ease;
    }
    &:hover::after { width: 100%; }
  `}
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    &:hover { color: #D4AF37; }
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: #5A6B5A;
    &:hover { color: #2D3B2D; }
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: #666;
    text-transform: uppercase;
    &:hover { color: #0D0D0D; }
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    &:hover { color: rgba(212,175,55,0.8); }
  `}
  
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255,255,255,0.6);
    &:hover { 
      color: #00ffff;
      text-shadow: 0 0 10px rgba(0,255,255,0.5);
    }
  `}
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 900px) {
    gap: 15px;
  }
`;

const ArrowHint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  
  span {
    font-size: 1rem;
    animation: ${bounceRight} 1s ease infinite;
  }
  
  @media (max-width: 1100px) {
    display: none;
  }
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: #999;
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    color: #D4AF37;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: #8B9D83;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: #FF6B6B;
    font-weight: 600;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(212,175,55,0.6);
    letter-spacing: 0.15em;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0,255,255,0.5);
  `}
`;

const ThemeDropdownWrapper = styled.div`
  position: relative;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const ThemeDropdownTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: #666;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    &:hover { border-color: #1A1A1A; color: #1A1A1A; }
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    border: 1px solid rgba(212,175,55,0.3);
    &:hover { border-color: #D4AF37; color: #D4AF37; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    color: #5A6B5A;
    background: rgba(139,157,131,0.1);
    border-radius: 20px;
    &:hover { background: rgba(139,157,131,0.2); }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #0D0D0D;
    border: 2px solid #0D0D0D;
    text-transform: uppercase;
    &:hover { background: #0D0D0D; color: #FFF; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.6);
    border: 1px solid rgba(212,175,55,0.2);
    &:hover { border-color: rgba(212,175,55,0.5); color: #D4AF37; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: #00ffff;
    border: 1px solid rgba(0,255,255,0.3);
    &:hover { 
      border-color: #00ffff;
      box-shadow: 0 0 10px rgba(0,255,255,0.3);
    }
  `}
`;

const ThemeColorDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(128,128,128,0.3);
`;

const DropdownArrow = styled.span`
  font-size: 0.6rem;
  transition: transform 0.3s ease;
  ${p => p.$isOpen && css`transform: rotate(180deg);`}
`;

const ThemeDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  padding: 8px 0;
  border-radius: 8px;
  opacity: ${p => p.$isOpen ? 1 : 0};
  visibility: ${p => p.$isOpen ? 'visible' : 'hidden'};
  transform: translateY(${p => p.$isOpen ? 0 : '-10px'});
  transition: all 0.3s ease;
  z-index: 1001;
  
  ${p => p.$themeId === 'editorial' && css`
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  `}
  ${p => p.$themeId === 'video' && css`
    background: #0A0A0A;
    border: 1px solid rgba(212,175,55,0.2);
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
  `}
  ${p => p.$themeId === 'botanical' && css`
    background: #FFFFFF;
    border: 1px solid rgba(139,157,131,0.2);
    box-shadow: 0 10px 40px rgba(45,59,45,0.15);
    border-radius: 16px;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    background: #FFFFFF;
    border: 3px solid #0D0D0D;
    box-shadow: 6px 6px 0 #0D0D0D;
    border-radius: 0;
  `}
  ${p => p.$themeId === 'luxe' && css`
    background: #0A0A0A;
    border: 1px solid rgba(212,175,55,0.15);
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
  `}
  ${p => p.$themeId === 'neon' && css`
    background: #0a0a0f;
    border: 1px solid rgba(0,255,255,0.2);
    box-shadow: 0 10px 40px rgba(0,255,255,0.1);
  `}
`;

const ThemeDropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #666;
    &:hover { background: #F5F5F5; color: #1A1A1A; }
    ${p.$active && css`background: #F5F5F5; color: #1A1A1A; font-weight: 600;`}
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.6);
    &:hover { background: rgba(212,175,55,0.1); color: #D4AF37; }
    ${p.$active && css`background: rgba(212,175,55,0.1); color: #D4AF37;`}
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: #5A6B5A;
    &:hover { background: rgba(139,157,131,0.1); }
    ${p.$active && css`background: rgba(139,157,131,0.15); color: #2D3B2D; font-weight: 600;`}
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: #666;
    &:hover { background: #0D0D0D; color: #FFF; }
    ${p.$active && css`background: #FF6B6B; color: #FFF;`}
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.5);
    &:hover { background: rgba(212,175,55,0.08); color: rgba(212,175,55,0.8); }
    ${p.$active && css`background: rgba(212,175,55,0.1); color: #D4AF37;`}
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.6);
    &:hover { background: rgba(0,255,255,0.1); color: #00ffff; }
    ${p.$active && css`background: rgba(0,255,255,0.1); color: #00ffff;`}
  `}
`;

const ThemeItemDot = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(128,128,128,0.2);
  flex-shrink: 0;
`;

const CTAButton = styled.a`
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  @media (max-width: 900px) {
    display: none;
  }
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: #FFFFFF;
    background: #1A1A1A;
    padding: 12px 28px;
    &:hover { 
      background: #333;
      transform: translateY(-2px);
    }
  `}
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #0A0A0A;
    background: linear-gradient(135deg, #D4AF37, #F4D03F);
    padding: 14px 30px;
    &:hover { 
      box-shadow: 0 10px 30px rgba(212,175,55,0.3);
      transform: translateY(-2px);
    }
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #FFFFFF;
    background: #8B9D83;
    padding: 12px 28px;
    border-radius: 30px;
    &:hover { 
      background: #7A8C73;
      transform: translateY(-2px);
    }
  `}
  
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #FFFFFF;
    background: #FF6B6B;
    padding: 14px 28px;
    border: 2px solid #FF6B6B;
    &:hover { 
      background: transparent;
      color: #FF6B6B;
    }
  `}
  
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #D4AF37;
    background: transparent;
    padding: 14px 30px;
    border: 1px solid rgba(212,175,55,0.5);
    &:hover { 
      background: rgba(212,175,55,0.1);
      border-color: #D4AF37;
    }
  `}
  
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: #0a0a0f;
    background: #00ffff;
    padding: 12px 28px;
    box-shadow: 0 0 20px rgba(0,255,255,0.3);
    &:hover { 
      box-shadow: 0 0 30px rgba(0,255,255,0.5), 0 0 60px rgba(0,255,255,0.2);
      transform: translateY(-2px);
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  span {
    display: block;
    width: 24px;
    height: 2px;
    transition: all 0.3s ease;
    
    ${p => p.$themeId === 'editorial' && css`background: #1A1A1A;`}
    ${p => p.$themeId === 'video' && css`background: #D4AF37;`}
    ${p => p.$themeId === 'botanical' && css`background: #2D3B2D;`}
    ${p => p.$themeId === 'contemporary' && css`background: #0D0D0D;`}
    ${p => p.$themeId === 'luxe' && css`background: #E8DDD4;`}
    ${p => p.$themeId === 'neon' && css`background: #00ffff;`}
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 900px) {
    display: ${p => p.$isOpen ? 'flex' : 'none'};
    position: fixed;
    left: 0;
    right: 0;
    flex-direction: column;
    padding: 30px 5%;
    gap: 20px;
    z-index: 999;
    
    /* Position based on theme */
    top: ${p => {
      if (p.$themeId === 'botanical' || p.$themeId === 'contemporary') return '90px';
      return p.$scrolled ? '70px' : '90px';
    }};
    
    ${p => p.$themeId === 'editorial' && css`
      background: rgba(255,255,255,0.98);
      border-bottom: 1px solid #E0E0E0;
    `}
    ${p => p.$themeId === 'video' && css`
      background: rgba(10,10,10,0.98);
      border-bottom: 1px solid rgba(212,175,55,0.2);
    `}
    ${p => p.$themeId === 'botanical' && css`
      background: rgba(255,255,255,0.98);
      border-bottom: 1px solid rgba(139,157,131,0.2);
      margin: 0 5%;
      border-radius: 20px;
      left: 0;
      right: 0;
      width: auto;
    `}
    ${p => p.$themeId === 'contemporary' && css`
      background: #FFFFFF;
      border: 3px solid #0D0D0D;
      margin: 0 5%;
      box-shadow: 6px 6px 0 #0D0D0D;
    `}
    ${p => p.$themeId === 'luxe' && css`
      background: rgba(10,10,10,0.98);
      border-bottom: 1px solid rgba(212,175,55,0.1);
    `}
    ${p => p.$themeId === 'neon' && css`
      background: rgba(10,10,15,0.98);
      border-bottom: 1px solid rgba(0,255,255,0.2);
    `}
  }
`;

const MobileThemeSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 0;
  border-top: 1px solid rgba(128,128,128,0.2);
  margin-top: 10px;
`;

const MobileThemeLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-right: 10px;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(212,175,55,0.6);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const MobileThemeButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  
  &:hover {
    transform: scale(1.1);
  }
  
  ${p => p.$active && css`
    border-color: ${p.$themeId === 'neon' ? '#00ffff' : 
                    p.$themeId === 'video' || p.$themeId === 'luxe' ? '#D4AF37' : 
                    p.$themeId === 'botanical' ? '#2D3B2D' :
                    p.$themeId === 'contemporary' ? '#0D0D0D' : '#1A1A1A'};
  `}
`;

const MobileCTAButton = styled.a`
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 10px;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #FFFFFF;
    background: #1A1A1A;
    padding: 15px 30px;
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #0A0A0A;
    background: linear-gradient(135deg, #D4AF37, #F4D03F);
    padding: 15px 30px;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #FFFFFF;
    background: #8B9D83;
    padding: 15px 30px;
    border-radius: 30px;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #FFFFFF;
    background: #FF6B6B;
    padding: 15px 30px;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #D4AF37;
    background: transparent;
    padding: 15px 30px;
    border: 1px solid rgba(212,175,55,0.5);
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #0a0a0f;
    background: #00ffff;
    padding: 15px 30px;
  `}
`;

const navLinks = [
  { label: 'Designs', href: '#themes' },
  { label: 'So funktioniert\'s', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Preise', href: '#pricing' },
  { label: 'Über uns', href: '#about' }
];

const themes = [
  { id: 'editorial', name: 'Editorial', color: '#FFFFFF', border: '#E0E0E0' },
  { id: 'video', name: 'Video', color: '#D4AF37', border: '#D4AF37' },
  { id: 'botanical', name: 'Botanical', color: '#8B9D83', border: '#8B9D83' },
  { id: 'contemporary', name: 'Contemporary', color: '#FF6B6B', border: '#FF6B6B' },
  { id: 'luxe', name: 'Luxe', color: '#1A1520', border: '#D4AF37' },
  { id: 'neon', name: 'Neon', color: '#00ffff', border: '#00ffff' }
];

function MarketingNav() {
  const { currentTheme, switchTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleThemeSelect = (themeId) => {
    switchTheme(themeId);
    setThemeDropdownOpen(false);
  };

  const currentThemeData = themes.find(t => t.id === currentTheme) || themes[0];

  return (
    <>
      <NavWrapper $themeId={currentTheme}>
        <Nav $themeId={currentTheme} $scrolled={scrolled}>
          <NavContainer $scrolled={scrolled} $themeId={currentTheme}>
            <Logo href="#" $themeId={currentTheme}>
              S & I
            </Logo>
            
            <NavLinks $themeId={currentTheme}>
              {navLinks.map(link => (
                <NavLink 
                  key={link.label} 
                  href={link.href}
                  $themeId={currentTheme}
                >
                  {link.label}
                </NavLink>
              ))}
            </NavLinks>
            
            <RightSection>
              {/* Theme Dropdown */}
              <ThemeDropdownWrapper ref={dropdownRef}>
                <ThemeDropdownTrigger 
                  $themeId={currentTheme}
                  onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                >
                  <ThemeColorDot style={{ background: currentThemeData.color }} />
                  {currentThemeData.name}
                  <DropdownArrow $isOpen={themeDropdownOpen}>▼</DropdownArrow>
                </ThemeDropdownTrigger>
                
                <ThemeDropdownMenu $themeId={currentTheme} $isOpen={themeDropdownOpen}>
                  {themes.map(theme => (
                    <ThemeDropdownItem
                      key={theme.id}
                      $themeId={currentTheme}
                      $active={currentTheme === theme.id}
                      onClick={() => handleThemeSelect(theme.id)}
                    >
                      <ThemeItemDot style={{ background: theme.color, borderColor: theme.border }} />
                      {theme.name}
                    </ThemeDropdownItem>
                  ))}
                </ThemeDropdownMenu>
              </ThemeDropdownWrapper>
              
              <MobileMenuButton 
                $themeId={currentTheme}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span />
                <span />
                <span />
              </MobileMenuButton>
            </RightSection>
          </NavContainer>
        </Nav>
      </NavWrapper>
      
      <MobileMenu 
        $themeId={currentTheme} 
        $isOpen={mobileMenuOpen}
        $scrolled={scrolled}
      >
        {navLinks.map(link => (
          <NavLink 
            key={link.label} 
            href={link.href}
            $themeId={currentTheme}
            onClick={handleNavClick}
          >
            {link.label}
          </NavLink>
        ))}
        
        <MobileCTAButton 
          href="#contact" 
          $themeId={currentTheme}
          onClick={handleNavClick}
        >
          Kontakt
        </MobileCTAButton>
        
        <MobileThemeSwitcher>
          <MobileThemeLabel $themeId={currentTheme}>Theme:</MobileThemeLabel>
          {themes.map(theme => (
            <MobileThemeButton
              key={theme.id}
              $themeId={currentTheme}
              $active={currentTheme === theme.id}
              onClick={() => switchTheme(theme.id)}
              style={{ 
                background: theme.color,
                borderColor: currentTheme === theme.id ? undefined : theme.border
              }}
              title={theme.name}
            />
          ))}
        </MobileThemeSwitcher>
      </MobileMenu>
    </>
  );
}

export default MarketingNav;
