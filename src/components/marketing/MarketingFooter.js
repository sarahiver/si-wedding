// src/components/marketing/MarketingFooter.js
import styled from "styled-components"

const FooterContainer = styled.footer`
  background: #000000;
  color: #ffffff;
  padding: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const BrandSection = styled.div``

const Logo = styled.div`
  font-family: "Instrument Serif", serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 1.5rem;

  span {
    font-style: italic;
  }
`

const Tagline = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  max-width: 300px;
`

const FooterSection = styled.div``

const FooterTitle = styled.h4`
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1.5rem;
`

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const FooterLink = styled.li`
  margin-bottom: 0.8rem;

  a {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ffffff;
    }
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 3rem 0;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`

const Copyright = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
`

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ffffff;
    }
  }
`

const HeartIcon = styled.span`
  color: #ff6b6b;
`

function MarketingFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <FooterContainer>
      <FooterContent>
        <BrandSection>
          <Logo>
            S&<span>I</span>.
          </Logo>
          <Tagline>
            Digital Couture für euren schönsten Tag. Wir kreieren einzigartige
            Hochzeits-Websites, die eure Geschichte erzählen.
          </Tagline>
        </BrandSection>

        <FooterSection>
          <FooterTitle>Navigation</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <a href='#themes'>Themes</a>
            </FooterLink>
            <FooterLink>
              <a href='#pakete'>Pakete</a>
            </FooterLink>
            <FooterLink>
              <a href='#ueber-uns'>Über uns</a>
            </FooterLink>
            <FooterLink>
              <a href='#referenzen'>Referenzen</a>
            </FooterLink>
            <FooterLink>
              <a href='#kontakt'>Kontakt</a>
            </FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Themes</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <a href='#themes'>Gold Luxury</a>
            </FooterLink>
            <FooterLink>
              <a href='#themes'>Editorial</a>
            </FooterLink>
            <FooterLink>
              <a href='#themes'>Botanical Garden</a>
            </FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Folgt uns</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <a
                href='https://instagram.com/sarahiver.weddings'
                target='_blank'
                rel='noopener noreferrer'
              >
                Instagram
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href='https://pinterest.com/sarahiver'
                target='_blank'
                rel='noopener noreferrer'
              >
                Pinterest
              </a>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>

      <Divider />

      <BottomBar>
        <Copyright>
          © {currentYear} S&I. — Made with <HeartIcon>♥</HeartIcon> in Germany
        </Copyright>
        <LegalLinks>
          <a href='/impressum'>Impressum</a>
          <a href='/datenschutz'>Datenschutz</a>
          <a href='/agb'>AGB</a>
        </LegalLinks>
      </BottomBar>
    </FooterContainer>
  )
}

export default MarketingFooter
