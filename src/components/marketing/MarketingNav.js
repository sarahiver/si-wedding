// src/components/marketing/MarketingNav.js
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
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
  background: ${p => p.$scrolled ? `rgba(${p.$isDark ? '10, 10, 10' : '255, 255, 255'}, 0.95)` : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${p => p.$scrolled ? `1px solid ${p.$accent}20` : 'none'};
  transition: all 0.4s ease;
`

const Logo = styled.a`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.8rem;
  font-weight: 300;
  color: ${p => p.$textColor};
  text-decoration: none;
  letter-spacing: 0.1em;
  transition: color 0.4s ease;
  
  span {
    color: ${p => p.$accent};
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
  color: ${p => p.$textColor}99;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${p => p.$accent};
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const ThemeSwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const ArrowHint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.$accent};
  order: 2;
  
  span {
    font-size: 1rem;
    animation: ${bounce} 1s ease infinite;
  }
`

const ThemeDropdown = styled.div`
  position: relative;
  order: 1;
`

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${p => p.$isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
  border: 1px solid ${p => p.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${p => p.$accent}66;
  }
`

const ThemeDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${p => p.$color};
  border: 1px solid ${p => p.$isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
`

const ThemeName = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.$textColor};
  transition: color 0.4s ease;
`

const DropdownArrow = styled.span`
  font-size: 0.6rem;
  color: ${p => p.$textColor}80;
  transition: transform 0.3s ease, color 0.4s ease;
  transform: rotate(${p => p.$open ? '180deg' : '0deg'});
`

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: ${p => p.$isDark ? 'rgba(10, 10, 10, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
  border: 1px solid ${p => p.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  backdrop-filter: blur(20px);
  min-width: 180px;
  opacity: ${p => p.$open ? 1 : 0};
  visibility: ${p => p.$open ? 'visible' : 'hidden'};
  transform: translateY(${p => p.$open ? '0' : '-10px'});
  transition: all 0.3s ease;
  z-index: 100;
`

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  background: ${p => p.$active ? `${p.$accent}15` : 'transparent'};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${p => p.$accent}20;
  }
`

const ItemName = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: ${p => p.$active ? p.$accent : p.$textColor};
  transition: color 0.3s ease;
`

const CTAButton = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${p => p.$isDark ? '#0a0a0a' : '#ffffff'};
  background: ${p => p.$accent};
  padding: 12px 25px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    filter: brightness(1.1);
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
    background: ${p => p.$accent};
    transition: all 0.3s ease;
  }
`

const MobileMenu = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${p => p.$isDark ? 'rgba(10, 10, 10, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
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
  color: ${p => p.$textColor};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${p => p.$accent};
  }
`

const MobileThemeSelect = styled.select`
  background: ${p => p.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  border: 1px solid ${p => p.$accent}50;
  color: ${p => p.$textColor};
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  padding: 15px 30px;
  margin-top: 20px;
  cursor: pointer;
  
  option {
    background: ${p => p.$isDark ? '#0a0a0a' : '#ffffff'};
    color: ${p => p.$textColor};
  }
`

const themesData = [
  { id: 'video', color: '#B8976A', name: 'Video' },
  { id: 'editorial', color: '#1A1A1A', name: 'Editorial' },
  { id: 'botanical', color: '#8B9D83', name: 'Botanical' },
  { id: 'contemporary', color: '#FF6B6B', name: 'Contemporary' },
  { id: 'luxe', color: '#D4AF37', name: 'Luxe' },
  { id: 'neon', color: '#00FFFF', name: 'Neon' },
]

function MarketingNav() {
  const { currentTheme, switchTheme, theme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const currentThemeData = themesData.find(t => t.id === currentTheme) || themesData[0]
  
  // Determine if current theme is dark
  const isDark = ['video', 'luxe', 'neon'].includes(currentTheme)
  const textColor = isDark ? '#ffffff' : '#1A1A1A'
  const accent = theme?.primary || '#B8976A'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.theme-dropdown')) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleThemeSelect = (themeId) => {
    console.log('Switching to theme:', themeId)
    switchTheme(themeId)
    setDropdownOpen(false)
  }

  return (
    <>
      <Nav $scrolled={scrolled} $isDark={isDark} $accent={accent}>
        <Logo href="#" $textColor={textColor} $accent={accent}>
          S<span>&</span>I
        </Logo>
        
        <NavLinks>
          <NavLink href="#examples" $textColor={textColor} $accent={accent}>Themes</NavLink>
          <NavLink href="#features" $textColor={textColor} $accent={accent}>Features</NavLink>
          <NavLink href="#pricing" $textColor={textColor} $accent={accent}>Preise</NavLink>
          <NavLink href="#about" $textColor={textColor} $accent={accent}>Über uns</NavLink>
        </NavLinks>
        
        <RightSection>
          <ThemeSwitcherContainer>
            <ThemeDropdown className="theme-dropdown">
              <DropdownButton 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                $isDark={isDark}
                $accent={accent}
              >
                <ThemeDot $color={currentThemeData.color} $isDark={isDark} />
                <ThemeName $textColor={textColor}>{currentThemeData.name}</ThemeName>
                <DropdownArrow $open={dropdownOpen} $textColor={textColor}>▼</DropdownArrow>
              </DropdownButton>
              
              <DropdownMenu $open={dropdownOpen} $isDark={isDark}>
                {themesData.map(t => (
                  <DropdownItem
                    key={t.id}
                    $active={currentTheme === t.id}
                    $accent={accent}
                    onClick={() => handleThemeSelect(t.id)}
                  >
                    <ThemeDot $color={t.color} $isDark={isDark} />
                    <ItemName 
                      $active={currentTheme === t.id} 
                      $accent={accent}
                      $textColor={textColor}
                    >
                      {t.name}
                    </ItemName>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </ThemeDropdown>
            
            <ArrowHint $accent={accent}>
              Design umschalten
              <span>→</span>
            </ArrowHint>
          </ThemeSwitcherContainer>
          
          <CTAButton href="#contact" $accent={accent} $isDark={isDark}>Kontakt</CTAButton>
          
          <MobileMenuButton onClick={() => setMobileOpen(!mobileOpen)} $accent={accent}>
            <span />
            <span />
            <span />
          </MobileMenuButton>
        </RightSection>
      </Nav>
      
      <MobileMenu $open={mobileOpen} $isDark={isDark}>
        <MobileNavLink href="#examples" onClick={() => setMobileOpen(false)} $textColor={textColor} $accent={accent}>Themes</MobileNavLink>
        <MobileNavLink href="#features" onClick={() => setMobileOpen(false)} $textColor={textColor} $accent={accent}>Features</MobileNavLink>
        <MobileNavLink href="#pricing" onClick={() => setMobileOpen(false)} $textColor={textColor} $accent={accent}>Preise</MobileNavLink>
        <MobileNavLink href="#about" onClick={() => setMobileOpen(false)} $textColor={textColor} $accent={accent}>Über uns</MobileNavLink>
        <MobileNavLink href="#contact" onClick={() => setMobileOpen(false)} $textColor={textColor} $accent={accent}>Kontakt</MobileNavLink>
        
        <MobileThemeSelect 
          value={currentTheme} 
          onChange={(e) => handleThemeSelect(e.target.value)}
          $isDark={isDark}
          $textColor={textColor}
          $accent={accent}
        >
          {themesData.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </MobileThemeSelect>
      </MobileMenu>
    </>
  )
}

export default MarketingNav
