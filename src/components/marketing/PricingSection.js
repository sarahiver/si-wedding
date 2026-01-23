// src/components/marketing/PricingSection.js
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const Section = styled.section`
  padding: 140px 5%;
  background: #0a0a0a;
  position: relative;
`

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
`

const Eyebrow = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #B8976A;
  display: block;
  margin-bottom: 1.5rem;
`

const Title = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #ffffff;
  margin: 0 0 1.5rem 0;
`

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.8;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 0 auto;
  }
`

const Card = styled.div`
  background: ${p => p.$popular ? 'rgba(184, 151, 106, 0.05)' : 'rgba(255, 255, 255, 0.02)'};
  border: 1px solid ${p => p.$popular ? 'rgba(184, 151, 106, 0.4)' : 'rgba(255, 255, 255, 0.08)'};
  padding: 50px 40px;
  text-align: center;
  position: relative;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'}) scale(${p => p.$popular && p.$visible ? 1.02 : 1});
  transition: all 0.6s ease ${p => p.$delay}s;
  
  &:hover {
    border-color: rgba(184, 151, 106, 0.5);
  }
`

const PopularBadge = styled.div`
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #B8976A, #D4AF37);
  background-size: 200% auto;
  animation: ${shimmer} 3s linear infinite;
  color: #0a0a0a;
  padding: 8px 20px;
`

const TierName = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.8rem;
  font-weight: 400;
  color: ${p => p.$popular ? '#B8976A' : '#ffffff'};
  margin: 0 0 8px 0;
`

const TierSubtitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 30px;
`

const Price = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 3.5rem;
  font-weight: 300;
  color: #ffffff;
  margin-bottom: 5px;
  
  span {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.5);
  }
`

const PriceNote = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 30px;
`

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 35px 0;
  text-align: left;
`

const Feature = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: ${p => p.$highlight ? '#B8976A' : 'rgba(255, 255, 255, 0.6)'};
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  gap: 10px;
  
  &::before {
    content: '✓';
    color: #B8976A;
    font-size: 0.75rem;
  }
`

const CTA = styled.a`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 16px 30px;
  transition: all 0.4s ease;
  
  ${p => p.$popular ? `
    background: #B8976A;
    color: #0a0a0a;
    &:hover {
      background: #D4AF37;
    }
  ` : `
    background: transparent;
    color: #B8976A;
    border: 1px solid rgba(184, 151, 106, 0.4);
    &:hover {
      border-color: #B8976A;
      background: rgba(184, 151, 106, 0.1);
    }
  `}
`

const tiers = [
  {
    id: 'essential',
    name: 'Essential',
    subtitle: 'Für den perfekten Start',
    price: '299',
    popular: false,
    features: [
      { text: '1 Theme nach Wahl', highlight: false },
      { text: '7 Basis-Komponenten', highlight: false },
      { text: 'RSVP mit Zusagen', highlight: false },
      { text: '6 Monate aktiv', highlight: false },
      { text: 'Mobile-optimiert', highlight: false },
    ],
    cta: 'Jetzt starten'
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'Unser Bestseller',
    price: '499',
    popular: true,
    features: [
      { text: 'Alle 6 Themes verfügbar', highlight: true },
      { text: 'Alle 12 Komponenten', highlight: true },
      { text: 'Video-Hintergründe', highlight: true },
      { text: '12 Monate aktiv', highlight: false },
      { text: 'Passwortschutz', highlight: false },
      { text: 'Eigene Domain möglich', highlight: false },
    ],
    cta: 'Premium wählen'
  },
  {
    id: 'exclusive',
    name: 'Exclusive',
    subtitle: 'Maßgeschneidert',
    price: '999',
    popular: false,
    features: [
      { text: 'Alles aus Premium', highlight: false },
      { text: 'Custom Design-Anpassungen', highlight: true },
      { text: 'Unbegrenzte Revisionen', highlight: true },
      { text: '24 Monate aktiv', highlight: false },
      { text: 'Priority Support', highlight: false },
      { text: 'Print-Ready Export', highlight: false },
    ],
    cta: 'Beratung anfragen'
  }
]

function PricingSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Section ref={sectionRef} id="pricing">
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow>— Preise —</Eyebrow>
          <Title>Transparente Pakete</Title>
          <Subtitle>
            Wählt das Paket, das zu euch passt. Keine versteckten Kosten.
          </Subtitle>
        </Header>
        
        <Grid>
          {tiers.map((tier, i) => (
            <Card 
              key={tier.id} 
              $popular={tier.popular}
              $visible={isVisible} 
              $delay={0.2 + i * 0.1}
            >
              {tier.popular && <PopularBadge>Bestseller</PopularBadge>}
              <TierName $popular={tier.popular}>{tier.name}</TierName>
              <TierSubtitle>{tier.subtitle}</TierSubtitle>
              <Price>{tier.price}<span>€</span></Price>
              <PriceNote>einmalig, zzgl. MwSt.</PriceNote>
              <Features>
                {tier.features.map((f, j) => (
                  <Feature key={j} $highlight={f.highlight}>{f.text}</Feature>
                ))}
              </Features>
              <CTA href="#contact" $popular={tier.popular}>{tier.cta}</CTA>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export default PricingSection
