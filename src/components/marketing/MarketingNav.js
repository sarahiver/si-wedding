// src/components/marketing/MarketingNav.js
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const bounce = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
`

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
  background: ${p => p.$scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${p => p.$scrolled ? '1px solid rgba(184, 151, 106, 0.1)' : 'none'};
  transition: all 0.4s ease;
`

const Logo = styled.a`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.8rem;
  font-weight: 300;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.1em;
  
  span {
    color: #B8976A;
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  
  @media (max-width: 1100px) {
    display: none;
  }
`

const NavLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #B8976A;
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const ThemeSwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const ThemeSwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
`

const ThemeButton = styled.button`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${p => p.$active ? '#B8976A' : 'rgba(255,255,255,0.15)'};
  background: ${p => p.$color};
  cursor: pointer;
  transition: all 0.3s ease;
  transform: scale(${p => p.$active ? 1.15 : 1});
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.2);
  }
`

const DemoLink = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #B8976A;
  background: none;
  border: 1px solid rgba(184, 151, 106, 0.3);
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(184, 151, 106, 0.1);
    border-color: #B8976A;
    
    span {
      animation: ${bounce} 0.6s ease infinite;
    }
  }
  
  span {
    font-size: 0.9rem;
    transition: transform 0.3s ease;
  }
`

const CTAButton = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #0a0a0a;
  background: #B8976A;
  padding: 12px 25px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #D4AF37;
  }
  
  @media (max-width: 900px) {
    display: none;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  
  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  span {
    width: 22px;
    height: 1px;
    background: #B8976A;
    transition: all 0.3s ease;
  }
`

const MobileMenu = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  transform: translateY(${p => p.$open ? '0' : '-100%'});
  opacity: ${p => p.$open ? 1 : 0};
  transition: all 0.4s ease;
  pointer-events: ${p => p.$open ? 'auto' : 'none'};
`

const MobileNavLink = styled.a`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2rem;
  font-weight: 300;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #B8976A;
  }
`

const MobileThemeSwitcher = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`

const MobileThemeButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${p => p.$active ? '#B8976A' : 'rgba(255,255,255,0.2)'};
  background: ${p => p.$color};
  cursor: pointer;
  transition: all 0.3s ease;
`

const themes = [
  { id: 'video', color: '#B8976A', name: 'Video' },
  { id: 'editorial', color: '#1A1A1A', name: 'Editorial' },
  { id: 'botanical', color: '#8B9D83', name: 'Botanical' },
  { id: 'contemporary', color: '#FF6B6B', name: 'Contemporary' },
  { id: 'luxe', color: '#D4AF37', name: 'Luxe' },
  { id: 'neon', color: '#00FFFF', name: 'Neon' },
]

function MarketingNav() {
  const { currentTheme, switchTheme } = useTheme()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDemoClick = () => {
    navigate(`/demo?theme=${currentTheme}`)
  }

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Logo href="#">
          S<span>&</span>I
        </Logo>
        
        <NavLinks>
          <NavLink href="#examples">Themes</NavLink>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#pricing">Preise</NavLink>
          <NavLink href="#about">Über uns</NavLink>
        </NavLinks>
        
        <RightSection>
          <ThemeSwitcherContainer>
            <ThemeSwitcherWrapper>
              {themes.map(theme => (
                <ThemeButton
                  key={theme.id}
                  $color={theme.color}
                  $active={currentTheme === theme.id}
                  onClick={() => switchTheme(theme.id)}
                  title={theme.name}
                />
              ))}
            </ThemeSwitcherWrapper>
            
            <DemoLink onClick={handleDemoClick}>
              Ausprobieren <span>→</span>
            </DemoLink>
          </ThemeSwitcherContainer>
          
          <CTAButton href="#contact">Kontakt</CTAButton>
          
          <MobileMenuButton onClick={() => setMobileOpen(!mobileOpen)}>
            <span />
            <span />
            <span />
          </MobileMenuButton>
        </RightSection>
      </Nav>
      
      <MobileMenu $open={mobileOpen}>
        <MobileNavLink href="#examples" onClick={() => setMobileOpen(false)}>Themes</MobileNavLink>
        <MobileNavLink href="#features" onClick={() => setMobileOpen(false)}>Features</MobileNavLink>
        <MobileNavLink href="#pricing" onClick={() => setMobileOpen(false)}>Preise</MobileNavLink>
        <MobileNavLink href="#about" onClick={() => setMobileOpen(false)}>Über uns</MobileNavLink>
        <MobileNavLink href="#contact" onClick={() => setMobileOpen(false)}>Kontakt</MobileNavLink>
        
        <MobileThemeSwitcher>
          {themes.map(theme => (
            <MobileThemeButton
              key={theme.id}
              $color={theme.color}
              $active={currentTheme === theme.id}
              onClick={() => switchTheme(theme.id)}
            />
          ))}
        </MobileThemeSwitcher>
      </MobileMenu>
    </>
  )
}

export default MarketingNav
