// src/components/marketing/MarketingNav.js
import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const floatNav = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-3px); }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 5%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s ease;
  
  ${p => p.$themeId === 'contemporary' && css`
    top: 20px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: calc(100% - 80px);
    max-width: 1200px;
    background: #FFFFFF;
    border: 2px solid #1A1A1A;
    height: 70px;
    padding: 0 30px;
    @media (max-width: 900px) {
      width: calc(100% - 40px);
      top: 10px;
    }
  `}
  
  ${p => p.$themeId === 'botanical' && css`
    top: 20px;
    left: 50%;
    right: auto;
    width: calc(100% - 60px);
    max-width: 1100px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(15px);
    border-radius: 50px;
    height: 65px;
    padding: 0 35px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    animation: ${floatNav} 4s ease-in-out infinite;
    justify-content: center;
    @media (max-width: 900px) {
      width: calc(100% - 30px);
      top: 10px;
      padding: 0 20px;
      justify-content: space-between;
      animation: none;
    }
  `}
  
  ${p => p.$scrolled && css`
    backdrop-filter: blur(20px);
    ${p.$themeId === 'video' && css`background: rgba(10,10,10,0.95); border-bottom: 1px solid rgba(184,151,106,0.1);`}
    ${p.$themeId === 'editorial' && css`background: rgba(255,255,255,0.98); border-bottom: 1px solid #E0E0E0;`}
    ${p.$themeId === 'botanical' && css`background: rgba(255, 255, 255, 0.95); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);`}
    ${p.$themeId === 'contemporary' && css`background: #FFFFFF; box-shadow: 4px 4px 0 #1A1A1A;`}
    ${p.$themeId === 'luxe' && css`background: rgba(10,10,10,0.98); border-bottom: 1px solid rgba(212,175,55,0.1);`}
    ${p.$themeId === 'neon' && css`background: rgba(10,10,15,0.95); border-bottom: 1px solid rgba(0,255,255,0.2);`}
  `}
`;

const Logo = styled.a`
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 1001;
  
  ${p => p.$themeId === 'botanical' && css`
    @media (min-width: 901px) {
      position: absolute;
      left: 35px;
    }
  `}
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.6rem;
    font-weight: 300;
    color: ${p.$scrolled ? '#D4AF37' : '#FFFFFF'};
    letter-spacing: 0.1em;
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.5rem;
    font-style: italic;
    color: #1A1A1A;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.4rem;
    color: #2D3B2D;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #0D0D0D;
    text-transform: uppercase;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 300;
    font-style: italic;
    color: ${p.$scrolled ? '#D4AF37' : '#E8DDD4'};
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0,255,255,0.5);
  `}
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif;
    color: ${p.$scrolled ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.8)'};
    &:hover { color: #B8976A; }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: #666;
    &:hover { color: #1A1A1A; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: #5A6B5A;
    &:hover { color: #2D3B2D; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: #666;
    text-transform: uppercase;
    font-weight: 600;
    &:hover { color: #FF6B6B; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    &:hover { color: #D4AF37; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255,255,255,0.6);
    &:hover { color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5); }
  `}
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 1001;
  
  ${p => p.$themeId === 'botanical' && css`
    @media (min-width: 901px) {
      position: absolute;
      right: 35px;
    }
  `}
`;

const ThemeDropdown = styled.div`
  position: relative;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: transparent;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${p.$scrolled ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.8)'};
    border-color: rgba(184,151,106,0.3);
    &:hover { border-color: #B8976A; color: #B8976A; }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: #666;
    border-color: #E0E0E0;
    &:hover { border-color: #1A1A1A; color: #1A1A1A; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    color: #5A6B5A;
    border-color: rgba(139,157,131,0.3);
    border-radius: 20px;
    &:hover { border-color: #8B9D83; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #0D0D0D;
    border-color: #0D0D0D;
    border-width: 2px;
    &:hover { background: #0D0D0D; color: #FFF; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.6);
    border-color: rgba(212,175,55,0.2);
    &:hover { border-color: #D4AF37; color: #D4AF37; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    color: #00ffff;
    border-color: rgba(0,255,255,0.3);
    &:hover { border-color: #00ffff; box-shadow: 0 0 15px rgba(0,255,255,0.3); }
  `}
`;

const ThemeDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${p => p.$color};
  transition: transform 0.3s ease;
`;

const DropdownArrow = styled.span`
  font-size: 0.6rem;
  transition: transform 0.3s ease;
  ${p => p.$open && css`transform: rotate(180deg);`}
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 200px;
  padding: 10px 0;
  border-radius: 8px;
  opacity: ${p => p.$open ? 1 : 0};
  visibility: ${p => p.$open ? 'visible' : 'hidden'};
  transform: translateY(${p => p.$open ? 0 : '-10px'});
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1001;
  
  ${p => p.$themeId === 'video' && css`background: rgba(10,10,10,0.98); border: 1px solid rgba(184,151,106,0.2);`}
  ${p => p.$themeId === 'editorial' && css`background: #FFFFFF; border: 1px solid #E0E0E0; box-shadow: 0 10px 40px rgba(0,0,0,0.1);`}
  ${p => p.$themeId === 'botanical' && css`background: #FFFFFF; border: 1px solid rgba(139,157,131,0.2); border-radius: 16px;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FFFFFF; border: 3px solid #0D0D0D; box-shadow: 6px 6px 0 #0D0D0D;`}
  ${p => p.$themeId === 'luxe' && css`background: rgba(10,10,10,0.98); border: 1px solid rgba(212,175,55,0.15);`}
  ${p => p.$themeId === 'neon' && css`background: rgba(10,10,15,0.98); border: 1px solid rgba(0,255,255,0.2);`}
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: ${p.$active ? '#B8976A' : 'rgba(255,255,255,0.7)'};
    &:hover { background: rgba(184,151,106,0.1); }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: ${p.$active ? '#1A1A1A' : '#666'};
    &:hover { background: #F5F5F5; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: ${p.$active ? '#2D3B2D' : '#5A6B5A'};
    &:hover { background: rgba(139,157,131,0.1); }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: ${p.$active ? '#FF6B6B' : '#0D0D0D'};
    &:hover { background: #F5F5F5; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    color: ${p.$active ? '#D4AF37' : 'rgba(255,255,255,0.5)'};
    &:hover { background: rgba(212,175,55,0.1); }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    color: ${p.$active ? '#00ffff' : 'rgba(255,255,255,0.6)'};
    &:hover { background: rgba(0,255,255,0.1); }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  width: 44px;
  height: 44px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1002;
  
  @media (max-width: 900px) {
    display: flex;
  }
  
  span {
    width: 24px;
    height: 2px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    transform-origin: center;
    
    ${p => p.$themeId === 'video' && css`background: ${p.$menuOpen ? '#B8976A' : '#B8976A'};`}
    ${p => p.$themeId === 'editorial' && css`background: #1A1A1A;`}
    ${p => p.$themeId === 'botanical' && css`background: #2D3B2D;`}
    ${p => p.$themeId === 'contemporary' && css`background: #0D0D0D;`}
    ${p => p.$themeId === 'luxe' && css`background: #D4AF37;`}
    ${p => p.$themeId === 'neon' && css`background: #00ffff;`}
    
    &:nth-child(1) {
      transform: ${p => p.$menuOpen ? 'rotate(45deg) translate(5.5px, 5.5px)' : 'none'};
    }
    &:nth-child(2) {
      opacity: ${p => p.$menuOpen ? 0 : 1};
      transform: ${p => p.$menuOpen ? 'scaleX(0)' : 'scaleX(1)'};
    }
    &:nth-child(3) {
      transform: ${p => p.$menuOpen ? 'rotate(-45deg) translate(5.5px, -5.5px)' : 'none'};
    }
  }
`;

// Mobile Menu Overlay
const MobileMenuOverlay = styled.div`
  display: none;
  
  @media (max-width: 900px) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 999;
    opacity: ${p => p.$open ? 1 : 0};
    visibility: ${p => p.$open ? 'visible' : 'hidden'};
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    
    ${p => p.$themeId === 'video' && css`background: rgba(10,10,10,0.98);`}
    ${p => p.$themeId === 'editorial' && css`background: rgba(255,255,255,0.98);`}
    ${p => p.$themeId === 'botanical' && css`background: rgba(250,249,246,0.98);`}
    ${p => p.$themeId === 'contemporary' && css`background: #FFFFFF;`}
    ${p => p.$themeId === 'luxe' && css`background: rgba(10,10,10,0.98);`}
    ${p => p.$themeId === 'neon' && css`background: rgba(10,10,15,0.98);`}
  }
`;

const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
  padding: 100px 30px 50px;
`;

const MobileNavLink = styled.a`
  font-size: 1.8rem;
  text-decoration: none;
  opacity: ${p => p.$open ? 1 : 0};
  transform: translateY(${p => p.$open ? 0 : '30px'});
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${p => p.$open ? p.$delay : 0}s;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    color: rgba(255,255,255,0.8);
    &:hover { color: #B8976A; }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    color: #1A1A1A;
    &:hover { color: #666; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic;
    color: #2D3B2D;
    &:hover { color: #7A9972; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    color: #0D0D0D;
    &:hover { color: #FF6B6B; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    color: rgba(255,255,255,0.7);
    &:hover { color: #D4AF37; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    &:hover { color: #00ffff; text-shadow: 0 0 15px rgba(0,255,255,0.5); }
  `}
`;

const MobileThemeSection = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  width: 100%;
  max-width: 320px;
  opacity: ${p => p.$open ? 1 : 0};
  transform: translateY(${p => p.$open ? 0 : '30px'});
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${p => p.$open ? '0.35s' : '0s'};
  
  ${p => p.$themeId === 'video' && css`border-top: 1px solid rgba(184,151,106,0.2);`}
  ${p => p.$themeId === 'editorial' && css`border-top: 1px solid #E0E0E0;`}
  ${p => p.$themeId === 'botanical' && css`border-top: 1px solid rgba(139,157,131,0.2);`}
  ${p => p.$themeId === 'contemporary' && css`border-top: 3px solid #0D0D0D;`}
  ${p => p.$themeId === 'luxe' && css`border-top: 1px solid rgba(212,175,55,0.2);`}
  ${p => p.$themeId === 'neon' && css`border-top: 1px solid rgba(0,255,255,0.2);`}
`;

const MobileThemeTitle = styled.p`
  text-align: center;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 20px;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Montserrat', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #7A9972;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #666;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const MobileThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const MobileThemeButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 15px 8px;
  background: transparent;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${p => p.$themeId === 'video' && css`
    border-color: ${p.$active ? '#B8976A' : 'rgba(184,151,106,0.2)'};
    background: ${p.$active ? 'rgba(184,151,106,0.1)' : 'transparent'};
  `}
  ${p => p.$themeId === 'editorial' && css`
    border-color: ${p.$active ? '#1A1A1A' : '#E0E0E0'};
    background: ${p.$active ? '#F5F5F5' : 'transparent'};
  `}
  ${p => p.$themeId === 'botanical' && css`
    border-color: ${p.$active ? '#7A9972' : 'rgba(139,157,131,0.2)'};
    background: ${p.$active ? 'rgba(139,157,131,0.1)' : 'transparent'};
    border-radius: 12px;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    border-color: #0D0D0D;
    border-width: 2px;
    background: ${p.$active ? '#0D0D0D' : 'transparent'};
  `}
  ${p => p.$themeId === 'luxe' && css`
    border-color: ${p.$active ? '#D4AF37' : 'rgba(212,175,55,0.2)'};
    background: ${p.$active ? 'rgba(212,175,55,0.1)' : 'transparent'};
  `}
  ${p => p.$themeId === 'neon' && css`
    border-color: ${p.$active ? '#00ffff' : 'rgba(0,255,255,0.2)'};
    background: ${p.$active ? 'rgba(0,255,255,0.1)' : 'transparent'};
  `}
`;

const MobileThemeDot = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${p => p.$color};
  transition: transform 0.3s ease;
`;

const MobileThemeName = styled.span`
  font-size: 0.6rem;
  letter-spacing: 0.05em;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Montserrat', sans-serif; color: rgba(255,255,255,0.6);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #5A6B5A;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: ${p.$active ? '#FFF' : '#0D0D0D'};`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5);`}
`;

const themeColors = {
  video: '#B8976A',
  editorial: '#1A1A1A',
  botanical: '#8B9D83',
  contemporary: '#FF6B6B',
  luxe: '#D4AF37',
  neon: '#00ffff'
};

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Designs', href: '#designs' },
  { label: 'Preise', href: '#pricing' },
  { label: 'Über uns', href: '#about' },
  { label: 'Kontakt', href: '#contact' }
];

// Smooth scroll function
const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    const navHeight = 100; // Account for fixed nav
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

function MarketingNav() {
  const { currentTheme, switchTheme, themes } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleThemeSelect = (themeId) => {
    switchTheme(themeId);
    setDropdownOpen(false);
  };

  const handleMobileThemeSelect = (themeId) => {
    switchTheme(themeId);
    // Close menu after theme change
    setTimeout(() => {
      setMobileMenuOpen(false);
    }, 300);
  };

  const handleNavLinkClick = (e, href) => {
    e.preventDefault();
    const elementId = href.replace('#', '');
    smoothScrollTo(elementId);
  };

  const handleMobileLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Wait for menu to close, then scroll
    setTimeout(() => {
      const elementId = href.replace('#', '');
      smoothScrollTo(elementId);
    }, 400);
  };

  return (
    <>
      <Nav $themeId={currentTheme} $scrolled={scrolled}>
        <Logo href="#" $themeId={currentTheme} $scrolled={scrolled}>
          S & I
        </Logo>
        
        <NavLinks $themeId={currentTheme}>
          {navLinks.map(link => (
            <NavLink 
              key={link.label} 
              href={link.href} 
              $themeId={currentTheme} 
              $scrolled={scrolled}
              onClick={(e) => handleNavLinkClick(e, link.href)}
            >
              {link.label}
            </NavLink>
          ))}
        </NavLinks>
        
        <RightSection $themeId={currentTheme}>
          <ThemeDropdown ref={dropdownRef}>
            <ThemeButton 
              $themeId={currentTheme} 
              $scrolled={scrolled}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <ThemeDot $color={themeColors[currentTheme]} />
              {themes[currentTheme].name}
              <DropdownArrow $open={dropdownOpen}>▼</DropdownArrow>
            </ThemeButton>
            
            <DropdownMenu $themeId={currentTheme} $open={dropdownOpen}>
              {Object.values(themes).map(theme => (
                <DropdownItem
                  key={theme.id}
                  $themeId={currentTheme}
                  $active={currentTheme === theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  <ThemeDot $color={themeColors[theme.id]} />
                  {theme.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </ThemeDropdown>
          
          <MobileMenuButton 
            $themeId={currentTheme} 
            $menuOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span />
            <span />
            <span />
          </MobileMenuButton>
        </RightSection>
      </Nav>

      {/* Mobile Menu */}
      <MobileMenuOverlay $themeId={currentTheme} $open={mobileMenuOpen}>
        <MobileMenuContent>
          {navLinks.map((link, i) => (
            <MobileNavLink 
              key={link.label} 
              href={link.href} 
              $themeId={currentTheme}
              $open={mobileMenuOpen}
              $delay={0.05 + i * 0.05}
              onClick={(e) => handleMobileLinkClick(e, link.href)}
            >
              {link.label}
            </MobileNavLink>
          ))}
          
          <MobileThemeSection $themeId={currentTheme} $open={mobileMenuOpen}>
            <MobileThemeTitle $themeId={currentTheme}>Theme wählen</MobileThemeTitle>
            <MobileThemeGrid>
              {Object.values(themes).map(theme => (
                <MobileThemeButton
                  key={theme.id}
                  $themeId={currentTheme}
                  $active={currentTheme === theme.id}
                  onClick={() => handleMobileThemeSelect(theme.id)}
                >
                  <MobileThemeDot $color={themeColors[theme.id]} />
                  <MobileThemeName $themeId={currentTheme} $active={currentTheme === theme.id}>
                    {theme.name}
                  </MobileThemeName>
                </MobileThemeButton>
              ))}
            </MobileThemeGrid>
          </MobileThemeSection>
        </MobileMenuContent>
      </MobileMenuOverlay>
    </>
  );
}

export default MarketingNav;
