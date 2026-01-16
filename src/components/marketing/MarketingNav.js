// src/components/marketing/MarketingNav.js
import { useEffect, useState } from "react"
import styled from "styled-components"

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s ease;
  background: ${(props) =>
    props.scrolled ? "rgba(255, 255, 255, 0.98)" : "transparent"};
  backdrop-filter: ${(props) => (props.scrolled ? "blur(10px)" : "none")};
  border-bottom: ${(props) =>
    props.scrolled ? "1px solid #E5E5E5" : "1px solid transparent"};

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`

const Logo = styled.a`
  font-family: "Instrument Serif", serif;
  font-size: 2rem;
  font-weight: 400;
  color: ${(props) => (props.scrolled ? "#000000" : "#000000")};
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: all 0.3s ease;

  span {
    font-style: italic;
  }

  &:hover {
    opacity: 0.7;
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 968px) {
    display: none;
  }
`

const NavLink = styled.a`
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: #000000;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

const CTAButton = styled.a`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #ffffff;
  background: #000000;
  text-decoration: none;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: #333333;
    transform: translateY(-2px);
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 968px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: #000000;
    transition: all 0.3s ease;
  }
`

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 999;
  padding: 6rem 2rem 2rem;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.4s ease;

  @media (max-width: 968px) {
    display: flex;
  }
`

const MobileNavLink = styled.a`
  font-family: "Instrument Serif", serif;
  font-size: 2rem;
  color: #000000;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.6;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #000000;
`

function MarketingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <Nav scrolled={scrolled}>
        <Logo href='/' scrolled={scrolled}>
          S&<span>I</span>.
        </Logo>

        <NavLinks>
          <NavLink href='#themes' onClick={(e) => scrollToSection(e, "themes")}>
            Themes
          </NavLink>
          <NavLink href='#pakete' onClick={(e) => scrollToSection(e, "pakete")}>
            Pakete
          </NavLink>
          <NavLink
            href='#ueber-uns'
            onClick={(e) => scrollToSection(e, "ueber-uns")}
          >
            Über uns
          </NavLink>
          <NavLink
            href='#referenzen'
            onClick={(e) => scrollToSection(e, "referenzen")}
          >
            Referenzen
          </NavLink>
          <CTAButton
            href='#kontakt'
            onClick={(e) => scrollToSection(e, "kontakt")}
          >
            Beratung buchen
          </CTAButton>
        </NavLinks>

        <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
          <span />
          <span />
          <span />
        </MobileMenuButton>
      </Nav>

      <MobileMenu isOpen={mobileMenuOpen}>
        <CloseButton onClick={() => setMobileMenuOpen(false)}>×</CloseButton>
        <MobileNavLink
          href='#themes'
          onClick={(e) => scrollToSection(e, "themes")}
        >
          Themes
        </MobileNavLink>
        <MobileNavLink
          href='#pakete'
          onClick={(e) => scrollToSection(e, "pakete")}
        >
          Pakete
        </MobileNavLink>
        <MobileNavLink
          href='#ueber-uns'
          onClick={(e) => scrollToSection(e, "ueber-uns")}
        >
          Über uns
        </MobileNavLink>
        <MobileNavLink
          href='#referenzen'
          onClick={(e) => scrollToSection(e, "referenzen")}
        >
          Referenzen
        </MobileNavLink>
        <MobileNavLink
          href='#kontakt'
          onClick={(e) => scrollToSection(e, "kontakt")}
        >
          Kontakt
        </MobileNavLink>
      </MobileMenu>
    </>
  )
}

export default MarketingNav
