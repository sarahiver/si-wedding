// src/components/marketing/MarketingFooter.js
import React from 'react'
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const Footer = styled.footer`
  padding: 80px 5% 40px;
  background: #0a0a0a;
  border-top: 1px solid rgba(184, 151, 106, 0.1);
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`

const Brand = styled.div``

const Logo = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 300;
  background: linear-gradient(135deg, #B8976A, #D4AF37, #B8976A);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
  margin-bottom: 15px;
`

const Tagline = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
`

const Nav = styled.nav`
  display: flex;
  gap: 50px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 30px;
  }
`

const NavColumn = styled.div``

const NavTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #B8976A;
  margin-bottom: 20px;
`

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const NavLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ffffff;
  }
`

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`

const Copyright = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.3);
`

const MadeWith = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.3);
  
  span {
    color: #B8976A;
  }
`

function MarketingFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <Footer>
      <Container>
        <TopSection>
          <Brand>
            <Logo>S & I</Logo>
            <Tagline>Premium Wedding Websites</Tagline>
          </Brand>
          
          <Nav>
            <NavColumn>
              <NavTitle>Navigation</NavTitle>
              <NavLinks>
                <NavLink href="#examples">Themes</NavLink>
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#pricing">Preise</NavLink>
                <NavLink href="#about">Über uns</NavLink>
              </NavLinks>
            </NavColumn>
            
            <NavColumn>
              <NavTitle>Rechtliches</NavTitle>
              <NavLinks>
                <NavLink href="/impressum">Impressum</NavLink>
                <NavLink href="/datenschutz">Datenschutz</NavLink>
                <NavLink href="/agb">AGB</NavLink>
              </NavLinks>
            </NavColumn>
            
            <NavColumn>
              <NavTitle>Kontakt</NavTitle>
              <NavLinks>
                <NavLink href="mailto:hello@siwedding.de">hello@siwedding.de</NavLink>
                <NavLink href="#contact">Anfrage senden</NavLink>
              </NavLinks>
            </NavColumn>
          </Nav>
        </TopSection>
        
        <BottomSection>
          <Copyright>© {currentYear} S&I Wedding Websites. Alle Rechte vorbehalten.</Copyright>
          <MadeWith>Made with <span>♥</span> in Hamburg</MadeWith>
        </BottomSection>
      </Container>
    </Footer>
  )
}

export default MarketingFooter
