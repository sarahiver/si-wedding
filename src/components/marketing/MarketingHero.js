// src/components/marketing/MarketingHero.js
import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideIn = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8rem 2rem 4rem;
  background: #ffffff;
  position: relative;
  overflow: hidden;
`

const Eyebrow = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #666666;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`

const MainTitle = styled.h1`
  font-family: "Instrument Serif", serif;
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 400;
  color: #000000;
  line-height: 1;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.8s ease-out 0.4s both;

  span {
    font-style: italic;
  }
`

const SubTitle = styled.h2`
  font-family: "Instrument Serif", serif;
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 400;
  color: #000000;
  line-height: 1.1;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease-out 0.6s both;

  span {
    font-style: italic;
    color: #666666;
  }
`

const Divider = styled.div`
  width: 100px;
  height: 1px;
  background: #000000;
  margin-bottom: 3rem;
  transform-origin: center;
  animation: ${slideIn} 0.8s ease-out 0.8s both;
`

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #666666;
  max-width: 500px;
  line-height: 1.8;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease-out 1s both;
`

const CTAGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  animation: ${fadeIn} 0.8s ease-out 1.2s both;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`

const PrimaryButton = styled.a`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ffffff;
  background: #000000;
  padding: 1.2rem 3rem;
  text-decoration: none;
  transition: all 0.4s ease;

  &:hover {
    background: #333333;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`

const SecondaryButton = styled.a`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #000000;
  background: transparent;
  padding: 1.2rem 3rem;
  text-decoration: none;
  border: 1px solid #000000;
  transition: all 0.4s ease;

  &:hover {
    background: #000000;
    color: #ffffff;
    transform: translateY(-3px);
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: ${fadeIn} 0.8s ease-out 1.5s both;
  cursor: pointer;
`

const ScrollText = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999999;
`

const ScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, #000000, transparent);
  animation: scrollPulse 2s ease-in-out infinite;

  @keyframes scrollPulse {
    0%,
    100% {
      opacity: 0.3;
      transform: scaleY(1);
    }
    50% {
      opacity: 1;
      transform: scaleY(1.2);
    }
  }
`

function MarketingHero() {
  const scrollToThemes = () => {
    const element = document.getElementById("themes")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <HeroSection>
      <Eyebrow>Hochzeits-Websites mit Stil</Eyebrow>

      <MainTitle>
        Digital <span>Couture</span>
      </MainTitle>

      <SubTitle>
        für euren <span>schönsten Tag</span>
      </SubTitle>

      <Divider />

      <Description>
        Wir kreieren einzigartige Hochzeits-Websites, die eure Geschichte
        erzählen und eure Gäste begeistern. Individuell gestaltet, persönlich
        betreut.
      </Description>

      <CTAGroup>
        <PrimaryButton href='#kontakt'>Beratung buchen</PrimaryButton>
        <SecondaryButton href='#themes'>Themes entdecken</SecondaryButton>
      </CTAGroup>

      <ScrollIndicator onClick={scrollToThemes}>
        <ScrollText>Scroll</ScrollText>
        <ScrollLine />
      </ScrollIndicator>
    </HeroSection>
  )
}

export default MarketingHero
